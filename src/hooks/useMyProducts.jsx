import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useMyProducts = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const { data: myProducts = [], refetch } = useQuery({
		queryKey: ['myProducts', user?.email],
		queryFn: async () => {
			const response = await axiosSecure(
				`/api/v1/user/products/${user?.email}`
			);
			return response.data;
		},
	});
	return { myProducts, refetch };
};

export default useMyProducts;
