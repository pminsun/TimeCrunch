import { authorizationCodeLink } from '@/api/fetchData';
import { useRouter } from 'next/router';

export default function Mypage() {
  const router = useRouter();
  const loginHandler = async () => {
    router.push('https://api.seongsu-snack.site/oauth2/authorization/kakao');
  };

  return (
    <div className="mypage_container">
      <p># MY PAGE</p>
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
