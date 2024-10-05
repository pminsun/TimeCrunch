import MoodSelect from '@/components/MoodSelect';
import { useLikeStore, useMoodSettingStore, useTempMoodStore } from '@/store/store';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import React, { ReactNode, useEffect, useState } from 'react';
import { changeMoodName, cls } from '@/utils/config';
import MoodCollection from '@/components/MoodCollection';
import { seongSuData } from '../../../src/api/temData';

export default function Home() {
  const { mood, findPlace, walkTime, setFindPlace, place } = useMoodSettingStore();
  const { tempStoreMood, setTempStoreMood, setTempStoreWalkTime, setTempStorPlace } = useTempMoodStore();
  const { likeList, setLikeList } = useLikeStore();
  const [showMoodCollection, setShowMoodCollection] = useState(false);
  const [moodCollectionType, setMoodCollectionType] = useState('');

  console.log(seongSuData);

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
        {likeList.length !== 0 ? (
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
              {['1', '2', '3', '4'].map((item) => (
                <div
                  key={item}
                  className="randomPlace"
                  onClick={() => selectLike(item)}
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
                  <p>장소타이틀명은10자로</p>
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
    </section>
  ) : (
    <MoodSelect />
  );
}
