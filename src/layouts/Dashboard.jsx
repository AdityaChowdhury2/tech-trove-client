import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';

import Divider from '@mui/material/Divider';

import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../pages/Dashboard/DashBoardNavbar';
import { useAppStore } from '../store/AppStore';
import GuestMenu from '../components/Dashboard/Menu/GuestMenu';
import AdminMenu from '../components/Dashboard/Menu/AdminMenu';
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

	return (
		<div>
			<DashboardNavbar />
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />

				<Drawer variant="permanent" open={open}>
					<DrawerHeader></DrawerHeader>
					<Divider />
					<List>
						{/* Guest Menu */}
						{/* <GuestMenu /> */}
						{/* Admin Menu */}
						<AdminMenu />
					</List>
				</Drawer>
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<Outlet />
				</Box>
			</Box>
		</div>
	);
}
