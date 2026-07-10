<script lang="ts">
  import type { PortfolioProject } from '$lib/types';
  
  let { project } = $props<{ project: PortfolioProject }>();
</script>

<a href={`/portfolio/${project.categorySlug}/${project.slug}`} class="group flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
  <!-- Image Box -->
  <div class="w-full sm:w-40 md:w-48 aspect-square shrink-0 rounded-2xl overflow-hidden bg-gray-100 relative">
    {#if project.coverImage}
      <img
        src={project.coverImage}
        alt={project.title}
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        width="400"
        height="400"
      />
    {:else}
      <div class="w-full h-full bg-gray-200"></div>
    {/if}
  </div>

  <!-- Content Box -->
  <div class="flex flex-col gap-3 py-2">
    <h3 class="text-lg md:text-xl font-bold uppercase tracking-wide">
      {project.client}
    </h3>
    
    <div class="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-2">
      <span>{project.year}</span>
      <span class="text-gray-300">|</span>
      <span>{project.tags.join(', ')}</span>
    </div>
    
    <p class="text-sm text-gray-400 mt-2 italic max-w-sm line-clamp-4">
      {project.description}
    </p>
  </div>
</a>
