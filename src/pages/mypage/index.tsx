import { authorizationCodeLink } from '@/api/fetchData';
import { useMoodSettingStore } from '@/store/store';
import { useRouter } from 'next/router';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';

export default function Mypage() {
  const router = useRouter();
  const { setFindPlace } = useMoodSettingStore();
  const loginHandler = async () => {
    router.push('https://api.seongsu-snack.site/oauth2/authorization/kakao');
  };

  return (
    <div className="mypage_container">
      <p># MY PAGE</p>
      <div className="content">
        {/* <div className="noLogin">
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
        </div> */}
        <div className="loggin">
          <div>
            <div className="top">
              <div className="userInfo">
                <div></div>
                <p>닉네임</p>
              </div>
              <button
                className="re_selectMood"
                type="button"
                onClick={() => setFindPlace(false)}
              >
                나의 <span>#성수스낵</span> 다시찾기
              </button>
            </div>
            <ul>
              <li>약관 확인</li>
              <li>앱 버전 1.1.1</li>
              <li>탈퇴하기</li>
            </ul>
          </div>
          <button type="button">로그아웃</button>
        </div>
      </div>
    </div>
  );
}
