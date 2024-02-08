// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect(import.meta.env.VITE_SERVER_URL);
import toast from 'react-hot-toast';

const PieChart = () => {
	// const axiosSecure = useAxiosSecure();
	// const { data: pieData } = useQuery({
	// 	queryKey: ['pieChart'],
	// 	queryFn: async () => {
	// 		const { data } = await axiosSecure('/api/v1/pie-stats');
	// 		return data;
	// 	},
	// });

	const [statsData, setStatsData] = useState();

	useEffect(() => {
		socket.connect();
		// console.log('hello');
		socket.emit('send-pie-chart', { message: '' });
		socket.emit('join_room', 2);
		socket.on('receive-pie-chart', data => {
			setStatsData(data.finalResult);
			// console.log(data, 'finalResult');

			if (data.data.message) {
				toast.success(data.data.message);
			}
			// console.log(data, ' data');
		});
		return () => {
			if (socket.readyState === 1) {
				socket.disconnect();
			}
		};
	}, [socket]);

	console.log(statsData, ' ws data');
	// console.log(pieData, ' piedata');

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
