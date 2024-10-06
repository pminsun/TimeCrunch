import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import React, { useEffect, useState } from 'react';
import DetailPlace from './DetailPlace';
import { cls } from '@/utils/config';

export default function MoodCollection({ noneMoodFilterData, setShowMoodCollection, moodCollectionType }: any) {
  const [showPlace, setShowPlace] = useState(false);
  const [showPlaceType, setShowPlaceType] = useState(false);

  // 무드 필터링 함수
  const filteredPlaces = noneMoodFilterData.filter((place: any) => place.mood.includes(moodCollectionType));

  const openPlaceDetail = () => {
    setShowPlace(true);
  };

  return (
    <section className={cls('moodCollection_contianer')}>
      <div className="back_area">
        <Image
          src={LocalImages.iconBack}
          alt="iconBack"
          width={30}
          height={30}
          onClick={() => setShowMoodCollection(false)}
        />
      </div>
      <div className="content_area">
        <p className="title">#{moodCollectionType} 무드</p>
        <div>
          {filteredPlaces.map((item: any) => (
            <React.Fragment key={item.name}>
              <div
                className="place_area"
                onClick={openPlaceDetail}
              >
                <div className="img_area bg-[#ECE9E3] overflow-hidden">
                  <Image
                    src={`/images/place/${item.name}_1.jpg`}
                    width={151}
                    height={151}
                    alt="imgFirst"
                  />
                </div>
                <p className="place_name">{item.name}</p>
              </div>
              {showPlace && (
                <DetailPlace
                  setShowPlace={setShowPlace}
                  modalContent={item}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
