import { kkk } from '@/api/fetchData';

export default function Mypage() {
  const loginHandler = async () => {
    // router.push('/signup');
    try {
      const res = await kkk();
      console.log(res);
      // router.push('/signup');
    } catch (e: any) {
      console.error('Error Login:', e); // 에러 메시지 수정
    }
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
