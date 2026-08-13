import type { SeoMeta } from '$lib/types';
import { getLocale } from '$lib/paraglide/runtime';
import { siteUrl } from '$lib/utils/portfolio-routes';

export const load = () => {
	const locale = getLocale();
	const englishUrl = `${siteUrl}/contact`;
	const indonesianUrl = `${siteUrl}/id/contact`;
	const publicUrl = locale === 'id' ? indonesianUrl : englishUrl;

	const meta: SeoMeta = {
		title: 'Contact Us - Complex Design Studio',
		description:
			'Talk to our support team and tell us about your project. We are ready to help you build digital products from concept to production.',
		canonical: publicUrl,
		languageAlternates: {
			en: englishUrl,
			id: indonesianUrl,
			'x-default': englishUrl
		},
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'LocalBusiness',
			name: 'Complex Design Studio',
			url: publicUrl,
			description:
				'Talk to our support team and tell us about your project. We are ready to help you build digital products from concept to production.'
		}
	};
	return { meta };
};
