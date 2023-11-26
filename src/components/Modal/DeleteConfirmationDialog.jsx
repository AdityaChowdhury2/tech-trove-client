import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteConfirmationDialog = ({ open, handleClose, handleDelete, id }) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{'Warning'}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Are you sure you want to delete this? You can not revert the changes.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="contained" color="primary">
					Cancel
				</Button>
				<Button
					onClick={() => handleDelete(id)}
					autoFocus
					variant="contained"
					color="error"
				>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
};

DeleteConfirmationDialog.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
	handleDelete: PropTypes.func,
	id: PropTypes.string,
};

export default DeleteConfirmationDialog;
