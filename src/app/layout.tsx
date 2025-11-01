import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Montserrat } from 'next/font/google';

import { siteDetails } from '@/data/siteDetails';

import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: siteDetails.metadata.title,
	description: siteDetails.metadata.description,
	openGraph: {
		title: siteDetails.metadata.title,
		description: siteDetails.metadata.description,
		url: siteDetails.siteUrl,
		type: 'website',
		images: [
			{
				url: '/images/og-image.jpg',
				width: 1200,
				height: 675,
				alt: siteDetails.siteName,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteDetails.metadata.title,
		description: siteDetails.metadata.description,
		images: ['/images/twitter-image.jpg'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${montserrat.className} antialiased`}>
				{siteDetails.googleAnalyticsId && (
					<GoogleAnalytics gaId={siteDetails.googleAnalyticsId} />
				)}
				<main>{children}</main>
			</body>
		</html>
	);
}
