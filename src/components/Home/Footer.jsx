import {
	Box,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
	return (
		<Box component={'footer'} bgcolor={'dimgrey'}>
			<Container>
				<Grid container justifyContent={'space-between'} spacing={4}>
					<Grid item xs={12} md={4}>
						<Stack>
							<Typography
								variant="h6"
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
							<Typography variant="p">
								&copy;2032 TechTrove. All Rights reserved{' '}
							</Typography>
						</Stack>
					</Grid>
					<Grid item xs={12} md={6}>
						<Grid container spacing={4}>
							<Grid item xs={12} md={4}>
								<List disablePadding>
									<ListItem>
										<Typography
											variant="h6"
											component={'h6'}
											fontWeight={600}
											fontSize={'16px'}
										>
											Product
										</Typography>
									</ListItem>
									<ListItem>
										<Typography variant="p" component={'p'} fontSize={'16px'}>
											Price
										</Typography>
									</ListItem>
									<ListItem>
										<Typography variant="p" component={'p'} fontSize={'16px'}>
											FAQ
										</Typography>
									</ListItem>
								</List>
							</Grid>
							<Grid item xs={12} md={4}>
								<List disablePadding>
									<ListItem>
										<Typography
											variant="h6"
											component={'h6'}
											fontWeight={600}
											fontSize={'16px'}
										>
											Company
										</Typography>
									</ListItem>
									<ListItem>
										<Typography variant="p" component={'p'} fontSize={'16px'}>
											About
										</Typography>
									</ListItem>
									<ListItem>
										<Typography variant="p" component={'p'} fontSize={'16px'}>
											Contact
										</Typography>
									</ListItem>
									<ListItem>
										<Typography variant="p" component={'p'} fontSize={'16px'}>
											Blog
										</Typography>
									</ListItem>
								</List>
							</Grid>
							<Grid item xs={12} md={4}>
								<List disablePadding>
									<ListItem>
										<Typography
											variant="h6"
											component={'h6'}
											fontWeight={600}
											fontSize={'16px'}
										>
											Social
										</Typography>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<TwitterIcon />
										</ListItemIcon>
										<ListItemText>Twitter</ListItemText>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<FacebookIcon />
										</ListItemIcon>
										<ListItemText>Facebook</ListItemText>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<InstagramIcon />
										</ListItemIcon>
										<ListItemText>Instagram</ListItemText>
									</ListItem>
								</List>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Footer;
