import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

const ACCEPTED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX = 15 * 1024 * 1024; // 15MB

export default function UploadDropzone({ file, onFile }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const validate = (f) => {
    if (!f) return "No file";
    if (!ACCEPTED.includes(f.type)) return "Only JPG, PNG or WEBP are supported.";
    if (f.size > MAX) return "File too large (15MB max).";
    return null;
  };

  const handleFiles = useCallback(
    (files) => {
      const f = files?.[0];
      const err = validate(f);
      if (err) {
        toast.error(err);
        return;
      }
      const url = URL.createObjectURL(f);
      onFile({ file: f, name: f.name, size: f.size, url });
    },
    [onFile]
  );

  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="w-full" data-testid="upload-section">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.label
            key="drop"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            htmlFor="objex-file-input"
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            className={`relative block w-full rounded-2xl border-2 border-dashed transition-all duration-300 min-h-[380px] p-10 flex flex-col items-center justify-center text-center gradient-border overflow-hidden ${
              drag ? "border-cyan-400/60" : "border-white/10"
            }`}
            data-testid="upload-dropzone"
          >
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                drag ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(6,182,212,0.18) 0%, rgba(168,85,247,0.10) 45%, rgba(0,0,0,0) 75%)",
              }}
            />
            <motion.div
              animate={{ y: drag ? -4 : 0, scale: drag ? 1.05 : 1 }}
              className="w-16 h-16 rounded-2xl brand-gradient flex items-center justify-center mb-6 shadow-[0_10px_40px_-10px_rgba(168,85,247,0.9)]"
            >
              <Upload className="w-7 h-7 text-white" />
            </motion.div>
            <p className="font-display font-semibold text-2xl mb-2">
              Drop your image or <span className="brand-gradient-text">browse</span>
            </p>
            <p className="text-slate-400 text-sm max-w-md mb-6">
              Upload a clear photo of an object. JPG, PNG or WEBP up to 15MB.
              OBJEX will handle the rest.
            </p>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
              <span>JPG</span><span>·</span><span>PNG</span><span>·</span><span>WEBP</span>
            </div>
            <input
              ref={inputRef}
              id="objex-file-input"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
              data-testid="upload-file-input"
            />
          </motion.label>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="relative rounded-2xl gradient-border overflow-hidden"
            data-testid="upload-preview"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
              <div className="md:col-span-3 relative aspect-[4/3] bg-black">
                <img
                  src={file.url}
                  alt={file.name}
                  className="absolute inset-0 w-full h-full object-contain p-6"
                  data-testid="upload-preview-image"
                />
                <div className="absolute inset-0 pointer-events-none cyber-grid opacity-40" />
              </div>
              <div className="md:col-span-2 p-6 flex flex-col justify-between bg-[#0A0A0F]">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-400 mb-3">
                    Selected · Ready to Generate
                  </div>
                  <p className="font-display font-semibold text-lg break-all mb-2" data-testid="upload-filename">
                    {file.name}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <ImageIcon className="w-4 h-4" />
                    <span>{formatBytes(file.size)}</span>
                  </div>
                </div>
                <button
                  onClick={() => onFile(null)}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white border border-white/10 hover:border-white/25 rounded-full px-4 py-2 self-start"
                  data-testid="upload-remove"
                >
                  <X className="w-4 h-4" /> Remove image
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
