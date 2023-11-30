import {
	Box,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
	Button,
	Typography,
	useTheme,
} from '@mui/material';
import { FaXTwitter } from 'react-icons/fa6';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
	const theme = useTheme();
	return (
		<Box
			component={'footer'}
			bgcolor={'#f1fbff'}
			color="#143347"
			sx={{ paddingX: 2, paddingY: 5 }}
		>
			<Container>
				<Grid container justifyContent={'space-between'} spacing={4}>
					<Grid item xs={12} md={4}>
						<Stack>
							<Typography
								variant="h5"
								component="h6"
								sx={{
									mr: 2,
									fontWeight: 700,
									letterSpacing: '.1rem',

									textDecoration: 'none',
								}}
							>
								TechTrove
							</Typography>
							<Typography variant="body1" letterSpacing={0.1} gutterBottom>
								&copy; 2032 TechTrove. All Rights reserved
							</Typography>
							<Typography variant="body1" letterSpacing={0.1}>
								Chittagong, Bangladesh
							</Typography>
							<Stack direction={'row'} mt={2}>
								<TextField size="small" placeholder="Enter mail here" />
								<Button
									size={'small'}
									sx={{
										borderRadius: '0px 5px 5px 0',
										color: theme.palette.white.main,
									}}
									variant="contained"
								>
									Subscribe
								</Button>
							</Stack>
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
										<Typography
											variant="body1"
											component={'p'}
											fontSize={'14px'}
										>
											Price
										</Typography>
									</ListItem>
									<ListItem>
										<Typography
											variant="body1"
											component={'p'}
											fontSize={'14px'}
										>
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
										<Typography
											variant="body1"
											component={'p'}
											fontSize={'14px'}
										>
											About
										</Typography>
									</ListItem>
									<ListItem>
										<Typography
											variant="body1"
											component={'p'}
											fontSize={'14px'}
										>
											Contact
										</Typography>
									</ListItem>
									<ListItem>
										<Typography
											variant="body1"
											component={'p'}
											fontSize={'14px'}
										>
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
										<ListItemIcon sx={{ mr: -3 }}>
											<FaXTwitter size={20} />
										</ListItemIcon>
										<Typography variant="body2">Twitter</Typography>
									</ListItem>
									<ListItem>
										<ListItemIcon sx={{ mr: -3 }}>
											<FacebookIcon />
										</ListItemIcon>
										<Typography variant="body2">Facebook</Typography>
									</ListItem>
									<ListItem>
										<ListItemIcon sx={{ mr: -3 }}>
											<InstagramIcon />
										</ListItemIcon>
										<ListItemText>
											<Typography variant="body2">Instagram</Typography>
										</ListItemText>
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
