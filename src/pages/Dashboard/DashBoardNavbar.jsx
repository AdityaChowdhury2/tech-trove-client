import { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppStore } from '../../store/AppStore';
import { Avatar, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open',
})(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
}));

export default function DashboardNavbar() {
	const [anchorElUser, setAnchorElUser] = useState(null);
	const updateOpen = useAppStore(state => state.updateOpen);
	const dopen = useAppStore(state => state.dopen);
	const { user, logout } = useAuth();

	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						onClick={() => updateOpen(!dopen)}
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h5"
						noWrap
						component="a"
						sx={{
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.1rem',
							color: 'primary.50',
							textDecoration: 'none',
						}}
					>
						TechTrove
					</Typography>
					<Box sx={{ flexGrow: 1 }} />

					{user && (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open user menu">
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
								<MenuItem sx={{ cursor: 'default' }}>
									<Typography variant="body1" textAlign={'center'}>
										{user.displayName}
									</Typography>
								</MenuItem>

								<MenuItem onClick={() => logout()}>
									<Typography textAlign="center">Logout</Typography>
								</MenuItem>
							</Menu>
						</Box>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
