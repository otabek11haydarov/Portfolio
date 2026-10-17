import { useEffect } from 'react';

/**
 * 3D Perspective Tilt and Holographic Spotlight Engine:
 * 1. Tracks cursor coordinates within the card (--cmx, --cmy)
 * 2. Dynamically calculates rotateX and rotateY (-6.5deg to +6.5deg) based on distance from center
 * 3. Applies border beam glow follow effect
 * 4. Resets card orientation smoothly on mouseleave
 */
export function useInteractiveCards() {
  useEffect(() => {
    let currentCard: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const card = target.closest<HTMLElement>('.interactive-card');

      if (currentCard && currentCard !== card) {
        currentCard.style.setProperty('--rx', '0deg');
        currentCard.style.setProperty('--ry', '0deg');
        currentCard = null;
      }

      if (!card) return;

      currentCard = card;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--cmx', `${x}px`);
      card.style.setProperty('--cmy', `${y}px`);

      // 3D Tilt calculation based on cursor offset from card center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / Math.max(centerX, 1)) * 6.5;
      const rotateX = -((y - centerY) / Math.max(centerY, 1)) * 6.5;

      card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    };

    const handleMouseLeave = () => {
      if (currentCard) {
        currentCard.style.setProperty('--rx', '0deg');
        currentCard.style.setProperty('--ry', '0deg');
        currentCard = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
      if (currentCard) {
        currentCard.style.setProperty('--rx', '0deg');
        currentCard.style.setProperty('--ry', '0deg');
      }
    };
  }, []);
}
