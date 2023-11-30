import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import Footer from '../components/Shared/Footer';

const MainLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<ScrollRestoration />
			<Footer />
		</>
	);
};

export default MainLayout;
