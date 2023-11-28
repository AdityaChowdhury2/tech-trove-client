import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

const LazyBackGroundImageLoader = ({ img, style, children, alt }) => {
	const [loaded, setLoaded] = useState(false);

	const handleLoad = () => {
		setLoaded(true);
	};

	return (
		<div
			style={{
				backgroundImage: `url(${img}),  linear-gradient(to right, #0267c1, rgba(255, 255, 255, 0))`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center',
				backgroundSize: 'cover',
				transition: 'filter 0.5s',
				borderRadius: '10px',
				height: '100%',
				backgroundBlendMode: 'overlay',
				...style,
				position: 'relative',
			}}
		>
			<img src={img} alt="" onLoad={handleLoad} style={{ display: 'none' }} />
			<img
				src={alt}
				alt=""
				style={{
					position: 'absolute',
					top: '0',
					left: '0',
					height: '120%',
					width: '100%',
					display: `${loaded && 'none'}`,
				}}
			/>
			<Box>{loaded && children}</Box>
		</div>
	);
};

LazyBackGroundImageLoader.propTypes = {
	children: PropTypes.node,
	style: PropTypes.object,
	img: PropTypes.string,
	alt: PropTypes.string,
};

export default LazyBackGroundImageLoader;
