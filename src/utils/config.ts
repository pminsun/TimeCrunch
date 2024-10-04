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
