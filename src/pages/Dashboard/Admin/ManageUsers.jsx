import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	Divider,
	TableRow,
	Button,
} from '@mui/material';
import Heading from '../../../components/Shared/Heading';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useUserRole from '../../../hooks/useUserRole';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
	const axiosPublic = useAxiosPublic();
	const { data: users = [], refetch } = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const response = await axiosPublic('/api/v1/users');
			return response.data;
		},
	});

	const { mutate } = useMutation({
		mutationFn: async ({ role, email }) => {
			console.log(role, email);
			const res = await axiosPublic.patch(`/api/v1/users/${email}`, { role });
			return res.data;
		},
		onSuccess: () => {
			refetch();
		},
	});

	return (
		<div>
			<Box height={40} />
			<Heading
				title={'User Management'}
				subHeading={'Efficiently Handle User Accounts and Permissions'}
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
									Name
								</TableCell>
								<TableCell
									sx={{ fontWeight: 700, color: 'primary.100' }}
									align="center"
								>
									Email
								</TableCell>
								<TableCell
									sx={{ fontWeight: 700, color: 'primary.100' }}
									align="center"
								>
									Action
								</TableCell>
								<TableCell
									sx={{ fontWeight: 700, color: 'primary.100' }}
									align="center"
								>
									Action
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users &&
								users.map((user, idx) => (
									<TableRow
										key={user._id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{idx + 1}
										</TableCell>
										<TableCell align="center">{user.name}</TableCell>
										<TableCell align="center">{user.email}</TableCell>
										<TableCell align="center">
											<Button
												onClick={() => {
													mutate({ role: 'moderator', email: user.email });
												}}
												size="small"
												variant="contained"
												disabled={
													user?.role === 'moderator' || user?.role === 'admin'
												}
											>
												Make Moderator
											</Button>
										</TableCell>
										<TableCell align="center">
											<Button
												onClick={() => {
													mutate({ role: 'admin', email: user.email });
												}}
												size="small"
												variant="contained"
												disabled={user?.role === 'admin'}
											>
												Make Admin
											</Button>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</div>
	);
};

export default ManageUsers;
