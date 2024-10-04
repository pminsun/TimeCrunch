import { authorizationCodeLink, kkk } from '@/api/fetchData';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Like() {
  const router = useRouter();
  const loginHandler = async () => {
    router.push('https://api.seongsu-snack.site/oauth2/authorization/kakao');
  };

  // const getCookie = (name: string) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop()?.split(';').shift();
  // };

  // const loginHandler = async () => {
  //   // router.push('/signup');
  //   try {
  //     const res = await kkk();
  //     console.log(res);
  //     // router.push('/signup');

  //     // 쿠키에서 accessToken 가져오기
  //     const accessToken = getCookie('accessToken');
  //     console.log('Access Token:', accessToken);
  //   } catch (e: any) {
  //     console.error('Error Login:', e); // 에러 메시지 수정
  //   }
  // };

  return (
    <div className="likepage_container">
      <p>
        <Image
          src={LocalImages.markerLike}
          alt="markerLike"
          width={30}
          height={30}
          className="-mt-1"
        />
        LIKE
      </p>
      <div className="content">
        <div className="noLogin">
          <p className="ment">
            LIKE, MY PAGE는
            <br /> 로그인 후 이용이 가능해요
          </p>
          <p
            className="kakao_login"
            onClick={loginHandler}
          >
            카카오 로그인
          </p>
        </div>
      </div>
    </div>
  );
}
