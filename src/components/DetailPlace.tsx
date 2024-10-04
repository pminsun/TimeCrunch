import Image from 'next/image';
import * as LocalImages from '@/utils/imageImports';
import { useLikeStore } from '@/store/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { cls } from '@/utils/config';

export default function DetailPlace({ showPlaceType, setShowPlace }: any) {
  const router = useRouter();
  const { likeList, setLikeList } = useLikeStore();

  const openNaverMap = (address: string) => {
    const url = `https://m.map.naver.com/search2/search.naver?query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  return (
    <section className={cls('detailPlace_container', router.pathname === '/map' ? 'absolute' : 'sticky')}>
      <div className="btn_area">
        {router.pathname !== '/map' && (
          <Image
            onClick={() => setShowPlace(false)}
            src={LocalImages.iconBack}
            alt="iconBack"
            width={30}
            height={30}
          />
        )}
        <Image
          onClick={() => setShowPlace(false)}
          src={LocalImages.iconClose}
          alt="iconClose"
          width={30}
          height={30}
        />
      </div>
      <div className="detailContent_area">
        <div className="img_area">
          {[1, 2, 3, 4].map((item) => (
            <div key={item}></div>
          ))}
        </div>
        <div className="info_area">
          <div className="left">
            <p className="place_name">{showPlaceType}</p>
            <div>
              <p>200m</p>
              <p>산책/공원</p>
            </div>
            <div className="mt-[4px]">
              <p className="orange">영업 전</p>
              <p>7:00시 영업시작</p>
            </div>
          </div>
          <div className="right">
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
        <span className="mood"># 분위기좋은</span>
        <div className="info_detailMent">서울특별시 성동구 성구동 1가 15만평의 면적으로 조성된 시민공원 설명 입니다. 설명은 2줄까지...나머지 설명 2줄까지</div>
        <button
          type="button"
          onClick={() => openNaverMap('서울 성동구 서울숲2길 28-11')}
        >
          네이버 지도 바로가기
        </button>
      </div>
    </section>
  );
}
