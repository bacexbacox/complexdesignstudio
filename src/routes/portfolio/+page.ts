import { redirect } from '@sveltejs/kit';
import { localizeHref } from '$lib/paraglide/runtime';

export const load = () => {
	throw redirect(308, localizeHref('/service'));
};
