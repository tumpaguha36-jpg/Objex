import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
    };
    const raf = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 18}px, ${ring.current.y - 18}px, 0)`;
      }
      requestAnimationFrame(raf);
    };
    const enter = (e) => {
      const t = e.target;
      if (t.closest && t.closest("a, button, [role='button'], [data-magnetic]")) {
        ringRef.current?.classList.add("magnetic");
      }
    };
    const leave = (e) => {
      const t = e.target;
      if (t.closest && t.closest("a, button, [role='button'], [data-magnetic]")) {
        ringRef.current?.classList.remove("magnetic");
      }
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    const id = requestAnimationFrame(raf);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" data-testid="custom-cursor-ring" />
      <div ref={dotRef} className="cursor-dot" data-testid="custom-cursor-dot" />
    </>
  );
}
