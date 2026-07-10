<script lang="ts">
  import SeoHead from '$lib/components/shared/SeoHead.svelte';
  import PortfolioHero from '$lib/components/sections/portfolio/PortfolioHero.svelte';
  import PortfolioGrid from '$lib/components/sections/portfolio/PortfolioGrid.svelte';

  let { data } = $props();
</script>

<SeoHead meta={data.meta} />

<div class="min-h-screen bg-[#FAFAFA]">
  <PortfolioHero 
    title={data.service.title} 
    description={data.service.description} 
  />
  
  <PortfolioGrid projects={data.projects} />
</div>
