import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { StatusMessage as StatusMessageType } from './types';

interface StatusMessageProps {
	message: StatusMessageType;
	variant?: 'default' | 'inline';
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
	message,
	variant = 'default',
}) => {
	const { success, message: text } = message;

	const styles = {
		success: {
			container: 'bg-green-50 border border-green-200 text-green-800',
			icon: <CheckCircle className="w-5 h-5" />,
		},
		error: {
			container: 'bg-red-50 border border-red-200 text-red-800',
			icon: <AlertCircle className="w-5 h-5" />,
		},
		info: {
			container: 'bg-blue-50 border border-blue-200 text-blue-800',
			icon: <Info className="w-5 h-5" />,
		},
	};

	const style = success ? styles.success : styles.error;

	if (variant === 'inline') {
		return (
			<div
				className={`flex items-center gap-2 text-sm ${
					success ? 'text-green-700' : 'text-red-700'
				}`}
			>
				{style.icon}
				<span>{text}</span>
			</div>
		);
	}

	return (
		<div className={`p-4 rounded-md ${style.container}`}>
			<div className="flex items-center gap-2">
				{style.icon}
				<div className="text-sm leading-relaxed">{text}</div>
			</div>
		</div>
	);
};
