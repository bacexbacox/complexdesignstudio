<script lang="ts">
	import CardCounting from './CardCounting.svelte';

	/**
	 * Staggered Scroll-driven Parallax untuk Stats Cards
	 * Setiap card punya delay offset berbeda agar gerakan terlihat bertahap & natural.
	 * - Card 1 (Project Delivery): bergerak duluan ke kiri, jarak terjauh
	 * - Card 2 (Years in Industri): delay sedikit, ke kanan, jarak sedang
	 * - Card 3 (BUMN/Goverment): delay lebih lama, ke kanan, jarak paling pendek
	 */

	let sectionRef: HTMLElement | undefined = $state();
	let scrollProgress = $state(0);

	$effect(() => {
		if (!sectionRef) return;

		const handleScroll = () => {
			if (!sectionRef) return;

			const rect = sectionRef.getBoundingClientRect();
			const sectionHeight = sectionRef.offsetHeight;
			const viewportHeight = window.innerHeight;

			const offset = viewportHeight * 0.5;
			const rawProgress = (offset - rect.top) / (sectionHeight + offset);
			scrollProgress = Math.max(0, Math.min(1, rawProgress));
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	/**
	 * Staggered progress per card — delay offset menunda mulai animasi,
	 * lalu scale mempercepat/melambatkan gerakan setelah mulai.
	 * Hasilnya: card 1 duluan, card 2 menyusul, card 3 paling akhir.
	 */
	function staggerProgress(progress: number, delay: number): number {
		// Kurangi progress sesuai delay, lalu scale ke 0-1
		const adjusted = (progress - delay) / (1 - delay);
		return Math.max(0, Math.min(1, adjusted));
	}

	// Card 1: Project Delivery — mulai duluan (delay 0), jarak 140px ke kiri
	let card1Progress = $derived(staggerProgress(scrollProgress, 0));
	let card1Translate = $derived(-card1Progress * 140);
	let card1Opacity = $derived(1 - card1Progress * 1.3);

	// Card 2: Years in Industri — delay 0.25, jarak 100px ke kanan
	let card2Progress = $derived(staggerProgress(scrollProgress, 0.25));
	let card2Translate = $derived(card2Progress * 100);
	let card2Opacity = $derived(1 - card2Progress * 1.3);

	// Card 3: BUMN/Goverment — delay 0.50, jarak 130px ke kanan
	let card3Progress = $derived(staggerProgress(scrollProgress, 0.50));
	let card3Translate = $derived(card3Progress * 130);
	let card3Opacity = $derived(1 - card3Progress * 1.3);
</script>

<!-- Cards Section -->
<div bind:this={sectionRef} class="grid grid-cols-2 lg:grid-cols-4 gap-4">
	<!-- Card 1: Project Delivery — slides LEFT first -->
	<div
		class="lg:col-span-2 will-change-transform"
		style="transform: translateX({card1Translate}px); opacity: {Math.max(0, card1Opacity)};"
	>
		<CardCounting number="200+" label="Project Delivery" class="h-full" />
	</div>

	<!-- Card 2: Years in Industri — slides RIGHT with slight delay -->
	<div
		class="col-start-1 lg:col-start-auto will-change-transform"
		style="transform: translateX({card2Translate}px); opacity: {Math.max(0, card2Opacity)};"
	>
		<CardCounting number="15+" label="Years in Industri" class="h-full" />
	</div>

	<!-- Card 3: BUMN/Goverment — slides RIGHT with more delay -->
	<div
		class="col-start-2 row-start-1 row-span-2 lg:col-start-auto lg:row-start-auto lg:row-span-1 will-change-transform"
		style="transform: translateX({card3Translate}px); opacity: {Math.max(0, card3Opacity)};"
	>
		<CardCounting number="20+" label="BUMN/Goverment" class="h-full" />
	</div>
</div>

