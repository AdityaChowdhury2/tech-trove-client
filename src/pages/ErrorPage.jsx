import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Lottie from 'lottie-react';
import errorAnimation from '../assets/animations/Error_Animation.json';
import { Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
	return (
		<Container>
			<Grid container>
				<Grid item xs={12}>
					<Lottie animationData={errorAnimation} loop={true} />
				</Grid>
				<Grid item xs={12}>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Link to={'/'}>
							<Button variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
								Go home
							</Button>
						</Link>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ErrorPage;
