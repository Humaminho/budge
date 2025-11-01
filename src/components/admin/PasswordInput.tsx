import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
	id: string;
	name: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	required?: boolean;
	showPassword: boolean;
	onToggleShowPassword: () => void;
	error?: string;
	helperText?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
	id,
	name,
	label,
	value,
	onChange,
	placeholder,
	required = false,
	showPassword,
	onToggleShowPassword,
	error,
	helperText,
}) => {
	return (
		<div className="space-y-2">
			<label htmlFor={id} className="text-sm font-medium text-slate-700">
				{label}
			</label>
			<div className="relative">
				<input
					id={id}
					name={name}
					type={showPassword ? 'text' : 'password'}
					required={required}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={`w-full pl-4 pr-24 py-3 border rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-slate-50/50 ${
						error
							? 'border-red-300 focus:ring-red-500 focus:border-red-500'
							: 'border-slate-300'
					}`}
					placeholder={placeholder}
				/>
				<button
					type="button"
					onClick={onToggleShowPassword}
					className="absolute right-12 top-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 rounded"
					aria-label={
						showPassword ? 'Hide password' : 'Show password'
					}
				>
					{showPassword ? (
						<EyeOff className="h-5 w-5" />
					) : (
						<Eye className="h-5 w-5" />
					)}
				</button>
				<div className="absolute right-3 top-3.5 text-slate-400">
					<svg
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
				</div>
			</div>
			{helperText && !error && (
				<p className="text-xs text-slate-500">{helperText}</p>
			)}
			{error && <p className="text-xs text-red-600">{error}</p>}
		</div>
	);
};
