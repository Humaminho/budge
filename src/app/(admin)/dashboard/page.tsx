'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOutAdmin, onAuthStateChange } from '@/lib/auth';
import { getContactSubmissions, updateSubmissionStatus } from '@/lib/firestore';
import { LoaderCircle } from 'lucide-react';
import {
	DashboardHeader,
	StatsOverview,
	SearchAndFilters,
	SubmissionsTable,
	Pagination,
	SubmissionModal,
	ContactSubmission,
	User,
	DashboardStats,
	SearchFilters,
} from '@/components/dashboard';

const AdminDashboard: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [filters, setFilters] = useState<SearchFilters>({
		searchTerm: '',
		statusFilter: 'all',
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedSubmission, setSelectedSubmission] =
		useState<ContactSubmission | null>(null);
	const router = useRouter();

	const itemsPerPage = 10;

	useEffect(() => {
		// Check authentication
		const unsubscribe = onAuthStateChange((user) => {
			if (!user) {
				router.push('/login');
			} else {
				setUser(user);
				loadSubmissions();
			}
		});

		return () => unsubscribe();
	}, [router]);

	const loadSubmissions = async (showRefreshing = false) => {
		try {
			if (showRefreshing) {
				setRefreshing(true);
			} else {
				setLoading(true);
			}
			const data = await getContactSubmissions();
			setSubmissions(data);
		} catch (error) {
			console.error('Error loading submissions:', error);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOutAdmin();
			router.push('/login');
		} catch (error) {
			console.error('Sign out error:', error);
		}
	};

	const updateStatus = async (id: string, status: string) => {
		try {
			await updateSubmissionStatus(id, status);
			await loadSubmissions(); // Refresh data
		} catch (error) {
			console.error('Error updating status:', error);
		}
	};

	const formatDate = (
		timestamp: { seconds: number; nanoseconds: number } | undefined
	) => {
		if (!timestamp) return 'N/A';
		const date = new Date(timestamp.seconds * 1000);
		return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
	};

	// Filter handlers
	const handleSearchChange = (value: string) => {
		setFilters((prev) => ({ ...prev, searchTerm: value }));
		setCurrentPage(1); // Reset to first page when searching
	};

	const handleStatusFilterChange = (value: string) => {
		setFilters((prev) => ({ ...prev, statusFilter: value }));
		setCurrentPage(1); // Reset to first page when filtering
	};

	const handleRefresh = () => {
		loadSubmissions(true);
	};

	// Filter and search submissions
	const filteredSubmissions = submissions.filter((submission) => {
		const matchesSearch =
			filters.searchTerm === '' ||
			`${submission.firstName} ${submission.lastName}`
				.toLowerCase()
				.includes(filters.searchTerm.toLowerCase()) ||
			submission.email
				.toLowerCase()
				.includes(filters.searchTerm.toLowerCase()) ||
			submission.company
				?.toLowerCase()
				.includes(filters.searchTerm.toLowerCase()) ||
			submission.message
				.toLowerCase()
				.includes(filters.searchTerm.toLowerCase());

		const matchesStatus =
			filters.statusFilter === 'all' ||
			submission.status === filters.statusFilter;

		return matchesSearch && matchesStatus;
	});

	// Calculate stats
	const stats: DashboardStats = {
		total: submissions.length,
		new: submissions.filter((s) => s.status === 'new').length,
		responded: submissions.filter((s) => s.status === 'responded').length,
		archived: submissions.filter((s) => s.status === 'archived').length,
	};

	// Pagination
	const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedSubmissions = filteredSubmissions.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	if (!user) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<LoaderCircle className="animate-spin h-12 w-12 text-slate-600" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-50">
			{/* Header */}
			<DashboardHeader user={user!} onSignOut={handleSignOut} />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Stats Overview */}
				<StatsOverview stats={stats} />

				{/* Filters and Search */}
				<SearchAndFilters
					filters={filters}
					onSearchChange={handleSearchChange}
					onStatusFilterChange={handleStatusFilterChange}
					onRefresh={handleRefresh}
					isLoading={refreshing}
				/>

				{/* Submissions Table */}
				<div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
					<SubmissionsTable
						submissions={paginatedSubmissions}
						loading={loading}
						selectedSubmission={selectedSubmission}
						onSelectSubmission={setSelectedSubmission}
						onUpdateStatus={updateStatus}
						formatDate={formatDate}
					/>

					{/* Pagination */}
					{totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							totalItems={filteredSubmissions.length}
							itemsPerPage={itemsPerPage}
							startIndex={startIndex}
							onPageChange={setCurrentPage}
						/>
					)}
				</div>
			</div>

			{/* Submission Details Modal */}
			<SubmissionModal
				submission={selectedSubmission}
				isOpen={!!selectedSubmission}
				onClose={() => setSelectedSubmission(null)}
				formatDate={formatDate}
			/>
		</div>
	);
};

export default AdminDashboard;
