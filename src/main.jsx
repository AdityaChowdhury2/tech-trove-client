import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import Routes from './routes/Routes.jsx';
import SiteTheme from './utils/SiteTheme.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './providers/AuthProvider.jsx';

import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SiteTheme>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={Routes} />
					<Toaster />
				</QueryClientProvider>
			</AuthProvider>
		</SiteTheme>
	</React.StrictMode>
);
