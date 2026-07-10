import type { SeoMeta } from '$lib/types';

export const load = () => {
	const meta: SeoMeta = {
		title: 'Services — Complex Design Studio',
		description:
			'Layanan web development, mobile app, digital marketing, UX design, creative design, dan branding dari Complex Design Studio.',
		canonical: 'https://complexdesignstudio.com/service',
		noIndex: false,
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'Service',
			name: 'Complex Design Studio Services',
			provider: {
				'@type': 'Organization',
				name: 'Complex Design Studio',
				url: 'https://complexdesignstudio.com'
			},
			description:
				'Web and App Development, Digital Marketing, UX/UI Design, Creative Design, and Branding services.'
		}
	};

	return { meta };
};
