import { AppBar } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const auth = ['Login', 'Register'];
const Navbar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	3;
	const { user, logout } = useAuth();

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Container>
			<AppBar color="transparent" position="static" elevation={0}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.1rem',
								color: 'primary.main',
								textDecoration: 'none',
							}}
						>
							TechTrove
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								elevation={2}
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								<MenuItem onClick={handleCloseNavMenu}>
									<NavLink to={`/products`} style={{ textDecoration: 'none' }}>
										<Typography
											textAlign="center"
											sx={{
												color: 'primary.main',
											}}
										>
											Products
										</Typography>
									</NavLink>
								</MenuItem>
							</Menu>
							{user ? (
								<></>
							) : (
								<Menu
									elevation={2}
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{auth.map(auth => (
										<MenuItem key={auth} onClick={handleCloseNavMenu}>
											<NavLink
												to={`${auth}`}
												style={{ textDecoration: 'none' }}
											>
												<Typography
													textAlign="center"
													sx={{
														color: 'primary.main',
													}}
												>
													{auth}
												</Typography>
											</NavLink>
										</MenuItem>
									))}
								</Menu>
							)}
						</Box>
						<Grid
							sx={{
								mr: 2,
								flexGrow: 1,
								display: { xs: 'flex', md: 'none' },
							}}
						>
							<Typography
								variant="h5"
								noWrap
								component="a"
								sx={{
									fontFamily: 'monospace',
									fontWeight: 700,
									letterSpacing: '.1rem',
									color: 'primary.main',
									textDecoration: 'none',
								}}
							>
								TechTrove
							</Typography>
						</Grid>
						<Box
							sx={{
								flexGrow: 1,
								display: {
									xs: 'none',
									md: 'flex',
									justifyContent: `${user ? 'center' : 'flex-end'}`,
								},
							}}
						>
							<NavLink to={`/products`} style={{ textDecoration: 'none' }}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'primary.main',
										'&:hover': {
											color: 'primary.800',
										},
										fontWeight: 700,
										display: 'block',
									}}
								>
									Products
								</Button>
							</NavLink>
							{user ? (
								<> </>
							) : (
								<>
									<NavLink to={`/login`} style={{ textDecoration: 'none' }}>
										<Button
											onClick={handleCloseNavMenu}
											sx={{
												my: 2,
												color: 'primary.main',
												'&:hover': {
													color: 'primary.800',
												},
												fontWeight: 700,
												display: 'block',
											}}
										>
											Sign In
										</Button>
									</NavLink>
									<NavLink to={`/register`} style={{ textDecoration: 'none' }}>
										<Button
											onClick={handleCloseNavMenu}
											sx={{
												my: 2,
												color: 'primary.main',
												'&:hover': {
													color: 'primary.800',
												},
												fontWeight: 700,
												display: 'block',
											}}
										>
											Sign Up
										</Button>
									</NavLink>
								</>
							)}
						</Box>

						{user && (
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open user menu">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt="Remy Sharp" src={user?.photoURL} />
									</IconButton>
								</Tooltip>
								<Menu
									elevation={2}
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									<MenuItem sx={{ cursor: 'default' }}>
										<Typography variant="body1" textAlign={'center'}>
											{user.displayName}
										</Typography>
									</MenuItem>

									<NavLink
										to={'/dashboard'}
										style={{ textDecoration: 'none', color: 'inherit' }}
									>
										<MenuItem>
											<Typography textAlign="center">Dashboard</Typography>
										</MenuItem>
									</NavLink>

									<MenuItem onClick={() => logout()}>
										<Typography textAlign="center">Logout</Typography>
									</MenuItem>
								</Menu>
							</Box>
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</Container>
	);
};

export default Navbar;
