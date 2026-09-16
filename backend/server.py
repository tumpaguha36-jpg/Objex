from fastapi import FastAPI, APIRouter,File,UploadFile,HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import time
import requests
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
@api_router.post("/convert")
async def convert_image_to_3d(file: UploadFile = File(...)):
    api_key = os.environ.get("TRIPO_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="TRIPO_API_KEY not configured")
    
    try:
        image_bytes = await file.read()
        url = "https://api.tripo3d.ai/v2/openapi/task"
        headers = {"Authorization": f"Bearer {api_key}"}
        files = {"file": (file.filename, image_bytes, file.content_type)}
        data = {"type": "image_to_model"}
        
        response = requests.post(url, headers=headers, data=data, files=files)
        result = response.json()
        
        if result.get("code") != 0:
            raise HTTPException(status_code=400, detail=result.get("message", "Failed to create task"))
            
        task_id = result["data"]["task_id"]
        
        status_url = f"https://api.tripo3d.ai/v2/openapi/task/{task_id}"
        for _ in range(20):
            time.sleep(3)
            poll_resp = requests.get(status_url, headers=headers).json()
            task_data = poll_resp.get("data", {})
            status = task_data.get("status")
            
            if status == "success":
                glb_url = task_data.get("output", {}).get("model")
                return {"success": True, "model_url": glb_url}
            elif status in ["failed", "cancelled", "banned"]:
                raise HTTPException(status_code=400, detail=f"Model generation failed with status: {status}")
                
        raise HTTPException(status_code=504, detail="Generation timed out")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
