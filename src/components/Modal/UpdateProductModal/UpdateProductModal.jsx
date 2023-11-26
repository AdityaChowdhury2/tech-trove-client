import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';

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
const UpdateProductModal = ({ handleClose, open }) => {
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
			<Box component={'form'} sx={{ ...style, minWidth: { xs: '300px' } }}>
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
						Update Product
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};

UpdateProductModal.propTypes = {
	handleClose: PropTypes.func,
	open: PropTypes.bool,
};

export default UpdateProductModal;
