import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getProjectBySlug, projects } from '$lib/data/portfolio';
import { getLocale } from '$lib/paraglide/runtime';
import type { SeoMeta } from '$lib/types';

const archivedBankingMetaTitles: Record<string, { en: string; id: string }> = {
	'mobile-application/arsip-complex-design-bsm-priority-mobile': {
		en: 'Archived Case Study: BSM Priority Mobile | Complex Design',
		id: 'Arsip Studi Kasus BSM Priority Mobile | Complex Design'
	},
	'website-development/arsip-complex-design-bsm-priority': {
		en: 'Archived Case Study: BSM Priority | Complex Design Studio',
		id: 'Arsip Studi Kasus BSM Priority | Complex Design Studio'
	},
	'website-development/arsip-complex-design-bank-syariah-mandiri': {
		en: 'Archived Case Study: Bank Syariah Mandiri | Complex Design',
		id: 'Arsip Studi Kasus Bank Syariah Mandiri | Complex Design'
	},
	'ux-design/arsip-complex-design-bsm-pawning': {
		en: 'Archived Case Study: BSM Pawning | Complex Design Studio',
		id: 'Arsip Studi Kasus BSM Pawning | Complex Design Studio'
	}
};

export const entries = () =>
	projects.map((project) => ({ category: project.categorySlug, slug: project.slug }));

export const load: PageLoad = ({ params }) => {
	const locale = getLocale();
	const project = getProjectBySlug(params.category, params.slug, locale);

	if (!project) {
		throw error(404, 'Project tidak ditemukan');
	}

	const projectKey = `${params.category}/${params.slug}`;
	const archivedTitle = archivedBankingMetaTitles[projectKey];
	const metaTitle = archivedTitle?.[locale === 'id' ? 'id' : 'en'];

	const meta: SeoMeta = {
		title: metaTitle ?? `${project.title} - ${project.client} | Complex Design Studio`,
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
