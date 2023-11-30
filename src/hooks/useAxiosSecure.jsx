import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const axiosSecure = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
	withCredentials: true,
});

const useAxiosSecure = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();
	useEffect(() => {
		// const requestInterceptor = axiosSecure.interceptors.request.use(
		// 	function (config) {
		// 		// console.log(config.url);
		// 		console.log(config);
		// 		// Do something before request is sent
		// 		return config;
		// 	},
		// 	function (error) {
		// 		// Do something with request error
		// 		return Promise.reject(error);
		// 	}
		// );

		// Add a response interceptor
		const responseInterceptor = axiosSecure.interceptors.response.use(
			function (response) {
				// Any status code that lie within the range of 2xx cause this function to trigger
				// Do something with response data
				return response;
			},
			async error => {
				// Any status codes that falls outside the range of 2xx cause this function to trigger
				// Do something with response error
				console.log('Error found in interceptor ', error);
				if (error.response?.status === 401) {
					await logout();
					console.log('user Logged Out');
					toast.error('Authentication Failed');
					return Promise.reject(error);
				}
				if (error.response?.status === 403) {
					toast.error('Access Denied');
					navigate('/dashboard');
					return Promise.reject(error);
				}
				return Promise.reject(error);
			}
		);
		return () => {
			axiosSecure.interceptors.response.eject(responseInterceptor);
			// axiosSecure.interceptors.request.eject(requestInterceptor);
		};
	}, [logout, navigate]);

	return axiosSecure;
};

export default useAxiosSecure;
