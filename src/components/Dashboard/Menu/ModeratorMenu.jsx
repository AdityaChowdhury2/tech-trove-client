import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FlagIcon from '@mui/icons-material/Flag';
import QueueIcon from '@mui/icons-material/Queue';
import { NavLink } from 'react-router-dom';

const ModeratorMenu = () => {
	return (
		<div>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<NavLink
					to={'product-review'}
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
							<QueueIcon />
						</ListItemIcon>
						<ListItemText
							primary={'Product Review'}
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
				</NavLink>
			</ListItem>
			<ListItem disablePadding sx={{ display: 'block' }}>
				<NavLink
					to={'reported-product'}
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
							<FlagIcon />
						</ListItemIcon>
						<ListItemText
							primary={'Reported Product'}
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
				</NavLink>
			</ListItem>
		</div>
	);
};

export default ModeratorMenu;
