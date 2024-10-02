import { cls } from '@/utils/config';
import Image from 'next/image';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import * as LocalImages from '@/utils/imageImports';

export default function MoodSelect() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mood, setMod] = useState('');
  const [walkTime, setWalkTime] = useState<number>(0);
  const [place, setPlace] = useState('');

  const selectMood = (mood: string) => {
    setMod(mood);
  };

  const max = 4;
  const min = 0;

  const selectWalkTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const gradientValue = 100 / max;
    setWalkTime(value);
    event.target.style.background = `linear-gradient(to right, #BBF0DC 0%, #BBF0DC ${gradientValue * value}%, #FFFCF8 ${gradientValue * value}%, #FFFCF8 100%)`;
  };

  // 진입시 첫번째 슬라이드 시작
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  const sliderRef: any = useRef(null);
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipe: false,
    beforeChange: (current: any, next: SetStateAction<number>) => {
      setCurrentSlide(next);
    },
  };

  return (
    <section className="selectMood_container">
      <div className="stepInfo_area">
        <div className="step">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <span className={cls(currentSlide + 1 === step || currentSlide + 1 > step ? 'bg-[#FF8C6D]' : 'colorBg')}>{step}</span>
            </React.Fragment>
          ))}
        </div>
        {currentSlide !== 0 && <div className="skip">SKIP</div>}
      </div>
      <Slider
        ref={sliderRef}
        {...sliderSettings}
      >
        <div className="select_content">
          <p className="top_ment">
            SeongSu님이 원하는 공간의
            <br /> 무드를 1개 골라보세요
          </p>
          <div className="select_area">
            <div className="mood_area">
              {['1', '2', '3', '4', '5', '6', '7', '8'].map((item, index) => (
                <div
                  key={item}
                  className={cls('mood_box', mood === item ? 'bg-[#A2A2A2]' : 'bg-[#D0D0D0]')}
                  onClick={() => selectMood(item)}
                >
                  {item}
                  <div className={cls('check', mood === item ? 'bg-[#FFD787]' : 'bg-[#F0EDE9]')}>
                    {mood === item && (
                      <Image
                        src={LocalImages.iconCheck}
                        alt="iconCheck"
                        width={20}
                        height={20}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              onClick={() => {
                if (mood !== '') {
                  setCurrentSlide(1);
                  sliderRef.current.slickGoTo(1);
                }
              }}
              className={cls('next_btn', mood === '' ? 'bg-[#CFCCC8]' : 'bg-[#FDB8A5]')}
            >
              <p>다음</p>
            </div>
          </div>
        </div>
        <div className="select_content">
          <p className="top_ment">도보로 몇 분 걸을 수 있나요? </p>
          <div className="select_area">
            <div className="time_area">
              <input
                type="range"
                min={min}
                max={max}
                value={walkTime}
                onChange={selectWalkTime}
                step="1"
                style={{ background: `linear-gradient(to right, #BBF0DC 0%, #BBF0DC ${walkTime * (100 / max)}%, #FFFCF8 ${walkTime * (100 / max)}%, #FFFCF8 100%)` }}
              />
              <div className="time_display">
                <span>0분</span>
                <span>5분</span>
                <span>10분</span>
                <span>20분</span>
                <span>30분</span>
              </div>
            </div>
            <div
              onClick={() => {
                if (walkTime !== 0) {
                  setCurrentSlide(2);
                  sliderRef.current.slickGoTo(2);
                }
              }}
              className={cls('next_btn', walkTime === 0 ? 'bg-[#CFCCC8]' : 'bg-[#FDB8A5]')}
            >
              <p>다음</p>
            </div>
          </div>
        </div>
        <div className="select_content">
          <p className="top_ment">어떤 공간에 가고 싶으세요?</p>
          <div className="select_area">
            <div className="place_area">
              {['카페', '공연/전시', '산책/공원'].map((place) => (
                <div key={place}>
                  <div></div>
                  <div>
                    <p>{place}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={cls('next_btn', place === '' ? 'bg-[#CFCCC8]' : 'bg-[#FDB8A5]')}>
              <p>장소 추천하기</p>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
}
