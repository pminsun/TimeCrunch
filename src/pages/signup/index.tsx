import { authorizationCodeLink } from '@/api/fetchData';
import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';

export default function SignUp() {
  const router = useRouter();
  const [userNickName, setUserNickName] = useState('');

  const writeNickName = (e: { target: { value: SetStateAction<string> } }) => {
    setUserNickName(e.target.value);
  };

  // const loginHandler = () => {
  //   router.push(authorizationCodeLink);
  // };

  return (
    <div className="signUp_container">
      <div className="signNickName_area">
        <div>
          <p>반가워요! 어떻게 불러드릴까요?</p>
          <p>이미 등록된 닉네임 이에요</p>
        </div>
        <div>
          <input
            value={userNickName}
            onChange={writeNickName}
            placeholder="닉네임을 입력해주세요"
          />
        </div>
        <button type="button">중복 확인</button>
      </div>
      <div
        className="signUp_btn"
        // onClick={loginHandler}
      >
        가입하기
      </div>
    </div>
  );
}
