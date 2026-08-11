export type PortfolioLocale = 'en' | 'id';

const archivedBankingSlugs: Record<string, string> = {
	'complex-design-portfolio-archive-bsm-priority-mobile':
		'arsip-portofolio-complex-design-bsm-priority-mobile',
	'complex-design-portfolio-archive-bsm-priority':
		'arsip-portofolio-complex-design-bsm-priority',
	'complex-design-portfolio-archive-bank-syariah-mandiri':
		'arsip-portofolio-complex-design-bank-syariah-mandiri',
	'complex-design-portfolio-archive-bsm-pawning':
		'arsip-portofolio-complex-design-bsm-pawning'
};

export function getEnglishPortfolioSlug(slug: string): string {
	const translatedSlug = Object.entries(archivedBankingSlugs).find(
		([, indonesianSlug]) => indonesianSlug === slug
	);

	return translatedSlug?.[0] ?? slug;
}

export function getLocalizedPortfolioSlug(slug: string, locale: PortfolioLocale): string {
	const englishSlug = getEnglishPortfolioSlug(slug);
	return locale === 'id' ? (archivedBankingSlugs[englishSlug] ?? englishSlug) : englishSlug;
}

export function getPortfolioCategoryPath(category: string, locale: PortfolioLocale): string {
	const basePath = locale === 'id' ? '/id/portofolio' : '/portfolio';
	return `${basePath}/${category}`;
}

export function getPortfolioProjectPath(
	category: string,
	slug: string,
	locale: PortfolioLocale
): string {
	return `${getPortfolioCategoryPath(category, locale)}/${getLocalizedPortfolioSlug(slug, locale)}`;
}

export function getLocalizedPortfolioPath(
	pathname: string,
	locale: PortfolioLocale
): string | undefined {
	const segments = pathname.split('/').filter(Boolean);
	if (segments[0] === 'id') segments.shift();

	if (segments[0] !== 'portfolio' && segments[0] !== 'portofolio') return undefined;
	if (segments.length === 1) return locale === 'id' ? '/id/portofolio' : '/portfolio';
	if (segments.length === 2) return getPortfolioCategoryPath(segments[1], locale);
	if (segments.length === 3) {
		return getPortfolioProjectPath(segments[1], segments[2], locale);
	}

	return undefined;
}

export function getInternalPortfolioPath(pathname: string): string | undefined {
	if (!/^\/id\/portofolio(?:\/|$)/.test(pathname)) return undefined;

	const segments = pathname.split('/').filter(Boolean);
	const category = segments[2];
	const slug = segments[3];

	if (!category) return '/portfolio';
	if (!slug) return `/portfolio/${category}`;
	if (segments.length !== 4) return undefined;

	return `/portfolio/${category}/${getEnglishPortfolioSlug(slug)}`;
}
