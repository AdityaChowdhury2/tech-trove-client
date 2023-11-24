import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Shared/Loading';
import { Box } from '@mui/material';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = ({ children }) => {
	const location = useLocation();
	const { loading } = useAuth();
	const { role, isLoading } = useUserRole();
	if (isLoading || loading) {
		return (
			<Box
				style={{
					display: 'flex',
					alignItems: 'center',
					height: '50vh',
					justifyContent: 'center',
				}}
			>
				<Loading />
			</Box>
		);
	}

	if (role === 'admin') {
		return <div>{children}</div>;
	}
	return (
		<Navigate to={'/dashboard'} state={{ from: location.pathname }} replace />
	);
};

AdminRoute.propTypes = {
	children: PropTypes.node,
};

export default AdminRoute;
