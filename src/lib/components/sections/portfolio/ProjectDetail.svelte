<script lang="ts">
	import type { PortfolioProject } from '$lib/types';

	let { project }: { project: PortfolioProject } = $props();

	const formattedDescription = $derived(project.description.replace(/\n/g, '<br/><br/>'));
</script>

<div class="mx-auto w-full max-w-[1440px] px-4 pt-12 pb-24 md:px-8 lg:px-16">
	<div class="flex flex-col gap-8 md:flex-row lg:gap-16">
		<!-- Left Column: Information (Sticky on Desktop) -->
		<div class="flex flex-col self-start md:sticky md:top-24 md:w-2/5">
			<h1
				class="text-3xl leading-tight font-semibold wrap-break-word capitalize md:text-4xl lg:text-5xl"
			>
				{project.client}
			</h1>

			{#if project.clientLogo}
				<div class="mt-8 mb-4 h-auto w-[150px]">
					<img
						src={project.clientLogo}
						alt="{project.client} Logo"
						class="h-auto w-full object-contain object-left"
						width="150"
						height="150"
					/>
				</div>
			{/if}

			<!-- Metadata List -->
			<div
				class="mt-8 flex flex-col gap-4 border-t border-gray-200 pt-8 text-sm tracking-wide md:text-base"
			>
				<div class="flex">
					<span class="w-24 font-medium text-gray-900 md:w-32">PROJECT</span>
					<span class="mr-4 text-gray-400">:</span>
					{#if project.url}
						<a href={project.url} target="_blank" rel="noopener noreferrer" class="flex-1 font-medium text-gray-800 uppercase hover:text-gray-600 hover:underline underline-offset-4 transition-all">
							{project.title}
						</a>
					{:else}
						<span class="flex-1 font-medium text-gray-800 uppercase">{project.title}</span>
					{/if}
				</div>
				<div class="flex">
					<span class="w-24 font-medium text-gray-900 md:w-32">DATE</span>
					<span class="mr-4 text-gray-400">:</span>
					<span class="flex-1 text-gray-600">{project.year}</span>
				</div>
				<div class="flex">
					<span class="w-24 font-medium text-gray-900 md:w-32">SERVICE</span>
					<span class="mr-4 text-gray-400">:</span>
					<span class="flex-1 text-gray-600 uppercase"
						>{project.serviceLabel ?? project.categorySlug.replaceAll('-', ' ')}</span
					>
				</div>
				<div class="flex">
					<span class="w-24 font-medium text-gray-900 md:w-32">FEATURE</span>
					<span class="mr-4 text-gray-400">:</span>
					<span class="flex-1 text-gray-600 uppercase">{project.tags.join(' & ')}</span>
				</div>
			</div>

			<!-- Description -->
			<div class="prose prose-sm mt-10 max-w-none leading-relaxed text-gray-500 md:prose-base">
				{@html formattedDescription}
			</div>

			<!-- Back link -->
			<div class="mt-12 flex pb-8">
				<a
					class="group flex w-fit items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-100"
					href="/portfolio/{project.categorySlug}"
				>
					<svg
						class="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
					View all projects
				</a>
			</div>
		</div>

		<!-- Right Column: Images -->
		<div class="flex flex-col gap-6 pb-[50vh] md:w-3/5 md:gap-8">
			{#if project.images && project.images.length > 0}
				{#each project.images as media, i}
					<div class="w-full overflow-hidden rounded-xl bg-gray-100">
						{#if media.includes('youtube.com/embed/')}
							<iframe
								src={media}
								title="{project.title} video {i + 1}"
								class="aspect-video w-full"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe>
						{:else}
							<img
								src={media}
								alt="{project.title} mockup {i + 1}"
								class="h-auto w-full object-cover"
								loading={i === 0 ? 'eager' : 'lazy'}
							/>
						{/if}
					</div>
				{/each}
			{:else}
				<div
					class="flex aspect-4/3 w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50"
				>
					<span class="text-gray-400">Mockup Image Placeholder</span>
				</div>
			{/if}
		</div>
	</div>
</div>
