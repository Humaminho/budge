'use client';

import React, { useState } from 'react';
import { Mail, Phone, Building, Send, CheckCircle } from 'lucide-react';
import { IContactFormData } from '@/types';
import { submitContactForm } from '@/lib/firestore';

interface ContactFormProps {
	formTitle: string;
	formDescription: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
	formTitle,
	formDescription,
}) => {
	const [formData, setFormData] = useState<IContactFormData>({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		company: '',
		message: '',
		interests: [],
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const interestOptions = [
		'Budgeting & Expense Tracking',
		'Investment Management',
		'Financial Planning',
		'Business Solutions',
		'API Integration',
		'Other',
	];

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCheckboxChange = (interest: string) => {
		setFormData((prev) => ({
			...prev,
			interests: prev.interests.includes(interest)
				? prev.interests.filter((i) => i !== interest)
				: [...prev.interests, interest],
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Submit form data to Firestore
			await submitContactForm(formData);

			setIsSubmitting(false);
			setIsSubmitted(true);

			// Reset form after successful submission
			setTimeout(() => {
				setIsSubmitted(false);
				setFormData({
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					company: '',
					message: '',
					interests: [],
				});
			}, 3000);
		} catch (error) {
			console.error('Form submission error:', error);
			setIsSubmitting(false);
			// You might want to show an error message to the user here
			alert('Failed to submit form. Please try again.');
		}
	};

	return (
		<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
			<div className="mb-6">
				<h3 className="text-2xl font-semibold text-gray-900 mb-2">
					{formTitle}
				</h3>
				<p className="text-gray-600">{formDescription}</p>
			</div>

			{isSubmitted ? (
				<div className="text-center py-12">
					<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
					<h4 className="text-xl font-semibold text-gray-900 mb-2">
						Thank you!
					</h4>
					<p className="text-gray-600">
						Your message has been sent successfully. We'll get back
						to you within 24 hours.
					</p>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Name Fields */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="firstName"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								First Name *
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={formData.firstName}
								onChange={handleInputChange}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
								placeholder="John"
							/>
						</div>
						<div>
							<label
								htmlFor="lastName"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Last Name *
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={formData.lastName}
								onChange={handleInputChange}
								required
								className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
								placeholder="Doe"
							/>
						</div>
					</div>

					{/* Email and Phone */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Email Address *
							</label>
							<div className="relative">
								<Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									required
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
									placeholder="john@example.com"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Phone Number
							</label>
							<div className="relative">
								<Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
								<input
									type="tel"
									id="phone"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
									placeholder="+1 (555) 123-4567"
								/>
							</div>
						</div>
					</div>

					{/* Company */}
					<div>
						<label
							htmlFor="company"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Company/Organization
						</label>
						<div className="relative">
							<Building className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
							<input
								type="text"
								id="company"
								name="company"
								value={formData.company}
								onChange={handleInputChange}
								className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
								placeholder="Your Company Name"
							/>
						</div>
					</div>

					{/* Interests */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-3">
							What are you interested in? (Select all that apply)
						</label>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							{interestOptions.map((interest) => (
								<label
									key={interest}
									className="flex items-center space-x-3 cursor-pointer"
								>
									<input
										type="checkbox"
										checked={formData.interests.includes(
											interest
										)}
										onChange={() =>
											handleCheckboxChange(interest)
										}
										className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
									/>
									<span className="text-sm text-gray-700">
										{interest}
									</span>
								</label>
							))}
						</div>
					</div>

					{/* Message */}
					<div>
						<label
							htmlFor="message"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Message *
						</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleInputChange}
							required
							rows={4}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
							placeholder="Tell us about your financial goals and how we can help..."
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-primary hover:bg-primary-accent text-black font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? (
							<>
								<div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
								Sending...
							</>
						) : (
							<>
								<Send className="w-5 h-5" />
								Send Message
							</>
						)}
					</button>

					<p className="text-xs text-gray-500 text-center mt-4">
						By submitting this form, you agree to our Privacy Policy
						and Terms of Service. We'll use this information to
						respond to your inquiry and may send you relevant
						updates.
					</p>
				</form>
			)}
		</div>
	);
};

export default ContactForm;
