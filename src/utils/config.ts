export function cls(...classnames: any[]) {
  return classnames.join(' ');
}

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
