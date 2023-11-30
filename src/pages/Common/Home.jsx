import { Helmet } from 'react-helmet-async';
import Banner from '../../components/Home/Banner';
import Coupons from '../../components/Home/Coupons';
import Featured from '../../components/Home/Featured';
import Footer from '../../components/Shared/Footer';
import Trending from '../../components/Home/Trending';

const Home = () => {
	return (
		<>
			<Helmet>
				<title>TechTrove | Home</title>
			</Helmet>
			<Banner />
			<Featured />
			<Trending />
			<Coupons />
		</>
	);
};

export default Home;
