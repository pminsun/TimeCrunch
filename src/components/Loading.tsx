import Lottie from 'react-lottie-player';
import lottieJson from '../../public/images/loading_icon.json';

export default function Loading() {
  return (
    <div className="loading_container">
      <div>
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 250, height: 157 }}
        />
      </div>
    </div>
  );
}
