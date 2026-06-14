<!-- SeoHead.svelte — Reusable SEO head component untuk semua halaman -->
<script lang="ts">
	import type { SeoMeta } from '$lib/types';
	let { meta }: { meta: SeoMeta } = $props();
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={meta.canonical} />

	<!-- Open Graph -->
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.ogImage ?? '/og/default.jpg'} />
	<meta property="og:url" content={meta.canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Complex Design Studio" />

	<!-- Twitter / X Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={meta.ogImage ?? '/og/default.jpg'} />

	{#if meta.noIndex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
	{#if meta.jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}<\/script>`}
	{/if}
</svelte:head>
