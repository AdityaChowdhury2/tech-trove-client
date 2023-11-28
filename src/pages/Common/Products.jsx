import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Box, Container, Grid, Pagination, Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import ProductCard from '../../components/Home/ProductCard';
import Loading from '../../components/Shared/Loading';
import SectionHeader from '../../components/Shared/SectionHeader';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.black, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.black, 0.25),
	},
	marginLeft: 0,
	width: '250px',
	// [theme.breakpoints.up('sm')]: {
	// 	marginLeft: theme.spacing(1),
	// 	width: '250px',
	// },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

const Products = () => {
	const axiosPublic = useAxiosPublic();
	const [searchText, setSearchText] = useState('');
	const [currentPage, setCurrentPage] = useState(0);
	const {
		data = {},
		isLoading,
		refetch: refetchAllProducts,
	} = useQuery({
		queryKey: ['products', currentPage, searchText],
		queryFn: async () => {
			const response = await axiosPublic(
				`/api/v1/products?search=${searchText}&page=${currentPage}`
			);
			return response.data;
		},
	});
	const { result: products, total } = data;
	const pagesCount = Math.ceil(total / 20) || 0;

	return (
		<Box>
			<SectionHeader
				subTitle={'Find the best tech products here'}
				title={'All products'}
			/>
			<Box
				sx={{
					display: 'flex',
					mt: 5,
					justifyContent: 'center',
				}}
			>
				<Search
					onChange={e => {
						setSearchText(e.target.value);
						setCurrentPage(0);
					}}
				>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{ 'aria-label': 'search' }}
					/>
				</Search>
			</Box>
			<Container>
				<Grid container spacing={3} sx={{ marginTop: 5 }}>
					{products &&
						products.map(product => (
							<Grid key={product._id} item xs={12} md={6} xl={3}>
								<ProductCard product={product} refetch={refetchAllProducts} />
							</Grid>
						))}
				</Grid>
				{isLoading && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Loading />
					</div>
				)}

				<Stack
					alignItems={'center'}
					sx={{
						mt: 5,
					}}
				>
					<Pagination
						color="primary"
						onChange={(e, value) => setCurrentPage(value - 1)}
						// onChange={(_, value) => setCurrentPage(value - 1)}
						count={pagesCount}
					/>
				</Stack>
			</Container>
		</Box>
	);
};

export default Products;
