<script lang="ts">
	import StatsSection from '$lib/components/sections/home/StatsSection.svelte';
</script>

<svelte:head>
	<title>Complex Design Studio</title>
	<meta
		name="description"
		content="Complex Design Studio - Premium digital agency specializing in brand strategy, web development, and design."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="min-h-screen pt-32 md:pt-[11vw] pb-16 flex flex-col padding-global">
	<div class="w-full flex flex-col gap-16 md:gap-24">
		<!-- Header Text Section -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-8">
			<div class="lg:col-span-8">
				<h1 class="text-3xl md:text-5xl lg:text-[64px] font-medium leading-[1.1] tracking-tight">
					Complex is a design and technology studio. We build digital products, from concept to
					production.<br />
					<span class="text-neutral-400">We deliver holistic brand identity & digital experiences.</span>
				</h1>
			</div>
			<div class="lg:col-span-4 flex flex-col gap-6 text-sm text-neutral-500 font-light lg:mt-4">
				<p>
					Strategy defines the foundation of a brand. Through research, analysis, and strategic thinking,
					we clarify positioning, messaging, and long-term direction.
				</p>
				<p>
					Strategy defines the foundation of a brand. Through research, analysis, and strategic thinking,
					we clarify positioning, messaging, and long-term direction.
				</p>
			</div>
		</div>

		<!-- Cards Section -->
		<StatsSection />
	</div>
</section>
