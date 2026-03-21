import { useEffect, useRef } from "react";

export function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // PERFORMANCE: Increased density for more "vibe"
    const stars = Array.from({ length: 300 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8,
      opacity: Math.random(),
      blinkSpeed: 0.01 + Math.random() * 0.02, // FASTER BLINK
      direction: Math.random() > 0.5 ? 1 : -1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        star.opacity += star.blinkSpeed * star.direction;
        if (star.opacity >= 1 || star.opacity <= 0.05) {
          star.direction *= -1;
        }

        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a subtle bloom to larger stars
        if (star.radius > 1.4) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "white";
        } else {
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#030014] overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Intense Animated Nebula Vibe */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_50%)] animate-vibe-slow" />
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.15),transparent_50%)] animate-vibe-delayed" />
      </div>
    </div>
  );
}
