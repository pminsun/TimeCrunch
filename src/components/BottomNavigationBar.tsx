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
          <Link href={'/space'}>공간찾기</Link>
        </li>
        <li>
          <Link href={'/map'}>위치보기</Link>
        </li>
        <li>
          <Link href={'/mypage'}>마이페이지</Link>
        </li>
      </ul>
    </div>
  );
}
