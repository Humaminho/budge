// Firestore operations for contact form
import {
	collection,
	addDoc,
	serverTimestamp,
	query,
	orderBy,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { IContactFormData } from '@/types';

// Collection name for contact form submissions
const CONTACT_COLLECTION = 'contact_submissions';

// Submit contact form data to Firestore
export const submitContactForm = async (
	formData: IContactFormData
): Promise<string> => {
	try {
		const docRef = await addDoc(collection(db, CONTACT_COLLECTION), {
			...formData,
			submittedAt: serverTimestamp(),
			status: 'new', // Status can be: new, read, responded, archived
		});

		return docRef.id;
	} catch (error) {
		console.error('Error submitting contact form: ', error);
		throw new Error('Failed to submit contact form. Please try again.');
	}
};

// Get all contact form submissions (for admin purposes)
export const getContactSubmissions = async () => {
	try {
		const q = query(
			collection(db, CONTACT_COLLECTION),
			orderBy('submittedAt', 'desc')
		);

		const querySnapshot = await getDocs(q);
		const submissions: any[] = [];

		querySnapshot.forEach((doc) => {
			submissions.push({
				id: doc.id,
				...doc.data(),
			});
		});

		return submissions;
	} catch (error) {
		console.error('Error getting contact submissions: ', error);
		throw new Error('Failed to fetch submissions.');
	}
};

// Update submission status (for admin purposes)
export const updateSubmissionStatus = async (id: string, status: string) => {
	try {
		const docRef = doc(db, CONTACT_COLLECTION, id);
		await updateDoc(docRef, {
			status,
			updatedAt: serverTimestamp(),
		});
	} catch (error) {
		console.error('Error updating submission status: ', error);
		throw new Error('Failed to update submission status.');
	}
};

// Delete a submission (for admin purposes)
export const deleteSubmission = async (id: string) => {
	try {
		await deleteDoc(doc(db, CONTACT_COLLECTION, id));
	} catch (error) {
		console.error('Error deleting submission: ', error);
		throw new Error('Failed to delete submission.');
	}
};
