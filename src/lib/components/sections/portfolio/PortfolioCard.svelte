<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime';
	import type { PortfolioProject } from '$lib/types';
	import { getPortfolioProjectPath } from '$lib/utils/portfolio-routes';

	let { project } = $props<{ project: PortfolioProject }>();
	const locale = getLocale();
</script>

<a
	href={getPortfolioProjectPath(project.categorySlug, project.slug, locale)}
	class="group flex flex-col items-start gap-6 sm:flex-row md:gap-8"
>
	<!-- Image Box -->
	<div
		class="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-gray-100 sm:w-40 md:w-48"
	>
		{#if project.coverImage}
			<img
				src={project.coverImage}
				alt={project.title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				loading="lazy"
				width="400"
				height="400"
			/>
		{:else}
			<div class="h-full w-full bg-gray-200"></div>
		{/if}
	</div>

	<!-- Content Box -->
	<div class="flex flex-col gap-3 py-2">
		<h3 class="text-lg font-bold tracking-wide uppercase md:text-xl">
			{project.client}
		</h3>

		<div class="flex items-center gap-2 text-sm font-medium tracking-wider text-gray-500 uppercase">
			<span>{project.year}</span>
			<span class="text-gray-300">|</span>
			<span>{project.tags.join(', ')}</span>
		</div>

		<p class="mt-2 line-clamp-4 max-w-sm text-sm text-gray-400 italic">
			{project.description}
		</p>
	</div>
</a>
