import { Box, Grid, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Shared/Loading';
import { Helmet } from 'react-helmet-async';
import PieChart from '../../../components/Dashboard/Admin/PieChart';
import BarChart from '../../../components/Dashboard/Admin/BarChart';

const Stats = () => {
	return (
		<div>
			<Helmet>
				<title>Admin Dashboard | Stats</title>
			</Helmet>
			<Box height={40} />
			<Grid container spacing={2}>
				<Grid item xl={6}>
					<PieChart />
				</Grid>
				<Grid item xl={6}>
					<BarChart />
				</Grid>
			</Grid>
		</div>
	);
};

export default Stats;
