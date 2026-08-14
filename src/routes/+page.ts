import type { SeoMeta } from '$lib/types';
import { getLocale } from '$lib/paraglide/runtime';
import { siteUrl } from '$lib/utils/portfolio-routes';

export const load = () => {
	const locale = getLocale();
	const englishUrl = `${siteUrl}/`;
	const indonesianUrl = `${siteUrl}/id`;
	const publicUrl = locale === 'id' ? indonesianUrl : englishUrl;
	const isIndonesian = locale === 'id';
	const description = isIndonesian
		? 'Complex Design Studio adalah agency jasa pembuatan website, aplikasi iOS dan Android, UI/UX, digital marketing, serta desain produk berbasis di Jakarta.'
		: 'Complex Design Studio is a Jakarta-based agency for website development, iOS and Android apps, UI/UX design, digital marketing, and product design.';

	const meta: SeoMeta = {
		title: 'Website, Mobile App & Design Agency | Complex Design Studio',
		description,
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
			description
		}
	};

	return { meta };
};
