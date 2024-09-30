import Link from 'next/link';

export default function Home() {
  return (
    <div className="home_container">
      <p>홈</p>
      <button type="button">카카오 로그인</button>
      <Link href={'/snak'}>로그인 없이 둘러보기</Link>
    </div>
  );
}
