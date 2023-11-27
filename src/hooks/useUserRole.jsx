import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useUserRole = () => {
	const axiosPublic = useAxiosPublic();
	const { user, loading } = useAuth();

	const {
		data = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['user', user?.email],
		queryFn: async () => {
			const response = await axiosPublic(`/api/v1/user/${user?.email}`);
			console.log('response from user role ', response.data);
			return response.data;
		},
		enabled: !loading && !!user?.email,
	});
	return { role: data.role, refetch, isLoading };
};

export default useUserRole;
