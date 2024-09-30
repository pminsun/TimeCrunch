import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <p>홈</p>
      <Link href={'/snak'}>로그인 없이 둘러보기</Link>
    </div>
  );
}
