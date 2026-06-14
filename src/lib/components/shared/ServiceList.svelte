<script lang="ts">
	import { services } from '$lib/data/services';
</script>

<section class="w-full padding-global py-12 md:py-20 lg:py-28">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-16 lg:gap-y-16">
		{#each services as service}
			<div class="flex flex-col gap-4">
				<h3 class="text-base text-black">{service.title} :</h3>
				<ul class="flex flex-col gap-1">
					{#each service.items as item}
						<li class="text-base text-gray-700">{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>
