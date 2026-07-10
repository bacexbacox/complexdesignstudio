<script lang="ts">
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import ProjectDetail from '$lib/components/sections/portfolio/ProjectDetail.svelte';

	let { data } = $props();
</script>

<SeoHead meta={data.meta} />

<main class="min-h-screen bg-[#FAFAFA] pt-32 md:pt-40">
	<ProjectDetail project={data.project} />
</main>
