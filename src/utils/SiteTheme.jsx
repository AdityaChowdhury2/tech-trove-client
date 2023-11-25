import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
	palette: {
		primary: {
			main: '#258193',
			50: '#bee7ef',
			100: '#7ccede',
			800: '#1D6472',
		},
		warning: {
			main: '#ffb703',
		},
	},
});

const SiteTheme = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

SiteTheme.propTypes = {
	children: PropTypes.node,
};

export default SiteTheme;
