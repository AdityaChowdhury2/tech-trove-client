import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ReactApexChart from 'react-apexcharts';

const BarChart = () => {
	const axiosSecure = useAxiosSecure();
	const { data: statsData } = useQuery({
		queryKey: ['barChart'],
		queryFn: async () => {
			const response = await axiosSecure('/api/v1/bar-chart');
			console.log(response.data);
			return response.data;
		},
	});
	const series = [
		{
			data: statsData?.data,
		},
	];
	const options = {
		chart: {
			type: 'bar',
			height: 350,
		},
		plotOptions: {
			bar: {
				borderRadius: 4,
				// horizontal: true,
			},
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: { categories: statsData?.categories },
	};
	console.log(statsData);
	return (
		<div>
			{statsData && (
				<ReactApexChart
					options={options}
					series={series}
					type="bar"
					height={350}
				/>
			)}
		</div>
	);
};

export default BarChart;
