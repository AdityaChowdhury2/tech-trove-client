import SectionHeader from '../Shared/SectionHeader';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BiUpvote } from 'react-icons/bi';
import { MdOutlineReportProblem } from 'react-icons/md';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { formatDistance } from 'date-fns';

const Featured = () => {
	const axiosPublic = useAxiosPublic();
	const { data: featuredProduct = [] } = useQuery({
		queryKey: ['featuredProduct'],
		queryFn: async () => {
			const response = await axiosPublic(
				'/api/v1/products?featured=true&sortBy=timestamp&sortOrder=desc'
			);
			return response.data;
		},
	});
	const formatDate = date => {
		return formatDistance(new Date(date), new Date('2023-12-03T12:50:00Z'));
	};

	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
			elevation={1}
			sx={{ padding: '0px' }}
		>
			<MenuItem
				onClick={() => {
					console.log('Reported');
				}}
				sx={{
					gap: 2,

					height: 'auto',
				}}
			>
				<MdOutlineReportProblem size={'16'} color="gold" />
				Report
			</MenuItem>
		</Menu>
	);

	return (
		<section>
			<Container maxWidth={'lg'} sx={{ padding: '0px' }}>
				<SectionHeader
					title={'Featured Products'}
					subTitle={
						'Discover our curated collection of featured products that stand out for their exceptional quality and innovation.'
					}
				/>
				<Grid container spacing={3}>
					{featuredProduct &&
						featuredProduct.map(featuredProduct => (
							<Grid key={featuredProduct._id} item xs={12} md={6} xl={3}>
								<Card>
									<CardHeader
										disableTypography
										action={
											<IconButton
												onClick={handleProfileMenuOpen}
												aria-label="settings"
											>
												<MoreVertIcon />
											</IconButton>
										}
										title={
											<Typography
												variant="p"
												component={'h3'}
												fontSize={{ sm: '24px', lg: '16px' }}
											>
												{featuredProduct.name}
											</Typography>
										}
										subheader={
											<Typography
												variant="p"
												component={'p'}
												fontSize={{ sm: '12px' }}
											>
												{formatDate(featuredProduct.timestamp).replace(
													'about',
													''
												)}{' '}
												ago
											</Typography>
										}
									/>
									<CardMedia
										component="img"
										height="194"
										image={featuredProduct.image}
										alt="Paella dish"
									/>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'space-between',
										}}
									>
										<CardContent>
											<Typography variant="body2" color="text.secondary">
												{featuredProduct.tags.map(tag => (
													<span key={tag}>#{tag} </span>
												))}
											</Typography>
										</CardContent>
										<CardActions sx={{ gap: 1 }}>
											<IconButton
												sx={{ display: 'flex', alignItems: 'center' }}
												aria-label="upvote"
											>
												<BiUpvote size={12} />
												<Typography fontSize={12}>12</Typography>
											</IconButton>
										</CardActions>
									</div>
									{renderMenu}
								</Card>
							</Grid>
						))}
				</Grid>
			</Container>
		</section>
	);
};

export default Featured;
