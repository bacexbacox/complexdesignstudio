<script lang="ts">
  import type { PortfolioProject } from '$lib/types';
  import PortfolioCard from './PortfolioCard.svelte';
  
  let { projects } = $props<{ projects: PortfolioProject[] }>();
</script>

<section class="padding-global py-16 md:py-24">
  <div class="cd-container">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-24">
      {#each projects as project (project.id)}
        <PortfolioCard {project} />
      {/each}
    </div>
  </div>
</section>
