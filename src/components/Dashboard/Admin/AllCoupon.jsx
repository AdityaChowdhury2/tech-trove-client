import PropTypes from 'prop-types';
import { Edit } from '@mui/icons-material';
import {
	Box,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useState } from 'react';
import DeleteConfirmationDialog from '../../Modal/DeleteConfirmationDialog';

const AllCoupon = ({
	coupons,
	handleUpdateForm,
	handleSelectedCoupon,
	selectedCoupon,
	deleteCoupon,
}) => {
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleDelete = code => {
		const addCouponPromise = deleteCoupon(code);
		toast.promise(
			addCouponPromise,
			{
				loading: 'Loading',
				success: () => `Successfully deleted`,
				error: () => `An error has occurred`,
			},
			{
				success: {
					duration: 5000,
					icon: '🔥',
				},
			}
		);
		handleClose();
	};
	return (
		<Box mt={3}>
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
								Code
							</TableCell>
							<TableCell
								sx={{ fontWeight: 700, color: 'primary.100' }}
								align="center"
							>
								Expiry Date
							</TableCell>
							<TableCell
								sx={{ fontWeight: 700, color: 'primary.100' }}
								align="center"
							>
								Amount
							</TableCell>
							<TableCell
								sx={{ fontWeight: 700, color: 'primary.100' }}
								align="center"
							>
								Edit
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
						{coupons?.length &&
							coupons.map((coupon, idx) => (
								<TableRow
									key={coupon._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{idx + 1}
									</TableCell>
									<TableCell align="center">{coupon.code}</TableCell>
									<TableCell align="center">
										{format(new Date(coupon.expiryDate), 'do MMM, yyyy')}
									</TableCell>
									<TableCell align="center">{coupon.discount_amount}</TableCell>
									<TableCell align="center">
										<Button
											size="small"
											disabled={
												selectedCoupon?._id && coupon._id !== selectedCoupon._id
											}
											variant="contained"
											onClick={() => {
												handleSelectedCoupon(coupon);
												handleUpdateForm();
											}}
										>
											<Edit />
										</Button>
									</TableCell>
									<TableCell align="center">
										<Button
											onClick={() => {
												handleOpen();
												// handleDelete(coupon.code);
											}}
											size="small"
											variant="contained"
											color="error"
										>
											<DeleteForeverIcon />
										</Button>
									</TableCell>
									<DeleteConfirmationDialog
										handleClose={handleClose}
										handleDelete={handleDelete}
										id={coupon.code}
										open={open}
									/>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

AllCoupon.propTypes = {
	coupons: PropTypes.array,
	handleUpdateForm: PropTypes.func,
	handleSelectedCoupon: PropTypes.func,
	selectedCoupon: PropTypes.object,
	deleteCoupon: PropTypes.func,
};

export default AllCoupon;
