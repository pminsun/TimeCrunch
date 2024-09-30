import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

export default function BottomNavigationBar() {
  return (
    <div className="bottom_gnb">
      <ul>
        <li>
          <Link href={'/snak'}>홈</Link>
        </li>
        <li>
          <Link href={'/snak'}>저장</Link>
        </li>
        <li>
          <Link href={'/map'}>맵</Link>
        </li>
        <li>
          <Link href={'/snak'}>로그인</Link>
        </li>
      </ul>
    </div>
  );
}
