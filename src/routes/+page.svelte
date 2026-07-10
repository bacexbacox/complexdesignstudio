<script lang="ts">
	import StatsSection from '$lib/components/sections/home/StatsSection.svelte';
	import HeroSection from '$lib/components/sections/home/HeroSection.svelte';
	import ServicesSlide from '$lib/components/sections/home/ServicesSlide.svelte';
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import ServiceList from '$lib/components/shared/ServiceList.svelte';

	let { data } = $props();
</script>

<SeoHead meta={data.meta} />

<!-- Hero Section -->
<section class="padding-global flex min-h-screen flex-col pt-32 pb-16 md:pt-[11vw] overflow-hidden">
	<div class="flex w-full flex-col gap-16 md:gap-24">
		<HeroSection />
		<StatsSection />
	</div>
</section>

<!-- Services Slide — scroll-based resize animation (standalone section) -->
<ServicesSlide />

<!-- Service List Section -->
<ServiceList />
