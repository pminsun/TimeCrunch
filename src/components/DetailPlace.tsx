import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { useLikeStore } from '@/store/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { calculateDistance, cls, getBusinessStatus } from '@/utils/config';

export default function DetailPlace({ modalContent, setShowPlace }: any) {
  const router = useRouter();
  const { likeList, setLikeList } = useLikeStore();
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.544579, lng: 127.055831 });

  const openNaverMap = (address: string) => {
    const url = `https://m.map.naver.com/search2/search.naver?query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  const [isExpanded, setIsExpanded] = useState(false); // 설명이 확장되었는지 여부

  const maxChars = 65; // 최대 글자 수 설정
  const description = modalContent.description || '';

  // 설명이 제한된 글자 수를 넘는지 확인
  const isLongDescription = description.length > maxChars;

  // "더보기" 버튼을 클릭하면 상태를 토글
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const distance = calculateDistance(currentLocation.lat, currentLocation.lng, modalContent.latitude, modalContent.longitude);
  useEffect(() => {
    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true },
      );
    }
  }, []);

  return (
    <section className={cls('detailPlace_container', router.pathname === '/map' || router.pathname === '/home' ? 'absolute' : 'sticky')}>
      <div className="btn_area">
        {router.pathname !== '/map' && (
          <Image
            onClick={() => setShowPlace(false)}
            src={LocalImages.iconBack}
            alt="iconBack"
            width={30}
            height={30}
          />
        )}
        <Image
          onClick={() => setShowPlace(false)}
          src={LocalImages.iconClose}
          alt="iconClose"
          width={30}
          height={30}
        />
      </div>
      <div className="detailContent_area">
        <div className="img_area">
          {[1, 2, 3].map((item) => (
            <div key={item}>
              <Image
                src={`/images/place/${modalContent.name}_${item}.jpg`}
                width={151}
                height={151}
                alt="imgFirst"
              />
            </div>
          ))}
        </div>
        <div className="info_area">
          <div className="left">
            <p className="place_name">{modalContent.name}</p>
            <div>
              <p>{Math.floor(modalContent.distance) || Math.floor(distance)}m</p>
              <p>{modalContent.placeType}</p>
            </div>
            <div className="mt-[4px]">
              <p className="orange">{getBusinessStatus(modalContent.hours)}</p>
              <p>{modalContent.hours}</p>
            </div>
          </div>
          <div className="right">
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
        {modalContent.mood.map((item: string) => (
          <span
            key={item}
            className="mood"
          >
            # {item}
          </span>
        ))}
        <div className="info_detailMent">
          {isExpanded ? description : `${description.slice(0, maxChars)}`}
          {isLongDescription && <span onClick={handleToggleExpand}>{isExpanded ? '...간략히' : '...더보기'}</span>}
        </div>
        <button
          type="button"
          onClick={() => openNaverMap('서울특별시 성동구' + modalContent.address)}
        >
          네이버 지도 바로가기
        </button>
      </div>
    </section>
  );
}
