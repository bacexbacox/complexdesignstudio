import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { localizeService, services } from '$lib/data/services';
import { getLocale } from '$lib/paraglide/runtime';
import { getProjectsByCategory } from '$lib/data/portfolio';
import type { SeoMeta } from '$lib/types';
import { getPortfolioCategoryPath, siteUrl } from '$lib/utils/portfolio-routes';

export const entries = () => services.map((service) => ({ category: service.slug }));

export const load: PageLoad = ({ params }) => {
	const categorySlug = params.category;
	const locale = getLocale();

	const sourceService = services.find((s) => s.slug === categorySlug);

	if (!sourceService) {
		throw error(404, 'Portfolio category not found');
	}

	const service = localizeService(sourceService, locale);

	const categoryProjects = getProjectsByCategory(categorySlug, locale);
	const publicUrl = `${siteUrl}${getPortfolioCategoryPath(categorySlug, locale)}`;
	const languageAlternates = {
		en: `${siteUrl}${getPortfolioCategoryPath(categorySlug, 'en')}`,
		id: `${siteUrl}${getPortfolioCategoryPath(categorySlug, 'id')}`,
		'x-default': `${siteUrl}${getPortfolioCategoryPath(categorySlug, 'id')}`
	};

	const meta: SeoMeta = {
		title: `${service.title} Portfolio - Complex Design Studio`,
		description:
			service.description ||
			`Explore our ${service.title} projects. Complex is a design and technology studio building digital products from concept to production.`,
		canonical: publicUrl,
		languageAlternates,
		noIndex: false,
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: `${service.title} Portfolio`,
			url: publicUrl,
			description: service.description
		}
	};

	return {
		categorySlug,
		service,
		projects: categoryProjects,
		meta
	};
};
