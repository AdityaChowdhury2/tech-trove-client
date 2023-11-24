import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink, Outlet } from 'react-router-dom';
import DashboardNavbar from '../pages/Dashboard/DashBoardNavbar';
import { useAppStore } from '../store/AppStore';
import GuestMenu from '../components/Dashboard/Menu/GuestMenu';
import AdminMenu from '../components/Dashboard/Menu/AdminMenu';
import ModeratorMenu from '../components/Dashboard/Menu/ModeratorMenu';
import InventoryIcon from '@mui/icons-material/Inventory';
import useUserRole from '../hooks/useUserRole';
import useAuth from '../hooks/useAuth';

const drawerWidth = 240;

const openedMixin = theme => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = theme => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export default function MiniDrawer() {
	const open = useAppStore(state => state.dopen);
	const { role, isLoading } = useUserRole();

	return (
		<div>
			<DashboardNavbar />
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Drawer variant="permanent" open={open}>
					<DrawerHeader></DrawerHeader>
					<Divider />
					{!isLoading && (
						<List>
							{/* Guest Menu */}
							{role && role === 'guest' && <GuestMenu />}
							{/* Moderator Menu */}
							{role && role === 'moderator' && <ModeratorMenu />}
							{/* Admin Menu */}
							{role && role === 'admin' && <AdminMenu />}
						</List>
					)}
					<Divider />
					<List>
						<ListItem disablePadding sx={{ display: 'block' }}>
							<NavLink
								to={'/'}
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText
										primary={'Home'}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</NavLink>
						</ListItem>
						<ListItem disablePadding sx={{ display: 'block' }}>
							<NavLink
								to={'/products'}
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}
									>
										<InventoryIcon />
									</ListItemIcon>
									<ListItemText
										primary={'All Products'}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</NavLink>
						</ListItem>
					</List>
				</Drawer>
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<Outlet />
				</Box>
			</Box>
		</div>
	);
}
