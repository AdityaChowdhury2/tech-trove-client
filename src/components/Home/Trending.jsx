import { Box, Button, Container, Grid, Stack } from '@mui/material';
import SectionHeader from '../Shared/SectionHeader';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { Element } from 'react-scroll';
const trendingBackground = 'https://i.ibb.co/1JDNQNT/6b1737cf4d.jpg';

const Trending = () => {
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();
	const { data: products, refetch: refetchTrending } = useQuery({
		queryKey: ['trendingProduct'],
		queryFn: async () => {
			const response = await axiosSecure(
				'api/v1/products?sortBy=upvote_count&sortingOrder=desc'
			);
			return response.data.result;
		},
	});
	return (
		<Box
			component={Element}
			name={'trending'}
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
					paddingY: { xs: '1rem', md: '2rem' },
					backgroundBlendMode: 'color-dodge',
					mt: 5,
					backgroundAttachment: 'fixed',
				}}
			>
				<Container>
					<Grid container spacing={4}>
						{products &&
							products.map(product => (
								<Grid key={product._id} item xs={12} md={6} lg={4}>
									<ProductCard product={product} refetch={refetchTrending} />
								</Grid>
							))}
					</Grid>
					<Stack alignItems={'center'}>
						<Button
							onClick={() => navigate('products')}
							variant="contained"
							sx={{
								mt: 5,
								color: '#f5ecec',
							}}
						>
							SHOW ALL
						</Button>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
};

export default Trending;
