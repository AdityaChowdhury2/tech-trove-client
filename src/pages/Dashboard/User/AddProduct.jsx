import {
	Box,
	Container,
	Grid,
	Input,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import Heading from '../../../components/Shared/Heading';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './AddProduct.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useGetSubscription from '../../../hooks/useSubscription';
import useMyProducts from '../../../hooks/useMyProducts';
import { uploadImage } from '../../../api/uploadImage';
import { Helmet } from 'react-helmet-async';
import { useMutation } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const AddProduct = () => {
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();
	const { isSubscribed } = useGetSubscription();
	const { myProducts } = useMyProducts();

	const { user } = useAuth();
	const [tags, setTags] = useState([]);
	const handleDelete = i => {
		setTags(tags.filter((tag, index) => index !== i));
	};

	const handleAddition = tag => {
		setTags([...tags, tag]);
	};

	const [loading, setLoading] = useState();
	const { mutateAsync: addProduct } = useMutation({
		mutationFn: async product => {
			const response = await axiosSecure.post(
				'/api/v1/products/add-product',
				product
			);
			return response.data;
		},
		onSuccess: () => {
			setTags([]);
			navigate('/dashboard/my-products');
		},
	});

	const handleAddProduct = async e => {
		e.preventDefault();
		setLoading(true);
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
		const owner = {
			name: form.owner_name,
			email: form.owner_email,
			image: form.owner_image,
		};

		productData.image = await uploadImage(formData);

		const product = { ...productData, owner };
		const toastId = toast.loading('Adding Product...');
		try {
			addProduct(product).then(() => {
				toast.success('Product added successfully', { id: toastId });
				setLoading(false);
			});
		} catch (error) {
			setLoading(false);
			toast.error(error.message, { id: toastId });
		}
	};

	return (
		<div style={{ minWidth: ' 300px' }}>
			<Helmet>
				<title>TechTrove | Add Product</title>
			</Helmet>
			<Box height={40} mb={5} />
			<Heading
				subHeading={'Streamlined Product Addition Process'}
				title={'Add New Product'}
			/>
			{!isSubscribed && !!myProducts.length && (
				<Typography
					variant="body2"
					component={'p'}
					color={'red'}
					textAlign={'center'}
					sx={{
						fontSize: '12px',
						marginTop: '10px',
					}}
				>
					Please Subscribe to add more products
				</Typography>
			)}
			<Container>
				<Box component={'form'} sx={{ mt: 5 }} onSubmit={handleAddProduct}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								required
								type="text"
								name="productName"
								label="Product Name"
							/>
						</Grid>
						<Grid item xs={12}>
							<Input
								type="file"
								color="primary"
								required
								inputProps={{ accept: 'image/*' }}
								name="image"
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
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								required
								fullWidth
								type="text"
								defaultValue={user.displayName}
								InputProps={{
									readOnly: true,
								}}
								name="owner_name"
								id="owner-name"
								label="Owner Name"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								required
								fullWidth
								type="email"
								// disabled
								InputProps={{
									readOnly: true,
								}}
								aria-readonly
								defaultValue={user.email}
								name="owner_email"
								id="owner-email"
								label="Owner Email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								type="text"
								defaultValue={user?.photoURL}
								InputProps={{
									readOnly: true,
								}}
								name="owner_image"
								id="owner-image"
								label="Owner Image"
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
									handleAddition={handleAddition}
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
							/>
						</Grid>
					</Grid>
					<Stack justifyContent={'center'} marginTop={2}>
						<LoadingButton
							loading={loading}
							disabled={!isSubscribed && !!myProducts.length}
							type="submit"
							variant="contained"
						>
							Add Product
						</LoadingButton>
					</Stack>
				</Box>
			</Container>
		</div>
	);
};

export default AddProduct;
