export function cls(...classnames: any[]) {
  return classnames.join(' ');
}

export const changeMoodName = (text: string) => {
  if (text === '분위기 좋은') {
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

export const rangeMapDistancce = (time: number) => {};
