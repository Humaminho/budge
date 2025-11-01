export interface IMenuItem {
	text: string;
	url: string;
}

export interface IBenefit {
	title: string;
	description: string;
	imageSrc: string;
	bullets: IBenefitBullet[];
}

export interface IBenefitBullet {
	title: string;
	description: string;
	icon: JSX.Element;
}

export interface IFAQ {
	question: string;
	answer: string;
}

export interface ITestimonial {
	name: string;
	role: string;
	message: string;
	avatar: string;
}

export interface IStats {
	title: string;
	icon: JSX.Element;
	description: string;
}

export interface ISocials {
	facebook?: string;
	github?: string;
	instagram?: string;
	linkedin?: string;
	threads?: string;
	twitter?: string;
	youtube?: string;
	x?: string;
	[key: string]: string | undefined;
}

export interface IContact {
	title: string;
	description: string;
	subtitle: string;
	formTitle: string;
	formDescription: string;
}

export interface IContactFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	company: string;
	message: string;
	interests: string[];
}
