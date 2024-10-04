import { authorizationCodeLink, kkk } from '@/api/fetchData';
import { useLikeStore, useUserStore } from '@/store/store';
import * as LocalImages from '@/utils/imageImports';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Like() {
  const router = useRouter();
  const { likeList, setLikeList } = useLikeStore();
  const { setUserEmail } = useUserStore();

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

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  // const loginHandler = async () => {
  //   // router.push('/signup');
  //   try {
  //     const res = await kkk();
  //     console.log(res);
  //     // router.push('/signup');

  //     // 쿠키에서 accessToken 가져오기
  //     const accessToken = getCookie('accessToken');
  //     console.log('Access Token:', accessToken);
  //   } catch (e: any) {
  //     console.error('Error Login:', e); // 에러 메시지 수정
  //   }
  // };

  const decodeToken = (token: string) => {
    try {
      return jwtDecode(token); // 토큰을 디코딩해서 페이로드 추출
    } catch (e) {
      console.error('Invalid Token:', e);
      return null;
    }
  };

  const loginHandler = async () => {
    try {
      const res = await kkk(); // 토큰을 생성하는 함수 호출
      console.log(res);

      // 쿠키에서 accessToken 가져오기
      const accessToken = getCookie('accessToken');

      if (accessToken) {
        // accessToken 디코딩
        const decodedToken = decodeToken(accessToken);
        console.log('Decoded JWT:', decodedToken);

        // 화면에 가져오고 싶은 정보 예시: 사용자 이름
        const userName = decodedToken?.sub || 'Unknown User';
        console.log('User Name:', userName);
        // 화면에 userName 표시
        setUserEmail(userName);
      } else {
        console.error('No access token found');
      }

      router.push('/signup');
    } catch (e: any) {
      console.error('Error Login:', e);
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
