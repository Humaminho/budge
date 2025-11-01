import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { SearchFilters } from './types';

interface SearchAndFiltersProps {
	filters: SearchFilters;
	onSearchChange: (value: string) => void;
	onStatusFilterChange: (value: string) => void;
	onRefresh: () => void;
	isLoading?: boolean;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
	filters,
	onSearchChange,
	onStatusFilterChange,
	onRefresh,
	isLoading = false,
}) => {
	return (
		<div className="bg-white p-6 rounded-md shadow-sm border border-slate-200 mb-6">
			<div className="flex flex-col lg:flex-row gap-4">
				{/* Search Input */}
				<div className="flex-1">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
						<input
							type="text"
							placeholder="Search by name, email, company, or message..."
							value={filters.searchTerm}
							onChange={(e) => onSearchChange(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white placeholder:text-slate-400"
						/>
					</div>
				</div>

				{/* Filters */}
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2 text-slate-600">
						<Filter className="h-4 w-4" />
						<span className="text-sm font-medium">Filter:</span>
					</div>
					<select
						value={filters.statusFilter}
						onChange={(e) => onStatusFilterChange(e.target.value)}
						className="border border-slate-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-white text-sm min-w-[140px]"
					>
						<option value="all">All Status</option>
						<option value="new">New</option>
						<option value="read">Read</option>
						<option value="responded">Responded</option>
						<option value="archived">Archived</option>
					</select>
				</div>

				{/* Refresh Button */}
				<button
					onClick={onRefresh}
					disabled={isLoading}
					className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-800 disabled:bg-slate-400 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 min-w-[120px] justify-center"
				>
					{isLoading ? (
						<RefreshCw className="w-4 h-4 animate-spin" />
					) : (
						<RefreshCw className="w-4 h-4" />
					)}
					{isLoading ? 'Loading...' : 'Refresh'}
				</button>
			</div>

			{/* Active Filters Display */}
			{(filters.searchTerm || filters.statusFilter !== 'all') && (
				<div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
					<span className="text-xs text-slate-500 font-medium">
						Active filters:
					</span>
					{filters.searchTerm && (
						<span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">
							Search: "{filters.searchTerm}"
						</span>
					)}
					{filters.statusFilter !== 'all' && (
						<span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">
							Status: {filters.statusFilter}
						</span>
					)}
				</div>
			)}
		</div>
	);
};
