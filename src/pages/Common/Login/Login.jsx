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

	const handleSubmit = event => {
		event.preventDefault();
		const toastId = toast.loading('Signing in...');
		const data = new FormData(event.currentTarget);
		const loginData = {
			email: data.get('email'),
			password: data.get('password'),
		};
		loginUser(loginData, toastId);
	};

	const loginUser = async (loginData, toastId) => {
		try {
			await login(loginData);
			toast.success('Welcome👋👋', { id: toastId });
			navigate(location.state?.from || '/', { replace: true });
		} catch (error) {
			console.log('In login page', error.message);
			toast.error(error.message, { id: toastId });
		}
	};

	const handleAdminLogin = async () => {
		const toastId = toast.loading('Admin Signing in...');
		const loginData = {
			email: import.meta.env.VITE_ADMIN_USER_EMAIL,
			password: import.meta.env.VITE_ADMIN_USER_PASSWORD,
		};
		await loginUser(loginData, toastId);
	};
	const handleModeratorLogin = async () => {
		const toastId = toast.loading('Moderator Signing in...');
		const loginData = {
			email: import.meta.env.VITE_MODERATOR_USER_EMAIL,
			password: import.meta.env.VITE_MODERATOR_USER_PASSWORD,
		};
		await loginUser(loginData, toastId);
	};
	const handleGuestLogin = async () => {
		const toastId = toast.loading('Guest User Signing in...');
		const loginData = {
			email: import.meta.env.VITE_GUEST_USER_EMAIL,
			password: import.meta.env.VITE_GUEST_USER_PASSWORD,
		};
		await loginUser(loginData, toastId);
	};

	return (
		<Container
			component="main"
			maxWidth="xs"
			sx={{
				position: 'relative',
			}}
		>
			{/* <div
				style={{
					position: 'absolute',
					bottom: '-200px',
					left: '20px',
					width: '80%',
					height: '200px',
					padding: '20px',
					fontSize: '12px',
				}}
			>
				<p>Email: admin@tech-trove.com</p>
				<p>Pass: Admin@123</p>
				<p>Moderator: moderator@tech-trove.com</p>
				<p>Pass: Moderator@123</p>
				<p>Guest: ronab31934@kxgif.com</p>
				<p>Pass: ronab31934@kxgif.com</p>
			</div> */}
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
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<Button
					type="submit"
					variant="contained"
					sx={{ mt: 3, mb: 2, color: theme.palette.white.main }}
					onClick={handleAdminLogin}
				>
					Admin
				</Button>
				<Button
					type="submit"
					variant="contained"
					sx={{ mt: 3, mb: 2, color: theme.palette.white.main }}
					onClick={handleModeratorLogin}
				>
					Moderator
				</Button>
				<Button
					type="submit"
					variant="contained"
					sx={{ mt: 3, mb: 2, color: theme.palette.white.main }}
					onClick={handleGuestLogin}
				>
					User
				</Button>
			</Box>
		</Container>
	);
};

export default Login;
