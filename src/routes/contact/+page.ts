import type { SeoMeta } from '$lib/types';

export const load = () => {
	const meta: SeoMeta = {
		title: 'Contact Us - Complex Design Studio',
		description: 'Talk to our support team and tell us about your project. We are ready to help you build digital products from concept to production.',
		canonical: 'https://complexdesignstudio.com/contact',
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'LocalBusiness',
			name: 'Complex Design Studio',
			url: 'https://complexdesignstudio.com/contact',
			description: 'Talk to our support team and tell us about your project. We are ready to help you build digital products from concept to production.'
		}
	};
	return { meta };
};
