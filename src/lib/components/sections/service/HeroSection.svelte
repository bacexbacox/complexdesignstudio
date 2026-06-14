<!--
  HeroSection.svelte — Hero section untuk halaman /service
  Layout: Judul "Service" besar di kiri, deskripsi kecil di kanan atas,
  lalu tagline besar di bawah (center-aligned)
-->
<script lang="ts">
	/**
	 * Intersection Observer untuk animasi masuk elemen
	 * Menggunakan $effect agar observer di-cleanup saat komponen unmount
	 */
	let sectionEl: HTMLElement | undefined = $state();
	let isVisible = $state(false);

	$effect(() => {
		if (!sectionEl) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.15 }
		);

		observer.observe(sectionEl);

		return () => observer.disconnect();
	});
</script>

<section
	bind:this={sectionEl}
	class="min-h-[70vh] md:min-h-[80vh] flex flex-col justify-end padding-global pb-12 md:pb-20 lg:pb-28 pt-32 md:pt-40"
>
	<!-- Row atas: Judul "Service" kiri + deskripsi kanan -->
	<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12 mb-10 md:mb-16">
		<div
			class="overflow-hidden"
		>
			<h1
				class="text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95] tracking-tight transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
				style="transform: translateY({isVisible ? '0%' : '110%'})"
			>
				Service
			</h1>
		</div>

		<div
			class="max-w-xs md:max-w-[280px] lg:max-w-[320px] text-right transition-all duration-700 delay-300"
			style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '16px'})"
		>
			<p class="text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
				Strategy defines the foundation of a brand. Through research, analysis, and strategic
				thinking, we clarify positioning, messaging, and long-term direction.
			</p>
		</div>
	</div>

	<!-- Tagline besar di bawah -->
	<div
		class="transition-all duration-[900ms] delay-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
		style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '32px'})"
	>
		<p class="text-2xl md:text-4xl lg:text-[3.5vw] font-medium leading-[1.15] tracking-tight text-center max-w-4xl mx-auto">
			Complex is a design and technology studio. We build digital products, from concept to production.
		</p>
	</div>
</section>
