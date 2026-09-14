import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCcw, Sparkles, CheckCircle2 } from "lucide-react";
import UploadDropzone from "../components/UploadDropzone";
import ProcessingAnimation from "../components/ProcessingAnimation";
import ModelViewer from "../components/ModelViewer";
import MagneticButton from "../components/MagneticButton";
import ParticleBackground from "../components/ParticleBackground";
import { generate3DModel, downloadGLB } from "../services/generationService";
import { toast } from "sonner";

export default function Create() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | processing | result
  const [result, setResult] = useState(null);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    return () => {
      if (file?.url) URL.revokeObjectURL(file.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = async () => {
    if (!file) return;
    setPhase("processing");
    setProgress(0);
    try {
      const res = await generate3DModel(file.file, (p) => setProgress(p));
      setResult(res);
      setPhase("result");
      if (res.demo) {
        toast.message("Demo mode active", {
          description: "Showing a sample GLB while no API is configured.",
        });
      }
    } catch (e) {
      toast.error("Something went wrong while creating your model.");
      setPhase("idle");
    }
  };

  const reset = () => {
    if (file?.url) URL.revokeObjectURL(file.url);
    setFile(null);
    setResult(null);
    setProgress(0);
    setPhase("idle");
    setDownloaded(false);
  };

  const doDownload = async () => {
    if (!result?.url) return;
    try {
      await downloadGLB(result.url, `objex-${Date.now()}.glb`);
      setDownloaded(true);
      toast.success("GLB downloaded");
      setTimeout(() => setDownloaded(false), 2400);
    } catch (e) {
      toast.error("Unable to download the model. Please try again.");
    }
  };

  return (
    <div className="relative pt-28 lg:pt-32 pb-24 min-h-screen noise" data-testid="create-page">
      <ParticleBackground />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400 mb-4">Create · Studio</div>
          <h1 className="font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            Create Your <span className="brand-gradient-text">3D Model</span>
          </h1>
          <p className="mt-5 text-slate-400 max-w-xl">
            Upload an image and let OBJEX turn it into 3D. Rotate, inspect, and download as GLB.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <UploadDropzone file={file} onFile={setFile} />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton
                  testId="generate-3d-button"
                  onClick={start}
                  disabled={!file}
                  className={`px-8 py-4 text-base ${!file ? "opacity-40 pointer-events-none" : ""}`}
                >
                  <Sparkles className="w-4 h-4" />
                  Generate 3D
                </MagneticButton>
                {file && (
                  <button
                    onClick={reset}
                    className="text-sm text-slate-300 hover:text-white"
                    data-testid="generate-cancel"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {phase === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <ProcessingAnimation progress={progress} />
            </motion.div>
          )}

          {phase === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
              data-testid="result-section"
            >
              <div className="text-center">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400 mb-3">Complete · Interactive</div>
                <h2 className="font-display font-extrabold text-3xl lg:text-5xl">
                  Your <span className="brand-gradient-text">3D Model</span> Is Ready.
                </h2>
                {result.demo && (
                  <p className="text-xs text-slate-500 mt-3 font-mono uppercase tracking-[0.2em]">
                    Demo Mode · Sample GLB
                  </p>
                )}
              </div>
              <ModelViewer url={result.url} />

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton
                  testId="download-glb-button"
                  onClick={doDownload}
                  className="px-8 py-4 text-base"
                >
                  {downloaded ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  {downloaded ? "Downloaded" : "Download GLB"}
                </MagneticButton>
                <MagneticButton
                  testId="create-another"
                  onClick={reset}
                  variant="ghost"
                  className="px-8 py-4 text-base"
                >
                  <RefreshCcw className="w-4 h-4" /> Create Another
                </MagneticButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
