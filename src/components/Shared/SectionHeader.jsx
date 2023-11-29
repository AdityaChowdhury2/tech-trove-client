import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

const SectionHeader = ({ title, subTitle }) => {
	return (
		<div style={{ maxWidth: '520px', margin: 'auto' }}>
			<Stack spacing={2}>
				<Typography align="center" variant="h4" component="h3">
					{title}
				</Typography>
				<Typography align="center" variant="body2" component={'small'}>
					{subTitle}
				</Typography>
			</Stack>
		</div>
	);
};

SectionHeader.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
};
export default SectionHeader;
