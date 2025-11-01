import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Transform your finances with smart budgeting, investing, and financial insights.",
    quickLinks: [
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "Contact",
            url: "#contact"
        },
        {
            text: "Testimonials",
            url: "#testimonials"
        }
    ],
    email: 'support@budgeapp.com',
    telephone: '+1 (555) 123-4567',
    socials: {
        // github: 'https://github.com',
        // x: 'https://twitter.com/budgeapp',
        twitter: 'https://twitter.com/budgeapp',
        facebook: 'https://facebook.com/budgeapp',
        // youtube: 'https://youtube.com/@budgeapp',
        linkedin: 'https://www.linkedin.com/company/budgeapp',
        // threads: 'https://www.threads.net/@budgeapp',
        instagram: 'https://www.instagram.com/budgeapp',
    }
}