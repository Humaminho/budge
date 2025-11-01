import React from 'react';

interface FormInputProps {
	id: string;
	name: string;
	label: string;
	type: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	required?: boolean;
	icon?: React.ReactNode;
	error?: string;
	helperText?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
	id,
	name,
	label,
	type,
	value,
	onChange,
	placeholder,
	required = false,
	icon,
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
					type={type}
					required={required}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200 bg-slate-50/50 ${
						icon ? 'pr-12' : 'pr-4'
					} ${
						error
							? 'border-red-300 focus:ring-red-500 focus:border-red-500'
							: 'border-slate-300'
					}`}
					placeholder={placeholder}
				/>
				{icon && (
					<div className="absolute right-3 top-3.5 text-slate-400">
						{icon}
					</div>
				)}
			</div>
			{helperText && !error && (
				<p className="text-xs text-slate-500">{helperText}</p>
			)}
			{error && <p className="text-xs text-red-600">{error}</p>}
		</div>
	);
};
