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
	const {
		data: featuredProducts,
		isLoading,
		refetch: refetchFeaturedProducts,
	} = useQuery({
		queryKey: ['featuredProducts'],
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
				backgroundImage: 'linear-gradient(to bottom, #bee7ef15,#7ccede88)',
				paddingTop: 5,
				paddingBottom: 5,
			}}
		>
			<Container maxWidth={'lg'} sx={{ padding: '0px' }}>
				<SectionHeader
					title={'Hot Off the Press'}
					subTitle={
						'We bring you an exclusive sneak-peak at the latest product drops before anyone else'
					}
				/>
				{isLoading ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Loading />
					</div>
				) : (
					<Grid container spacing={3} sx={{ marginTop: 5 }}>
						{featuredProducts &&
							featuredProducts.map(featuredProduct => (
								<Grid key={featuredProduct._id} item xs={12} md={6} xl={3}>
									<ProductCard
										product={featuredProduct}
										refetch={refetchFeaturedProducts}
									/>
								</Grid>
							))}
					</Grid>
				)}
			</Container>
		</Box>
	);
};

export default Featured;
