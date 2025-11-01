export interface ContactSubmission {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	company?: string;
	message: string;
	interests: string[];
	submittedAt: {
		seconds: number;
		nanoseconds: number;
	};
	status: 'new' | 'read' | 'responded' | 'archived';
}

export interface User {
	email: string | null;
	// Add other user properties as needed
}

export interface DashboardStats {
	total: number;
	new: number;
	responded: number;
	archived: number;
}

export interface SearchFilters {
	searchTerm: string;
	statusFilter: string;
}
