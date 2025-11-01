import React from 'react';
import {
	X,
	Mail,
	Phone,
	Building,
	Calendar,
	User,
	MessageSquare,
} from 'lucide-react';
import { ContactSubmission } from './types';

interface SubmissionModalProps {
	submission: ContactSubmission | null;
	isOpen: boolean;
	onClose: () => void;
	formatDate: (timestamp: any) => string;
}

const ModalField: React.FC<{
	label: string;
	value: string | React.ReactNode;
	icon?: React.ReactNode;
}> = ({ label, value, icon }) => (
	<div className="space-y-2">
		<label className="text-sm font-medium text-slate-600 flex items-center gap-2">
			{icon}
			{label}
		</label>
		<div className="text-slate-900 font-medium">{value}</div>
	</div>
);

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
	submission,
	isOpen,
	onClose,
	formatDate,
}) => {
	if (!isOpen || !submission) return null;

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
			onClick={handleBackdropClick}
		>
			<div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex justify-between items-center p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
					<div>
						<h3 className="text-xl font-semibold text-slate-900 mb-1">
							Contact Submission Details
						</h3>
						<p className="text-sm text-slate-600">
							Submitted {formatDate(submission.submittedAt)}
						</p>
					</div>
					<button
						onClick={onClose}
						className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
						aria-label="Close modal"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					{/* Personal Information */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<ModalField
							label="First Name"
							value={submission.firstName}
							icon={<User className="w-4 h-4" />}
						/>
						<ModalField
							label="Last Name"
							value={submission.lastName}
							icon={<User className="w-4 h-4" />}
						/>
					</div>

					{/* Contact Information */}
					<div className="space-y-4">
						<ModalField
							label="Email"
							value={
								<a
									href={`mailto:${submission.email}`}
									className="text-blue-600 hover:text-blue-800 underline"
								>
									{submission.email}
								</a>
							}
							icon={<Mail className="w-4 h-4" />}
						/>

						{submission.phone && (
							<ModalField
								label="Phone"
								value={
									<a
										href={`tel:${submission.phone}`}
										className="text-blue-600 hover:text-blue-800 underline"
									>
										{submission.phone}
									</a>
								}
								icon={<Phone className="w-4 h-4" />}
							/>
						)}

						{submission.company && (
							<ModalField
								label="Company"
								value={submission.company}
								icon={<Building className="w-4 h-4" />}
							/>
						)}
					</div>

					{/* Interests */}
					<div className="space-y-3">
						<label className="text-sm font-medium text-slate-600 flex items-center gap-2">
							<MessageSquare className="w-4 h-4" />
							Interests
						</label>
						{submission.interests.length > 0 ? (
							<div className="flex flex-wrap gap-2">
								{submission.interests.map((interest, index) => (
									<span
										key={index}
										className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
									>
										{interest}
									</span>
								))}
							</div>
						) : (
							<p className="text-slate-500 italic">
								No specific interests mentioned
							</p>
						)}
					</div>

					{/* Message */}
					<div className="space-y-3">
						<label className="text-sm font-medium text-slate-600 flex items-center gap-2">
							<MessageSquare className="w-4 h-4" />
							Message
						</label>
						<div className="bg-slate-50 rounded-md p-4 border border-slate-200">
							<p className="text-slate-900 whitespace-pre-wrap leading-relaxed text-sm">
								{submission.message}
							</p>
						</div>
					</div>

					{/* Status */}
					<div className="space-y-2 pt-4 border-t border-slate-200">
						<label className="text-sm font-medium text-slate-600">
							Status
						</label>
						<div className="flex items-center gap-2">
							<span
								className={`inline-flex px-3 py-1.5 text-sm font-semibold rounded-full ${
									submission.status === 'new'
										? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
										: submission.status === 'read'
										? 'bg-blue-100 text-blue-800 border border-blue-200'
										: submission.status === 'responded'
										? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
										: 'bg-slate-100 text-slate-800 border border-slate-200'
								}`}
							>
								{submission.status.charAt(0).toUpperCase() +
									submission.status.slice(1)}
							</span>
							<span className="text-sm text-slate-500">
								<Calendar className="w-4 h-4 inline mr-1" />
								{formatDate(submission.submittedAt)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
