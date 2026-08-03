import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { localizeService, services } from '$lib/data/services';
import { getLocale } from '$lib/paraglide/runtime';
import { getProjectsByCategory } from '$lib/data/portfolio';
import type { SeoMeta } from '$lib/types';

export const entries = () => services.map((service) => ({ category: service.slug }));

export const load: PageLoad = ({ params }) => {
	const categorySlug = params.category;

	const sourceService = services.find((s) => s.slug === categorySlug);

	if (!sourceService) {
		throw error(404, 'Portfolio category not found');
	}

	const service = localizeService(sourceService, getLocale());

	const categoryProjects = getProjectsByCategory(categorySlug, getLocale());

	const meta: SeoMeta = {
		title: `${service.title} Portfolio - Complex Design Studio`,
		description:
			service.description ||
			`Explore our ${service.title} projects. Complex is a design and technology studio building digital products from concept to production.`,
		canonical: `https://complexdesignstudio.com/portfolio/${categorySlug}`,
		noIndex: false,
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: `${service.title} Portfolio`,
			url: `https://complexdesignstudio.com/portfolio/${categorySlug}`,
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
