import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Montserrat } from 'next/font/google';

import { siteDetails } from '@/data/siteDetails';

import '../globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: `Admin Dashboard - ${siteDetails.siteName}`,
	description: 'Admin dashboard for managing contact form submissions',
};

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${montserrat.className} antialiased bg-slate-50`}>
				{siteDetails.googleAnalyticsId && (
					<GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />
				)}
				<main className="min-h-screen">{children}</main>
			</body>
		</html>
	);
}
