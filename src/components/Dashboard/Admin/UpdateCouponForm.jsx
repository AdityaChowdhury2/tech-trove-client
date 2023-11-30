import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';

const UpdateCouponForm = ({ selectedCoupon, mutateCoupon }) => {
	const [date, setDate] = useState(selectedCoupon.expiryDate);
	const handleSubmit = e => {
		e.preventDefault();
		const code = e.target.code.value;
		const expiryDate = date;
		const description = e.target.description.value;
		const discount_amount = e.target.discount_amount.value;

		const formData = { code, expiryDate, description, discount_amount };
		const addCouponPromise = mutateCoupon(formData);
		toast.promise(
			addCouponPromise,
			{
				loading: 'Loading',
				success: () => `Successfully saved `,
				error: () => `This just happened:`,
			},
			{
				success: {
					duration: 5000,
					icon: '🔥',
				},
			}
		);
	};

	return (
		<Box component={'form'} onSubmit={handleSubmit} mt={3}>
			<Grid container spacing={3} justifyContent={'center'}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="code"
						name="code"
						label="Coupon Code"
						fullWidth
						variant="outlined"
						defaultValue={selectedCoupon.code}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							label="Date"
							minDate={new Date()}
							defaultValue={new Date(date)}
							onChange={newDate => {
								const isoFormat = new Date(newDate).toISOString();
								setDate(isoFormat);
							}}
						/>
					</LocalizationProvider>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id="description"
						name="description"
						label="Description"
						fullWidth
						variant="outlined"
						defaultValue={selectedCoupon?.description}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="discount-amount"
						name="discount_amount"
						label="Discount Amount"
						fullWidth
						type="number"
						variant="outlined"
						defaultValue={selectedCoupon?.discount_amount}
					/>
				</Grid>
				<Grid item>
					<Button variant="contained" type="submit">
						Update Coupon
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

UpdateCouponForm.propTypes = {
	selectedCoupon: PropTypes.object,
	mutateCoupon: PropTypes.func,
};

export default UpdateCouponForm;
