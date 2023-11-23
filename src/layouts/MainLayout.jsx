import { Outlet, ScrollRestoration } from 'react-router-dom';

const MainLayout = () => {
	return (
		<>
			<Outlet />
			<ScrollRestoration />
		</>
	);
};

export default MainLayout;
