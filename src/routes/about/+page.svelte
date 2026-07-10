<!-- src/routes/about/+page.svelte -->
<script lang="ts">
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import AboutHero from '$lib/components/sections/about/AboutHero.svelte';
	import ClientLogoCarousel from '$lib/components/sections/about/ClientLogoCarousel.svelte';

	let { data } = $props();
</script>

<!-- SEO & Meta Tags -->
<SeoHead meta={data.meta} />

<main>
	<!-- Container 1: Hero Section seperti halaman service -->
	<AboutHero />

	<!-- Container 2: The Team (Jangan dibuat dulu, ini placeholder) -->
	<!-- <TeamSection /> -->
	
	<!-- Container 3: Logo Carousel -->
	<ClientLogoCarousel />
</main>
