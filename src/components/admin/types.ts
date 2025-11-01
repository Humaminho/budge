export interface StatusMessage {
	success: boolean;
	message: string;
}

export interface FormFieldProps {
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
}

export interface PasswordFieldProps extends Omit<FormFieldProps, 'type'> {
	showPassword: boolean;
	onToggleShowPassword: () => void;
}

export interface LoadingButtonProps {
	children: React.ReactNode;
	loading: boolean;
	loadingText: string;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	onClick?: () => void;
	variant?: 'primary' | 'secondary';
	size?: 'sm' | 'md' | 'lg';
}
