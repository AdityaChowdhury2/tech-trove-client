import { Box, Container, Grid, Typography } from '@mui/material';
import Heading from '../../../components/Shared/Heading';
import AddCouponForm from '../../../components/Dashboard/Admin/AddCouponForm';
import { Helmet } from 'react-helmet-async';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AllCoupon from '../../../components/Dashboard/Admin/AllCoupon';
import { useState } from 'react';
import UpdateCouponForm from '../../../components/Dashboard/Admin/UpdateCouponForm';
import useCoupons from '../../../hooks/useCoupons';

const ManageCoupons = () => {
	const [isUpdateForm, setIsUpdateForm] = useState(false);
	const [selectedCoupon, setSelectedCoupon] = useState({});
	const axiosSecure = useAxiosSecure();
	const { coupons, refetch } = useCoupons();
	const handleUpdateForm = () => {
		setIsUpdateForm(true);
	};
	const handleSelectedCoupon = data => {
		setSelectedCoupon(data);
	};
	const { mutateAsync: mutateCoupon } = useMutation({
		mutationFn: async data => {
			const response = await axiosSecure.put(
				`/api/v1/coupons/${data.code}`,
				data
			);
			return response.data;
		},
		onSuccess: () => {
			refetch();
			setSelectedCoupon({});
			setIsUpdateForm(false);
		},
	});
	const { mutateAsync: deleteCoupon } = useMutation({
		mutationFn: async code => {
			const response = await axiosSecure.delete(`/api/v1/coupons/${code}`);
			return response.data;
		},
		onSuccess: () => {
			refetch();
		},
	});

	return (
		<div>
			<Helmet>
				<title>Admin Dashboard | Manage Coupons</title>
			</Helmet>
			<Box height={40} />
			<Heading
				title={'Coupon Management'}
				subHeading={'Organize and Monitor Discount Coupons'}
			/>
			<Container sx={{ mt: 5 }} maxWidth={'xl'}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Typography
							fontSize={18}
							fontWeight={600}
							variant="h3"
							component={'h3'}
							textAlign={'center'}
							gutterBottom
						>
							All Coupons
						</Typography>
						<AllCoupon
							handleUpdateForm={handleUpdateForm}
							selectedCoupon={selectedCoupon}
							handleSelectedCoupon={handleSelectedCoupon}
							coupons={coupons}
							deleteCoupon={deleteCoupon}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography
							fontSize={18}
							fontWeight={600}
							variant="h3"
							component={'h3'}
							textAlign={'center'}
							gutterBottom
						>
							{isUpdateForm ? 'Edit Coupon' : 'Add Coupon'}
						</Typography>
						{isUpdateForm ? (
							<UpdateCouponForm
								mutateCoupon={mutateCoupon}
								selectedCoupon={selectedCoupon}
							/>
						) : (
							<AddCouponForm mutateCoupon={mutateCoupon} />
						)}
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default ManageCoupons;
