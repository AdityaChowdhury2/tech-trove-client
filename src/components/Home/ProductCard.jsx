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
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Grid } from '@mui/material';

const ProductCard = ({ product, refetch, isTrending }) => {
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const axiosSecure = useAxiosSecure();

	const formatDate = date => {
		return formatDistance(new Date(date), new Date());
	};
	const isOwner = user?.email === product.owner.email;

	const {
		data: upVote,
		refetch: refetchUpVote,
		isLoading,
	} = useQuery({
		queryKey: ['upVote', product._id],
		enabled: !!user && !loading,
		queryFn: async () => {
			const response = await axiosSecure(
				`/api/v1/votes?productId=${product._id}`
			);
			return response.data;
		},
	});

	// console.log(upVote);
	const handleUpVote = async () => {
		if (!user) {
			navigate('/login', {
				state: { from: location.pathname },
			});
		} else {
			const upVoteData = {
				productId: product._id,
				email: user.email,
			};
			const response = await axiosSecure.put('/api/v1/votes', upVoteData);
			if (response.data.upsertedId) {
				axiosSecure
					.patch(`/api/v1/user/products/${upVoteData.productId}`, {
						upVote: true,
					})
					.then(() => {
						refetch();
						refetchUpVote();
					});
			}
		}
	};

	return (
		<Grid item xs={12} md={6} xl={isTrending ? 4 : 3}>
			<Card
				sx={{
					paddingY: 2,
					borderRadius: '20px',
					background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
					boxShadow: ' 2px 2px 4px #d9d9d9,  2px 0px 4px #ffffff',
				}}
			>
				<CardHeader
					sx={{ paddingX: 3 }}
					disableTypography
					title={
						<Typography
							variant={'h3'}
							component={'h3'}
							color={'primary.main'}
							fontSize={{ xs: '1.5rem', lg: '16px' }}
						>
							<Link
								to={`/products/${product._id}`}
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								{product.name}
							</Link>
						</Typography>
					}
					action={
						location.pathname === '/' ? (
							<></>
						) : product.featured ? (
							<Typography
								variant={'body1'}
								component={'p'}
								color={'primary.main'}
								fontSize={{ sm: '14px' }}
								mt={2}
							>
								Featured
							</Typography>
						) : (
							<></>
						)
					}
					subheader={
						<Typography
							variant="body1"
							component={'p'}
							fontSize={{ sm: '12px' }}
						>
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
							disabled={isOwner || !!upVote || isLoading}
							onClick={handleUpVote}
						>
							<BiUpvote size={16} />
							<Typography fontSize={14}>{product.upvote_count}</Typography>
						</IconButton>
					</CardActions>
				</div>
			</Card>
		</Grid>
	);
};

ProductCard.propTypes = {
	product: PropTypes.object,
	refetch: PropTypes.func,
	isTrending: PropTypes.bool,
};

export default ProductCard;
