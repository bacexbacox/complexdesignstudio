<script lang="ts">
	/**
	 * Scroll-driven Parallax Translate Animation
	 *
	 * Menghitung scroll progress berdasarkan posisi hero section di viewport.
	 * - Left content: translateX ke kiri + fade out saat scroll ke bawah
	 * - Right content: translateX ke kanan + fade out saat scroll ke bawah
	 * - Kedua sisi kembali ke posisi awal saat scroll ke atas (reversible)
	 */

	let heroRef: HTMLElement | undefined = $state();
	let scrollProgress = $state(0);

	// Jarak translate maksimum (px) dan batas scroll sebelum animasi selesai
	const MAX_TRANSLATE = 150;

	$effect(() => {
		if (!heroRef) return;

		const handleScroll = () => {
			if (!heroRef) return;

			const rect = heroRef.getBoundingClientRect();
			const heroHeight = heroRef.offsetHeight;
			const viewportHeight = window.innerHeight;

			// Hitung progress: 0 = hero fully visible at top, 1 = hero sudah keluar viewport atas
			// Menggunakan top position relatif terhadap viewport
			const rawProgress = -rect.top / (heroHeight * 0.6);
			scrollProgress = Math.max(0, Math.min(1, rawProgress));
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // Initial check

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// Derived transform values — smooth parallax berdasarkan scroll progress
	let leftTranslate = $derived(-scrollProgress * MAX_TRANSLATE);
	let rightTranslate = $derived(scrollProgress * MAX_TRANSLATE);
	let contentOpacity = $derived(1 - scrollProgress * 1.2); // Fade sedikit lebih cepat dari translate
</script>

<div
	bind:this={heroRef}
	class="mt-8 grid grid-cols-1 items-start gap-8 text-center lg:grid-cols-12 lg:gap-16 lg:text-left"
>
	<!-- Left side: heading — slides left on scroll -->
	<div
		class="will-change-transform lg:col-span-8"
		style="transform: translateX({leftTranslate}px); opacity: {Math.max(0, contentOpacity)};"
	>
		<h1 class="text-3xl leading-[1.1] font-medium tracking-tight md:text-5xl lg:text-[64px]">
			Let our team do the heavy thinking to formulate your brand's strategy, architecture, and
			design <span class="text-neutral-400">while you focus on running your business.</span>
		</h1>
	</div>

	<!-- Right side: descriptions — slides right on scroll -->
	<div
		class="flex flex-col items-center gap-6 text-sm font-light text-neutral-500 will-change-transform lg:col-span-4 lg:mt-4 lg:items-start"
		style="transform: translateX({rightTranslate}px); opacity: {Math.max(0, contentOpacity)};"
	>
		<p class="max-w-[400px] lg:max-w-none">
			Complex Design is a space where diverse skills from talented hands are forged into a single
			mind, a single purpose, one that always produces complex, quality work.
		</p>
		<p class="max-w-[400px] lg:max-w-none">
			We are committed to showcasing our excellence to the world, helping your brand reach the top
			and empowering UMKM (Indonesian Small and Medium Enterprises) toward success.
		</p>
	</div>
</div>
