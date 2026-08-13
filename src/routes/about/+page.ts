// src/routes/about/+page.ts
import type { SeoMeta } from '$lib/types';
import { getLocale } from '$lib/paraglide/runtime';
import { siteUrl } from '$lib/utils/portfolio-routes';

export const load = () => {
	const locale = getLocale();
	const englishUrl = `${siteUrl}/about`;
	const indonesianUrl = `${siteUrl}/id/about`;
	const publicUrl = locale === 'id' ? indonesianUrl : englishUrl;

	const meta: SeoMeta = {
		title: 'About Us — Complex Design Studio',
		description:
			'We are a collective of thinkers, designers, and developers dedicated to creating impactful digital experiences that connect brands with people.',
		canonical: publicUrl,
		languageAlternates: {
			en: englishUrl,
			id: indonesianUrl,
			'x-default': englishUrl
		}
	};

	return { meta };
};
