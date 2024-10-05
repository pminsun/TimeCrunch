import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const KakaoCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;

    if (code) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.code, router]);

  return (
    <div className="w-full h-full flex_center">
      <h1>로그인중</h1>
    </div>
  );
};

export default KakaoCallback;
