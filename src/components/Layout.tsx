import { ReactNode, useEffect, useState } from 'react';
import BottomNavigationBar from './BottomNavigationBar';
import { useRouter } from 'next/router';
import { cls } from '@/utils/config';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <section className="mobile_layout realmobile_screen">
      <div className={cls('content_container', router.pathname !== '/' ? 'h-[calc(100%-60px)]' : 'h-full')}>{children}</div>
      {router.pathname !== '/' && <BottomNavigationBar />}
    </section>
  );
}
