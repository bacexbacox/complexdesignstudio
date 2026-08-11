import { projects } from '$lib/data/portfolio';
import { services } from '$lib/data/services';
import {
	getPortfolioCategoryPath,
	getPortfolioProjectPath,
	type PortfolioLocale
} from '$lib/utils/portfolio-routes';

const baseUrl = 'https://complexdesignstudio.com';

const escapeXml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');

export const GET = () => {
	const lastModified = new Date().toISOString().split('T')[0];
	const staticRoutes = [
		{ path: '/', priority: '1.0', changefreq: 'weekly' },
		{ path: '/service', priority: '0.9', changefreq: 'monthly' },
		{ path: '/about', priority: '0.7', changefreq: 'monthly' },
		{ path: '/contact', priority: '0.7', changefreq: 'yearly' }
	];
	const locales: PortfolioLocale[] = ['en', 'id'];
	const projectRoutes = projects.flatMap((project) =>
		locales.map((locale) => ({
			path: getPortfolioProjectPath(project.categorySlug, project.slug, locale),
			priority: '0.8',
			changefreq: 'monthly'
		}))
	);
	const categoryRoutes = services.flatMap((service) =>
		locales.map((locale) => ({
			path: getPortfolioCategoryPath(service.slug, locale),
			priority: '0.8',
			changefreq: 'monthly'
		}))
	);

	const urls = [...staticRoutes, ...categoryRoutes, ...projectRoutes]
		.map(
			({ path, priority, changefreq }) => `  <url>
    <loc>${escapeXml(`${baseUrl}${path}`)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
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
