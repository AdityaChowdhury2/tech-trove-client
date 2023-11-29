import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Shared/Loading';

const PrivateRoute = ({ children }) => {
	const location = useLocation();
	const { user, loading } = useAuth();
	if (loading) {
		return <Loading />;
	}

	if (!user) {
		return (
			<Navigate to={'/login'} state={{ from: location.pathname }} replace />
		);
	}
	return <div>{children}</div>;
};

PrivateRoute.propTypes = {
	children: PropTypes.node,
};

export default PrivateRoute;
