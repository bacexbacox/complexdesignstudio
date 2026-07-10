// src/routes/about/+page.ts
import type { SeoMeta } from '$lib/types';

export const load = () => {
	const meta: SeoMeta = {
		title: 'About Us — Complex Design Studio',
		description: 'We are a collective of thinkers, designers, and developers dedicated to creating impactful digital experiences that connect brands with people.',
		canonical: 'https://complexdesignstudio.com/about',
	};

	return { meta };
};
