import React from 'react';
import Link from 'next/link';
import { BadgeDollarSign } from 'lucide-react';

interface BrandHeaderProps {
	title: string;
	subtitle?: string;
	showMainSiteLink?: boolean;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
	title,
	subtitle,
	showMainSiteLink = true,
}) => {
	return (
		<div className="text-center">
			<Link href="/" className="inline-flex items-center gap-3 group">
				<div className="p-3 bg-white rounded-md shadow-sm group-hover:shadow-md transition-all duration-200">
					<BadgeDollarSign className="w-8 h-8 text-slate-700" />
				</div>
				<span className="text-3xl font-bold text-slate-900">Budge</span>
			</Link>
			<h1 className="mt-6 text-2xl font-semibold text-slate-900">
				{title}
			</h1>
			{subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
			{showMainSiteLink && (
				<div className="mt-4">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
					>
						← Back to Main Site
					</Link>
				</div>
			)}
		</div>
	);
};
