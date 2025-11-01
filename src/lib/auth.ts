// Firebase Authentication helpers
import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export { auth };

// Sign in admin user
export const signInAdmin = async (email: string, password: string) => {
	try {
		const result = await signInWithEmailAndPassword(auth, email, password);
		return result.user;
	} catch (error) {
		console.error('Sign in error:', error);
		throw error;
	}
};

// Create admin user (only call this once to set up the admin account)
export const createAdminUser = async (email: string, password: string) => {
	try {
		const result = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log('Admin user created:', result.user.email);
		return result.user;
	} catch (error) {
		console.error('Create admin error:', error);
		throw error;
	}
};

// Sign out admin user
export const signOutAdmin = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error('Sign out error:', error);
		throw error;
	}
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
	return onAuthStateChanged(auth, callback);
};
