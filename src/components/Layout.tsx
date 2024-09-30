import { ReactNode, useEffect, useState } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const disableScroll = (e: TouchEvent) => {
      const mapElement = document.getElementById('map');

      // 터치 이벤트가 지도(map)에서 발생하는 경우는 기본 동작 허용
      if (mapElement && mapElement.contains(e.target as Node)) {
        return;
      }

      e.preventDefault(); // 지도 외의 터치 이벤트는 기본 동작 막기
      e.stopPropagation();
    };

    document.body?.addEventListener('touchmove', disableScroll, { passive: false });

    return () => {
      document.body?.removeEventListener('touchmove', disableScroll);
    };
  }, []);

  return <section className="mobile_layout realmobile_screen">{children}</section>;
}
