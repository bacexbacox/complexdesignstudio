import type { SeoMeta } from '$lib/types';
import { getLocale } from '$lib/paraglide/runtime';
import { siteUrl } from '$lib/utils/portfolio-routes';

export const load = () => {
	const locale = getLocale();
	const englishUrl = `${siteUrl}/`;
	const indonesianUrl = `${siteUrl}/id`;
	const publicUrl = locale === 'id' ? indonesianUrl : englishUrl;

	const meta: SeoMeta = {
		title: 'Website, Mobile App & Design Agency | Complex Design Studio',
		description:
			'Complex Design Studio is an agency for website development, mobile app development, digital design, branding, and user experience.',
		canonical: publicUrl,
		languageAlternates: {
			en: englishUrl,
			id: indonesianUrl,
			'x-default': englishUrl
		},
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Complex Design Studio',
			url: publicUrl,
			description:
				'Agency for website development, mobile app development, digital design, branding, and user experience.'
		}
	};

	return { meta };
};
