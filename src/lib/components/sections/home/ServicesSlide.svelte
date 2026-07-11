<script lang="ts">
	/**
	 * ServicesSlide — Scroll-based resize animation
	 * Terinspirasi dari lessestudio.com:
	 * - GIF dimulai kecil (40vw × 30vw) di tengah layar
	 * - Saat scroll ke bawah, membesar secara perlahan hingga hampir fullscreen (90vw × ~100vh)
	 * - Scroll kembali ke atas, menyusut kembali
	 * - Menggunakan sticky positioning + scroll spacer untuk mengontrol animasi
	 */

	let sectionEl: HTMLElement | undefined = $state();
	let containerEl: HTMLElement | undefined = $state();

	// Animasi width & height dihitung berdasarkan scroll progress
	let currentWidth = $state('40vw');
	let currentHeight = $state('30vw');
	let currentRadius = $state('1.5vw');

	/**
	 * Easing function: Quadratic Ease-In-Out
	 * Memberikan akselerasi halus di awal dan deselerasi di akhir
	 */
	function easeInOutQuad(t: number): number {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	}

	/**
	 * Menghitung dimensi container berdasarkan posisi scroll.
	 * - Start: 40vw × 30vw (saat section top = viewport top)
	 * - End: (100vw - 10vw) × (100vh - 6vw) (setelah scroll 1 viewport height)
	 * - Radius mengecil dari 1.5vw ke 0 seiring scroll progress
	 */
	function handleScroll() {
		if (!sectionEl) return;

		const rect = sectionEl.getBoundingClientRect();
		const sectionTop = rect.top + window.scrollY;
		const vh = window.innerHeight;
		const vw = window.innerWidth / 100;

		// Progress 0→1 berdasarkan seberapa jauh section sudah ter-scroll
		const rawProgress = (window.scrollY - sectionTop) / vh;
		const progress = Math.max(0, Math.min(1, rawProgress));
		const easedProgress = easeInOutQuad(progress);

		// Interpolasi dimensi: start → end
		const startW = 40 * vw;
		const startH = 30 * vw;
		const endW = window.innerWidth - 10 * vw; // 90vw
		const endH = vh - 6 * vw; // ~100vh minus margin

		const w = startW + (endW - startW) * easedProgress;
		const h = startH + (endH - startH) * easedProgress;

		// Border radius: dari 1.5vw → 0.3vw saat membesar
		const startRadius = 1.5 * vw;
		const endRadius = 0.3 * vw;
		const r = startRadius + (endRadius - startRadius) * easedProgress;

		currentWidth = `${w}px`;
		currentHeight = `${h}px`;
		currentRadius = `${r}px`;
	}

	$effect(() => {
		// Bind scroll & resize listener saat komponen mount
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll, { passive: true });

		// Hitung posisi awal
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	});
</script>

<!-- 
  Section wrapper: relative positioning untuk menampung sticky + spacer.
  Total tinggi = 100vh (sticky area visible) + 100vh (scroll spacer) = 200vh scroll travel.
-->
<section bind:this={sectionEl} class="relative w-full">
	<!-- Sticky container: tetap di tengah layar selama scrolling berlangsung -->
	<div class="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
		<!-- Animated container: dimensi diubah via inline style -->
		<div
			bind:this={containerEl}
			class="overflow-hidden"
			style="width: {currentWidth}; height: {currentHeight}; border-radius: {currentRadius};"
		>
			<div class="relative h-full w-full overflow-hidden">
				<video
					class="h-full w-full object-cover"
					autoplay
					loop
					muted
					playsinline
				>
					<source
						media="(max-width: 767px)"
						src="/images/pages/home/mobileslide-porto.mp4"
						type="video/mp4"
					/>
					<source
						media="(min-width: 768px)"
						src="/images/pages/home/animasi-porto-complex.mp4"
						type="video/mp4"
					/>
				</video>
			</div>
		</div>
	</div>

	<!-- 
		Scroll spacer: elemen tak terlihat yang memberikan "ruang scroll" 
		untuk mengontrol progress animasi. Tinggi 100vh = 1 full scroll viewport.
	-->
	<div aria-hidden="true" class="pointer-events-none shrink-0" style="height: 100vh;"></div>
</section>
