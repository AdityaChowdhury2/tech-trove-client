import Grid from '@mui/material/Grid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import SocialLogin from '../../../components/Shared/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Login = () => {
	const theme = useTheme();
	const { login } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const handleSubmit = async event => {
		event.preventDefault();
		const toastId = toast.loading('Signing in...');
		const data = new FormData(event.currentTarget);
		const loginData = {
			email: data.get('email'),
			password: data.get('password'),
		};
		try {
			await login(loginData);
			toast.success('Welcome👋👋', { id: toastId });
			navigate(location.state?.from || '/', { replace: true });
		} catch (error) {
			console.log('In login page', error.message);
			toast.error(error.message, { id: toastId });
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<Helmet>
				<title>TechTrove | Login</title>
			</Helmet>
			<CssBaseline />
			<Box
				sx={{
					my: 2,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						variant="filled"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="filled"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2, color: theme.palette.white.main }}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<Typography variant="body2">
								Don&apos;t have an account?
								<Link
									to={'/register'}
									style={{
										textDecoration: 'none',
										color: theme.palette.primary.main,
									}}
								>
									<span style={{ fontWeight: 600 }}>Sign Up</span>
								</Link>
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</Box>

			<SocialLogin />
			<Typography
				variant="body2"
				color="text.secondary"
				align="center"
				sx={{ mt: 5 }}
			>
				{'Copyright © '}
				<Link
					to={'/'}
					style={{ textDecoration: 'none', color: theme.palette.primary.main }}
				>
					<span style={{ fontWeight: 600 }}>TechTrove </span>
				</Link>
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Container>
	);
};

export default Login;
