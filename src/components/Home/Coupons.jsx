import SectionHeader from '../Shared/SectionHeader';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import CouponCard from './CouponCard';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Marquee from 'react-simple-marquee';

const Coupons = () => {
	const axiosPublic = useAxiosPublic();
	const { data: coupons, isLoading } = useQuery({
		queryKey: ['coupons'],
		queryFn: async () => {
			const response = await axiosPublic('/api/v1/coupons');
			return response.data;
		},
	});

	return (
		<Box
			component={'section'}
			sx={{
				paddingTop: 5,
				paddingBottom: 5,
				paddingX: 0,
			}}
		>
			<SectionHeader
				title={`Unlock Premium Perks Today!`}
				subTitle={
					'Ready to level up? Discover members-only deals that come with your subscription.'
				}
			/>
			<Container>
				<Grid container my={4}>
					{!isLoading && (
						<Marquee>
							{coupons
								.filter(cpn => cpn.isValid)
								.map(coupon => (
									<CouponCard key={coupon._id} coupon={coupon} />
								))}
						</Marquee>
					)}
				</Grid>
			</Container>
		</Box>
	);
};

export default Coupons;
