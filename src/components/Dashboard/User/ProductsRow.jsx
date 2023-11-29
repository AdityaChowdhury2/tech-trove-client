import PropTypes from 'prop-types';
import { TableCell, TableRow, Button, Badge } from '@mui/material';
import { useState } from 'react';
import UpdateProductModal from '../../Modal/UpdateProductModal/UpdateProductModal';
import DeleteConfirmationDialog from '../../Modal/DeleteConfirmationDialog';
import useDeleteProduct from '../../../hooks/useDeleteProduct';
import toast from 'react-hot-toast';

const ProductsRow = ({ product, idx, refetch }) => {
	const [alertOpen, setAlertOpen] = useState(false);
	const { mutateAsync: deleteProduct } = useDeleteProduct();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleAlertClickOpen = () => {
		setAlertOpen(true);
	};
	const handleAlertClose = () => {
		setAlertOpen(false);
	};

	const handleDelete = async productId => {
		const response = deleteProduct(productId);
		toast.promise(response, {
			loading: 'Loading',
			success: 'Product deleted successfully',
			error: 'product deletion failed',
		});
		await response
			.then(() => {
				refetch();
			})
			.finally(() => handleAlertClose());
	};
	return (
		<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell component="th" scope="row">
				{idx + 1}
			</TableCell>
			<TableCell align="center">{product.name}</TableCell>
			<TableCell align="center">{product?.upvote_count}</TableCell>
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
				product={product}
				refetch={refetch}
			/>
			<DeleteConfirmationDialog
				handleClose={handleAlertClose}
				handleDelete={handleDelete}
				open={alertOpen}
				id={product._id}
			/>
		</TableRow>
	);
};

ProductsRow.propTypes = {
	product: PropTypes.object,
	idx: PropTypes.number,
	refetch: PropTypes.func,
};

export default ProductsRow;
