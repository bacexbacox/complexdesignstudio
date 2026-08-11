import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$lib/paraglide/runtime';
import { getInternalPortfolioPath } from '$lib/utils/portfolio-routes';

export const reroute: Reroute = (request) => {
	if (/^\/id\/portfolio(?:\/|$)/.test(request.url.pathname)) {
		return request.url.pathname;
	}

	const portfolioPath = getInternalPortfolioPath(request.url.pathname);
	if (portfolioPath) return portfolioPath;

	return deLocalizeUrl(request.url).pathname;
};
