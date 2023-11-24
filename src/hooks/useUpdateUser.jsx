import { useMutation } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
const useUpdateUser = () => {
	const axiosPublic = useAxiosPublic();
	const { mutate } = useMutation({
		mutationFn: async user => {
			const response = await axiosPublic.put(
				`/api/v1/users/${user.email}`,
				user
			);
			return response.data;
		},
	});
	return { mutate };
};

export default useUpdateUser;
