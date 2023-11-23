import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import Routes from './routes/Routes.jsx';
import SiteTheme from './utils/SiteTheme.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SiteTheme>
			<RouterProvider router={Routes} />
		</SiteTheme>
	</React.StrictMode>
);
