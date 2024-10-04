import { authorizationCodeLink, noneDuplicateNickName } from '@/api/fetchData';
import { cls } from '@/utils/config';
import { useRouter } from 'next/router';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();
  const [userArgee, setUserArgee] = useState([false, false, false]);
  const [currentLoginSlide, setCurrentLoginSlide] = useState(0);
  const [userNickName, setUserNickName] = useState('');
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);

  const writeNickName = (e: { target: { value: SetStateAction<string> } }) => {
    setUserNickName(e.target.value);
  };

  const toggleAllAgreements = () => {
    const allChecked = userArgee.every((isAgreed) => isAgreed);
    setUserArgee(allChecked ? [false, false, false] : [true, true, true]);
  };

  const toggleAgreement = (index: number) => {
    const newAgreements = [...userArgee];
    newAgreements[index] = !newAgreements[index];
    setUserArgee(newAgreements);
  };

  const sliderLoginRef: any = useRef(null);
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipe: false,
    beforeChange: (current: any, next: SetStateAction<number>) => {
      setCurrentLoginSlide(next);
    },
  };

  useEffect(() => {
    setIsDuplicate(null);
  }, []);

  const checkNickName = async () => {
    try {
      await noneDuplicateNickName(userNickName);
      setIsDuplicate(true);
    } catch (error) {
      setIsDuplicate(false);
      console.error('닉네임 확인 중 오류 발생:', error);
    }
  };

  return (
    <div className="signUp_container">
      <Slider
        ref={sliderLoginRef}
        {...sliderSettings}
      >
        <div className="agree_area">
          <p>
            성수스낵을 이용하기 전<br />
            약관 동의가 필요해요
          </p>
          <div className="agree_list">
            <div
              className="allbtn"
              onClick={toggleAllAgreements}
            >
              <div className={cls('allCheck', userArgee.every(Boolean) ? 'on' : 'none')}>
                {userArgee.every(Boolean) && (
                  <Image
                    src={LocalImages.iconCheck}
                    alt="iconCheck"
                    width={20}
                    height={20}
                  />
                )}
              </div>
              <p>전체동의</p>
            </div>
            <ul>
              <li>
                <div onClick={() => toggleAgreement(0)}>
                  <div className={cls('check', userArgee[0] ? 'on' : 'none')}>
                    {userArgee[0] === true && (
                      <Image
                        src={LocalImages.iconCheck}
                        alt="iconCheck"
                        width={20}
                        height={20}
                      />
                    )}
                  </div>
                  <p>이용약관 동의(필수)</p>
                </div>
                <Link href={'/'}>
                  <Image
                    src={LocalImages.iconBack}
                    alt="iconBack"
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
              <li>
                <div onClick={() => toggleAgreement(1)}>
                  <div className={cls('check', userArgee[1] ? 'on' : 'none')}>
                    {userArgee[1] === true && (
                      <Image
                        src={LocalImages.iconCheck}
                        alt="iconCheck"
                        width={20}
                        height={20}
                      />
                    )}
                  </div>
                  <p>위치기반서비스 약관 동의(필수)</p>
                </div>
                <Link href={'/'}>
                  <Image
                    src={LocalImages.iconBack}
                    alt="iconBack"
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
              <li>
                <div onClick={() => toggleAgreement(2)}>
                  <div className={cls('check', userArgee[2] ? 'on' : 'none')}>
                    {userArgee[2] === true && (
                      <Image
                        src={LocalImages.iconCheck}
                        alt="iconCheck"
                        width={20}
                        height={20}
                      />
                    )}
                  </div>
                  <p>개인(위치)정보처리방침 동의(필수)</p>
                </div>
                <Link href={'/'}>
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
          <div className="stepBottom_btn">
            <div
              onClick={() => {
                if (userArgee.every(Boolean)) {
                  setCurrentLoginSlide(1);
                  sliderLoginRef.current.slickGoTo(1);
                }
              }}
              className="next_btn"
            >
              <p className={cls('next', userArgee.every(Boolean) ? 'bg-[#FDB8A5]' : 'bg-[#CFCCC8]')}>다음</p>
            </div>
          </div>
        </div>
        <div className="signNickName_area">
          <p>
            반가워요! <br />
            어떻게 불러드릴까요?
          </p>
          <div className="nickName_box">
            <div>
              <input
                value={userNickName}
                onChange={writeNickName}
                maxLength={12}
                placeholder="닉네임을 입력해주세요"
              />
            </div>
            <button
              type="button"
              onClick={() => checkNickName()}
            >
              중복 확인
            </button>
          </div>
          {isDuplicate && <p className="possible duplicateCheck">등록이 가능해요!</p>}
          {isDuplicate === false && <p className="error duplicateCheck">중복된 닉네임이에요</p>}
          <div className="stepBottom_btn">
            <div
              onClick={() => {
                if (userArgee.every(Boolean)) {
                  setCurrentLoginSlide(1);
                  sliderLoginRef.current.slickGoTo(1);
                }
              }}
              className="next_btn"
            >
              <p className={cls('next', userArgee.every(Boolean) ? 'bg-[#FDB8A5]' : 'bg-[#CFCCC8]')}>가입하기</p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
