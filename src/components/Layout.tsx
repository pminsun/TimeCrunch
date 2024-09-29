import { ReactNode, useEffect, useState } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const disableScroll = () => {
      document.body?.addEventListener('touchmove', removeEvent, { passive: false });
    };

    const removeEvent = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    disableScroll();
  }, []);

  return <section className="mobile_layout realmobile_screen">{children}</section>;
}
