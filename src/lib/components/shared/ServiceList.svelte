<script lang="ts">
	import { services } from '$lib/data/services';

	/**
	 * Scroll-driven Entrance Animation — setiap service masuk dari arah berbeda:
	 * [0] Website Dev    → dari kiri       [1] Mobile App     → dari atas
	 * [2] Digital Mktg   → dari kanan      [3] UX Design      → dari bawah
	 * [4] Creative Design→ dari kiri-bawah  [5] Branding       → dari kanan-bawah
	 *
	 * Animasi REVERSE: elemen kembali ke posisi tersembunyi saat scroll ke atas.
	 */

	let sectionRef: HTMLElement | undefined = $state();
	let scrollProgress = $state(0);

	// Arah masuk per service (translateX, translateY) dalam px saat progress = 0 (tersembunyi)
	const ENTRANCE_DIRECTIONS: { x: number; y: number }[] = [
		{ x: -200, y: 0 },     // Kiri
		{ x: 0, y: -140 },     // Atas
		{ x: 200, y: 0 },      // Kanan
		{ x: -140, y: 140 },   // Kiri-bawah
		{ x: 0, y: 140 },      // Bawah
		{ x: 140, y: 140 },    // Kanan-bawah
	];

	// Delay stagger per service — jarak besar agar terlihat satu per satu
	const STAGGER_DELAYS = [0, 0.12, 0.24, 0.36, 0.48, 0.60];

	$effect(() => {
		if (!sectionRef) return;

		const handleScroll = () => {
			if (!sectionRef) return;

			const rect = sectionRef.getBoundingClientRect();
			const viewportHeight = window.innerHeight;

			// Animasi mulai saat section baru masuk viewport bawah,
			// selesai saat section hampir sampai atas — range lebih panjang = lebih lambat
			const triggerStart = viewportHeight * 0.95;
			const triggerEnd = viewportHeight * 0.10;
			const rawProgress = (triggerStart - rect.top) / (triggerStart - triggerEnd);
			scrollProgress = Math.max(0, Math.min(1, rawProgress));
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	/**
	 * Menghitung progress per item dengan stagger delay.
	 * Mengembalikan 0 (tersembunyi) → 1 (tampil penuh).
	 */
	function staggerProgress(progress: number, delay: number): number {
		const adjusted = (progress - delay) / (1 - delay);
		return Math.max(0, Math.min(1, adjusted));
	}

	/**
	 * Menghitung style transform + opacity untuk service ke-i.
	 * Progress 0 = posisi asal (tersembunyi, di luar layar)
	 * Progress 1 = posisi final (tampil sempurna)
	 */
	function getItemStyle(index: number): string {
		const dir = ENTRANCE_DIRECTIONS[index] ?? { x: 0, y: 80 };
		const delay = STAGGER_DELAYS[index] ?? 0;
		const progress = staggerProgress(scrollProgress, delay);

		// Ease-out cubic untuk gerakan yang smooth dan natural
		const eased = 1 - Math.pow(1 - progress, 3);

		// Saat progress 0: translate penuh (tersembunyi). Saat 1: translate 0 (tampil).
		const tx = dir.x * (1 - eased);
		const ty = dir.y * (1 - eased);
		const opacity = Math.max(0, eased);

		return `transform: translate(${tx}px, ${ty}px); opacity: ${opacity};`;
	}
</script>

<section class="w-full padding-global py-12 md:py-20 lg:py-28 flex flex-col items-center overflow-hidden">
	<div
		bind:this={sectionRef}
		class="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 lg:gap-x-16 lg:gap-y-16"
	>
		{#each services as service, i}
			<div
				class="flex flex-col items-center md:items-start gap-3 md:gap-4 text-center md:text-left will-change-transform"
				style={getItemStyle(i)}
			>
				<h3 class="text-sm md:text-base text-black">{service.title} :</h3>
				<ul class="flex flex-col items-center md:items-start gap-1">
					{#each service.items as item}
						<li class="text-xs md:text-base text-gray-700">{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

