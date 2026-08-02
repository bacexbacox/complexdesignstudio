<script lang="ts">
	let { title, description, intro } = $props<{
		title: string;
		description: string;
		intro?: string;
	}>();
</script>

<section class="padding-global pt-32 pb-16 md:pt-40 md:pb-20">
	<div class="cd-container">
		<div class="flex flex-col gap-8 md:flex-row md:justify-between md:gap-16">
			<div class="w-full md:w-1/2">
				<h1 class="text-2xl font-medium tracking-tight uppercase md:text-4xl lg:text-5xl">
					{title}
				</h1>
			</div>

			<div class="flex w-full flex-col gap-6 md:w-1/2">
				<p class="max-w-md text-sm text-gray-500 italic">
					{intro ||
						description ||
						'Strategy defines the foundation of a brand. Through research, analysis, and strategic thinking, we clarify positioning, messaging, and long term direction.'}
				</p>
				<h2 class="text-xl leading-relaxed font-medium md:text-3xl">
					{(intro && description) ||
						'Complex is a design and technology studio. We build digital products, from concept to production.'}
				</h2>
			</div>
		</div>
	</div>
</section>
