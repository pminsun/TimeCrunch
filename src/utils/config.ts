export function cls(...classnames: any[]) {
  return classnames.join(' ');
}

export const changeMoodName = (text: string) => {
  if (text === '분위기좋은') {
    return 'good';
  }
  if (text === '조용한') {
    return 'quiet';
  }
  if (text === '이국적인') {
    return 'exotic';
  }
  if (text === '힐링') {
    return 'healing';
  }
  if (text === '즐거운') {
    return 'joy';
  }
  if (text === '트렌디한') {
    return 'trendy';
  }
};

export const changePlaceName = (text: string) => {
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

export const changeTime = (time: number) => {
  if (time === 1) {
    return 5;
  } else if (time === 2) {
    return 10;
  } else if (time === 3) {
    return 20;
  } else if (time === 4) {
    return 30;
  } else {
    return 0;
  }
};

// 시간 비교 함수
export const getBusinessStatus = (hours: string) => {
  const currentTime = new Date(); // 현재 시간
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  if (!hours || hours === '24시간') {
    return '상시 개방'; // 24시간인 경우
  }

  // '11:00 - 22:00' 형식에서 영업 시작과 종료 시간 추출
  const [openTime, closeTime] = hours.split(' - ');

  const [openHour, openMinute] = openTime.split(':').map(Number); // 시작 시간
  const [closeHour, closeMinute] = closeTime.split(':').map(Number); // 종료 시간

  // 현재 시간이 영업 시작 시간보다 이전이면 "영업 전"
  if (currentHours < openHour || (currentHours === openHour && currentMinutes < openMinute)) {
    return '영업 전';
  }

  // 현재 시간이 영업 종료 시간보다 늦으면 "영업 종료"
  if (currentHours > closeHour || (currentHours === closeHour && currentMinutes > closeMinute)) {
    return '영업 종료';
  }

  // 영업 중
  return '영업 중';
};

// 하버사인 공식을 이용한 거리 계산 함수
export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const R = 6371e3; // 지구 반지름 (미터 단위)
  const toRad = (x: number) => (x * Math.PI) / 180;

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lng2 - lng1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 두 지점 사이의 거리 반환 (미터 단위)
};

// 랜덤으로 배열에서 4개의 항목을 선택하는 함수
export const getRandomPlaces = (data: any, count = 4) => {
  // 배열을 무작위로 섞은 다음, 상위 count개만 추출
  return data
    .sort(() => Math.random() - 0.5) // 무작위로 섞기
    .slice(0, count); // 상위 count개 추출
};

export const filterPlaces = (places: any, walkTime: any, currentLocation: any, mood: any) => {
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
