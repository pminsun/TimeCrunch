import { mOne, one, seongsuBoundary, three } from '@/utils/seongsuLocation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { cls } from '@/utils/config';
import { useLikeStore, useMoodSettingStore } from '@/store/store';

const temData = [
  {
    name: '마를리',
    address: '서울 성동구 연무장길 47 홍원빌딩',
    lat: 37.544953,
    lng: 127.058436,
  },
  {
    name: '센터커피 서울숲점',
    address: '서울 성동구 서울숲2길 28-11',
    lat: 37.544889,
    lng: 127.041935,
  },
];

/*
100m 범위: zoom 값 18
200m 범위: zoom 값 17
300m 범위: zoom 값 16
500m 범위: zoom 값 15
*/

export default function Map() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showLike, setShowLike] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { mood, setMod, walkTime, setWalkTime, place, setPlace } = useMoodSettingStore();
  const { likeList, setLikeList } = useLikeStore();

  const selectPlace = (placeName: string) => {
    if (place.includes(placeName)) {
      setPlace(place.filter((selected: string) => selected !== placeName));
    } else {
      setPlace([...place, placeName]);
    }
  };

  useEffect(() => {
    const initMap = (lat: number, lng: number, isInSeongsu: boolean) => {
      const currentLocation = new naver.maps.LatLng(lat, lng);
      const mapOptions = {
        center: currentLocation,
        zoom: 15,
      };

      const map = new naver.maps.Map('map', mapOptions);

      // 현재 위치 마커 생성
      const currentLocationMarker = new naver.maps.Marker({
        position: currentLocation,
        map: map,
        title: '현재 위치',
        clickable: true,
        icon: {
          url: '/images/marker_my.svg',
          size: new naver.maps.Size(43, 53),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(21.5, 53),
        },
      });

      // 반경 100m 서클 생성
      const circle = new naver.maps.Circle({
        map: map,
        center: currentLocation,
        radius: 100, // 반경 100m
        strokeColor: '#FF977A',
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: '#FEAD97',
        fillOpacity: 0.11,
      });

      // InfoWindow 생성 (마커 클릭 시 표시될 정보 창)
      const infoWindow = new naver.maps.InfoWindow({
        content: '', // 내용은 빈 상태로 초기화
      });

      temData.forEach((place) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(place.lat, place.lng),
          map: map,
          title: place.name,
          clickable: true,
        });

        // 마커 클릭 이벤트
        naver.maps.Event.addListener(marker, 'click', () => {
          const content = `
            <div style="padding:10px;">
              <h4>${place.name}</h4>
              <p>${place.address}</p>
            </div>
          `;

          // InfoWindow에 내용 설정 후 해당 마커 위치에 표시
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        });
      });
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
  }, []);

  const changeName = (text: string) => {
    if (text === '공연/전시') {
      return 'art';
    }
    if (text === '편집샵/쇼핑') {
      return 'shop';
    }
    if (text === '카페') {
      return 'cafe';
    }
    if (text === '산책/공원') {
      return 'park';
    }
  };

  return (
    <React.Fragment>
      <div className="map_container">
        <div className="filter_area">
          <ul>
            <li
              onClick={() => setShowFilter(true)}
              className="bg-[#FFFFFF]"
            >
              <span>{mood}</span>, <span>{walkTime}</span>분이내
              <Image
                src={LocalImages.iconDropArrow}
                alt="iconDropArrow"
                width={20}
                height={20}
              />
            </li>
            <li
              onClick={() => selectPlace('카페')}
              className={cls(place.includes('카페') ? 'selectCafe' : 'noneSelectCafe')}
            >
              카페
            </li>
            <li
              onClick={() => selectPlace('공연/전시')}
              className={cls(place.includes('공연/전시') ? 'selectArt' : 'noneSelectArt')}
            >
              공연/전시
            </li>
            <li
              onClick={() => selectPlace('산책/공원')}
              className={cls(place.includes('산책/공원') ? 'selectTree' : 'noneSelectTree')}
            >
              산책/공원
            </li>
            <li
              onClick={() => selectPlace('편집샵/쇼핑')}
              className={cls(place.includes('편집샵/쇼핑') ? 'selectTree' : 'noneSelectTree')}
            >
              편집샵/쇼핑
            </li>
            <li
              onClick={() => setShowLike(!showLike)}
              className={cls('like', showLike ? 'selectLike' : 'noneSelectLike')}
            >
              <Image
                src={LocalImages.iconfilterLike}
                alt="iconfilterLike"
                width={20}
                height={20}
              />
            </li>
          </ul>
        </div>
        <div
          id="map"
          style={{ width: '480px', height: '100%' }}
        ></div>
        <div className="placeInfo_area">
          <div className="bar"></div>
          <div className="placeInfo_box">
            <div className="info_area">
              <div className="left">
                <p className="place_name">서울숲글자수는글자수여기</p>
                <div>
                  <p>200m</p>
                  <p>산책/공원</p>
                </div>
                <div className="mt-[4px]">
                  <p className="orange">영업 전</p>
                  <p>7:00시 영업시작</p>
                </div>
              </div>
              <div className="right">
                <div className="mood"># 조용한</div>
                <div className="mb-1">
                  {likeList.includes('임시') ? (
                    <Image
                      src={LocalImages.iconFillStar}
                      alt="iconEmptyStar"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      src={LocalImages.iconEmptyStar}
                      alt="iconEmptyStar"
                      width={24}
                      height={24}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="img_area">
              {[1, 2, 3].map((img) => (
                <div key={img}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showFilter && (
        <section className="mapFilter_container">
          <div
            className="close_btn"
            onClick={() => setShowFilter(false)}
          >
            <Image
              src={LocalImages.iconClose}
              alt="iconClose"
              width={30}
              height={30}
            />
          </div>
          <div className="filter_area">
            <div className="mood_area">
              <p>무드</p>
              <div>
                <ul>
                  {['분위기 좋은', '조용한', '이국적인'].map((moodType: string) => (
                    <li
                      key={moodType}
                      onClick={() => setMod(moodType)}
                      className={mood === moodType ? 'bg-[#ECE9E3]' : 'bg-[#726F6C]'}
                    >
                      {moodType}
                    </li>
                  ))}
                </ul>
                <ul>
                  {['힐링', '즐거운', '트렌디한'].map((moodType: string) => (
                    <li
                      key={moodType}
                      onClick={() => setMod(moodType)}
                      className={mood === moodType ? 'bg-[#ECE9E3]' : 'bg-[#726F6C]'}
                    >
                      {moodType}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="time_area">
              <p>도보시간</p>
              <div>
                <ul>
                  {[5, 10, 15].map((time: number) => (
                    <li
                      key={time}
                      onClick={() => setWalkTime(time)}
                      className={walkTime === time ? 'bg-[#ECE9E3]' : 'bg-[#726F6C]'}
                    >
                      {time}분
                    </li>
                  ))}
                </ul>
                <ul>
                  {[20, 25, 30].map((time: number) => (
                    <li
                      key={time}
                      onClick={() => setWalkTime(time)}
                      className={walkTime === time ? 'bg-[#ECE9E3]' : 'bg-[#726F6C]'}
                    >
                      {time}분
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="place_area">
              <p>장소</p>
              <div>
                <ul>
                  {['카페', '산책/공원'].map((placeName: string) => (
                    <li
                      key={placeName}
                      className={cls(changeName(placeName))}
                      onClick={() => selectPlace(placeName)}
                    >
                      <div className={cls('check', place.includes(placeName) ? 'checked' : 'noneChecked')}>
                        {place.includes(placeName) && (
                          <Image
                            src={LocalImages.iconCheck}
                            alt="iconCheck"
                            width={18}
                            height={18}
                          />
                        )}
                      </div>
                      {placeName}
                    </li>
                  ))}
                </ul>
                <ul>
                  {['공연/전시', '편집샵/쇼핑'].map((placeName: string) => (
                    <li
                      key={placeName}
                      className={cls(changeName(placeName))}
                      onClick={() => selectPlace(placeName)}
                    >
                      <div className={cls('check', place.includes(placeName) ? 'checked' : 'noneChecked')}>
                        {place.includes(placeName) && (
                          <Image
                            src={LocalImages.iconCheck}
                            alt="iconCheck"
                            width={18}
                            height={18}
                          />
                        )}
                      </div>
                      {placeName}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="like_area">
              <p>LIKE</p>
              <div>
                <ul>
                  <li
                    className="!bg-[#FFD787]"
                    onClick={() => setShowLike(!showLike)}
                  >
                    <div className={cls('check', showLike ? 'checked' : 'noneChecked')}>
                      {showLike && (
                        <Image
                          src={LocalImages.iconCheck}
                          alt="iconCheck"
                          width={18}
                          height={18}
                        />
                      )}
                    </div>
                    저장한
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowFilter(false)}
          >
            필터 적용하기
          </button>
        </section>
      )}
    </React.Fragment>
  );
}
