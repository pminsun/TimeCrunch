import { authorizationCodeLink } from '@/api/fetchData';
import { useMoodSettingStore } from '@/store/store';
import { useRouter } from 'next/router';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';
import React from 'react';
import MoodSelect from '@/components/MoodSelect';
import Link from 'next/link';

export default function Mypage() {
  const router = useRouter();
  const { setFindPlace, findPlace } = useMoodSettingStore();
  const loginHandler = async () => {
    router.push('https://api.seongsu-snack.site/oauth2/authorization/kakao');
  };

  return (
    <React.Fragment>
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
            <div className="w-full">
              <div className="top">
                <div className="userInfo">
                  <div className="userImage">
                    <Image
                      src={LocalImages.defaultProfile}
                      alt="defaultProfile"
                      width={80}
                      height={80}
                    />
                  </div>
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
                <li>
                  <Link href={'/'}>
                    <p>약관 확인</p>
                    <Image
                      src={LocalImages.iconBack}
                      alt="iconBack"
                      width={24}
                      height={24}
                    />
                  </Link>
                </li>
                <li>
                  <Link href={'/'}>
                    <p>앱 버전 1.1.1</p>
                    <Image
                      src={LocalImages.iconBack}
                      alt="iconBack"
                      width={24}
                      height={24}
                    />
                  </Link>
                </li>
                <li>
                  <Link href={'/'}>
                    <p>탈퇴하기</p>
                    <Image
                      src={LocalImages.iconBack}
                      alt="iconBack"
                      width={24}
                      height={24}
                    />
                  </Link>
                </li>
              </ul>
            </div>
            <button
              type="button"
              className="logOut"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
      {!findPlace && <MoodSelect />}
    </React.Fragment>
  );
}
