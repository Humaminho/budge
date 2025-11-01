// One-time script to create admin user
// Run this in the browser console or create a temporary page to execute it

import { createAdminUser } from '@/lib/auth';

// Execute this function once to create the admin user
export const setupAdmin = async () => {
	try {
		const email = 'admin@budgeapp.com'; // Change this to your desired admin email
		const password = 'Admin123!'; // Change this to a secure password

		console.log('Creating admin user...');
		const user = await createAdminUser(email, password);

		console.log('✅ Admin user created successfully!');
		console.log('Email:', user.email);
		console.log('UID:', user.uid);
		console.log('');
		console.log(
			'⚠️  IMPORTANT: Change the password immediately after first login!'
		);
		console.log(
			'🔒 Also, update the security rules to restrict admin access.'
		);

		return user;
	} catch (error: unknown) {
		const errorMessage =
			error &&
			typeof error === 'object' &&
			'message' in error &&
			typeof error.message === 'string'
				? error.message
				: 'Unknown error occurred';

		console.error('❌ Failed to create admin user:', errorMessage);

		if (
			error &&
			typeof error === 'object' &&
			'code' in error &&
			error.code === 'auth/email-already-in-use'
		) {
			console.log(
				'ℹ️  Admin user already exists. Use the existing account to log in.'
			);
		}

		throw error;
	}
};

// To use this script:
// 1. Open your browser console on the Budge website
// 2. Copy and paste this entire file content
// 3. Run: setupAdmin()
// 4. After successful creation, remove this script for security
