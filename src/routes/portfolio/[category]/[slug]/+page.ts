import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getProjectBySlug, projects } from '$lib/data/portfolio';
import { getLocale } from '$lib/paraglide/runtime';
import type { SeoMeta } from '$lib/types';
import { getPortfolioProjectPath, siteUrl } from '$lib/utils/portfolio-routes';

const archivedBankingMetaTitles: Record<string, { en: string; id: string }> = {
	'mobile-application/complex-design-portfolio-archive-bsm-priority-mobile': {
		en: 'Complex Design Portfolio Archive: BSM Priority Mobile',
		id: 'Arsip Portofolio Complex Design: Aplikasi BSM Priority'
	},
	'website-development/complex-design-portfolio-archive-bsm-priority': {
		en: 'Complex Design Portfolio Archive: BSM Priority Website',
		id: 'Arsip Portofolio Complex Design: Situs BSM Priority'
	},
	'website-development/complex-design-portfolio-archive-bank-syariah-mandiri': {
		en: 'Complex Design Portfolio Archive: Bank Syariah Mandiri',
		id: 'Arsip Portofolio Complex Design: Bank Syariah Mandiri'
	},
	'ux-design/complex-design-portfolio-archive-bsm-pawning': {
		en: 'Complex Design Portfolio Archive: BSM Pawning UI/UX',
		id: 'Arsip Portofolio Complex Design: UI/UX BSM Pawning'
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
	const publicPath = getPortfolioProjectPath(params.category, params.slug, locale);
	const publicUrl = `${siteUrl}${publicPath}`;
	const languageAlternates = {
		en: `${siteUrl}${getPortfolioProjectPath(params.category, params.slug, 'en')}`,
		id: `${siteUrl}${getPortfolioProjectPath(params.category, params.slug, 'id')}`,
		'x-default': `${siteUrl}${getPortfolioProjectPath(params.category, params.slug, 'en')}`
	};

	const meta: SeoMeta = {
		title: metaTitle ?? `${project.title} - ${project.client} | Complex Design Studio`,
		description: project.description.substring(0, 155) + '...',
		canonical: publicUrl,
		languageAlternates,
		noIndex: false,
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'CreativeWork',
			name: project.title,
			author: {
				'@type': 'Organization',
				name: 'Complex Design Studio'
			},
			url: publicUrl,
			image: `${siteUrl}${project.coverImage}`,
			description: project.description
		}
	};

	return {
		project,
		meta
	};
};
