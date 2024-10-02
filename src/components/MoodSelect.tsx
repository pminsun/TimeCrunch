import Slider from 'react-slick';

export default function MoodSelect() {
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
    <section className="selectMood_container">
      <div className="stepInfo_area">
        <div className="step">
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
        <div className="skip">SKIP</div>
      </div>
      <Slider {...sliderSettings}>
        <div className="select_content">
          <p className="top_ment">
            SeongSu님이 원하는 공간의
            <br /> 무드를 골라보세요
          </p>
          <div className="select_area">
            <div className="mood_area">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={item}
                  className="mood_box"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="select_content">
          <p className="top_ment">남는시간은 얼마나 있나요?</p>
          <div className="select_area"></div>
        </div>
        <div className="select_content">
          <p className="top_ment">어떤 공간에 가고 싶으세요?</p>
          <div className="select_area"></div>
        </div>
      </Slider>
    </section>
  );
}
