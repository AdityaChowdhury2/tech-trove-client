import { Button, Grid, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import useUpdateUser from '../../hooks/useUpdateUser';

const SocialLogin = () => {
	const { googleSignIn } = useAuth();
	const { mutate: updateUserInDB } = useUpdateUser();
	const navigate = useNavigate();
	const location = useLocation();
	const handleGoogleLogin = async () => {
		const toastId = toast.loading('Signing in...');
		try {
			const response = await googleSignIn();
			await updateUserInDB({
				name: response.user?.displayName,
				email: response.user?.email,
				photoURL: response.user?.photoURL,
			});
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
			<Typography variant="body2" sx={{ textAlign: 'center' }} mt={2}>
				Or Sign In
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
