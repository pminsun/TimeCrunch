import MoodSelect from '@/components/MoodSelect';
import { useLikeStore, useMoodSettingStore, useTempMoodStore, useFilterStore, useNoneMoodFilterStore } from '@/store/store';
import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import React, { useEffect, useState } from 'react';
import { changeMoodName, calculateDistance, cls, getRandomPlaces } from '@/utils/config';
import MoodCollection from '@/components/MoodCollection';
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
  const { noneMoodFilterData, setNoneMoodFilterData } = useNoneMoodFilterStore();

  const selectLike = (item: string) => {
    if (likeList.includes(item)) {
      setLikeList(likeList.filter((selected: string) => selected !== item));
    } else {
      setLikeList([...likeList, item]);
    }
  };

  const openMoodCollection = (moodType: React.SetStateAction<string>) => {
    setMoodCollectionType(moodType);
    setShowMoodCollection(true);
  };

  useEffect(() => {
    setTempStoreMood(mood);
    setTempStoreWalkTime(walkTime);
    setTempStorPlace(place);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData]);

  const openPlaceDetail = (item: any) => {
    setShowPlace(true);
    setSelectPlace(item);
  };

  return tempStoreMood && findPlace ? (
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
                  onClick={() => openPlaceDetail(item)}
                >
                  <div className="placeImage_area">
                    <Image
                      src={`/images/place/${item.name}_1.jpg`}
                      width={160}
                      height={160}
                      alt="imgFirst"
                    />
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
          {['분위기좋은', '조용한', '이국적인', '힐링', '즐거운', '트렌디한'].map((moodType: string) => (
            <React.Fragment key={moodType}>
              <div
                className={cls(changeMoodName(moodType))}
                onClick={() => openMoodCollection(moodType)}
              >
                # {moodType}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {showMoodCollection && (
        <MoodCollection
          moodCollectionType={moodCollectionType}
          setShowMoodCollection={setShowMoodCollection}
          noneMoodFilterData={noneMoodFilterData}
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
