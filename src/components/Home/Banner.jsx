const banner1 = 'https://i.ibb.co/RTkJzH2/1small.jpg';
const banner2 = 'https://i.ibb.co/JCRjNdj/2small.jpg';
const banner3 = 'https://i.ibb.co/vZcVgc2/4.png';
const small1 = 'https://i.ibb.co/K7wCPdp/1-1.png';
const small2 = 'https://i.ibb.co/dcm2HxD/2-1-2.png';
const small3 = 'https://i.ibb.co/Kh2pd2T/4small.jpg';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import LazyBackGroundImageLoader from '../Shared/LazyBackGroundImageLoader';
import './Banner.css';
import 'swiper/css';
import { Button, Typography } from '@mui/material';

const Banner = () => {
	return (
		<section style={{ marginBottom: '48px' }}>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Autoplay]}
				className="mySwiper"
			>
				{/* slider 1 */}

				<SwiperSlide
					style={{
						width: '100%',
					}}
				>
					<LazyBackGroundImageLoader
						img={banner1}
						alt={small1}
						style={{
							width: '100%',
							height: 'auto',
							padding: '200px 5px',
						}}
					>
						<Typography
							variant="h1"
							fontSize={'2rem'}
							fontWeight={'600'}
							component={'h1'}
							color={'#00497a'}
						>
							Discover Trending Tech
						</Typography>
						<Typography
							variant="body1"
							component={'p'}
							maxWidth={'500px'}
							textAlign={'center'}
							marginX={'auto'}
							marginY="1rem"
							color={'#030712'}
						>
							Find the hottest and innovative tech products in one place. See
							what&apos;s trending
						</Typography>
						<Button variant="contained">Explore More</Button>
					</LazyBackGroundImageLoader>
				</SwiperSlide>
				{/* slider 2 */}
				<SwiperSlide
					style={{
						width: '100%',
					}}
				>
					<LazyBackGroundImageLoader
						img={banner2}
						alt={small2}
						style={{
							width: '100%',
							height: 'auto',
							padding: '200px 5px',
						}}
					>
						<Typography
							variant="h1"
							fontSize={'2rem'}
							fontWeight={'600'}
							component={'h1'}
							color={'#00497a'}
						>
							Submit New Products
						</Typography>
						<Typography
							variant="body1"
							component={'p'}
							maxWidth={'500px'}
							textAlign={'center'}
							marginX={'auto'}
							marginY="1rem"
							color={'#030712'}
						>
							Be the first to share a hot new product. Submit now and get
							valuable feedback.
						</Typography>
						<Button variant="contained">Explore More</Button>
					</LazyBackGroundImageLoader>
				</SwiperSlide>
				{/* slider 3 */}
				<SwiperSlide
					style={{
						width: '100%',
					}}
				>
					<LazyBackGroundImageLoader
						img={banner3}
						alt={small3}
						style={{
							width: '100%',
							height: 'auto',
							padding: '200px 5px',
						}}
					>
						<Typography
							variant="h1"
							fontSize={'2rem'}
							fontWeight={'600'}
							component={'h1'}
							color={'#00497a'}
						>
							Explore Innovation with TechTrove
						</Typography>
						<Typography
							variant="body1"
							component={'p'}
							maxWidth={'500px'}
							textAlign={'center'}
							marginX={'auto'}
							marginY="1rem"
							color={'#030712'}
						>
							Let the tech discovery community decide the best products. Make
							your vote count.
						</Typography>
						<Button variant="contained">Explore More</Button>
					</LazyBackGroundImageLoader>
				</SwiperSlide>
			</Swiper>
		</section>
	);
};

export default Banner;
