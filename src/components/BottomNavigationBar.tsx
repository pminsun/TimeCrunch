import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { useRouter } from 'next/router';
import { cls } from '@/utils/config';

export default function BottomNavigationBar() {
  const router = useRouter();

  return (
    <div className="bottom_gnb">
      <ul>
        <li>
          <Link href={'/home'}>
            <div className={cls(router.pathname === '/home' ? 'currnetPage' : '')}>
              <Image
                src={LocalImages.iconBottomHome}
                alt="iconBottomHome"
                width={30}
                height={30}
              />
            </div>
          </Link>
        </li>
        <li>
          <Link href={'/map'}>
            <div className={cls(router.pathname === '/map' ? 'currnetPage' : '')}>
              <Image
                src={LocalImages.iconBottomMap}
                alt="iconBottomMap"
                width={30}
                height={30}
              />
            </div>
          </Link>
        </li>
        <li>
          <Link href={'/like'}>
            <div className={cls(router.pathname === '/like' ? 'currnetPage' : '')}>
              <Image
                src={LocalImages.iconBottomLike}
                alt="iconBottomLike"
                width={30}
                height={30}
              />
            </div>
          </Link>
        </li>
        <li>
          <Link href={'/mypage'}>
            <div className={cls(router.pathname === '/mypage' ? 'currnetPage' : '')}>
              <Image
                src={LocalImages.iconBottomMypage}
                alt="iconBottomMypage"
                width={30}
                height={30}
              />
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
