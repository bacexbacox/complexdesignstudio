import { projects } from '$lib/data/portfolio';
import { services } from '$lib/data/services';
import {
	getPortfolioCategoryPath,
	getPortfolioProjectPath,
	siteUrl,
	type PortfolioLocale
} from '$lib/utils/portfolio-routes';

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

export const GET = () => {
	const staticRoutes = [
		'/',
		'/id',
		'/service',
		'/id/service',
		'/about',
		'/id/about',
		'/contact',
		'/id/contact'
	];
	const locales: PortfolioLocale[] = ['en', 'id'];
	const projectRoutes = projects.flatMap((project) =>
		locales.map((locale) => getPortfolioProjectPath(project.categorySlug, project.slug, locale))
	);
	const categoryRoutes = services.flatMap((service) =>
		locales.map((locale) => getPortfolioCategoryPath(service.slug, locale))
	);

	const urls = [...staticRoutes, ...categoryRoutes, ...projectRoutes]
		.map(
			(path) => `  <url>
    <loc>${escapeXml(`${siteUrl}${path}`)}</loc>
  </url>`
		)
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600'
		}
	});
};
