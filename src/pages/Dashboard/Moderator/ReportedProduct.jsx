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

const ReportedProduct = () => {
	return (
		<div>
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
							<TableRow
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									1
								</TableCell>
								<TableCell align="left">Omuk lsdf</TableCell>
								<TableCell align="center">
									<Button size="small" variant="contained" color="success">
										View Details
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
			</Container>
		</div>
	);
};

export default ReportedProduct;
