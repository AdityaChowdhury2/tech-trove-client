import { AppBar } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const navigate = useNavigate();
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
		<Container sx={{ paddingX: { xs: 1 } }}>
			<AppBar
				position="static"
				sx={{ backgroundColor: 'transparent' }}
				elevation={0}
			>
				<Container maxWidth="xl" sx={{ paddingX: { xs: 1 } }}>
					<Toolbar disableGutters sx={{ alignItems: 'center' }}>
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
								color="primary.50"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								elevation={2}
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
									<Link to={'/'} style={{ textDecoration: 'none' }}>
										<Typography textAlign="center" color={'primary.main'}>
											Home
										</Typography>
									</Link>
								</MenuItem>
								<MenuItem onClick={handleCloseNavMenu}>
									<Link to={'/products'} style={{ textDecoration: 'none' }}>
										<Typography textAlign="center" color={'primary.main'}>
											Products
										</Typography>
									</Link>
								</MenuItem>
							</Menu>
							{!user && (
								<Menu
									id="menu-appbar"
									elevation={2}
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
										<Link
											to={'/'}
											style={{ textDecoration: 'none', color: 'primary.main' }}
										>
											<Typography textAlign="center" color={'primary.main'}>
												Home
											</Typography>
										</Link>
									</MenuItem>
									<MenuItem onClick={handleCloseNavMenu}>
										<Link
											to={'/products'}
											style={{ textDecoration: 'none', color: 'primary.main' }}
										>
											<Typography textAlign="center" color={'primary.main'}>
												Products
											</Typography>
										</Link>
									</MenuItem>
									<MenuItem onClick={handleCloseNavMenu}>
										<Link to={'/login'} style={{ textDecoration: 'none' }}>
											<Typography textAlign="center" color={'primary.main'}>
												Login
											</Typography>
										</Link>
									</MenuItem>
									<MenuItem onClick={handleCloseNavMenu}>
										<Link
											to={'/register'}
											style={{ textDecoration: 'none', color: 'primary.main' }}
										>
											<Typography textAlign="center" color={'primary.main'}>
												Register
											</Typography>
										</Link>
									</MenuItem>
								</Menu>
							)}
						</Box>

						<Typography
							variant="h5"
							noWrap
							component="p"
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								color: 'primary.main',
								letterSpacing: '.3rem',

								textDecoration: 'none',
							}}
						>
							TechTrove
						</Typography>
						<Box
							sx={{
								flexGrow: 1,
								display: {
									xs: 'none',
									md: 'flex',
									justifyContent: 'center',
									...(!user && {
										justifyContent: 'end',
									}),
									marginRight: 10,
								},
							}}
						>
							<Link to={'/'} style={{ textDecoration: 'none' }}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'primary.main',
										display: 'block',
										fontWeight: 600,
									}}
								>
									Home
								</Button>
							</Link>
							<Link to={'/products'} style={{ textDecoration: 'none' }}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'primary.main',
										display: 'block',
										fontWeight: 600,
									}}
								>
									Products
								</Button>
							</Link>
							{!user && (
								<>
									<Link to={'/login'} style={{ textDecoration: 'none' }}>
										<Button
											sx={{
												my: 2,
												color: 'primary.main',
												display: 'block',
												fontWeight: 600,
											}}
										>
											Login
										</Button>
									</Link>
									<Link to={'/register'} style={{ textDecoration: 'none' }}>
										<Button
											sx={{
												my: 2,
												color: 'primary.main',
												display: 'block',
												fontWeight: 600,
											}}
										>
											Register
										</Button>
									</Link>
								</>
							)}
						</Box>

						{user && (
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt={user?.displayName} src={user?.photoURL} />
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
									<MenuItem>
										<Typography textAlign="center" color={'primary.800'}>
											{user?.displayName}
										</Typography>
									</MenuItem>
									<Divider />
									<MenuItem
										onClick={() => {
											navigate('/dashboard');
										}}
									>
										<Typography
											component={'p'}
											variant="p"
											textAlign="center"
											color={'primary.main'}
										>
											Dashboard
										</Typography>
									</MenuItem>
									<MenuItem onClick={() => logout()}>
										<Typography textAlign="center" color={'primary.main'}>
											Logout
										</Typography>
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
