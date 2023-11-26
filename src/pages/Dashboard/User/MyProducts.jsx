import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Badge,
} from '@mui/material';
import Heading from '../../../components/Shared/Heading';
import { useState } from 'react';
import UpdateProductModal from '../../../components/Modal/UpdateProductModal/UpdateProductModal';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import DeleteConfirmationDialog from '../../../components/Modal/DeleteConfirmationDialog';
import useMyProducts from '../../../hooks/useMyProducts';

const MyProducts = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [alertOpen, setAlertOpen] = useState(false);

	const handleAlertClickOpen = () => {
		setAlertOpen(true);
	};

	const handleAlertClose = () => {
		setAlertOpen(false);
	};
	const { myProducts, refetch } = useMyProducts();

	const handleDelete = async productId => {
		const toastId = toast.loading('Deleting Product...');
		const response = await axiosSecure.delete(
			`/api/v1/user/products/${productId}`
		);
		if (response.data.deletedCount) {
			toast.success('Product deleted successfully', { id: toastId });
			refetch();
			handleAlertClose();
		} else {
			toast.error('Deleting Failed', { id: toastId });
		}
	};

	return (
		<div>
			<Box height={40} />
			<Heading
				title={' My Products'}
				subHeading={'Manage and Edit Your Listed Products'}
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
									Votes
								</TableCell>
								<TableCell
									sx={{ fontWeight: 700, color: 'primary.100' }}
									align="center"
								>
									Status
								</TableCell>
								<TableCell
									sx={{ fontWeight: 700, color: 'primary.100' }}
									align="center"
								>
									Update
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
							{myProducts &&
								myProducts.map(product => (
									<TableRow
										key={product._id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											1
										</TableCell>
										<TableCell align="center">{product.name}</TableCell>
										<TableCell align="center">{product?.upvote || 0}</TableCell>
										<TableCell align="center">
											{product.status === 'pending' ? (
												<Badge
													badgeContent={product.status.toLocaleUpperCase()}
													color="warning"
												></Badge>
											) : product.status === 'accepted' ? (
												<Badge
													badgeContent={product.status.toLocaleUpperCase()}
													color="success"
												></Badge>
											) : (
												<Badge
													badgeContent={product.status.toLocaleUpperCase()}
													color="error"
												></Badge>
											)}
										</TableCell>
										<TableCell align="center">
											<Button
												onClick={handleOpen}
												size="small"
												variant="contained"
												color="success"
											>
												Update
											</Button>
										</TableCell>
										<TableCell align="center">
											<Button
												onClick={() => handleAlertClickOpen()}
												size="small"
												variant="contained"
												color="error"
											>
												Delete
											</Button>
										</TableCell>
										<UpdateProductModal
											handleClose={handleClose}
											open={open}
											refetch={refetch}
											product={product}
										/>
										<DeleteConfirmationDialog
											handleClose={handleAlertClose}
											handleDelete={handleDelete}
											open={alertOpen}
											id={product._id}
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

export default MyProducts;
