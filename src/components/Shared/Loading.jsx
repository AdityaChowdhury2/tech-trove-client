import loadingAnimation from '../../assets/animations/Loading_animation.json';
import Lottie from 'lottie-react';
const Loading = () => {
	return (
		<>
			<Lottie animationData={loadingAnimation} loop={true} />
		</>
	);
};

export default Loading;
