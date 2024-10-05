import { authorizationCodeLink, kkk } from '@/api/fetchData';
import MapFilter from '@/components/MapFilter';
import { useLikeStore, useUserStore } from '@/store/store';
import * as LocalImages from '@/utils/imageImports';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Like() {
  const router = useRouter();
  const { likeList, setLikeList } = useLikeStore();
  const { setUserEmail } = useUserStore();
  const [showFilter, setShowFilter] = useState(false);
  const [showLike, setShowLike] = useState(false);
  const noneLikeFilter = false;

  const selectLike = (item: string) => {
    if (likeList.includes(item)) {
      setLikeList(likeList.filter((selected: string) => selected !== item));
    } else {
      setLikeList([...likeList, item]);
    }
  };

  const loginHandler = async () => {
    router.push('https://api.seongsu-snack.site/oauth2/authorization/kakao');
  };

  return (
    <React.Fragment>
      <div className="likepage_container">
        <div className="page_top">
          <p className="page_title">
            <Image
              src={LocalImages.markerLike}
              alt="markerLike"
              width={30}
              height={30}
              className="-mt-1"
            />
            LIKE
          </p>
          <div onClick={() => setShowFilter(true)}>
            <Image
              src={LocalImages.iconLikeCategory}
              alt="iconLikeCategory"
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className="content">
          <div className="noLogin">
            <p className="ment">
              LIKE, MY PAGE는
              <br /> 로그인 후 이용이 가능해요
            </p>
            <p
              className="kakao_login"
              onClick={loginHandler}
            >
              카카오 로그인
            </p>
          </div>
          {/* <div className="noneLike">
          <Image
            src={LocalImages.iconEmptyStar}
            alt="iconEmptyStar"
            width={30}
            height={30}
          />
          <p>아직 찜한 컨텐츠가 없어요</p>
        </div> */}
          {/* <div className="listLike">
          {['1', '2', '3', '4', '5', '6'].map((item) => (
            <div
              key={item}
              onClick={() => selectLike(item)}
            >
              <div className="img_area">
                <div className="star">
                  <Image
                    src={LocalImages.iconFillStar}
                    alt="iconEmptyStar"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="mood"># 조용한</div>
              </div>
              <p>{item}</p>
            </div>
          ))}
        </div> */}
        </div>
      </div>
      {showFilter && (
        <MapFilter
          showLike={showLike}
          setShowFilter={setShowFilter}
          setShowLike={setShowLike}
          noneLikeFilter={noneLikeFilter}
        />
      )}
    </React.Fragment>
  );
}
