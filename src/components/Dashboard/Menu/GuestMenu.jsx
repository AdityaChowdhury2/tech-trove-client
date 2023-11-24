import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { NavLink } from 'react-router-dom';

const GuestMenu = () => {
	return (
		<div>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<NavLink
					to={'my-profile'}
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
							primary={'My Profile'}
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
				</NavLink>
			</ListItem>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<NavLink
					to={'add-product'}
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
							primary={'Add Product'}
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
				</NavLink>
			</ListItem>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<NavLink
					to={'my-products'}
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
							primary={'My Products'}
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
				</NavLink>
			</ListItem>
		</div>
	);
};

export default GuestMenu;
