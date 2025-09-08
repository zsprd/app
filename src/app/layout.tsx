import { auth } from '@auth/authJs';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import { SessionProvider } from 'next-auth/react';
import 'src/styles/index.css';
import 'src/styles/splash-screen.css';
import '../../public/assets/fonts/Geist/geist.css';
import '../../public/assets/fonts/material-design-icons/MaterialIconsOutlined.css';
import '../../public/assets/fonts/meteocons/style.css';
import '../../public/assets/styles/prism.css';
import generateMetadata from '../utils/generateMetadata';
import App from './App';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = await generateMetadata({
	title: 'ZSPRD Portfolio Analytics',
	description:
		'Institutional-grade portfolio analytics for high-net-worth investors. Track performance, analyze risk, and generate professional reports.',
	cardImage: '/card.png',
	robots: 'follow, index',
	favicon: '/favicon.ico',
	url: 'https://app.zsprd.com'
});

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta
					name="theme-color"
					content="#0a1929"
				/>
				<base href="/" />
				{/*
					manifest.json provides metadata used when your web app is added to the
					homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
				*/}
				<link
					rel="manifest"
					href="/manifest.json"
				/>
				<link
					rel="shortcut icon"
					href="/favicon.ico"
				/>
				<noscript id="emotion-insertion-point" />
			</head>
			<body
				id="root"
				className={clsx('loading', 'bg-gray-50', 'text-gray-900', 'antialiased')}
			>
				<SessionProvider session={session}>
					<App>{children}</App>
				</SessionProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
