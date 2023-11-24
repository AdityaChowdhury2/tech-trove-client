import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';

const Heading = ({ title, subHeading }) => {
	return (
		<Grid
			sx={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Typography
				textAlign={'center'}
				variant="p"
				component={'p'}
				fontSize={{ xs: 16, md: 24 }}
				fontWeight={{ xs: 600 }}
			>
				{subHeading}
			</Typography>
			<Typography
				variant="h2"
				component={'h2'}
				fontSize={{ xs: 18, md: 28 }}
				fontWeight={{ xs: 600 }}
			>
				{title}
			</Typography>
		</Grid>
	);
};

Heading.propTypes = {
	title: PropTypes.string,
	subHeading: PropTypes.string,
};

export default Heading;
