import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import React, { useState } from 'react';
import DetailPlace from './DetailPlace';
import { useLikeStore, useMoodSettingStore } from '@/store/store';
import { getBusinessStatus } from '@/utils/config';

export default function SinglePlaceModal({ modalContent }: any) {
  const [showPlace, setShowPlace] = useState(false);
  const { likeList, setLikeList } = useLikeStore();
  const { mood } = useMoodSettingStore();

  const openPlaceDetail = (placeName: any) => {
    setShowPlace(true);
  };

  return (
    <React.Fragment>
      <div className="placeInfo_area">
        <div className="bar"></div>
        <div
          className="placeInfo_box"
          onClick={() => openPlaceDetail(modalContent.address)}
        >
          <div className="info_area">
            <div className="left">
              <p className="place_name">{modalContent.name}</p>
              <div>
                <p>{Math.floor(modalContent.distance)}m</p>
                <p>{modalContent.placeType}</p>
              </div>
              <div className="mt-[4px]">
                <p className="orange">{getBusinessStatus(modalContent.hours)}</p>
                <p>{modalContent.hours}</p>
              </div>
            </div>
            <div className="right">
              <div className="mood"># {mood}</div>
              <div className="mb-1">
                {likeList.includes('임시') ? (
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
          </div>
          <div className="img_area">
            {[1, 2, 3].map((img) => (
              <div key={img}></div>
            ))}
          </div>
        </div>
      </div>
      {showPlace && (
        <DetailPlace
          modalContent={modalContent}
          setShowPlace={setShowPlace}
        />
      )}
    </React.Fragment>
  );
}
