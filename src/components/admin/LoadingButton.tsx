import React from 'react';

interface LoadingButtonProps {
	children: React.ReactNode;
	loading: boolean;
	loadingText: string;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	onClick?: () => void;
	variant?: 'primary' | 'secondary';
	size?: 'sm' | 'md' | 'lg';
	icon?: React.ReactNode;
	fullWidth?: boolean;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
	children,
	loading,
	loadingText,
	type = 'submit',
	disabled = false,
	onClick,
	variant = 'primary',
	size = 'md',
	icon,
	fullWidth = true,
}) => {
	const baseClasses =
		'font-medium rounded-md transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed';

	const variantClasses = {
		primary:
			'bg-slate-900 hover:bg-slate-800 text-white focus:ring-slate-500 disabled:opacity-50',
		secondary:
			'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-slate-500 disabled:opacity-50',
	};

	const sizeClasses = {
		sm: 'px-3 py-2 text-sm',
		md: 'px-4 py-3 text-base',
		lg: 'px-6 py-4 text-lg',
	};

	const widthClass = fullWidth ? 'w-full' : '';

	return (
		<button
			type={type}
			disabled={disabled || loading}
			onClick={onClick}
			className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass}`}
		>
			{loading ? (
				<>
					<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
					{loadingText}
				</>
			) : (
				<>
					{icon}
					{children}
				</>
			)}
		</button>
	);
};
