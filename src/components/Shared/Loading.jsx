import loadingAnimation from '../../assets/animations/Loading_animation.json';
import Lottie from 'lottie-react';
import { Box } from '@mui/material';

const Loading = () => {
	return (
		<Box
			style={{
				display: 'flex',
				alignItems: 'center',
				height: '50vh',
				justifyContent: 'center',
			}}
		>
			<Lottie animationData={loadingAnimation} loop={true} />
		</Box>
	);
};

export default Loading;
