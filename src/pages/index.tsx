import Link from 'next/link';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { authorizationCodeLink, fetchKakaoLogOut, kkk } from '@/api/fetchData';
import { useUserStore } from '@/store/store';
import Slider from 'react-slick';
import { cls } from '@/utils/config';

export default function Home() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const { accessToken, clearUser } = useUserStore();
  const [currentOnBoradingSlide, setCurrentOnBoradingSlide] = useState(0);

  useEffect(() => {
    // 2초 후 splash 화면을 숨기고 login 화면을 보이도록 설정
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  const sliderOnBoradingRef: any = useRef(null);
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipe: false,
    beforeChange: (current: any, next: SetStateAction<number>) => {
      setCurrentOnBoradingSlide(next);
    },
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
          <p>5P_PLANX</p>
        </section>
      ) : (
        <React.Fragment>
          <div className="dot_area">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className={cls('dot', currentOnBoradingSlide === dot ? 'on' : 'none')}
              ></div>
            ))}
          </div>
          <Slider
            ref={sliderOnBoradingRef}
            {...sliderSettings}
          >
            <section className="onBoaring_area">
              <div className="top_box">
                <p>당신의 무드에 맞는 장소</p>
                <div>
                  <Image
                    src={LocalImages.onBoardingOne}
                    alt="onBoardingOne"
                    width={205}
                    height={344}
                  />
                </div>
              </div>
              <div className="bottom_box">
                <p>
                  분위기 좋은 카페부터 트렌디한 팝업샵까지,
                  <br /> 지금 당신의 현재 무드에
                  <br /> 딱 맞는 장소를 선택해보세요
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentOnBoradingSlide(2);
                      sliderOnBoradingRef.current.slickGoTo(2);
                    }}
                  >
                    SKIP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentOnBoradingSlide(1);
                      sliderOnBoradingRef.current.slickGoTo(1);
                    }}
                  >
                    다음
                  </button>
                </div>
              </div>
            </section>
            <section className="onBoaring_area">
              <div className="top_box">
                <p>도보 30분내로 이동</p>
                <div>
                  <Image
                    src={LocalImages.onBoardingTwo}
                    alt="onBoardingTwo"
                    width={205}
                    height={344}
                  />
                </div>
              </div>
              <div className="bottom_box">
                <p>
                  준비된 스낵처럼 빠르고 쉽게, <br />
                  도보 30분 내외로 경험할 수 있는 <br />
                  모든 곳을 둘러보세요
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentOnBoradingSlide(2);
                      sliderOnBoradingRef.current.slickGoTo(2);
                    }}
                  >
                    SKIP
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentOnBoradingSlide(2);
                      sliderOnBoradingRef.current.slickGoTo(2);
                    }}
                  >
                    다음
                  </button>
                </div>
              </div>
            </section>
            <section className="onBoaring_area">
              <div className="top_box">
                <p>
                  지금, 나만의 성수 스낵을 <br /> 찾아보세요!
                </p>
                <div>
                  <Image
                    src={LocalImages.onBoardingThree}
                    alt="onBoardingThree"
                    width={205}
                    height={344}
                  />
                </div>
              </div>
              <div className="bottom_box login_area">
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
              </div>
            </section>
          </Slider>
        </React.Fragment>
      )}
    </section>
  );
}
