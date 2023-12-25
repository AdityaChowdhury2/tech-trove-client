import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
// import socketIOClient from 'socket.io-client';

const PieChart = () => {
	const axiosSecure = useAxiosSecure();
	const { data: statsData } = useQuery({
		queryKey: ['pieChart'],
		queryFn: async () => {
			const { data } = await axiosSecure('/api/v1/pie-stats');
			return data;
		},
	});

	// const [statsData, setStatsData] = useState({});

	// useEffect(() => {
	// 	const socket = socketIOClient('http://localhost:5000/api/v1/pie-stats');
	// 	socket.on('connection', data => {
	// 		setStatsData(data);
	// 	});
	// }, []);

	const series = statsData?.series;
	const options = {
		chart: {
			width: 380,
			type: 'pie',
		},
		labels: statsData?.labels,
		legend: {
			position: 'bottom',
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200,
					},
					legend: {
						position: 'bottom',
					},
				},
			},
		],
	};
	return (
		<Box mt={2}>
			<Typography textAlign={'center'} variant="h4" fontSize={'20px'}>
				Users, Product And Review
			</Typography>
			{statsData && (
				<ReactApexChart
					options={options}
					series={series}
					type="pie"
					width={380}
				/>
			)}
		</Box>
	);
};

export default PieChart;
