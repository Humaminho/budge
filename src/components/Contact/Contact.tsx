import React from 'react';
import { MapPin, Clock, Mail } from 'lucide-react';
import { contactDetails } from '@/data/contact';
import ContactForm from './ContactForm';

const Contact: React.FC = () => {
	return (
		<section id="contact" className="py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-5 sm:px-10">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
						{contactDetails.title}
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						{contactDetails.description}
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Contact Information */}
					<div className="space-y-8">
						<div>
							<h3 className="text-2xl font-semibold text-gray-900 mb-2">
								{contactDetails.subtitle}
							</h3>
							<p className="text-gray-600">
								Whether you&apos;re an individual looking to
								manage your finances better, or a business
								seeking financial solutions, we&apos;re here to
								help.
							</p>
						</div>

						{/* Contact Details */}
						<div className="space-y-6">
							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<Mail className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h4 className="font-semibold text-gray-900">
										Email Us
									</h4>
									<p className="text-gray-600">
										support@budgeapp.com
									</p>
									<p className="text-sm text-gray-500">
										We respond within 24 hours
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<Clock className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h4 className="font-semibold text-gray-900">
										Business Hours
									</h4>
									<p className="text-gray-600">
										Monday - Friday: 9:00 AM - 6:00 PM EST
									</p>
									<p className="text-sm text-gray-500">
										24/7 Support for Premium users
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="flex-shrink-0">
									<MapPin className="w-6 h-6 text-primary" />
								</div>
								<div>
									<h4 className="font-semibold text-gray-900">
										Office
									</h4>
									<p className="text-gray-600">
										123 Financial Street
										<br />
										New York, NY 10001
										<br />
										United States
									</p>
								</div>
							</div>
						</div>

						{/* Additional Info */}
						<div className="bg-white rounded-md p-6 shadow-sm border border-gray-100">
							<h4 className="font-semibold text-gray-900 mb-3">
								Why Choose Budge?
							</h4>
							<ul className="space-y-2 text-sm text-gray-600">
								<li className="flex items-center">
									<span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
									Bank-grade security and encryption
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
									Personalized financial insights
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
									24/7 customer support
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
									Seamless integrations
								</li>
							</ul>
						</div>
					</div>

					{/* Contact Form */}
					<div>
						<ContactForm
							formTitle={contactDetails.formTitle}
							formDescription={contactDetails.formDescription}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
