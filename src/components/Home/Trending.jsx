import { Box, Container } from '@mui/material';
import SectionHeader from '../Shared/SectionHeader';
import ProductCard from './ProductCard';
const trendingBackground = 'https://i.ibb.co/1JDNQNT/6b1737cf4d.jpg';

const Trending = () => {
	return (
		<section>
			<Box
				sx={{
					paddingTop: 5,
					paddingBottom: 5,
					paddingX: 0,
				}}
			>
				<SectionHeader
					title={`What's Trending in Tech`}
					subTitle={'The newest, hottest tech products ranked by our community'}
				/>
				<Box
					sx={{
						backgroundImage: `url(${trendingBackground})
                        , linear-gradient(to bottom, #bde0fe01,#a2d2ff85)`,
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						height: '600px',
						backgroundBlendMode: 'color-dodge',
						mt: 5,
						backgroundAttachment: 'fixed',
					}}
				>
					<Container>{/* <ProductCard product={} refetch={}/> */}</Container>
				</Box>
			</Box>
		</section>
	);
};

export default Trending;
