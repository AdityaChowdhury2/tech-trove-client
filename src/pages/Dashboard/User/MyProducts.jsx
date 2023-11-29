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
	Typography,
	Stack,
} from '@mui/material';
import Heading from '../../../components/Shared/Heading';
import useMyProducts from '../../../hooks/useMyProducts';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductsRow from '../../../components/Dashboard/User/ProductsRow';

const MyProducts = () => {
	const navigate = useNavigate();

	const { myProducts, refetch } = useMyProducts();

	console.log('Update modal open ', open);
	return (
		<div>
			<Helmet>
				<title>TechTrove | My Products</title>
			</Helmet>
			<Box height={40} />
			<Heading
				title={' My Products'}
				subHeading={'Manage and Edit Your Listed Products'}
			/>

			<Container sx={{ mt: 10, paddingX: { xs: 1, md: 3 } }}>
				{myProducts.length ? (
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
									myProducts.map((product, idx) => (
										<ProductsRow
											idx={idx}
											refetch={refetch}
											product={product}
											key={product._id}
										/>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<Stack>
						<Typography variant="h6" textAlign={'center'}>
							Don&apos;t have any listed product.
						</Typography>
						<Button
							onClick={() => {
								navigate('/dashboard/add-product');
							}}
							variant="outlined"
							sx={{ maxWidth: 'fit-content', mx: 'auto', mt: 2 }}
						>
							Add now
						</Button>
					</Stack>
				)}
			</Container>
		</div>
	);
};

export default MyProducts;
