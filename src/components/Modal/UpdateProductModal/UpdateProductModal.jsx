import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'primary.50',
	border: 'none',
	boxShadow: 24,
	p: 4,
	borderRadius: '5px',
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const UpdateProductModal = ({ handleClose, open, refetch, product }) => {
	const axiosSecure = useAxiosSecure();

	const [tags, setTags] = useState([]);
	useEffect(() => {
		setTags(product.tags);
	}, [product?.tags]);

	const handleDelete = i => {
		setTags(tags.filter((tag, index) => index !== i));
	};

	const handleAddition = tag => {
		setTags([...tags, tag]);
	};

	const handleTagClick = index => {
		console.log('The tag at index ' + index + ' was clicked');
	};
	console.log(tags);
	const handleProductUpdate = async e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const form = {};
		for (const data of formData.entries()) {
			form[data[0]] = data[1];
		}
		const productData = {
			name: form.productName,
			image: form.productImage,
			pageUrl: form.productPageLink,
			description: form.description,
			tags,
		};
		const toastId = toast.loading('Updating Product...');
		try {
			const response = await axiosSecure.patch(
				`/api/v1/user/products/${product?._id}`,
				productData
			);
			if (response.data.modifiedCount) {
				toast.success('Product Updated successfully', { id: toastId });
				e.target.reset();
				handleClose();
				refetch();
			} else toast.error('Product update failed', { id: toastId });
		} catch (error) {
			toast.error(error.message, { id: toastId });
		}
	};

	return (
		// <></>
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5em',
			}}
		>
			<Box
				component={'form'}
				sx={{ ...style, minWidth: { xs: '300px' } }}
				onSubmit={handleProductUpdate}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							type="text"
							name="productName"
							label="Product Name"
							defaultValue={product.name}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							type="text"
							name="productImage"
							label="Product Image Url"
							defaultValue={product.image}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							type="text"
							name="description"
							id="description"
							label="Description"
							defaultValue={product.description}
						/>
					</Grid>
					<Grid item xs={12}>
						<div style={{ width: '100%' }}>
							<label htmlFor="tags">Tags*</label>
							<ReactTags
								classNames={{
									tags: 'tagsClass',
									tagInput: 'tagInputClass',
									tagInputField: 'tagInputFieldClass',
									selected: 'selectedClass',
									tag: 'tagClass',
									remove: 'removeClass',
								}}
								tags={tags}
								id="tags"
								delimiters={delimiters}
								handleDelete={handleDelete}
								allowDragDrop={false}
								handleAddition={handleAddition}
								handleTagClick={handleTagClick}
								inputFieldPosition="bottom"
								placeholder="Enter tags for your Product"
							/>
						</div>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							type="text"
							name="productPageLink"
							id="productPageLink"
							label="Product Website Link"
							defaultValue={product.pageUrl}
						/>
					</Grid>
				</Grid>
				<Stack justifyContent={'center'} marginTop={2}>
					<Button type="submit" variant="contained">
						Update Product
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};

UpdateProductModal.propTypes = {
	handleClose: PropTypes.func,
	refetch: PropTypes.func,
	open: PropTypes.bool,
	product: PropTypes.object,
};

export default UpdateProductModal;
