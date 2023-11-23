import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/Mainlayout';
import Login from '../pages/Common/Login/Login';
import Register from '../pages/Common/Register/Register';
import Home from '../pages/Common/Home';

const Routes = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			// common routes
			{
				path: '/',
				element: <Home />,
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
