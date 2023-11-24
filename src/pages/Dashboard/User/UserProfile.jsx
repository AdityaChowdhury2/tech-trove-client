import { Avatar, Box, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import CheckOutFormModal from '../../../components/Modal/CheckOutFormModal/CheckOutFormModal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);

const UserProfile = () => {
	const { user } = useAuth();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleSubmit = () => {};
	return (
		<Container>
			<Box height={30} />
			<Card
				sx={{
					maxWidth: { md: '75%', xs: '100%' },
					mx: 'auto',
					mt: '100px',
					height: 'calc(100vh-64px)',
					alignItems: 'center',
				}}
			>
				<CardContent>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Avatar
							alt={user?.displayName}
							src={user?.photoURL}
							sx={{ width: { md: 56 }, height: { md: 56 } }}
						/>
					</Box>
					<Typography
						gutterBottom
						variant="h6"
						component="div"
						sx={{ textAlign: 'center' }}
					>
						{user?.displayName}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ textAlign: 'center' }}
					>
						{user?.email}
					</Typography>
				</CardContent>
				<CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button size="small" onClick={handleOpen}>
						Subscribe
					</Button>
					<Elements stripe={stripePromise}>
						<CheckOutFormModal
							open={open}
							handleClose={handleClose}
							handleSubmit={handleSubmit}
						/>
					</Elements>
				</CardActions>
			</Card>
		</Container>
	);
};

export default UserProfile;
