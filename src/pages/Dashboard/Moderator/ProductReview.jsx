import {
	Box,
	Button,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import Heading from '../../../components/Shared/Heading';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const ProductReview = () => {
	const axiosSecure = useAxiosSecure();
	const { data: products, refetch } = useQuery({
		queryKey: ['allProducts'],
		queryFn: async () => {
			const response = await axiosSecure('/api/v1/moderator/products');
			return response.data;
		},
	});
	const { mutate } = useMutation({
		mutationFn: async data => {
			const response = await axiosSecure.patch(
				`/api/v1/moderator/products/${data.id}`,
				data
			);
			return response.data;
		},
		onSuccess: () => {
			toast.success('Product updated successfully');
			refetch();
		},
	});

	const handleFeaturedButton = id => {
		mutate({ id, featured: true });
	};
	const handleAcceptButton = id => {
		mutate({ id, status: 'accepted' });
	};
	const handleRejectButton = id => {
		mutate({ id, status: 'rejected' });
	};

	const navigate = useNavigate();

	return (
		<div>
			<Helmet>
				<title>Moderator | Product Review</title>
			</Helmet>
			<Box height={40} />
			<Heading
				title={'Product Review'}
				subHeading={'Curated Experiences Await Your Approval'}
			/>

			<Container sx={{ mt: 10, paddingX: { xs: 1, md: 3 } }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 700, color: 'primary.100' }}>
									#
								</TableCell>
								<TableCell
									sx={{ fontWeight: 700, color: 'primary.100' }}
									align="center"
								>
									Product Name
								</TableCell>
								<TableCell
									sx={{ fontWeight: 700, color: 'primary.100' }}
									align="center"
								>
									View Details
								</TableCell>
								<TableCell
									sx={{ fontWeight: 700, color: 'primary.100' }}
									align="center"
								>
									Make Featured
								</TableCell>
								<TableCell
									sx={{ fontWeight: 700, color: 'primary.100' }}
									align="center"
								>
									Accept
								</TableCell>
								<TableCell
									sx={{ fontWeight: 700, color: 'primary.100' }}
									align="center"
								>
									Reject
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products &&
								products.map((product, idx) => (
									<TableRow
										key={product._id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{idx + 1}
										</TableCell>
										<TableCell align="center">{product.name}</TableCell>
										<TableCell align="center">
											<Button
												onClick={() => navigate(`/products/${product._id}`)}
												size="small"
												variant="contained"
												color="primary"
												sx={{ fontSize: { xs: 8, md: 14 } }}
											>
												View Details
											</Button>
										</TableCell>
										<TableCell align="center">
											<Button
												disabled={product?.featured}
												onClick={() => {
													handleFeaturedButton(product._id);
												}}
												size="small"
												variant="contained"
												color="warning"
												sx={{
													fontSize: { xs: 8, md: 14 },
													color: 'black',
												}}
											>
												Make Featured
											</Button>
										</TableCell>
										<TableCell align="center">
											<Button
												disabled={product?.status === 'accepted'}
												onClick={() => {
													handleAcceptButton(product._id);
												}}
												size="small"
												variant="contained"
												color="success"
												sx={{ fontSize: { xs: 8, md: 14 } }}
											>
												Accept
											</Button>
										</TableCell>
										<TableCell align="center">
											<Button
												disabled={product?.status === 'rejected'}
												onClick={() => {
													handleRejectButton(product._id);
												}}
												size="small"
												variant="contained"
												color="error"
												sx={{ fontSize: { xs: 8, md: 14 } }}
											>
												Reject
											</Button>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</div>
	);
};

export default ProductReview;
