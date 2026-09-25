import { useEffect, useRef } from 'react';

const COLORS = ['#edb0cd', '#f9bec8', '#eb97a8', '#ffdce6', '#ffffff'];
const SHAPES = ['star', 'heart', 'sparkle'];

function drawStar(ctx, size) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const outerAngle = (Math.PI / 2.5) * i - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / 5;
    const ox = Math.cos(outerAngle) * size;
    const oy = Math.sin(outerAngle) * size;
    const ix = Math.cos(innerAngle) * size * 0.45;
    const iy = Math.sin(innerAngle) * size * 0.45;
    if (i === 0) ctx.moveTo(ox, oy);
    else ctx.lineTo(ox, oy);
    ctx.lineTo(ix, iy);
  }
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx, size) {
  ctx.beginPath();
  const s = size * 0.6;
  ctx.moveTo(0, s * 0.6);
  ctx.bezierCurveTo(-s * 1.4, -s * 0.6, -s * 0.5, -s * 1.6, 0, -s * 0.5);
  ctx.bezierCurveTo(s * 0.5, -s * 1.6, s * 1.4, -s * 0.6, 0, s * 0.6);
  ctx.closePath();
  ctx.fill();
}

function drawSparkle(ctx, size) {
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.22, -size * 0.22);
  ctx.lineTo(size, 0);
  ctx.lineTo(size * 0.22, size * 0.22);
  ctx.lineTo(0, size);
  ctx.lineTo(-size * 0.22, size * 0.22);
  ctx.lineTo(-size, 0);
  ctx.lineTo(-size * 0.22, -size * 0.22);
  ctx.closePath();
  ctx.fill();
}

const DRAWERS = { star: drawStar, heart: drawHeart, sparkle: drawSparkle };

export function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let lastX = null;
    let lastY = null;
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (x, y) => {
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.6,
        vy: -Math.random() * 1.2 - 0.4,
        size: Math.random() * 6 + 5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        life: 0,
        maxLife: Math.random() * 30 + 40,
        shape,
        color
      });
      if (particles.length > 200) particles.splice(0, particles.length - 200);
    };

    const onPointerMove = e => {
      const x = e.clientX;
      const y = e.clientY;
      if (lastX !== null) {
        const dist = Math.hypot(x - lastX, y - lastY);
        const steps = Math.min(Math.floor(dist / 12), 4);
        for (let i = 0; i < steps; i++) spawn(x, y);
      }
      lastX = x;
      lastY = y;
    };

    const onPointerDown = e => {
      for (let i = 0; i < 12; i++) spawn(e.clientX, e.clientY);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.life < p.maxLife);
      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.rotation += p.rotationSpeed;
        const t = p.life / p.maxLife;
        const alpha = 1 - t;
        const scale = 1 - t * 0.5;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(alpha, 0);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        DRAWERS[p.shape](ctx, p.size * scale);
        ctx.restore();
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}
