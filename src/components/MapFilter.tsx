import { useLikeStore, useMoodSettingStore } from '@/store/store';
import { changePlaceName, cls } from '@/utils/config';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { useState } from 'react';

export default function MapFilter({ showLike, setShowFilter, setShowLike }: any) {
  const { mood, setMod, walkTime, setWalkTime, place, setPlace } = useMoodSettingStore();
  const { likeList, setLikeList } = useLikeStore();
  const [tempMood, setTempMood] = useState(mood);
  const [tempTime, setTempTime] = useState(walkTime);
  const [tempPlace, setTempPlace] = useState(place);
  const [tempLike, setTempLike] = useState(showLike);

  const selectPlace = (placeName: string) => {
    if (place.includes(placeName)) {
      setTempPlace(tempPlace.filter((selected: string) => selected !== placeName));
    } else {
      setTempPlace([...tempPlace, placeName]);
    }
  };

  const applyFilter = () => {
    setMod(tempMood);
    setWalkTime(tempTime);
    setTempPlace(tempPlace);
    setShowLike(tempLike);
    setShowFilter(false);
  };

  return (
    <section className="mapFilter_container">
      <div
        className="close_btn"
        onClick={() => setShowFilter(false)}
      >
        <Image
          src={LocalImages.iconClose}
          alt="iconClose"
          width={30}
          height={30}
        />
      </div>
      <div className="filter_area">
        <div className="mood_area">
          <p>무드</p>
          <div>
            <ul>
              {['분위기 좋은', '조용한', '이국적인'].map((moodType: string) => (
                <li
                  key={moodType}
                  onClick={() => setTempMood(moodType)}
                  className={tempMood === moodType ? 'bg-[#ECE9E3]' : 'bg-[#726F6C]'}
                >
                  {moodType}
                </li>
              ))}
            </ul>
            <ul>
              {['힐링', '즐거운', '트렌디한'].map((moodType: string) => (
                <li
                  key={moodType}
                  onClick={() => setTempMood(moodType)}
                  className={tempMood === moodType ? 'bg-[#ECE9E3]' : 'bg-[#726F6C]'}
                >
                  {moodType}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="time_area">
          <p>도보시간</p>
          <div>
            <ul>
              {[5, 10, 15].map((time: number) => (
                <li
                  key={time}
                  onClick={() => setTempTime(time)}
                  className={tempTime === time ? 'bg-[#ECE9E3]' : 'bg-[#726F6C]'}
                >
                  {time}분
                </li>
              ))}
            </ul>
            <ul>
              {[20, 25, 30].map((time: number) => (
                <li
                  key={time}
                  onClick={() => setTempTime(time)}
                  className={tempTime === time ? 'bg-[#ECE9E3]' : 'bg-[#726F6C]'}
                >
                  {time}분
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="place_area">
          <p>장소</p>
          <div>
            <ul>
              {['카페', '산책/공원'].map((placeName: string) => (
                <li
                  key={placeName}
                  className={cls(changePlaceName(placeName))}
                  onClick={() => selectPlace(placeName)}
                >
                  <div className={cls('check', tempPlace.includes(placeName) ? 'checked' : 'noneChecked')}>
                    {tempPlace.includes(placeName) && (
                      <Image
                        src={LocalImages.iconCheck}
                        alt="iconCheck"
                        width={18}
                        height={18}
                      />
                    )}
                  </div>
                  {placeName}
                </li>
              ))}
            </ul>
            <ul>
              {['공연/전시', '편집샵/쇼핑'].map((placeName: string) => (
                <li
                  key={placeName}
                  className={cls(changePlaceName(placeName))}
                  onClick={() => selectPlace(placeName)}
                >
                  <div className={cls('check', tempPlace.includes(placeName) ? 'checked' : 'noneChecked')}>
                    {tempPlace.includes(placeName) && (
                      <Image
                        src={LocalImages.iconCheck}
                        alt="iconCheck"
                        width={18}
                        height={18}
                      />
                    )}
                  </div>
                  {placeName}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="like_area">
          <p>LIKE</p>
          <div>
            <ul>
              <li
                className="!bg-[#FFD787]"
                onClick={() => setTempLike(!tempLike)}
              >
                <div className={cls('check', tempLike ? 'checked' : 'noneChecked')}>
                  {tempLike && (
                    <Image
                      src={LocalImages.iconCheck}
                      alt="iconCheck"
                      width={18}
                      height={18}
                    />
                  )}
                </div>
                저장한
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={applyFilter}
      >
        필터 적용하기
      </button>
    </section>
  );
}
