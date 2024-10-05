import MoodSelect from '@/components/MoodSelect';
import { useLikeStore, useMoodSettingStore, useTempMoodStore, useFilterStore } from '@/store/store';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import React, { useEffect, useState } from 'react';
import { changeMoodName, calculateDistance, cls, getRandomPlaces } from '@/utils/config';
import MoodCollection from '@/components/MoodCollection';
import { seongSuData } from '../../../src/api/temData';
import DetailPlace from '@/components/DetailPlace';

export default function Home() {
  const { mood, findPlace, walkTime, setFindPlace, place } = useMoodSettingStore();
  const { tempStoreMood, setTempStoreMood, setTempStoreWalkTime, setTempStorPlace } = useTempMoodStore();
  const { likeList, setLikeList } = useLikeStore();
  const [showMoodCollection, setShowMoodCollection] = useState(false);
  const [moodCollectionType, setMoodCollectionType] = useState('');
  const { filteredData, setFilteredData } = useFilterStore();
  const [showPlace, setShowPlace] = useState(false);
  const [selectPlace, setSelectPlace] = useState({});
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.544579, lng: 127.055831 });

  const selectLike = (item: string) => {
    if (likeList.includes(item)) {
      setLikeList(likeList.filter((selected: string) => selected !== item));
    } else {
      setLikeList([...likeList, item]);
    }
  };

  const openMoodCollection = (mood: React.SetStateAction<string>) => {
    setMoodCollectionType(mood);
    setShowMoodCollection(true);
  };

  useEffect(() => {
    setTempStoreMood(mood);
    setTempStoreWalkTime(walkTime);
    setTempStorPlace(place);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterPlaces = (places: any) => {
    const filteredData: any[] = [];
    const radius = walkTime === 30 ? 2400 : walkTime === 5 ? 400 : walkTime === 10 ? 800 : walkTime === 15 ? 1200 : walkTime === 20 ? 1600 : walkTime === 25 ? 1800 : 100;

    places.forEach((place: any) => {
      const distance = calculateDistance(currentLocation.lat, currentLocation.lng, place.latitude, place.longitude); // 거리 계산

      if (distance <= radius && place.mood.includes(mood)) {
        filteredData.push(place);
      }
    });

    return filteredData;
  };

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

    // 필터링 로직
    if (currentLocation.lat && currentLocation.lng) {
      let filtered: any[] = [];

      // 카테고리별 필터링
      if (place.includes('카페')) {
        filtered = [...filtered, ...filterPlaces(seongSuData.cafe)];
      }

      if (place.includes('산책/공원')) {
        filtered = [...filtered, ...filterPlaces(seongSuData.park)];
      }

      if (place.includes('공연/전시')) {
        filtered = [...filtered, ...filterPlaces(seongSuData.art)];
      }

      if (place.includes('편집샵/쇼핑')) {
        filtered = [...filtered, ...filterPlaces(seongSuData.shop)];
      }

      // 필터링된 결과 전역 상태로 저장
      setFilteredData(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood, walkTime, place, currentLocation, setFilteredData]);

  const openPlaceDetail = () => {
    setShowPlace(true);
  };

  return mood !== '' && findPlace ? (
    <section className="home_conatiner">
      <div className="top_info">
        <div className="logo">
          <Image
            src={LocalImages.logoSnak}
            alt="logoSnak"
            width={38}
            height={38}
          />
        </div>
        <p>
          SeongSu님을 위한
          <br />
          <span>{walkTime}분 이내</span>의 <span>{mood}</span> 성수스낵
        </p>
      </div>
      <div className="filterPlace_area">
        {filteredData.length === 0 ? (
          <div className="none_list_area">
            <div className="none_list">
              <Image
                src={LocalImages.markerEmpty}
                alt="markerEmpty"
                width={21}
                height={24}
              />
              <div>
                <p>추천 장소가 주변에 없어요</p>
                <p>필터 범위를 확대해 주세요</p>
              </div>
            </div>
            <button
              className="re_selectMood"
              type="button"
              onClick={() => setFindPlace(false)}
            >
              나의 <span>#성수스낵</span> 다시찾기
            </button>
          </div>
        ) : (
          <React.Fragment>
            <button
              className="re_selectMood"
              type="button"
              onClick={() => setFindPlace(false)}
            >
              나의 <span>#성수스낵</span> 다시찾기
            </button>
            <div className="randomPlace_area">
              {(filteredData.length > 4 ? getRandomPlaces(filteredData) : filteredData).map((item: any) => (
                <div
                  key={item.name}
                  className="randomPlace"
                  onClick={() => {
                    openPlaceDetail();
                    setSelectPlace(item);
                  }}
                >
                  <div className="placeImage_area">
                    <div className="like">
                      {likeList.includes(item) ? (
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
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="re_watchMood">
        <p>#무드 다시찾기</p>
        <div>
          {['분위기좋은', '조용한', '이국적인', '힐링', '즐거운', '트렌디한'].map((mood: string) => (
            <React.Fragment key={mood}>
              <div
                className={cls(changeMoodName(mood))}
                onClick={() => openMoodCollection(mood)}
              >
                # {mood}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {showMoodCollection && (
        <MoodCollection
          title={mood}
          setShowMoodCollection={setShowMoodCollection}
        />
      )}
      {showPlace && (
        <DetailPlace
          modalContent={selectPlace}
          setShowPlace={setShowPlace}
        />
      )}
    </section>
  ) : (
    <MoodSelect />
  );
}
