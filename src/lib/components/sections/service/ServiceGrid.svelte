<!--
  ServiceGrid.svelte — Grid container untuk service cards
  Layout: 3 kolom × 2 baris sesuai wireframe user
  Data diambil dari data layer services.ts

  Scroll-driven Entrance Animation — setiap card masuk dari arah berbeda:
  [0] Website Dev     → dari kiri       [1] Mobile App     → dari atas
  [2] Digital Mktg    → dari kanan      [3] UX Design      → dari kiri-bawah
  [4] Creative Design → dari bawah      [5] Branding       → dari kanan-bawah

  Progress dihitung PER CARD (bukan per section) agar card bawah
  tetap ter-animasi walau section sangat tinggi.
-->
<script lang="ts">
	import { services } from '$lib/data/services';
	import ServiceCard from '$lib/components/sections/service/ServiceCard.svelte';

	let sectionRef: HTMLElement | undefined = $state();

	// Progress per card — dihitung individual dari posisi masing-masing card-cell
	let scrollProgresses: number[] = $state([0, 0, 0, 0, 0, 0]);

	// Arah masuk per card (translateX, translateY) dalam px saat progress = 0 (tersembunyi)
	const ENTRANCE_DIRECTIONS: { x: number; y: number }[] = [
		{ x: -500, y: 0 },     // Kiri
		{ x: 0, y: -400 },     // Atas
		{ x: 500, y: 0 },      // Kanan
		{ x: -400, y: 400 },   // Kiri-bawah
		{ x: 0, y: 400 },      // Bawah
		{ x: 400, y: 400 },    // Kanan-bawah
	];

	$effect(() => {
		if (!sectionRef) return;

		const handleScroll = () => {
			if (!sectionRef) return;

			const cells = sectionRef.querySelectorAll('.card-cell');
			const viewportHeight = window.innerHeight;

			// === ENTRY ZONE (dari bawah masuk) ===
			// Card mulai animasi saat 15% di bawah viewport, selesai di 15% dari atas
			const entryStart = viewportHeight * 1.15;
			const entryEnd = viewportHeight * 0.15;

			// === EXIT ZONE (keluar ke atas) ===
			// Card mulai menghilang saat top card di 10% viewport, selesai jauh di atas layar (-60%)
			const exitStart = viewportHeight * 0.10;
			const exitEnd = viewportHeight * -1.5;

			cells.forEach((cell, i) => {
				const rect = cell.getBoundingClientRect();

				// Entry progress: 0 (di bawah) → 1 (di tengah viewport)
				const entryRaw = (entryStart - rect.top) / (entryStart - entryEnd);
				const entryProgress = Math.max(0, Math.min(1, entryRaw));

				// Exit progress: 1 (masih terlihat) → 0 (sudah lewat atas)
				const exitRaw = (rect.top - exitEnd) / (exitStart - exitEnd);
				const exitProgress = Math.max(0, Math.min(1, exitRaw));

				// Final = minimum keduanya — card tampil penuh hanya di zona tengah
				scrollProgresses[i] = Math.min(entryProgress, exitProgress);
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	/**
	 * Computed styles per card — menggunakan $derived agar Svelte 5 pasti
	 * re-evaluate saat scrollProgresses berubah.
	 * Setiap card punya progress sendiri berdasarkan posisinya di viewport.
	 */
	let cardStyles = $derived.by(() => {
		return services.map((_, i) => {
			const dir = ENTRANCE_DIRECTIONS[i] ?? { x: 0, y: 80 };
			const progress = scrollProgresses[i] ?? 0;

			// Ease-out cubic untuk gerakan yang smooth dan natural
			const eased = 1 - Math.pow(1 - progress, 3);

			// Saat progress 0: translate penuh (tersembunyi). Saat 1: translate 0 (tampil).
			const tx = dir.x * (1 - eased);
			const ty = dir.y * (1 - eased);

			return `transform: translate(${tx}px, ${ty}px); opacity: ${eased};`;
		});
	});
</script>

<section bind:this={sectionRef} class="padding-global pb-16 md:pb-24 lg:pb-32 overflow-hidden">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
		{#each services as service, index (service.id)}
			<!-- card-cell: wrapper statis untuk mengukur posisi asli card di viewport -->
			<div class="card-cell">
				<div class="will-change-transform" style={cardStyles[index]}>
					<ServiceCard {service} {index} />
				</div>
			</div>
		{/each}
	</div>
</section>
