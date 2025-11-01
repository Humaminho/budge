import React from 'react';
import { AlertCircle, Shield } from 'lucide-react';

interface SecurityNoticeProps {
	title?: string;
	message: string;
	variant?: 'warning' | 'info' | 'danger';
	icon?: React.ReactNode;
}

export const SecurityNotice: React.FC<SecurityNoticeProps> = ({
	title = 'Security Notice',
	message,
	variant = 'warning',
	icon,
}) => {
	const styles = {
		warning: {
			container: 'bg-amber-50 border border-amber-200',
			icon: 'text-amber-600',
			text: 'text-amber-800',
		},
		info: {
			container: 'bg-blue-50 border border-blue-200',
			icon: 'text-blue-600',
			text: 'text-blue-800',
		},
		danger: {
			container: 'bg-red-50 border border-red-200',
			icon: 'text-red-600',
			text: 'text-red-800',
		},
	};

	const style = styles[variant];
	const displayIcon = icon || (
		<AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
	);

	return (
		<div className={`p-4 rounded-md ${style.container}`}>
			<div className="flex items-start gap-3">
				<div className={style.icon}>{displayIcon}</div>
				<div className={`text-sm ${style.text}`}>
					<p className="font-medium mb-1">{title}</p>
					<p>{message}</p>
				</div>
			</div>
		</div>
	);
};
