import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { useEffect, useState } from 'react';
import DetailPlace from './DetailPlace';
import { cls } from '@/utils/config';

export default function MoodCollection({ title, setShowMoodCollection }: any) {
  const [showPlace, setShowPlace] = useState(false);
  const [showPlaceType, setShowPlaceType] = useState(false);

  const openPlaceDetail = (placeName: any) => {
    setShowPlace(true);
    setShowPlaceType(placeName);
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
        <p className="title">#{title}</p>
        <div>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="place_area"
              onClick={() => openPlaceDetail('장소타이틀명은10자로')}
            >
              <div className="img_area"></div>
              <p className="place_name">장소타이틀명은10자로</p>
            </div>
          ))}
        </div>
      </div>
      {showPlace && (
        <DetailPlace
          showPlaceType={showPlaceType}
          setShowPlace={setShowPlace}
        />
      )}
    </section>
  );
}
