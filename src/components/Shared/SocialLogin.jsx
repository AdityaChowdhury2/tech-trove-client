import { Button, Grid, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
	const { googleSignIn } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const handleGoogleLogin = async () => {
		const toastId = toast.loading('Signing in...');
		try {
			await googleSignIn();
			toast.success('Welcome👋👋', { id: toastId });
			navigate(location.state?.from || '/', { replace: true });
		} catch (error) {
			console.log(error.message);
			toast.error(error.message, { id: toastId });
		}
	};
	return (
		<Grid>
			<hr />
			<Typography variant="body2" sx={{ textAlign: 'center' }}>
				Or Sign With
			</Typography>
			<Button
				onClick={handleGoogleLogin}
				type="button"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
				startIcon={<GoogleIcon />}
			>
				Google
			</Button>
		</Grid>
	);
};

export default SocialLogin;
