import React from 'react';
import {
	Mail,
	Clock,
	CheckCircle,
	Archive,
	TrendingUp,
	TrendingDown,
} from 'lucide-react';
import { DashboardStats } from './types';

interface StatsOverviewProps {
	stats: DashboardStats;
}

interface StatCardProps {
	title: string;
	value: number;
	icon: React.ReactNode;
	color: string;
	trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({
	title,
	value,
	icon,
	color,
	trend,
}) => {
	const getColorClasses = (color: string) => {
		const colorMap = {
			blue: {
				iconBg: 'bg-blue-50',
				iconColor: 'text-blue-600',
				valueColor: 'text-slate-900',
			},
			amber: {
				iconBg: 'bg-amber-50',
				iconColor: 'text-amber-600',
				valueColor: 'text-slate-900',
			},
			emerald: {
				iconBg: 'bg-emerald-50',
				iconColor: 'text-emerald-600',
				valueColor: 'text-slate-900',
			},
			slate: {
				iconBg: 'bg-slate-50',
				iconColor: 'text-slate-600',
				valueColor: 'text-slate-900',
			},
		};
		return colorMap[color as keyof typeof colorMap] || colorMap.slate;
	};

	const colors = getColorClasses(color);

	return (
		<div className="bg-white p-6 rounded-md shadow-sm border border-slate-200 transition-all duration-300">
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<div className={`p-3 ${colors.iconBg} rounded-md mr-4`}>
						{icon}
					</div>
					<div>
						<p className="text-sm font-medium text-slate-600 mb-1">
							{title}
						</p>
						<p
							className={`text-3xl font-bold ${colors.valueColor} leading-none`}
						>
							{value.toLocaleString()}
						</p>
					</div>
				</div>
				{trend && (
					<div
						className={`flex items-center ${
							trend === 'up'
								? 'text-emerald-600'
								: trend === 'down'
								? 'text-red-600'
								: 'text-slate-400'
						}`}
					>
						{trend === 'up' ? (
							<TrendingUp className="w-4 h-4" />
						) : trend === 'down' ? (
							<TrendingDown className="w-4 h-4" />
						) : null}
					</div>
				)}
			</div>
		</div>
	);
};

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<StatCard
				title="Total Submissions"
				value={stats.total}
				icon={<Mail className="w-6 h-6" />}
				color="blue"
			/>
			<StatCard
				title="New"
				value={stats.new}
				icon={<Clock className="w-6 h-6" />}
				color="amber"
				trend={stats.new > 0 ? 'up' : 'neutral'}
			/>
			<StatCard
				title="Responded"
				value={stats.responded}
				icon={<CheckCircle className="w-6 h-6" />}
				color="emerald"
			/>
			<StatCard
				title="Archived"
				value={stats.archived}
				icon={<Archive className="w-6 h-6" />}
				color="slate"
			/>
		</div>
	);
};
