import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { BiUpvote } from 'react-icons/bi';
import { formatDistance } from 'date-fns';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import useUserRole from '../../hooks/useUserRole';

const ProductCard = ({ product }) => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	// const [userRole, setUserRole] = useState();
	const { role } = useUserRole();
	console.log(role);

	const formatDate = date => {
		// const today = new Date();
		return formatDistance(new Date(date), new Date('2023-11-04T12:50:00Z'));
	};
	const isOwner = user?.email === product.owner.email;
	console.log('isOwner ', isOwner);

	// handle onclick events in upvote button
	// TODO: patch {upvote: true} in "/api/v1/user/products/:productId"
	// TODO: post('/api/v1/votes') {productId: product.id,email}

	return (
		<Card sx={{ paddingY: 2 }}>
			<CardHeader
				sx={{ paddingX: 3 }}
				disableTypography
				title={
					<Typography
						variant="p"
						component={'h3'}
						color={'primary.main'}
						fontSize={{ sm: '24px', lg: '16px' }}
					>
						<Link
							to={`/products/${product._id}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							{product.name}
						</Link>
					</Typography>
				}
				subheader={
					<Typography variant="p" component={'p'} fontSize={{ sm: '12px' }}>
						{(product?.timestamp &&
							formatDate(product?.timestamp).replace('about', '')) ||
							0}{' '}
						ago
					</Typography>
				}
			/>
			<CardMedia
				component="img"
				height="194"
				image={product.image}
				alt="Paella dish"
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<CardContent sx={{ paddingX: 3 }}>
					<Typography variant="body2" color="text.secondary">
						{product.tags.map(tag => (
							<span key={tag.id}>#{tag.text} </span>
						))}
					</Typography>
					{product.status}
				</CardContent>
				<CardActions sx={{ gap: 1, paddingX: 3 }}>
					<IconButton
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							backgroundColor: '#f3f4f6',
							borderRadius: '5px',
							transition: 'ease-in-out',
							transitionDuration: '200ms',
							'&:hover': {
								backgroundColor: '#e5e7eb',
							},
						}}
						aria-label="upvote"
						disabled={role === 'moderator' || role === 'admin' || isOwner}
						onClick={() => {
							console.log(user);
							if (!user) {
								navigate('/login', {
									state: { from: location.pathname },
								});
							}
						}}
					>
						<BiUpvote size={16} />
						<Typography fontSize={14}>{product.upvote_count || 5}</Typography>
					</IconButton>
				</CardActions>
			</div>
		</Card>
	);
};

ProductCard.propTypes = {
	product: PropTypes.object,
};

export default ProductCard;
