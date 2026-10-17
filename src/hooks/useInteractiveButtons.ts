import { useEffect } from 'react';

/**
 * Global interactive button effects:
 * 1. Magnetic Pull & Cursor Spotlight (Radial Gradient follow)
 * 2. Diagonal Shimmer Sweep on hover
 * 3. 3D Press Scale depth on click
 * 4. Ripple Wave from click origin
 * 5. Neon 8-Particle Burst explosion
 */
export function useInteractiveButtons() {
  useEffect(() => {
    let currentBtn: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const btn = target.closest<HTMLElement>('button, a.btn-interactive, .btn-interactive');

      if (currentBtn && currentBtn !== btn) {
        currentBtn.style.setProperty('--tx', '0px');
        currentBtn.style.setProperty('--ty', '0px');
        currentBtn = null;
      }

      if (!btn) return;

      currentBtn = btn;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      btn.style.setProperty('--mx', `${x}px`);
      btn.style.setProperty('--my', `${y}px`);

      // Magnetic pull (markazdan og'ish)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = ((x - centerX) / Math.max(centerX, 1)) * 4.5;
      const deltaY = ((y - centerY) / Math.max(centerY, 1)) * 3.5;

      btn.style.setProperty('--tx', `${deltaX.toFixed(2)}px`);
      btn.style.setProperty('--ty', `${deltaY.toFixed(2)}px`);
    };

    const handleMouseLeave = () => {
      if (currentBtn) {
        currentBtn.style.setProperty('--tx', '0px');
        currentBtn.style.setProperty('--ty', '0px');
        currentBtn = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const btn = target.closest<HTMLElement>('button, a.btn-interactive, .btn-interactive');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const clickX = e.clientX ? e.clientX - rect.left : rect.width / 2;
      const clickY = e.clientY ? e.clientY - rect.top : rect.height / 2;

      // 1. Ripple to'lqini
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.3;
      ripple.className = 'btn-ripple-wave';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${clickX}px`;
      ripple.style.top = `${clickY}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 680);

      // 2. 8 ta Neon zarracha portlashi (Particle Burst)
      if (e.clientX && e.clientY) {
        const palette = ['#38bdf8', '#818cf8', '#c084fc', '#34d399', '#fbbf24'];
        for (let i = 0; i < 8; i++) {
          const p = document.createElement('span');
          p.className = 'btn-burst-particle';
          const angle = (Math.PI * 2 * i) / 8 + (Math.random() * 0.4 - 0.2);
          const dist = 26 + Math.random() * 28;
          p.style.left = `${e.clientX}px`;
          p.style.top = `${e.clientY}px`;
          p.style.backgroundColor = palette[i % palette.length];
          p.style.boxShadow = `0 0 10px ${palette[i % palette.length]}`;
          p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
          p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
          document.body.appendChild(p);
          setTimeout(() => p.remove(), 660);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      if (currentBtn) {
        currentBtn.style.setProperty('--tx', '0px');
        currentBtn.style.setProperty('--ty', '0px');
      }
    };
  }, []);
}
