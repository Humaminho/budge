import React from 'react';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	startIndex: number;
	onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	startIndex,
	onPageChange,
}) => {
	if (totalPages <= 1) return null;

	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
	const showingText = `Showing ${
		startIndex + 1
	} to ${endIndex} of ${totalItems} results`;

	const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	const goToFirstPage = () => goToPage(1);
	const goToLastPage = () => goToPage(totalPages);
	const goToPreviousPage = () => goToPage(currentPage - 1);
	const goToNextPage = () => goToPage(currentPage + 1);

	// Generate page numbers to show
	const getPageNumbers = () => {
		const pages = [];
		const delta = 2; // Number of pages to show on each side of current page

		// Always show first page
		if (1 < currentPage - delta) {
			pages.push(1);
			if (2 < currentPage - delta) {
				pages.push('...');
			}
		}

		// Show pages around current page
		for (
			let i = Math.max(1, currentPage - delta);
			i <= Math.min(totalPages, currentPage + delta);
			i++
		) {
			pages.push(i);
		}

		// Always show last page
		if (totalPages > currentPage + delta) {
			if (totalPages - 1 > currentPage + delta) {
				pages.push('...');
			}
			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<div className="bg-white px-6 py-4 flex items-center justify-between border-t border-slate-200">
			{/* Mobile Pagination */}
			<div className="flex-1 flex justify-between sm:hidden">
				<button
					onClick={goToPreviousPage}
					disabled={currentPage === 1}
					className="relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
				>
					Previous
				</button>
				<button
					onClick={goToNextPage}
					disabled={currentPage === totalPages}
					className="ml-3 relative inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
				>
					Next
				</button>
			</div>

			{/* Desktop Pagination */}
			<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-slate-700">{showingText}</p>
				</div>
				<div>
					<nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
						{/* First Page */}
						<button
							onClick={goToFirstPage}
							disabled={currentPage === 1}
							className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
							title="First page"
						>
							<ChevronsLeft className="w-4 h-4" />
						</button>

						{/* Previous Page */}
						<button
							onClick={goToPreviousPage}
							disabled={currentPage === 1}
							className="relative inline-flex items-center px-3 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
							title="Previous page"
						>
							<ChevronLeft className="w-4 h-4" />
						</button>

						{/* Page Numbers */}
						{getPageNumbers().map((page, index) => (
							<React.Fragment key={index}>
								{page === '...' ? (
									<span className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">
										...
									</span>
								) : (
									<button
										onClick={() => goToPage(page as number)}
										className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 ${
											currentPage === page
												? 'z-10 bg-slate-900 border-slate-900 text-white'
												: 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50'
										}`}
									>
										{page}
									</button>
								)}
							</React.Fragment>
						))}

						{/* Next Page */}
						<button
							onClick={goToNextPage}
							disabled={currentPage === totalPages}
							className="relative inline-flex items-center px-3 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
							title="Next page"
						>
							<ChevronRight className="w-4 h-4" />
						</button>

						{/* Last Page */}
						<button
							onClick={goToLastPage}
							disabled={currentPage === totalPages}
							className="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
							title="Last page"
						>
							<ChevronsRight className="w-4 h-4" />
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
};
