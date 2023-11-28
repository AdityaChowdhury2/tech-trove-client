import Banner from '../../components/Home/Banner';
import Coupons from '../../components/Home/Coupons';
import Featured from '../../components/Home/Featured';
import Trending from '../../components/Home/Trending';

const Home = () => {
	return (
		<>
			<Banner />
			<Featured />
			<Trending />
			<Coupons />
		</>
	);
};

export default Home;
