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
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationDialog from '../../../components/Modal/DeleteConfirmationDialog';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useDeleteProduct from '../../../hooks/useDeleteProduct';
import { Helmet } from 'react-helmet-async';

const ReportedProduct = () => {
	const navigate = useNavigate();
	const axiosSecure = useAxiosSecure();
	const { data: reports, refetch } = useQuery({
		queryKey: ['reports'],
		queryFn: async () => {
			const response = await axiosSecure('/api/v1/reports');
			return response.data;
		},
	});

	const { mutateAsync: deleteProduct } = useDeleteProduct();
	const [alertOpen, setAlertOpen] = useState(false);

	const handleAlertClickOpen = () => {
		setAlertOpen(true);
	};

	const handleAlertClose = () => {
		setAlertOpen(false);
	};
	// const { myProducts, refetch } = useMyProducts();

	const handleDelete = async productId => {
		const response = deleteProduct(productId);
		toast.promise(response, {
			loading: 'Loading',
			success: 'Product deleted successfully',
			error: 'product deletion failed',
		});
		await response
			.then(() => {
				axiosSecure.delete(`/api/v1/reports/${productId}`).then(() => {
					refetch();
				});
			})
			.finally(() => handleAlertClose());
	};
	return (
		<div>
			<Helmet>
				<title>Moderator | Reported Product ⚠</title>
			</Helmet>
			<Box height={40} />
			<Heading
				title={'Reported Product Review'}
				subHeading={'Review and Take Action on Reported Items'}
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
									align="left"
								>
									Product Name
								</TableCell>
								<TableCell
									sx={{ fontWeight: 700, color: 'primary.100' }}
									align="left"
								>
									Reported By
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
									Delete
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{reports &&
								reports.map((report, idx) => (
									<TableRow
										key={report._id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{idx + 1}
										</TableCell>
										<TableCell align="left">{report.name}</TableCell>
										<TableCell align="left">{report.email}</TableCell>
										<TableCell align="center">
											<Button
												onClick={() =>
													navigate(`/products/${report.productId}`)
												}
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
												onClick={handleAlertClickOpen}
												size="small"
												variant="contained"
												color="error"
												sx={{
													fontSize: { xs: 8, md: 12 },
												}}
											>
												Delete
											</Button>
										</TableCell>
										<DeleteConfirmationDialog
											handleClose={handleAlertClose}
											handleDelete={handleDelete}
											open={alertOpen}
											id={report.productId}
										/>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</div>
	);
};

export default ReportedProduct;
