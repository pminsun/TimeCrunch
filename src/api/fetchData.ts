import axios from 'axios';

// Login
const grant_type = 'authorization_code';
const client_id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const client_secret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET;
// 인가코드 Link
export const authorizationCodeLink = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&prompt=login`;

// 액세스 토큰 요청
export const fetchKakaoAccessToken = async (code: any) => {
  const url = `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}`;

  return await axios.post(
    url,
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    },
  );
};

// 카카오 유저 정보 요청
export const fetchKakaoUserInfo = async (accessToken: any) => {
  return await axios.post(
    'https://kapi.kakao.com/v2/user/me',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
};

// 카카오 로그아웃
export const fetchKakaoLogOut = async (accessToken: any) => {
  return await axios({
    method: 'post',
    url: `https://kapi.kakao.com/v1/user/logout`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const kkk = async () => {
  return await axios({
    method: 'get',
    url: `http://211.188.48.22:8080/oauth2/authorization/kakao`,
  });
};
