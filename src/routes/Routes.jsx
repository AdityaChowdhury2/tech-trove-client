import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/Mainlayout';
import Login from '../pages/Common/Login/Login';
import Register from '../pages/Common/Register/Register';
import Home from '../pages/Common/Home';
import Dashboard from '../layouts/Dashboard';
import ErrorPage from '../pages/ErrorPage';
import UserProfile from '../pages/Dashboard/User/UserProfile';
import AddProduct from '../pages/Dashboard/User/AddProduct';
import MyProducts from '../pages/Dashboard/User/MyProducts';
import Stats from '../pages/Dashboard/Admin/Stats';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';
import ManageCoupons from '../pages/Dashboard/Admin/ManageCoupons';
import PrivateRoute from './PrivateRoute';

const Routes = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			// common routes
			{
				path: '/',
				element: <Home />,
			},
		],
	},
	{
		path: '/dashboard',
		element: (
			<PrivateRoute>
				<Dashboard />
			</PrivateRoute>
		),
		children: [
			// user routes
			{
				path: 'my-profile',
				element: <UserProfile />,
			},
			{
				path: 'add-product',
				element: <AddProduct />,
			},
			{
				path: 'my-products',
				element: <MyProducts />,
			},
			// admin routes
			{
				path: 'manage-users',
				element: <ManageUsers />,
			},
			{
				path: 'stats',
				element: <Stats />,
			},
			{
				path: 'manage-coupons',
				element: <ManageCoupons />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
]);

export default Routes;
