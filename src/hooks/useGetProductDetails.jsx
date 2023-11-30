import { useParams } from 'react-router-dom';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useGetProductDetails = () => {
	const { productId } = useParams();
	const axiosSecure = useAxiosSecure();
	const { user, loading } = useAuth();
	const {
		data: product = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['productDetails'],
		enabled: !!user && !loading && !!productId,
		queryFn: async () => {
			const { data } = await axiosSecure(`/api/v1/products/${productId}`);
			return data;
		},
	});
	return { product, isLoading, refetch };
};

export default useGetProductDetails;
