import Link from 'next/link';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 2초 후 splash 화면을 숨기고 login 화면을 보이도록 설정
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="start_container">
      {showSplash ? (
        <section className="splash_area">
          <div>
            <div className="character_area">
              <Image
                src={LocalImages.characterMain}
                alt="characterMain"
                width={211}
                height={182}
              />
            </div>
            <div>
              <Image
                src={LocalImages.TitleLogoMain}
                alt="TitleLogoMain"
                width={154}
                height={35}
              />
            </div>
          </div>
          <p>_PLANX</p>
        </section>
      ) : (
        <section className="login_area">
          <div className="ment_box">
            <p>
              남는 시간도 힙하게! <br />
              스낵처럼 즐기는 <br />
              성수 핫스팟!
            </p>
            <div>
              <Image
                src={LocalImages.TitleLogoPink}
                alt="TitleLogoPink"
                width={114}
                height={25}
              />
            </div>
          </div>
          <div className="login_box">
            <p className="kakao_login">카카오 로그인</p>
            <Link
              href={'/home'}
              className="none_login"
            >
              로그인 안하고 둘러보기
            </Link>
          </div>
        </section>
      )}
    </section>
  );
}
