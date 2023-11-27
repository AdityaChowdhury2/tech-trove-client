import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Box } from '@mui/material';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

const AddCouponForm = ({ mutateCoupon }) => {
	const initialFormState = {
		code: '',
		expiryDate: new Date(),
		description: '',
		discount_amount: 0,
	};

	const [formData, setFormData] = useState(initialFormState);

	const handleOnchange = e => {
		if (e.target.name === 'discount_amount')
			setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
		else {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};
	const { code, discount_amount, description } = formData;

	const handleSubmit = e => {
		e.preventDefault();
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

		setFormData(initialFormState);
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
						value={code}
						variant="outlined"
						onChange={handleOnchange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							label="Date"
							onError={err => console.log(err)}
							minDate={new Date()}
							defaultValue={new Date()}
							onChange={newDate => {
								const isoFormat = new Date(newDate).toISOString();
								setFormData({ ...formData, expiryDate: isoFormat });
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
						value={description}
						variant="outlined"
						onChange={handleOnchange}
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
						value={discount_amount}
						onChange={handleOnchange}
					/>
				</Grid>
				<Grid item>
					<Button variant="contained" type="submit">
						{'Add coupon'}
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

AddCouponForm.propTypes = {
	mutateCoupon: PropTypes.func,
};

export default AddCouponForm;
