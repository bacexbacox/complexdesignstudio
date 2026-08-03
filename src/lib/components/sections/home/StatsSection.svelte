<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import CardCounting from './CardCounting.svelte';

	/**
	 * Staggered Scroll-driven Parallax untuk Stats Cards
	 * Setiap card punya delay offset berbeda agar gerakan terlihat bertahap & natural.
	 * - Card 1 (Project Delivery): bergerak duluan ke kiri, jarak terjauh
	 * - Card 2 (Years of Industriy): delay sedikit, ke kanan, jarak sedang
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

	// Card 2: Years of Industriy — delay 0.25, jarak 100px ke kanan
	let card2Progress = $derived(staggerProgress(scrollProgress, 0.25));
	let card2Translate = $derived(card2Progress * 100);
	let card2Opacity = $derived(1 - card2Progress * 1.3);

	// Card 3: BUMN/Goverment — delay 0.50, jarak 130px ke kanan
	let card3Progress = $derived(staggerProgress(scrollProgress, 0.5));
	let card3Translate = $derived(card3Progress * 130);
	let card3Opacity = $derived(1 - card3Progress * 1.3);
</script>

<!-- Cards Section -->
<div bind:this={sectionRef} class="grid grid-cols-2 gap-4 lg:grid-cols-4">
	<!-- Card 1: Project Delivery — slides LEFT first -->
	<div
		class="stats-parallax will-change-transform lg:col-span-2"
		style="transform: translateX({card1Translate}px); opacity: {Math.max(0, card1Opacity)};"
	>
		<CardCounting number="200+" label={m.home_stats_project_delivery()} class="h-full" />
	</div>

	<!-- Card 2: Years of Industriy — slides RIGHT with slight delay -->
	<div
		class="stats-parallax col-start-1 will-change-transform lg:col-start-auto"
		style="transform: translateX({card2Translate}px); opacity: {Math.max(0, card2Opacity)};"
	>
		<CardCounting number="15+" label={m.home_stats_years_industry()} class="h-full" />
	</div>

	<!-- Card 3: BUMN/Goverment — slides RIGHT with more delay -->
	<div
		class="stats-parallax col-start-2 row-span-2 row-start-1 will-change-transform lg:col-start-auto lg:row-span-1 lg:row-start-auto"
		style="transform: translateX({card3Translate}px); opacity: {Math.max(0, card3Opacity)};"
	>
		<CardCounting number="20+" label={m.home_stats_government()} class="h-full" />
	</div>
</div>

<style>
	/* Keep the stat cards fully visible on narrow screens. The desktop parallax
	 * offsets are large enough to move the first card's counter outside the viewport. */
	@media (max-width: 1023px) {
		.stats-parallax {
			transform: none !important;
			opacity: 1 !important;
		}
	}
</style>
