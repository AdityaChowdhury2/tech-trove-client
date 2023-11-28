import SectionHeader from '../Shared/SectionHeader';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import CouponCard from './CouponCard';

const Coupons = () => {
	// const axiosPublic = useAxiosPublic();

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
				<CouponCard coupon={'VongChong'} />
			</Container>
		</Box>
	);
};

export default Coupons;
