import { Box } from '@mui/material';
import SectionHeader from '../../components/Shared/SectionHeader';
import useAuth from '../../hooks/useAuth';

const DashboardHome = () => {
	const { user } = useAuth();
	return (
		<div>
			<Box height={100} />
			<SectionHeader
				subTitle={`See your account Summary`}
				title={`Welcome ${user.displayName}`}
			/>
		</div>
	);
};

export default DashboardHome;
