import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './CheckOutFormModal.css';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import useAuth from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import useGetSubscription from '../../../hooks/useSubscription';
import TextField from '@mui/material/TextField';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingButton from '@mui/lab/LoadingButton';
import PaymentIcon from '@mui/icons-material/Payment';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'primary.50',
	border: 'none',
	boxShadow: 24,
	p: 4,
};

const CheckOutFormModal = ({ handleClose, open }) => {
	const axiosSecure = useAxiosSecure();
	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setCardError] = useState();
	const { user } = useAuth();
	const { refetch } = useGetSubscription();
	const [couponMessage, setCouponMessage] = useState('');
	const [price, setPrice] = useState(100);
	const [isCouponApplied, setIsCouponApplied] = useState(false);
	const [clientSecret, setClientSecret] = useState('');
	const [processing, setProcessing] = useState(false);

	const handleCheckCoupon = async e => {
		e.preventDefault();
		setIsCouponApplied(true);
		const code = e.target.coupon?.value;
		if (code) {
			const response = await axiosSecure(`/api/v1/coupons/${code}`);
			console.log(response.data);
			if (response.data?.valid) {
				console.log(response.data.amount);
				setPrice(100 - response.data.amount);
			} else {
				setCouponMessage(response.data.message);
				setPrice(100);
			}
		}
	};
	// TODO: Use Axios Secure instead of axios public
	const axiosPublic = useAxiosPublic();

	const { mutate: updateUserInfo } = useMutation({
		mutationFn: async data => {
			const res = await axiosPublic.put(`/api/v1/users/${user?.email}`, data);
			return res.data;
		},
		onSuccess: () => {
			refetch();
		},
	});

	useEffect(() => {
		axiosPublic
			.post('/api/v1/create-payment-intent', {
				price,
			})
			.then(response => {
				setClientSecret(response.data.clientSecret);
			});
	}, [price]);
	console.log(clientSecret);
	const handleSubmit = async event => {
		event.preventDefault();
		const toastId = toast.loading('Processing payment...');
		if (!stripe || !elements) return;
		const card = elements.getElement(CardElement);

		if (card === null) return;

		const { paymentMethod, error } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});

		if (error) {
			console.log('error', error);
			setCardError(error.message);
		} else {
			setCardError('');
			console.log('payment method', paymentMethod);
		}
		setProcessing(true);
		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						email: user?.email,
						name: user?.displayName,
					},
				},
			});

		if (confirmError) {
			console.log(confirmError);
			setCardError(confirmError.message);
			toast.error(confirmError.message, { id: toastId });
			setProcessing(false);
		}

		console.log('payment intent', paymentIntent);
		if (paymentIntent.status == 'succeeded') {
			const paymentInfo = {
				email: user?.email,
				transactionId: paymentIntent.id,
				date: new Date(),
			};
			try {
				// TODO: save payment info to the database
				const response = axiosPublic.post('/api/v1/payment', paymentInfo);
				console.log(response.data);
				// TODO: update user info subscribed true
				updateUserInfo({ subscribed: true });

				// TODO: toast
				toast.success('Payment Successful', { id: toastId });
				handleClose();

				// TODO: navigate to my profile
			} catch (err) {
				console.log(err.message);
				toast.error(err.message, { id: toastId });
			}
		}
		setProcessing(false);
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5em',
			}}
		>
			<Box sx={style}>
				<Box
					component={'form'}
					onSubmit={handleCheckCoupon}
					sx={{ marginBottom: 4 }}
				>
					<Stack direction={'row'} gap={2}>
						<TextField
							id="outlined-basic"
							label="Coupon"
							size="small"
							variant="outlined"
							name="coupon"
							onChange={() => {
								setCouponMessage('');
								setIsCouponApplied(false);
							}}
						/>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Button
								disabled={isCouponApplied}
								type="submit"
								variant="contained"
								size="small"
							>
								Apply
							</Button>
						</Box>
					</Stack>
					<Typography variant="body1" paragraph color={'red'} fontSize={12}>
						{couponMessage}
					</Typography>
				</Box>
				<form onSubmit={handleSubmit}>
					{cardError && (
						<span
							style={{
								color: 'red',
								fontSize: '12px',
							}}
						>
							{cardError}
						</span>
					)}
					<CardElement
						onChange={() => {
							setCardError('');
						}}
						options={{
							style: {
								base: {
									fontSize: '16px',
									color: '#424770',
									'::placeholder': {
										color: '#aab7c4',
									},
								},
								invalid: {
									color: '#9e2146',
								},
							},
						}}
					/>

					<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
						<Button
							variant="contained"
							color="error"
							type="button"
							onClick={handleClose}
						>
							Cancel
						</Button>

						<LoadingButton
							disabled={!stripe || !clientSecret || processing}
							loading={processing}
							startIcon={<PaymentIcon />}
							loadingPosition="start"
							variant="contained"
							color="success"
							type="submit"
						>
							Pay ${price}
						</LoadingButton>
					</Box>
				</form>
			</Box>
		</Modal>
	);
};

CheckOutFormModal.propTypes = {
	handleClose: PropTypes.func,
	open: PropTypes.bool,
};

export default CheckOutFormModal;
