import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
	return (
		<div>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<NavLink
					to={'stats'}
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
							<InboxIcon />
						</ListItemIcon>
						<ListItemText
							primary={'Statistics'}
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
				</NavLink>
			</ListItem>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<NavLink
					to={'manage-users'}
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
							<InboxIcon />
						</ListItemIcon>
						<ListItemText
							primary={'Manage Users'}
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
				</NavLink>
			</ListItem>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<NavLink
					to={'manage-coupons'}
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
							<InboxIcon />
						</ListItemIcon>
						<ListItemText
							primary={'Manage Coupons'}
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
				</NavLink>
			</ListItem>
		</div>
	);
};

export default AdminMenu;
