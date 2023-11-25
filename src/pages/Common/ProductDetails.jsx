import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Loading from '../../components/Shared/Loading';
import { BiUpvote } from 'react-icons/bi';

const ProductDetails = () => {
	const axiosSecure = useAxiosSecure();
	const { productId } = useParams();
	const { data: product = {}, isLoading } = useQuery({
		queryKey: ['productDetails'],
		queryFn: async () => {
			const { data } = await axiosSecure(`/api/v1/products/${productId}`);
			return data;
		},
	});
	console.log(product);
	return (
		<Grid>
			<Container>
				<Box
					sx={{
						width: '100%',
						height: { xs: '30vh', sm: '40vh', md: '50vh', lg: '60vh' },
						overflow: 'hidden',
						borderRadius: '10px',
						// backgroundImage: `url(${product.image})`,
						// backgroundRepeat: 'no-repeat',
						// backgroundPosition: 'center',
					}}
				>
					<img
						src={product?.image}
						alt=""
						style={{
							width: '100%',
							objectFit: 'cover',
							borderRadius: '10px',
						}}
					/>
				</Box>
				<Box>
					<Typography
						variant="h2"
						component={'h2'}
						fontSize={24}
						fontWeight={800}
						sx={{ marginY: '10px' }}
					>
						{product.name}
					</Typography>
					<Typography variant="body1" component={'p'}>
						{product.description}
					</Typography>

					<Stack direction={'row'} sx={{ marginY: '10px' }}>
						{product.tags?.map(tag => (
							<Typography key={tag} variant="body1" component={'p'}>
								#{tag}
								&nbsp;
							</Typography>
						))}
					</Stack>
					<Stack direction={'row'} spacing={5}>
						<Button variant="contained" startIcon={<BiUpvote size={12} />}>
							Upvote
						</Button>
						<Button
							variant="contained"
							color="warning"
							startIcon={<BiUpvote size={12} />}
						>
							Report
						</Button>
					</Stack>
				</Box>
			</Container>
			{isLoading && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Loading />
				</div>
			)}
		</Grid>
	);
};

export default ProductDetails;
