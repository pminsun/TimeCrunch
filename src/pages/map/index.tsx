import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { cls, calculateDistance } from '@/utils/config';
import { useFilterStore, useLikeStore, useMoodSettingStore } from '@/store/store';
import MapFilter from '@/components/MapFilter';
import SinglePlaceModal from '@/components/SinglePlaceModal';
import { seongSuData } from '../../../src/api/temData';

export default function Map() {
  const router = useRouter();
  const [showLike, setShowLike] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { mood, setMod, walkTime, setWalkTime, place, setPlace } = useMoodSettingStore();
  const [singlePlaceInfo, setSinglePlaceInfo] = useState(false);
  const { filteredData, setFilteredData } = useFilterStore();
  const [modalContent, setModalContent] = useState({});
  const noneLikeFilter = false;
  const circleRef = useRef<naver.maps.Circle | null>(null);

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
      // walkTime에 따른 줌 레벨 설정
      const zoomLevel = walkTime === 0 ? 17 : walkTime === 5 ? 16 : walkTime === 10 ? 15 : walkTime === 15 ? 14 : walkTime === 20 ? 14 : walkTime === 25 ? 13.5 : 13;
      const mapOptions = {
        center: currentLocation,
        zoom: zoomLevel,
      };

      const defaultLat = 37.544579;
      const defaultLng = 127.055831;
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        const map = new naver.maps.Map('map', mapOptions);

        // 현재 위치 마커 생성
        if (isInSeongsu) {
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
        } else {
          // 성수동 외부일 때 성수역 마커 표시
          const defaultLocationMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng(defaultLat, defaultLng),
            map: map,
            title: '성수역',
            clickable: true,
            icon: {
              url: '/images/marker_seongsu.svg',
              size: new naver.maps.Size(43, 53),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(21.5, 53),
            },
          });
        }

        // 반경 100m 서클 생성
        // walkTime에 따른 반경 값 설정 (400m, 800m, 1.2km, 1.6km, 2.4km)
        // walkTime에 따른 반경 값 설정
        const radius = walkTime === 30 ? 2400 : walkTime === 5 ? 400 : walkTime === 10 ? 800 : walkTime === 15 ? 1200 : walkTime === 20 ? 1600 : walkTime === 25 ? 1800 : 100;
        // 서클 객체가 없으면 생성, 있으면 업데이트
        if (!circleRef.current) {
          circleRef.current = new naver.maps.Circle({
            map: map,
            center: currentLocation,
            radius: radius,
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

        // InfoWindow 생성 (마커 클릭 시 표시될 정보 창)
        const infoWindow = new naver.maps.InfoWindow({
          content: '', // 내용은 빈 상태로 초기화
        });

        // 지도 클릭 이벤트 - 빈 공간 클릭 시 placeInfo_area 닫기
        naver.maps.Event.addListener(map, 'click', () => {
          setSinglePlaceInfo(false); // 지도를 클릭하면 placeInfo_area가 닫힘
        });

        // 마커 생성 함수
        const createMarkers = (places: any, iconUrl: any) => {
          const newFilteredData: any[] = [];
          places.forEach((place: any) => {
            const distance = calculateDistance(lat, lng, place.latitude, place.longitude); // 거리 계산

            if (distance <= radius && place.mood.includes(mood)) {
              newFilteredData.push(place);
              const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(place.latitude, place.longitude),
                map: map,
                title: place.name,
                clickable: true,
                icon: {
                  url: iconUrl,
                  size: new naver.maps.Size(34, 42),
                  origin: new naver.maps.Point(0, 0),
                  anchor: new naver.maps.Point(17, 42),
                },
              });

              naver.maps.Event.addListener(marker, 'click', () => {
                setModalContent({
                  name: place.name,
                  address: place.address,
                  description: place.description,
                  hours: place.hours,
                  distance: distance,
                  placeType: place.placeType,
                  mood: place.mood,
                  submood: place.submood,
                });
                setSinglePlaceInfo(true);
              });
            }
          });
          setFilteredData(newFilteredData);
        };

        // 카테고리별로 마커 생성
        if (place.includes('카페')) {
          createMarkers(seongSuData.cafe, '/images/marker_cafe_two.svg');
        }

        if (place.includes('산책/공원')) {
          createMarkers(seongSuData.park, '/images/marker_tree_two.svg');
        }

        if (place.includes('공연/전시')) {
          createMarkers(seongSuData.art, '/images/marker_art_two.svg');
        }

        if (place.includes('편집샵/쇼핑')) {
          createMarkers(seongSuData.shop, '/images/marker_shop_two.svg');
        }
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
        const seongsuBounds = {
          north: 37.546,
          south: 37.543,
          east: 127.058,
          west: 127.054,
        };

        const isInSeongsu = latitude >= seongsuBounds.south && latitude <= seongsuBounds.north && longitude >= seongsuBounds.west && longitude <= seongsuBounds.east;

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
      mapScript.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_ID}&submodules=geocoder,geometry`;
      document.head.appendChild(mapScript);
    }
  }, [walkTime, place, mood]);

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
          </ul>
        </div>
        {/* <div
          onClick={() => setShowLike(!showLike)}
          className={cls('like', showLike ? 'selectLike' : 'noneSelectLike', singlePlaceInfo ? 'bottom-[254px]' : 'bottom-[15px]')}
        >
          <Image
            src={LocalImages.iconfilterLike}
            alt="iconfilterLike"
            width={20}
            height={20}
          />
        </div> */}
        <div
          id="map"
          style={{ width: '480px', height: '100%' }}
        ></div>
        {singlePlaceInfo && <SinglePlaceModal modalContent={modalContent} />}
      </div>

      {showFilter && (
        <MapFilter
          showLike={showLike}
          setShowFilter={setShowFilter}
          setShowLike={setShowLike}
          noneLikeFilter={noneLikeFilter}
        />
      )}
    </React.Fragment>
  );
}
