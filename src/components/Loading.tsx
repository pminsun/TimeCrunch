import Lottie from 'react-lottie-player';
import lottieJson from '../../public/images/loading_icon.json';
import { calculateDistance } from '@/utils/config';
import { useFilterStore, useMoodSettingStore, useNoneMoodFilterStore, useTempMoodStore } from '@/store/store';
import { useEffect, useState } from 'react';
import { seongSuData } from '../../src/api/temData';

export default function Loading() {
  const { mood, findPlace, walkTime, setFindPlace, place } = useMoodSettingStore();
  const { filteredData, setFilteredData } = useFilterStore();
  const { noneMoodFilterData, setNoneMoodFilterData } = useNoneMoodFilterStore();
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.544579, lng: 127.055831 });
  const { tempStoreMood, setTempStoreMood, setTempStoreWalkTime, setTempStorPlace } = useTempMoodStore();

  useEffect(() => {
    setTempStoreMood(mood);
    setTempStoreWalkTime(walkTime);
    setTempStorPlace(place);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterPlaces = (places: any) => {
    const filteredData: any[] = [];
    const noneMoodFilteredData: any[] = [];
    const radius = walkTime === 30 ? 2400 : walkTime === 5 ? 400 : walkTime === 10 ? 800 : walkTime === 15 ? 1200 : walkTime === 20 ? 1600 : walkTime === 25 ? 1800 : 100;

    places.forEach((place: any) => {
      const distance = calculateDistance(currentLocation.lat, currentLocation.lng, place.latitude, place.longitude); // 거리 계산

      if (distance <= radius && place.mood.includes(mood)) {
        filteredData.push(place);
      }

      if (distance <= radius) {
        // 무드를 제외하고 거리만 체크
        noneMoodFilteredData.push(place);
      }
    });

    return {
      filteredData,
      noneMoodFilteredData,
    };
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
      let noneMoodFiltered: any[] = [];

      // 카테고리별 필터링
      if (place.includes('카페')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.cafe);
        filtered = [...filtered, ...filteredData];
        noneMoodFiltered = [...noneMoodFiltered, ...noneMoodFilteredData];
      }

      if (place.includes('산책/공원')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.park);
        filtered = [...filtered, ...filteredData];
        noneMoodFiltered = [...noneMoodFiltered, ...noneMoodFilteredData];
      }

      if (place.includes('공연/전시')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.art);
        filtered = [...filtered, ...filteredData];
        noneMoodFiltered = [...noneMoodFiltered, ...noneMoodFilteredData];
      }

      if (place.includes('편집샵/쇼핑')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.shop);
        filtered = [...filtered, ...filteredData];
        noneMoodFiltered = [...noneMoodFiltered, ...noneMoodFilteredData];
      }

      // 필터링된 결과 전역 상태로 저장
      setFilteredData(filtered);

      // noneMoodFilteredData를 로컬 상태로 저장
      setNoneMoodFilterData(noneMoodFiltered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mood, walkTime, place, currentLocation, setFilteredData]);

  return (
    <div className="loading_container">
      <div>
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 250, height: 157 }}
        />
      </div>
    </div>
  );
}
