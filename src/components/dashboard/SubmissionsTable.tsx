import React from 'react';
import {
	Mail,
	Phone,
	Building,
	Calendar,
	Eye,
	LoaderCircle,
} from 'lucide-react';
import { ContactSubmission } from './types';

interface SubmissionsTableProps {
	submissions: ContactSubmission[];
	loading: boolean;
	selectedSubmission: ContactSubmission | null;
	onSelectSubmission: (submission: ContactSubmission) => void;
	onUpdateStatus: (id: string, status: string) => void;
	formatDate: (timestamp: any) => string;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
	const getStatusStyles = (status: string) => {
		switch (status) {
			case 'new':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'read':
				return 'bg-blue-100 text-blue-800 border-blue-200';
			case 'responded':
				return 'bg-emerald-100 text-emerald-800 border-emerald-200';
			case 'archived':
				return 'bg-slate-100 text-slate-800 border-slate-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	};

	return (
		<span
			className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusStyles(
				status
			)}`}
		>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</span>
	);
};

const InterestTags: React.FC<{ interests: string[] }> = ({ interests }) => {
	if (!interests.length)
		return (
			<span className="text-slate-500 text-sm">
				No interests specified
			</span>
		);

	const visibleInterests = interests.slice(0, 2);
	const remainingCount = interests.length - 2;

	return (
		<div className="flex flex-wrap gap-1 items-center">
			{visibleInterests.map((interest, index) => (
				<span
					key={index}
					className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
				>
					{interest}
				</span>
			))}
			{remainingCount > 0 && (
				<span className="text-xs text-slate-500 font-medium">
					+{remainingCount} more
				</span>
			)}
		</div>
	);
};

const SubmissionRow: React.FC<{
	submission: ContactSubmission;
	onSelect: (submission: ContactSubmission) => void;
	onUpdateStatus: (id: string, status: string) => void;
	formatDate: (timestamp: any) => string;
}> = ({ submission, onSelect, onUpdateStatus, formatDate }) => {
	return (
		<tr className="hover:bg-slate-50 transition-colors duration-200 group">
			{/* Contact Info */}
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex flex-col space-y-1">
					<div className="text-sm font-semibold text-slate-900">
						{submission.firstName} {submission.lastName}
					</div>
					<div className="flex items-center gap-1 text-sm text-slate-600">
						<Mail className="w-3.5 h-3.5 flex-shrink-0" />
						<span className="truncate max-w-[180px]">
							{submission.email}
						</span>
					</div>
					{submission.phone && (
						<div className="flex items-center gap-1 text-sm text-slate-600">
							<Phone className="w-3.5 h-3.5 flex-shrink-0" />
							<span>{submission.phone}</span>
						</div>
					)}
				</div>
			</td>

			{/* Company */}
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center">
					{submission.company ? (
						<>
							<Building className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
							<span className="text-sm text-slate-900 truncate max-w-[140px]">
								{submission.company}
							</span>
						</>
					) : (
						<span className="text-sm text-slate-500">—</span>
					)}
				</div>
			</td>

			{/* Interests */}
			<td className="px-6 py-4">
				<InterestTags interests={submission.interests} />
			</td>

			{/* Submitted Date */}
			<td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
				<div className="flex items-center gap-1">
					<Calendar className="w-3.5 h-3.5 flex-shrink-0" />
					<span className="truncate max-w-[120px]">
						{formatDate(submission.submittedAt)}
					</span>
				</div>
			</td>

			{/* Status */}
			<td className="px-6 py-4 whitespace-nowrap">
				<StatusBadge status={submission.status} />
			</td>

			{/* Actions */}
			<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
				<div className="flex items-center gap-2">
					<button
						onClick={() => onSelect(submission)}
						className="text-blue-600 hover:text-blue-900 p-1.5 hover:bg-blue-50 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						title="View Details"
					>
						<Eye className="w-4 h-4" />
					</button>
					<select
						value={submission.status}
						onChange={(e) =>
							onUpdateStatus(submission.id, e.target.value)
						}
						className="text-xs border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white transition-colors duration-200"
					>
						<option value="new">New</option>
						<option value="read">Read</option>
						<option value="responded">Responded</option>
						<option value="archived">Archived</option>
					</select>
				</div>
			</td>
		</tr>
	);
};

export const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
	submissions,
	loading,
	selectedSubmission,
	onSelectSubmission,
	onUpdateStatus,
	formatDate,
}) => {
	if (loading) {
		return (
			<div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
				<div className="flex items-center justify-center py-16">
					<LoaderCircle className="animate-spin h-8 w-8 text-slate-600" />
					<span className="ml-3 text-slate-600 font-medium">
						Loading submissions...
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-slate-200">
					<thead className="bg-slate-50">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Contact
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Company
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Interests
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Submitted
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-slate-200">
						{submissions.length === 0 ? (
							<tr>
								<td
									colSpan={6}
									className="px-6 py-16 text-center"
								>
									<div className="flex flex-col items-center gap-2">
										<Mail className="w-12 h-12 text-slate-300" />
										<p className="text-slate-500 font-medium">
											No submissions found
										</p>
										<p className="text-sm text-slate-400">
											Try adjusting your search or filter
											criteria
										</p>
									</div>
								</td>
							</tr>
						) : (
							submissions.map((submission) => (
								<SubmissionRow
									key={submission.id}
									submission={submission}
									onSelect={onSelectSubmission}
									onUpdateStatus={onUpdateStatus}
									formatDate={formatDate}
								/>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
