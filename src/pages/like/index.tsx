import { authorizationCodeLink, fetchKakaoUserInfo, kkk } from '@/api/fetchData';
import { useLikeStore } from '@/store/store';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Like() {
  const router = useRouter();
  const { likeList, setLikeList } = useLikeStore();

  const selectLike = (item: string) => {
    if (likeList.includes(item)) {
      setLikeList(likeList.filter((selected: string) => selected !== item));
    } else {
      setLikeList([...likeList, item]);
    }
  };

  // const loginHandler = async () => {
  //   router.push('https://api.seongsu-snack.site/oauth2/authorization/kakao');
  // };

  // const getCookie = (name: string) => {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop()?.split(';').shift();
  // };

  const loginHandler = async () => {
    // router.push('/signup');
    try {
      const res = await fetchKakaoUserInfo(
        'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjgwMzczNzcsImV4cCI6MTcyODA0ODE3Nywic3ViIjoic3BtMDMwOUBuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9TSUdOVVAiLCJhdXRoUHJvdmlkZXIiOiJrYWthbyJ9.3xhAgTm9eM6GoojnDqPy_j1vc6Xihz_zIjv7WSUSFn0',
      );
      console.log(res);
      // router.push('/signup');

      // 쿠키에서 accessToken 가져오기
      // const accessToken = getCookie('accessToken');
      // console.log('Access Token:', accessToken);
    } catch (e: any) {
      console.error('Error Login:', e); // 에러 메시지 수정
    }
  };

  return (
    <div className="likepage_container">
      <p>
        <Image
          src={LocalImages.markerLike}
          alt="markerLike"
          width={30}
          height={30}
          className="-mt-1"
        />
        LIKE
      </p>
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
  );
}
