import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getProjectBySlug, projects } from '$lib/data/portfolio';
import type { SeoMeta } from '$lib/types';

export const entries = () =>
	projects.map((project) => ({ category: project.categorySlug, slug: project.slug }));

export const load: PageLoad = ({ params }) => {
	const project = getProjectBySlug(params.category, params.slug);
	
	if (!project) {
		throw error(404, 'Project tidak ditemukan');
	}

	const meta: SeoMeta = {
		title: `${project.title} - ${project.client} | Complex Design Studio`,
		description: project.description.substring(0, 155) + '...',
		canonical: `https://complexdesignstudio.com/portfolio/${params.category}/${params.slug}`,
		noIndex: false,
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'CreativeWork',
			name: project.title,
			author: {
				'@type': 'Organization',
				name: 'Complex Design Studio'
			},
			url: `https://complexdesignstudio.com/portfolio/${params.category}/${params.slug}`,
			image: `https://complexdesignstudio.com${project.coverImage}`,
			description: project.description
		}
	};

	return {
		project,
		meta
	};
};
