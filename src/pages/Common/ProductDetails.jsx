import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {
	Box,
	Button,
	Container,
	Grid,
	Rating,
	Stack,
	TextField,
	TextareaAutosize,
	Typography,
	useTheme,
} from '@mui/material';

import Loading from '../../components/Shared/Loading';
import { BiUpvote } from 'react-icons/bi';
import ReviewCard from '../../components/ReviewCard';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useUserRole from '../../hooks/useUserRole';
import { Helmet } from 'react-helmet-async';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import useGetProductDetails from '../../hooks/useGetProductDetails';
import io from 'socket.io-client';
const socket = io.connect(import.meta.env.VITE_SERVER_URL, {
	withCredentials: true,
});

const ProductDetails = () => {
	const theme = useTheme();
	const axiosSecure = useAxiosSecure();
	const { user, loading } = useAuth();
	const initialForm = {
		reviewText: '',
		rating: 0,
	};
	const [formData, setFormData] = useState(initialForm);
	const { productId } = useParams();

	const {
		product,
		isLoading,
		refetch: refetchProduct,
	} = useGetProductDetails();
	const { data: reviews = [], refetch } = useQuery({
		queryKey: ['reviews'],
		// enabled: false,
		enabled: !!user && !loading && !!productId,
		queryFn: async () => {
			const { data } = await axiosSecure(`/api/v1/reviews/${productId}`);
			return data;
		},
	});

	const { data: upVote, refetch: refetchUpVote } = useQuery({
		queryKey: ['upVote', productId],
		enabled: !!user && !loading && !!productId,
		// enabled: false,
		queryFn: async () => {
			const response = await axiosSecure(
				`/api/v1/votes?productId=${productId}`
			);
			return response.data;
		},
	});
	const { data: report = [], refetch: refetchReport } = useQuery({
		queryKey: ['reports'],
		enabled: !!user && !loading && !!productId,
		queryFn: async () => {
			const { data } = await axiosSecure(
				`/api/v1/reports?productId=${productId}&reportBy=${user.email}`
			);
			return data;
		},
	});

	const isOwner = user?.email === product?.owner?.email;

	const handleFromSubmit = async e => {
		e.preventDefault();
		const toastId = toast.loading('Submitting your Review ...');
		const userName = e.target.userName.value;
		const userImgURL = e.target.photoURL.value;
		// console.log({
		// 	...formData,
		// 	userName,
		// 	userImgURL,
		// 	productId,
		// });

		try {
			await axiosSecure.post(`/api/v1/reviews`, {
				...formData,
				userName,
				userImgURL,
				productId,
			});
			setFormData(initialForm);
			socket.emit('send-pie-chart', { message: 'New Review Submitted' });
			toast.success('Review Submitted 👍👍', { id: toastId });
			refetch();
		} catch (error) {
			console.log(error);
			toast.error('Failed ❌❌', { id: toastId });
		}
	};

	const handleReport = async () => {
		const report = {
			productId,
			name: product.name,
			email: user.email,
			date: new Date(),
		};
		try {
			await axiosSecure.post('/api/v1/users/reports', report);
			toast.success('Product Reported Successfully');
			refetchReport();
		} catch (error) {
			toast.error('Failed To report');
		}
	};
	const { role } = useUserRole();

	// owner can not post owner can not report
	const handleUpVote = async () => {
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
					refetchUpVote();
					refetchProduct();
				});
		}
	};

	return (
		<Grid>
			<Helmet>
				<title>TechTrove | {product?.name || 'ProductDetails'} </title>
			</Helmet>
			{isLoading || loading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Loading />
				</div>
			) : (
				<Container>
					<Box
						component={'div'}
						sx={{
							width: '100%',
							height: { xs: '30vh', sm: '40vh', md: '50vh', lg: '60vh' },
							borderRadius: '10px',
						}}
					>
						<img
							src={product?.image}
							alt=""
							style={{
								width: '100%',
								height: 'inherit',
								borderRadius: '10px',
							}}
						/>
					</Box>
					<Box component={'div'}>
						<Stack direction={'row'} my={4} justifyContent={'space-between'}>
							<Typography
								variant="h2"
								component={'h2'}
								fontSize={24}
								fontWeight={800}
								sx={{ marginY: '10px' }}
							>
								{product.name}
							</Typography>
							<Button
								component="a"
								rel="noopener noreferrer"
								href={product.pageUrl}
								target="_blank"
								variant="outlined"
								size="small"
								endIcon={<ArrowOutwardIcon />}
							>
								Visit
							</Button>
							{/* <IconButton aria-label="delete" disabled color="primary">
								<ArrowOutwardIcon />
							</IconButton> */}
						</Stack>
						<Typography variant="body1" component={'p'} textAlign={'justify'}>
							{product.description}
						</Typography>

						<Stack direction={'row'} sx={{ marginY: '10px' }}>
							{product.tags?.map(tag => (
								<Typography key={tag.id} variant="body1" component={'p'}>
									#{tag.text}
									&nbsp;
								</Typography>
							))}
						</Stack>
						{!isOwner && role === 'guest' && (
							<Stack direction={'row'} spacing={5}>
								<Button
									disabled={!!upVote}
									onClick={handleUpVote}
									variant="contained"
									sx={{
										color: theme.palette.white.main,
									}}
									startIcon={<BiUpvote size={12} />}
								>
									Upvote ({product.upvote_count})
								</Button>
								<Button
									disabled={!!report.length}
									onClick={handleReport}
									variant="contained"
									color="warning"
								>
									Report
								</Button>
							</Stack>
						)}
					</Box>
					<Typography
						variant="h6"
						component={'h6'}
						fontSize={18}
						fontWeight={800}
						sx={{ marginY: '10px' }}
					>
						Reviews
					</Typography>
					<Stack spacing={2} sx={{ marginY: 2 }}>
						{reviews &&
							reviews.map(review => (
								<ReviewCard review={review} key={review._id} />
							))}
					</Stack>
					<Typography
						variant="h6"
						component={'h6'}
						fontSize={18}
						fontWeight={800}
						sx={{ marginY: '10px' }}
					>
						Post a review
					</Typography>
					<form onSubmit={handleFromSubmit}>
						<Box
							sx={{
								mt: 2,
							}}
						>
							<TextField
								label="Username"
								id="name"
								name="userName"
								defaultValue={user.displayName}
								size="small"
								InputProps={{
									readOnly: true,
								}}
							/>
						</Box>
						<Box
							sx={{
								mt: 2,
							}}
						>
							<TextField
								label="photoURL"
								name="photoURL"
								id="photoURL"
								sx={{ width: { xs: '100%', md: '300px' } }}
								defaultValue={user.photoURL}
								size="small"
								InputProps={{
									readOnly: true,
								}}
							/>
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								mt: 2,
							}}
						>
							<label>Rating :</label>
							<Rating
								precision={0.5}
								value={formData.rating}
								onChange={(event, newValue) => {
									setFormData({ ...formData, rating: newValue });
								}}
							/>
						</Box>
						<Box
							sx={{
								mt: 2,
								width: { xs: '250px', md: '360px' },
							}}
						>
							{/* <TextareaAutosize /> */}
							<TextareaAutosize
								style={{
									width: '100%',
									fontSize: '0.875rem',
									fontWeight: '400',
									lineHeight: 1.5,
									padding: '8px 12px',
									borderRadius: '8px',
								}}
								value={formData.reviewText}
								name="reviewText"
								onChange={e =>
									setFormData({ ...formData, reviewText: e.target.value })
								}
								minRows={3}
							/>
						</Box>
						<Button
							color="success"
							type="submit"
							variant="contained"
							sx={{ mt: 2 }}
						>
							Post
						</Button>
					</form>
				</Container>
			)}
		</Grid>
	);
};

export default ProductDetails;
