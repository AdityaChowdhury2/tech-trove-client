import SectionHeader from '../Shared/SectionHeader';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ProductCard from './ProductCard';
import { Box } from '@mui/material';
import Loading from '../Shared/Loading';

const Featured = () => {
	const axiosPublic = useAxiosPublic();
	const { data: featuredProducts, isLoading } = useQuery({
		queryKey: ['featuredProduct'],
		queryFn: async () => {
			const response = await axiosPublic(
				'/api/v1/products?featured=true&sortBy=timestamp&sortOrder=desc'
			);
			return response.data.result;
		},
	});

	return (
		<Box
			sx={{
				backgroundImage: 'linear-gradient(to bottom, #bee7ef,#7ccede)',
				paddingTop: 5,
				paddingBottom: 5,
			}}
		>
			<Container maxWidth={'lg'} sx={{ padding: '0px' }}>
				<SectionHeader
					title={'Featured Products'}
					subTitle={
						'Discover our curated collection of featured products that stand out for their exceptional quality and innovation.'
					}
				/>
				{isLoading ? (
					<Loading />
				) : (
					<Grid container spacing={3} sx={{ marginTop: 5 }}>
						{featuredProducts &&
							featuredProducts.map(featuredProduct => (
								<Grid key={featuredProduct._id} item xs={12} md={6} xl={3}>
									<ProductCard product={featuredProduct} />
								</Grid>
							))}
					</Grid>
				)}
			</Container>
		</Box>
	);
};

export default Featured;
