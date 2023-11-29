import { useParams } from 'react-router-dom';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGetProductDetails = id => {
	const { productId } = useParams();
	const axiosSecure = useAxiosSecure();
	console.log(id, productId);
	const {
		data: product = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['productDetails'],
		queryFn: async () => {
			const { data } = await axiosSecure(`/api/v1/products/${productId || id}`);
			return data;
		},
	});
	return { product, isLoading, refetch };
};

export default useGetProductDetails;
