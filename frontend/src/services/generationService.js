// OBJEX generation service
// Abstraction: generate3DModel(image) -> { url, meta }
// If a real API is configured in env, we would call it. Otherwise we use
// the demo fallback with a curated GLB. This keeps the UX identical.

const DEMO_MODEL_URL = "/models/demo-object.glb";
const REAL_API_URL = process.env.REACT_APP_OBJEX_API_URL || null;

async function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Generate a 3D model from a 2D image.
 * @param {File} file - image file
 * @param {(pct:number, stage?:string)=>void} onProgress
 * @returns {Promise<{url:string, meta:object, demo:boolean}>}
 */
export async function generate3DModel(file, onProgress = () => {}) {
  if (REAL_API_URL) {
    try {
      onProgress(5, "Uploading");
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`${REAL_API_URL}/generate`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Generation API failed");
      // Fake progress increments while waiting
      for (let p = 20; p <= 90; p += 10) {
        await delay(300);
        onProgress(p);
      }
      const data = await res.json();
      onProgress(100);
      return { url: data.url || DEMO_MODEL_URL, meta: data, demo: false };
    } catch (e) {
      // fall through to demo
      console.warn("Real API failed, falling back to demo:", e.message);
    }
  }

  // Cinematic demo flow
  const stages = [
    { pct: 15, wait: 700 },
    { pct: 35, wait: 900 },
    { pct: 58, wait: 1000 },
    { pct: 80, wait: 900 },
    { pct: 98, wait: 700 },
  ];
  for (const s of stages) {
    await delay(s.wait);
    onProgress(s.pct);
  }
  await delay(400);
  onProgress(100);
  return {
    url: DEMO_MODEL_URL,
    meta: { source: "demo", filename: file?.name || "object" },
    demo: true,
  };
}

export async function downloadGLB(url, name = "objex-model.glb") {
  const res = await fetch(url);
  const blob = await res.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}
