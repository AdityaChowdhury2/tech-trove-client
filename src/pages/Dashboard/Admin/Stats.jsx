import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import Loading from '../../../components/Shared/Loading';
import { Helmet } from 'react-helmet-async';

const Stats = () => {
	const axiosSecure = useAxiosSecure();
	const { data: statsData, isLoading } = useQuery({
		queryKey: ['pieChart'],
		queryFn: async () => {
			const response = await axiosSecure('/api/v1/pie-stats');
			const data = [
				{
					name: 'Users',
					value: response.data.totalUsers,
				},
				{
					name: 'Products',
					value: response.data.totalProducts,
				},
				{
					name: 'Reviews',
					value: response.data.totalReviews,
				},
			];
			return data;
		},
	});

	const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

	const RADIAN = Math.PI / 180;
	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor={x > cx ? 'start' : 'end'}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};

	return (
		<div>
			<Helmet>
				<title>Admin Dashboard | Stats</title>
			</Helmet>
			<Box height={40} />
			{isLoading ? (
				<Loading />
			) : (
				<PieChart width={400} height={400}>
					<Pie
						data={statsData}
						cx="50%"
						cy="50%"
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={80}
						fill="#8884d8"
						dataKey="value"
					>
						{statsData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Legend />
				</PieChart>
			)}
		</div>
	);
};

export default Stats;
