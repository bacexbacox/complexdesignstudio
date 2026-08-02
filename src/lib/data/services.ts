import type { Service } from '$lib/types';

export const services: Service[] = [
	{
		id: '1',
		slug: 'website-development',
		title: 'Website Development',
		description:
			'However small the idea — even just a scribble on paper — we can still turn it into something real, while keeping the standard: fast, scalable, precise, professional. The raw material can be simple; the result won\'t be.',
		intro:
			'Complex Design Studio builds digital products using the latest technology — Next.js, Laravel, Golang, and Flutter — or WordPress and Shopify CMS when that\'s the right fit.',
		icon: '',
		items: [
			'Web Applications',
			'Web Design & CMS',
			'SaaS Platforms',
			'API Integrations',
			'Maintenance & Support',
			'Scaling & Performance'
		]
	},
	{
		id: '2',
		slug: 'mobile-application',
		title: 'Mobile Application',
		description:
			"We build reliable iOS and Android applications, starting with a well-thought-out user experience. Everything is carefully put together — from strategy to file structure to database — then it's just a matter of reaching out to us for the next step.",
		intro:
			"Maybe it's time the world found out — Complex Design Studio has a track record that's more than enough for building world-class mobile apps: secure, fast, flexible, and cost-effective for your business goals.",
		icon: '',
		items: [
			'iOS & Android Apps',
			'Internal Business Tools',
			'API Development',
			'Booking & Scheduling',
			'LMS & Education Platforms',
			'Payment Systems'
		]
	},
	{
		id: '3',
		slug: 'digital-marketing',
		title: 'Digital Marketing',
		description:
			'We grow brands through SEO, paid campaigns, content, social media, and market insights that turn digital attention into measurable business opportunities.',
		icon: '',
		items: [
			'SEO (Search Engine Optimization)',
			'SEM (Search Engine Marketing)',
			'Competitor & Market Research',
			'Social Media Plan Management',
			'Social Media Ad Campaigns',
			'Content Platforms'
		]
	},
	{
		id: '4',
		slug: 'ux-design',
		title: 'User Experience Design',
		description:
			'We create user-centered digital experiences through research, information architecture, wireframes, prototypes, and interface systems that are easy to use.',
		icon: '',
		items: ['UX / UI Kit Design', 'Mobile App Design', 'UX Research', 'Wireframing & Prototyping']
	},
	{
		id: '5',
		slug: 'creative-design',
		title: 'Creative Design',
		description:
			'We create distinctive visual assets, illustrations, and creative communication that make brands easier to recognize, understand, and remember.',
		icon: '',
		items: [
			'Design Brand Identity',
			'Design Illustrator',
			'Rebranding Design Company',
			'Design Product'
		]
	},
	{
		id: '6',
		slug: 'branding-product',
		title: 'Branding Product',
		description:
			'We build cohesive product brands through strategy, identity, packaging, stationery, apparel, and memorable physical touchpoints.',
		icon: '',
		items: ['Packaging', 'Souvenir', 'Stationery', 'Apparel', 'Lifestyle Products']
	}
];
