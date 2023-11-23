import { Button, Grid, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const SocialLogin = () => {
	return (
		<Grid>
			<Typography variant="body2" sx={{ textAlign: 'center' }}>
				Or Sign With
			</Typography>
			<Button
				type="submit"
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
