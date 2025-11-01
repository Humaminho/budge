import React from 'react';
import Link from 'next/link';
import { BadgeDollarSign, LogOut, ArrowLeft } from 'lucide-react';
import { User } from './types';

interface DashboardHeaderProps {
	user: User;
	onSignOut: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
	user,
	onSignOut,
}) => {
	return (
		<header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					{/* Brand and User Info */}
					<div className="flex items-center gap-3">
						<div className="p-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-md shadow-sm">
							<BadgeDollarSign className="w-7 h-7 text-slate-700" />
						</div>
						<div className="flex flex-col">
							<h1 className="text-lg font-bold text-slate-900 leading-tight">
								Budge Admin
							</h1>
							<div className="flex items-center gap-2 text-sm">
								<p className="font-medium text-slate-700 truncate max-w-[200px]">
									{user.email}
								</p>
								<span className="text-slate-400">•</span>
								<p className="text-xs text-slate-500 font-medium">
									Administrator
								</p>
							</div>
						</div>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-2">
						<Link
							href="/"
							className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
						>
							<ArrowLeft className="w-4 h-4" />
							Main Site
						</Link>
						<button
							onClick={onSignOut}
							className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
						>
							<LogOut className="w-4 h-4" />
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};
