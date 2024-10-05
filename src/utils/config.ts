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
    return 15;
  } else if (time === 4) {
    return 20;
  } else if (time === 5) {
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
