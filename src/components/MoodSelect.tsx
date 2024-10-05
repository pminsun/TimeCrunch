import { changeMoodName, changeTime, cls } from '@/utils/config';
import Image from 'next/image';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import * as LocalImages from '@/utils/imageImports';
import { useMoodSettingStore } from '@/store/store';
import Loading from './Loading';
import { useRouter } from 'next/router';

export default function MoodSelect() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { mood, setMod, walkTime, setWalkTime, place, setPlace, setFindPlace } = useMoodSettingStore();
  const [loading, setLoading] = useState(false);
  const [rangeWalkTime, setRangeWalkTime] = useState(0);

  const selectMood = (mood: string) => {
    setMod(mood);
  };

  const max = 4;
  const min = 0;
  const selectWalkTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const timeNum = changeTime(value);
    const gradientValue = 100 / max;
    setRangeWalkTime(value);
    setWalkTime(timeNum);
    event.target.style.background = `linear-gradient(to right, #BBF0DC 0%, #BBF0DC ${gradientValue * value}%, #FFFCF8 ${gradientValue * value}%, #FFFCF8 100%)`;
  };

  const selectPlace = (placeName: string) => {
    if (place.includes(placeName)) {
      // 이미 선택된 경우, 배열에서 해당 항목 제거
      setPlace(place.filter((selected: string) => selected !== placeName));
    } else {
      // 선택되지 않은 경우, 배열에 추가
      setPlace([...place, placeName]);
    }
  };

  // 진입시 첫번째 슬라이드 시작
  useEffect(() => {
    setCurrentSlide(0);
    setMod('');
    setWalkTime(0);
    setPlace([]);
    setFindPlace(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const findPlaceLoading = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setFindPlace(true);
      router.push('/home');
    }, 2000);

    return () => clearTimeout(timer);
  };

  const clickSkip = () => {
    findPlaceLoading();
    if (walkTime === 0) {
      setWalkTime(30);
    }
  };

  const circleRef = useRef<naver.maps.Circle | null>(null);
  const mapRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    const initMap = (lat: number, lng: number, isInSeongsu: boolean) => {
      const currentLocation = new naver.maps.LatLng(lat, lng);
      // walkTime에 따른 줌 레벨 설정
      const zoomLevel = walkTime === 0 ? 17 : walkTime === 5 ? 15 : walkTime === 10 ? 14 : walkTime === 15 ? 13 : walkTime === 20 ? 13 : 11;
      const mapOptions = {
        center: currentLocation,
        zoom: zoomLevel,
      };

      const map = new naver.maps.Map('tempap', mapOptions);

      // walkTime에 따른 반경 값 설정 (400m, 800m, 1.2km, 1.6km, 2.4km)
      const radius = walkTime === 30 ? 2400 : walkTime === 5 ? 400 : walkTime === 10 ? 800 : walkTime === 15 ? 1200 : walkTime === 20 ? 1600 : 100;

      // 서클이 존재하지 않으면 새로 생성, 이미 있으면 업데이트
      if (!circleRef.current) {
        circleRef.current = new naver.maps.Circle({
          map: map,
          center: currentLocation,
          radius: currentSlide === 1 ? 100 : radius,
          strokeColor: '#FF977A',
          strokeOpacity: 1,
          strokeWeight: 1,
          fillColor: '#FEAD97',
          fillOpacity: 0.11,
        });
      } else {
        circleRef.current.setMap(map);
        circleRef.current.setCenter(currentLocation);
        circleRef.current.setRadius(radius);
      }
    };

    const loadMap = () => {
      // 성수동 중심 좌표
      const defaultLat = 37.544579;
      const defaultLng = 127.055831;

      // 성공 콜백 함수
      const success = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;

        // 성수동의 대략적인 범위 설정
        const isInSeongsu = latitude >= 37.543 && latitude <= 37.546 && longitude >= 127.054 && longitude <= 127.058;

        if (isInSeongsu) {
          initMap(latitude, longitude, isInSeongsu); // 성수동 내 위치
        } else {
          initMap(defaultLat, defaultLng, isInSeongsu); // 성수동 외 위치
        }
      };

      // 오류 콜백 함수
      const error = () => {
        initMap(defaultLat, defaultLng, false); // 오류가 발생하면 성수역 좌표로 지도 초기화
      };

      // 현재 위치 확인
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(success, error, {
          enableHighAccuracy: true, // 높은 정확도 사용
        }); // 현재 위치 요청
      } else {
        // Geolocation을 지원하지 않으면 기본 좌표 사용
        initMap(defaultLat, defaultLng, false);
      }
    };

    if (window.naver && window.naver.maps) {
      loadMap();
    } else {
      const mapScript = document.createElement('script');
      mapScript.onload = () => loadMap();
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_ID}&submodules=geocoder`;
      document.head.appendChild(mapScript);
    }
  }, [walkTime, currentSlide]);

  return (
    <>
      <section className="selectMood_container">
        <div className="stepInfo_area">
          <div className="step">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <span className={cls(currentSlide + 1 === step || currentSlide + 1 > step ? 'bg-[#FF8C6D]' : 'colorBg')}>
                  {currentSlide + 1 > step ? (
                    <Image
                      src={LocalImages.iconCheck}
                      alt="iconCheck"
                      width={20}
                      height={20}
                    />
                  ) : (
                    step
                  )}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <Slider
          ref={sliderRef}
          {...sliderSettings}
        >
          <div className="select_content">
            <p className="top_ment">
              SeongSu님이 원하는 공간의
              <br /> 무드를 <span>1개</span> 골라보세요
            </p>
            <div className="select_area">
              <div className="mood_area">
                {['분위기 좋은', '조용한', '이국적인', '힐링', '즐거운', '트렌디한'].map((item, index) => (
                  <div
                    key={item}
                    className={cls('mood_box', changeMoodName(item), mood === item ? 'on' : '')}
                    onClick={() => selectMood(item)}
                  >
                    <div className="img_area">
                      {changeMoodName(item) === 'good' && (
                        <Image
                          src={LocalImages.moodGood}
                          alt="moodGood"
                          width={160}
                          height={101}
                        />
                      )}
                      {changeMoodName(item) === 'quiet' && (
                        <Image
                          src={LocalImages.moodQuiet}
                          alt="moodQuiet"
                          width={160}
                          height={101}
                        />
                      )}
                      {changeMoodName(item) === 'exotic' && (
                        <Image
                          src={LocalImages.moodExotic}
                          alt="moodExotic"
                          width={160}
                          height={101}
                        />
                      )}
                      {changeMoodName(item) === 'joy' && (
                        <Image
                          src={LocalImages.moodJoy}
                          alt="moodJoy"
                          width={160}
                          height={101}
                        />
                      )}
                      {changeMoodName(item) === 'healing' && (
                        <Image
                          src={LocalImages.moodHealing}
                          alt="moodHealing"
                          width={160}
                          height={101}
                        />
                      )}
                      {changeMoodName(item) === 'trendy' && (
                        <Image
                          src={LocalImages.moodTrandy}
                          alt="moodTrandy"
                          width={160}
                          height={101}
                        />
                      )}
                    </div>
                    <p>{item}</p>
                    <div className={cls('check', mood === item ? 'bg-[#FFD787]' : 'bg-[#726F6C]')}>
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
                className="stepBottom_btn"
              >
                <p className={cls('next', mood === '' ? 'bg-[#CFCCC8]' : 'bg-[#FDB8A5]')}>다음</p>
              </div>
            </div>
          </div>
          <div className="select_content">
            <p className="top_ment">도보로 몇 분 걸을 수 있나요? </p>
            <div className="select_area">
              <div
                className="tempMap_area"
                id="tempap"
              ></div>
              <div className="time_area">
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={rangeWalkTime}
                  onChange={selectWalkTime}
                  step="1"
                  style={{ background: `linear-gradient(to right, #BBF0DC 0%, #BBF0DC ${rangeWalkTime * (100 / max)}%, #FFFCF8 ${rangeWalkTime * (100 / max)}%, #FFFCF8 100%)` }}
                />
                <div className="time_display">
                  <span>0분</span>
                  <span>5분</span>
                  <span>10분</span>
                  <span>20분</span>
                  <span>30분</span>
                </div>
              </div>
              <div className="stepBottom_btn">
                <div
                  className="skip"
                  onClick={clickSkip}
                >
                  SKIP
                </div>
                <div
                  onClick={() => {
                    if (walkTime !== 0) {
                      setCurrentSlide(2);
                      sliderRef.current.slickGoTo(2);
                    }
                  }}
                  className="next_btn"
                >
                  <p className={cls('next', walkTime === 0 ? 'bg-[#CFCCC8]' : 'bg-[#FDB8A5]')}>다음</p>
                </div>
              </div>
            </div>
          </div>
          <div className="select_content">
            <p className="top_ment">어떤 공간에 가고 싶으세요?</p>
            <div className="select_area">
              <div className="place_area">
                {['카페', '공연/전시', '산책/공원', '편집샵/쇼핑'].map((placeItem) => (
                  <div
                    className={cls('place_box', place.includes(placeItem) ? 'selectBox' : 'noneSelectBox')}
                    key={placeItem}
                    onClick={() => selectPlace(placeItem)}
                  >
                    <div className={cls('check', place.includes(placeItem) ? 'checked' : '')}>
                      {place.includes(placeItem) && (
                        <Image
                          src={LocalImages.iconCheck}
                          alt="iconCheck"
                          width={20}
                          height={20}
                        />
                      )}
                    </div>
                    <div className="place">
                      <div>
                        {placeItem === '카페' ? (
                          <Image
                            src={LocalImages.placeCafe}
                            alt="placeCafe"
                            width={40}
                            height={40}
                          />
                        ) : placeItem === '공연/전시' ? (
                          <Image
                            src={LocalImages.placeArt}
                            alt="placeArt"
                            width={40}
                            height={40}
                          />
                        ) : placeItem === '편집샵/쇼핑' ? (
                          <Image
                            src={LocalImages.placeShop}
                            alt="placeShop"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <Image
                            src={LocalImages.placeTree}
                            alt="placeTree"
                            width={40}
                            height={40}
                          />
                        )}
                      </div>
                      <p>{placeItem}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="stepBottom_btn">
                <div
                  className="skip"
                  onClick={clickSkip}
                >
                  SKIP
                </div>
                <div
                  onClick={() => {
                    if (place.length !== 0) {
                      findPlaceLoading();
                    }
                  }}
                  className="next_btn"
                >
                  <p className={cls('next', place.length === 0 ? 'bg-[#CFCCC8]' : 'bg-[#FDB8A5]')}>추천받기</p>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </section>
      {loading && <Loading />}
    </>
  );
}
