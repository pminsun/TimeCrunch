import { useEffect } from 'react';

const temData = [
  {
    name: '밤부 베이커리&브루잉 서래',
    address: '서울특별시 서초구 방배본동 동광로 77',
    lat: 37.493183,
    lng: 126.990864,
  },
  {
    name: '사이카페',
    address: '서울특별시 서초구 방배동 번지 1층 17-15',
    lat: 37.494806,
    lng: 126.989971,
  },
];

export default function Map() {
  useEffect(() => {
    const initMap = (lat: number, lng: number) => {
      const currentLocation = new naver.maps.LatLng(lat, lng);
      const mapOptions = {
        center: currentLocation,
        zoom: 15,
      };

      const map = new naver.maps.Map('map', mapOptions);

      // 현재 위치 마커 생성
      const currentLocationMarker = new naver.maps.Marker({
        position: currentLocation,
        map: map, // 지도의 마커로 추가
        title: '현재 위치', // 마커에 마우스를 올렸을 때 표시될 제목
      });

      temData.forEach((place) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(place.lat, place.lng),
          map: map,
          title: place.name,
        });
      });
    };

    const loadMap = () => {
      // 우선 기본 중심을 성수역 좌표로 설정
      const defaultLat = 37.544579;
      const defaultLng = 127.055831;

      // 성공 콜백 함수
      const success = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        initMap(latitude, longitude); // 현재 위치를 중심으로 지도 초기화
      };

      // 오류 콜백 함수
      const error = () => {
        initMap(defaultLat, defaultLng); // 오류가 발생하면 성수역 좌표로 지도 초기화
      };

      // 현재 위치 확인
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(success, error, {
          enableHighAccuracy: true, // 높은 정확도 사용
        }); // 현재 위치 요청
      } else {
        // Geolocation을 지원하지 않으면 기본 좌표 사용
        initMap(defaultLat, defaultLng);
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

  return (
    <div className="bg-red-100 w-full h-full">
      <div
        id="map"
        style={{ width: '480px', height: '500px' }}
      ></div>
    </div>
  );
}
