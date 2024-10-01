import Link from 'next/link';
import Slider from 'react-slick';

export default function Home() {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    // draggable: false,
    // swipe: false,
    // beforeChange: (current, next) => {
    //   if (!nextMoveBtn) {
    //     return false; // nextMoveBtn이 false일 경우 슬라이드 변경을 막음
    //   }
    //   setCurrentSlide(next);
    // },
  };

  return (
    <section className="home_container">
      <Slider {...sliderSettings}>
        <section>
          <div>
            <p>바쁜 일상 속, 성수동의</p>
            <p>숨겨진 매력을 즐기고 싶다면</p>
          </div>
          <div>성수 스낵</div>
          <div>Logo</div>
        </section>
        <section>
          <div></div>
          <div>
            <p>
              조용한 산책부터 감성적인 전시회까지,
              <br />
              지금 당신의 무드와 시간에
              <br />딱 맞는 장소를 추천해드려요.
            </p>
            <button>건너뛰기</button>
          </div>
        </section>
        <section>
          <div></div>
          <div>
            <p>
              준비된 스낵처럼 빠르고 쉽게,
              <br />
              도보 30분 내외로 경험할 수 있는 <br />
              모든 곳을 한 눈에 둘러볼 수 있어요.
            </p>
            <button>건너뛰기</button>
          </div>
        </section>
        <section>
          <p>
            성수동의 골목 구석구석, 소소한 즐거움을 <br />한 입 크기로 맛볼 수 있는 <br />
            나만의 성수스낵을 찾아보세요!
          </p>
          <div>
            <button type="button">카카오 로그인</button>
            <Link href={'/home'}>로그인 하지 않고 둘러보기</Link>
          </div>
        </section>
      </Slider>
    </section>
  );
}
