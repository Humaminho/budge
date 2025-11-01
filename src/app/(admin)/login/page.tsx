'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInAdmin, onAuthStateChange } from '@/lib/auth';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import {
	BrandHeader,
	FormInput,
	PasswordInput,
	LoadingButton,
	StatusMessage,
	StatusMessageType,
} from '@/components/admin';

const AdminLogin: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<StatusMessageType | null>(null);
	const router = useRouter();

	useEffect(() => {
		// Redirect if already logged in
		const unsubscribe = onAuthStateChange((user) => {
			if (user) {
				router.push('/dashboard');
			}
		});

		return () => unsubscribe();
	}, [router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			await signInAdmin(email, password);
			router.push('/dashboard');
		} catch (error: unknown) {
			console.error('Login error:', error);
			setError({
				success: false,
				message:
					error &&
					typeof error === 'object' &&
					'code' in error &&
					error.code === 'auth/invalid-credential'
						? 'Invalid email or password'
						: 'Login failed. Please try again.',
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
					title="Welcome back"
					subtitle="Sign in to your admin account"
					showMainSiteLink={false}
				/>

				{/* Login Form */}
				<div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
					<form onSubmit={handleSubmit} className="space-y-6">
						{error && <StatusMessage message={error} />}

						<FormInput
							id="email"
							name="email"
							label="Email"
							type="email"
							value={email}
							onChange={setEmail}
							placeholder="admin@budgeapp.com"
							required
							icon={<Mail className="h-5 w-5" />}
						/>

						<PasswordInput
							id="password"
							name="password"
							label="Password"
							value={password}
							onChange={setPassword}
							placeholder="Enter your password"
							required
							showPassword={showPassword}
							onToggleShowPassword={() =>
								setShowPassword(!showPassword)
							}
						/>

						<LoadingButton
							loading={isLoading}
							loadingText="Signing in..."
							icon={<Mail className="w-4 h-4" />}
						>
							Sign in
						</LoadingButton>
					</form>

					<div className="mt-8 pt-6 border-t border-slate-200">
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

export default AdminLogin;
