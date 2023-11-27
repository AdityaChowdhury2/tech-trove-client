import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCoupons = () => {
	const axiosSecure = useAxiosSecure();
	const { data: coupons, refetch } = useQuery({
		queryKey: ['coupons'],
		queryFn: async () => {
			const response = await axiosSecure('/api/v1/coupons');
			return response.data;
		},
	});
	return { coupons, refetch };
};

export default useCoupons;
