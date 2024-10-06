import Lottie from 'react-lottie-player';
import lottieJson from '../../public/images/loading_icon.json';
import { filterPlaces } from '@/utils/config';
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

  useEffect(() => {
    // 현재 위치 가져오기
    if (navigator.geolocation) {
      const seongsuBounds = {
        north: 37.556237,
        south: 37.535148,
        east: 127.072175,
        west: 127.042945,
      };

      const isWithinSeongsu = (lat: number, lng: number) => {
        return lat <= seongsuBounds.north && lat >= seongsuBounds.south && lng <= seongsuBounds.east && lng >= seongsuBounds.west;
      };

      // 현재 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // 성수동 범위 내에 있는지 확인
            if (isWithinSeongsu(latitude, longitude)) {
              setCurrentLocation({
                lat: latitude,
                lng: longitude,
              });
            } else {
              // 성수동 범위를 벗어난 경우 성수동 기본 좌표 설정
              setCurrentLocation({
                lat: 37.544579, // defaultLat
                lng: 127.055831, // defaultLng
              });
            }
          },
          (error) => {
            console.error(error);

            // 위치 정보를 가져오지 못했을 경우에도 성수동 기본 좌표 설정
            setCurrentLocation({
              lat: 37.544579, // defaultLat
              lng: 127.055831, // defaultLng
            });
          },
          { enableHighAccuracy: true },
        );
      }
    }

    // 필터링 로직
    if (currentLocation.lat && currentLocation.lng) {
      let filtered: any[] = [];
      let noneMoodFiltered: any[] = [];

      // 카테고리별 필터링
      if (place.includes('카페')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.cafe, walkTime, currentLocation, mood);
        filtered = [...filtered, ...filteredData];
        noneMoodFiltered = [...noneMoodFiltered, ...noneMoodFilteredData];
      }

      if (place.includes('산책/공원')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.park, walkTime, currentLocation, mood);
        filtered = [...filtered, ...filteredData];
        noneMoodFiltered = [...noneMoodFiltered, ...noneMoodFilteredData];
      }

      if (place.includes('공연/전시')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.art, walkTime, currentLocation, mood);
        filtered = [...filtered, ...filteredData];
        noneMoodFiltered = [...noneMoodFiltered, ...noneMoodFilteredData];
      }

      if (place.includes('편집샵/쇼핑')) {
        const { filteredData, noneMoodFilteredData } = filterPlaces(seongSuData.shop, walkTime, currentLocation, mood);
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
