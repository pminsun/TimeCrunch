import Link from 'next/link';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { authorizationCodeLink, fetchKakaoLogOut } from '@/api/fetchData';
import { useUserStore } from '@/store/store';

export default function Home() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const { accessToken, clearUser } = useUserStore();

  useEffect(() => {
    // 2초 후 splash 화면을 숨기고 login 화면을 보이도록 설정
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loginHandler = () => {
    router.push(authorizationCodeLink);
  };

  // 카카오 로그아웃
  const kakaoLogOut = async () => {
    try {
      const res = await fetchKakaoLogOut(accessToken);
      if (res) {
        router.push('/');
        clearUser();
      }
    } catch (e: any) {
      // 이미 만료된 토큰일 경우
      if (e.response && e.response.status === 401) {
        clearUser();
        router.push('/');
      } else {
        console.error('Error LogOut:', e);
      }
    }
  };

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
                src={LocalImages.logoMain}
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
            <p
              className="kakao_login"
              onClick={loginHandler}
            >
              카카오 로그인
            </p>
            <Link
              href={'/home'}
              className="none_login"
            >
              로그인 안하고 둘러보기
            </Link>
            <button
              type="button"
              onClick={kakaoLogOut}
            >
              로그아웃
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
