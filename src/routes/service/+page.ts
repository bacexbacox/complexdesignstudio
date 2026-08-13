import type { SeoMeta } from '$lib/types';
import { getLocale } from '$lib/paraglide/runtime';
import { siteUrl } from '$lib/utils/portfolio-routes';

export const load = () => {
	const locale = getLocale();
	const englishUrl = `${siteUrl}/service`;
	const indonesianUrl = `${siteUrl}/id/service`;
	const publicUrl = locale === 'id' ? indonesianUrl : englishUrl;

	const meta: SeoMeta = {
		title: 'Services — Complex Design Studio',
		description:
			'Layanan web development, mobile app, digital marketing, UX design, creative design, dan branding dari Complex Design Studio.',
		canonical: publicUrl,
		languageAlternates: {
			en: englishUrl,
			id: indonesianUrl,
			'x-default': englishUrl
		},
		noIndex: false,
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'Service',
			name: 'Complex Design Studio Services',
			provider: {
				'@type': 'Organization',
				name: 'Complex Design Studio',
				url: siteUrl
			},
			description:
				'Web and App Development, Digital Marketing, UX/UI Design, Creative Design, and Branding services.'
		}
	};

	return { meta };
};
