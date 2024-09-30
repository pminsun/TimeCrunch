import { ReactNode, useEffect, useState } from 'react';
import BottomNavigationBar from './BottomNavigationBar';
import { useRouter } from 'next/router';
import { cls } from '@/utils/config';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

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

  return (
    <section className="mobile_layout realmobile_screen">
      <div className={cls('content_container', router.pathname !== '/' ? 'h-[calc(100%-60px)]' : 'h-full')}>{children}</div>
      {router.pathname !== '/' && <BottomNavigationBar />}
    </section>
  );
}
