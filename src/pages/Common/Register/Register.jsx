import { Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../../components/Shared/SocialLogin';
import useAuth from '../../../hooks/useAuth';
import useUpdateUser from '../../../hooks/useUpdateUser';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Register = () => {
	const { createUser, updateUser } = useAuth();
	const { mutate: updateUserInDB } = useUpdateUser();
	const location = useLocation();
	const navigate = useNavigate();

	const handleSubmit = async event => {
		event.preventDefault();
		const toastId = toast.loading('Please wait...');
		const data = new FormData(event.currentTarget);
		const userData = {
			name: data.get('firstName') + ' ' + data.get('lastName'),
			photoURL: data.get('photoURL'),
			email: data.get('email'),
			password: data.get('password'),
		};
		console.log(userData);
		try {
			const createUserResponse = await createUser(
				userData.email,
				userData.password
			);
			console.log(createUserResponse);
			// update user photoURL and
			const updateUserResponse = await updateUser(
				userData.name,
				userData.photoURL
			);
			console.log(updateUserResponse);
			// insert user into the database
			updateUserInDB({
				name: userData.name,
				email: userData.email,
				photoURL: userData.photoURL,
			});
			toast.success('User Created successfully', { id: toastId });
			navigate(location.state?.from || '/', { replace: true });
		} catch (err) {
			toast.error(err.message, { id: toastId });
			console.log(err.message);
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<Helmet>
				<title>TechTrove | Register</title>
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
					Sign up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								variant="filled"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="filled"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="filled"
								required
								fullWidth
								id="photoURL"
								label="Photo URL"
								name="photoURL"
								autoComplete="photoURL"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="filled"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="filled"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							Already have an account?
							<Link
								to={'/login'}
								style={{
									textDecoration: 'none',
									color: 'darkcyan',
									fontWeight: 600,
								}}
							>
								{' '}
								Sign in
							</Link>
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
				<Link to={'/'} style={{ textDecoration: 'none', color: 'darkcyan' }}>
					<span style={{ fontWeight: 600 }}>TechTrove </span>
				</Link>
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Container>
	);
};

export default Register;
