import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';

export default function BottomNavigationBar() {
  return (
    <div className="bottom_gnb">
      <ul>
        <li>
          <Link href={'/home'}>홈</Link>
        </li>
        <li>
          <Link href={'/map'}>위치보기</Link>
        </li>
        <li>
          <Link href={'/save'}>저장</Link>
        </li>
        <li>
          <Link href={'/mypage'}>마이페이지</Link>
        </li>
      </ul>
    </div>
  );
}
