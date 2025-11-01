'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createAdminUser } from '@/lib/auth';
import { UserPlus } from 'lucide-react';
import {
	BrandHeader,
	FormInput,
	PasswordInput,
	LoadingButton,
	StatusMessage,
	SecurityNotice,
	StatusMessageType,
} from '@/components/admin';

const AdminSetup: React.FC = () => {
	const [email, setEmail] = useState('admin@budgeapp.com');
	const [password, setPassword] = useState('Admin123!');
	const [confirmPassword, setConfirmPassword] = useState('Admin123!');
	const [isLoading, setIsLoading] = useState(false);
	const [result, setResult] = useState<StatusMessageType | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setResult(null);

		if (password !== confirmPassword) {
			setResult({ success: false, message: 'Passwords do not match' });
			setIsLoading(false);
			return;
		}

		if (password.length < 6) {
			setResult({
				success: false,
				message: 'Password must be at least 6 characters',
			});
			setIsLoading(false);
			return;
		}

		try {
			const user = await createAdminUser(email, password);
			setResult({
				success: true,
				message: `Admin user created successfully! Email: ${user.email}`,
			});
		} catch (error: unknown) {
			console.error('Setup error:', error);
			setResult({
				success: false,
				message:
					error &&
					typeof error === 'object' &&
					'code' in error &&
					error.code === 'auth/email-already-in-use'
						? 'Admin user already exists. Use the existing account to log in.'
						: `Failed to create admin user: ${
								error &&
								typeof error === 'object' &&
								'message' in error &&
								typeof error.message === 'string'
									? error.message
									: 'Unknown error occurred'
						  }`,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
			<div className="w-full max-w-md space-y-8">
				{/* Brand Header */}
				<BrandHeader
					title="Admin Setup"
					subtitle="Create your first admin account"
					showMainSiteLink={false}
				/>

				{/* Setup Form */}
				<div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 space-y-6">
					<form onSubmit={handleSubmit} className="space-y-6">
						{result && <StatusMessage message={result} />}

						<FormInput
							id="email"
							name="email"
							label="Admin Email"
							type="email"
							value={email}
							onChange={setEmail}
							placeholder="admin@budgeapp.com"
							required
						/>

						<PasswordInput
							id="password"
							name="password"
							label="Password"
							value={password}
							onChange={setPassword}
							placeholder="Enter a secure password"
							required
							showPassword={false}
							onToggleShowPassword={() => {}}
							helperText="Must be at least 6 characters"
						/>

						<FormInput
							id="confirmPassword"
							name="confirmPassword"
							label="Confirm Password"
							type="password"
							value={confirmPassword}
							onChange={setConfirmPassword}
							placeholder="Confirm your password"
							required
						/>

						<LoadingButton
							loading={isLoading}
							loadingText="Creating Admin..."
							icon={<UserPlus className="w-4 h-4" />}
						>
							Create Admin Account
						</LoadingButton>
					</form>

					{/* Login Link */}
					<div className="pt-6 border-t border-slate-200">
						<div className="text-center">
							<p className="text-sm text-slate-600 mb-4">
								Admin account created?
							</p>
							<Link
								href="/login"
								className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
							>
								Go to Admin Login →
							</Link>
						</div>
					</div>

					{/* Security Notice */}
					<SecurityNotice message="Delete this setup page after creating your admin account for enhanced security." />

					{/* Back to Main Site */}
					<div className="pt-6 border-t border-slate-200">
						<Link
							href="/"
							className="flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
						>
							← Back to Main Site
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminSetup;
