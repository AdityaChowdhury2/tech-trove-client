import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
	palette: {
		primary: {
			main: '#36a4d4',
		},
		white: {
			main: '#f5ecec',
		},
		warning: {
			main: '#FFBB5C',
		},
		success: {
			main: '#02A147',
		},
	},
	typography: {
		body1: {
			fontFamily: 'Cantarell',
		},
		body2: {
			fontFamily: 'Cantarell',
		},

		h1: { fontFamily: 'Fjalla One, sans-serif' },
		h2: { fontFamily: 'Fjalla One, sans-serif' },
		h3: { fontFamily: 'Fjalla One, sans-serif' },
		h4: { fontFamily: 'Fjalla One, sans-serif' },
		h5: {
			fontFamily: 'Fjalla One, sans-serif',
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
