import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useDeleteProduct = () => {
	const axiosSecure = useAxiosSecure();
	const { mutateAsync } = useMutation({
		mutationFn: async productId => {
			const response = await axiosSecure.delete(
				`/api/v1/user/products/${productId}`
			);
			return response.data;
		},
	});
	return { mutateAsync };
};

export default useDeleteProduct;
