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

const MyProducts = () => {
	const status = 'rejected';
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
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
							<TableRow
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									1
								</TableCell>
								<TableCell align="center">Omuk lsdf</TableCell>
								<TableCell align="center">2</TableCell>
								<TableCell align="center">
									{status === 'pending' ? (
										<Badge
											badgeContent={status.toLocaleUpperCase()}
											color="warning"
										></Badge>
									) : status === 'accepted' ? (
										<Badge
											badgeContent={status.toLocaleUpperCase()}
											color="success"
										></Badge>
									) : (
										<Badge
											badgeContent={status.toLocaleUpperCase()}
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
									<Button size="small" variant="contained" color="error">
										Delete
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<UpdateProductModal handleClose={handleClose} open={open} />
			</Container>
		</div>
	);
};

export default MyProducts;
