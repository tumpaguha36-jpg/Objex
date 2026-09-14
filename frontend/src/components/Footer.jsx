import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050507] noise" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Logo size={34} />
            <p className="mt-5 text-slate-400 text-sm max-w-sm leading-relaxed">
              OBJEX turns a single image into a full 3D asset. Built for creators,
              designers and developers who move fast.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/30 transition-colors"
                  data-testid={`footer-social-${i}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-4">Product</div>
              <ul className="space-y-3 text-sm">
                <li><Link to="/create" className="text-slate-300 hover:text-white">Create</Link></li>
                <li><Link to="/gallery" className="text-slate-300 hover:text-white">Gallery</Link></li>
                <li><Link to="/how-it-works" className="text-slate-300 hover:text-white">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-4">Company</div>
              <ul className="space-y-3 text-sm">
                <li><Link to="/use-cases" className="text-slate-300 hover:text-white">Use Cases</Link></li>
                <li><Link to="/pricing" className="text-slate-300 hover:text-white">Pricing</Link></li>
                <li><Link to="/faq" className="text-slate-300 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-4">Legal</div>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 relative">
          <h2 className="font-display font-black text-[18vw] lg:text-[13rem] leading-none tracking-tighter select-none pointer-events-none">
            <span className="text-white/[0.06]">OBJE</span>
            <span className="x-gradient">X</span>
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} OBJEX — One Image. One Click. One 3D Model.
          </p>
          <p className="text-xs text-slate-500">Made for creators. Shipped from the cloud.</p>
        </div>
      </div>
    </footer>
  );
}
