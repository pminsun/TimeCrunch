import { authorizationCodeLink } from '@/api/fetchData';
import * as LocalImages from '@/utils/imageImports';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Like() {
  const router = useRouter();
  const loginHandler = async () => {
    const loginHandler = async () => {
      router.push(authorizationCodeLink);
    };
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
      </div>
    </div>
  );
}
