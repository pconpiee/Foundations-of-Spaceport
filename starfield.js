// Starfield — deep space particle field
// Subtle, beautiful, professional. Not a gimmick.

(function() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, stars = [], animId;

  const STAR_COUNT = 180;
  const SPEED = 0.012;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 0.008 + 0.002,
      twinklePhase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.04,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: STAR_COUNT }, randomStar);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    stars.forEach(s => {
      s.twinklePhase += s.twinkleSpeed;
      const twinkle = Math.sin(s.twinklePhase) * 0.3;
      const op = Math.max(0.05, Math.min(0.85, s.opacity + twinkle));

      s.x += s.drift;
      if (s.x < 0) s.x = W;
      if (s.x > W) s.x = 0;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 240, ${op})`;
      ctx.fill();

      // Occasional larger star with a subtle glow
      if (s.r > 1.1) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${op * 0.08})`;
        ctx.fill();
      }
    });

    animId = requestAnimationFrame(draw);
  }

  init();
  draw(0);

  window.addEventListener('resize', () => {
    resize();
    stars = Array.from({ length: STAR_COUNT }, randomStar);
  });
})();
