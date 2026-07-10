import type { SeoMeta } from '$lib/types';

export const load = () => {
	const meta: SeoMeta = {
		title: 'Website, Mobile App & Design Agency | Complex Design Studio',
		description:
			'Complex Design Studio is an agency for website development, mobile app development, digital design, branding, and user experience.',
		canonical: 'https://complexdesignstudio.com/',
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Complex Design Studio',
			url: 'https://complexdesignstudio.com',
			description:
				'Agency for website development, mobile app development, digital design, branding, and user experience.'
		}
	};

	return { meta };
};
