import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material';
import Heading from '../../../components/Shared/Heading';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import './AddProduct.css';

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AddProduct = () => {
	const { user } = useAuth();
	const [tags, setTags] = useState([]);
	const handleDelete = i => {
		setTags(tags.filter((tag, index) => index !== i));
	};

	const handleAddition = tag => {
		setTags([...tags, tag]);
	};

	const handleTagClick = index => {
		console.log('The tag at index ' + index + ' was clicked');
	};

	return (
		<div style={{ minWidth: ' 300px' }}>
			<Box height={40} mb={5} />
			<Heading
				subHeading={'Streamlined Product Addition Process'}
				title={'Add New Product'}
			/>
			<Container>
				<Box component={'form'} sx={{ mt: 5 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								required
								type="text"
								name="productName"
								label="Product Name"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								required
								type="text"
								name="productImage"
								label="Product Image Url"
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
							/>
						</Grid>
					</Grid>
					<Stack justifyContent={'center'} marginTop={2}>
						<Button type="submit" variant="contained">
							Add Product
						</Button>
					</Stack>
				</Box>
			</Container>
		</div>
	);
};

export default AddProduct;
