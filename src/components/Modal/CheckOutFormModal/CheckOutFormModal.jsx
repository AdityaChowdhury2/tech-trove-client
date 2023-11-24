import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './CheckOutFormModal.css';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

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
	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setCardError] = useState();
	const { user } = useAuth();
	// TODO: Use Axios Secure instead of axios public
	const axiosPublic = useAxiosPublic();

	const { mutate: updateUserInfo } = useMutation({
		mutationFn: async data => {
			const res = await axiosPublic.put(`/api/v1/users/${user?.email}`, data);
			return res.data;
		},
	});

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

		const response = await axiosPublic.post('/api/v1/create-payment-intent', {
			price: 100,
		});

		console.log(response.data.clientSecret);
		if (response.data.clientSecret === null) return;

		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(response.data.clientSecret, {
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
				<form onSubmit={handleSubmit}>
					<CardElement
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
					<Box
						sx={{ display: 'flex', justifyContent: 'space-around', mt: '10' }}
					>
						<Button
							variant="contained"
							color="error"
							type="button"
							onClick={handleClose}
						>
							Cancel
						</Button>
						<Button variant="contained" color="success" type="submit">
							Pay $100
						</Button>
					</Box>
				</form>
			</Box>
		</Modal>
	);
};

CheckOutFormModal.propTypes = {
	handleClose: PropTypes.func,
	open: PropTypes.bool,
	handleSubmit: PropTypes.func,
};

export default CheckOutFormModal;
