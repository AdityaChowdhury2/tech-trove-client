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
import AdminRoute from './AdminRoute';
import ProductReview from '../pages/Dashboard/Moderator/ProductReview';
import ReportedProduct from '../pages/Dashboard/Moderator/ReportedProduct';
import ModeratorRoute from './ModeratorRoute';
import GuestRoute from './GuestRoute';
import DashboardHome from '../pages/Dashboard/DashboardHome';
import Products from '../pages/Products';

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
			{
				path: 'products',
				element: <Products />,
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
			//common route
			{
				path: '/dashboard',
				element: <DashboardHome />,
			},
			// user routes
			{
				path: 'my-profile',
				element: (
					<GuestRoute>
						<UserProfile />
					</GuestRoute>
				),
			},
			{
				path: 'add-product',
				element: (
					<GuestRoute>
						<AddProduct />
					</GuestRoute>
				),
			},
			{
				path: 'my-products',
				element: (
					<GuestRoute>
						<MyProducts />
					</GuestRoute>
				),
			},
			// admin routes
			{
				path: 'manage-users',
				element: (
					<AdminRoute>
						<ManageUsers />
					</AdminRoute>
				),
			},
			{
				path: 'stats',
				element: (
					<AdminRoute>
						<Stats />
					</AdminRoute>
				),
			},
			{
				path: 'manage-coupons',
				element: (
					<AdminRoute>
						<ManageCoupons />
					</AdminRoute>
				),
			},
			// moderator routes
			{
				path: 'product-review',
				element: (
					<ModeratorRoute>
						<ProductReview />
					</ModeratorRoute>
				),
			},
			{
				path: 'reported-product',
				element: (
					<ModeratorRoute>
						<ReportedProduct />
					</ModeratorRoute>
				),
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
