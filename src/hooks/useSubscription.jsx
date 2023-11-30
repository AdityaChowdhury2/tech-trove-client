import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useGetSubscription = () => {
	const axiosPublic = useAxiosPublic();
	const { user } = useAuth();
	const { data = {}, refetch } = useQuery({
		queryFn: async () => {
			const response = await axiosPublic(`/api/v1/user/${user?.email}`);
			// console.log('response from subscription ', response.data);
			return response.data;
		},
		queryKey: ['user', user?.email],
	});
	return { isSubscribed: data.subscribed, refetch };
};

export default useGetSubscription;
