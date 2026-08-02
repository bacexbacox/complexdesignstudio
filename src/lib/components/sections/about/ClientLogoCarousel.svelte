<!--
  ClientLogoCarousel.svelte — Komponen carousel logo untuk halaman About.
  Fitur: Scrollable horizontal, efek fade di ujung kiri & kanan.
-->
<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	// Asset logo client
	const logos = [
		'/images/about/logoassetclient/logo-bebasperantara-complex-design-studio.png',
		'/images/about/logoassetclient/logo-fernandes-partnership-complex-design-studio.png',
		'/images/about/logoassetclient/logo_poltracking-colour-complex-design-studio.png',
		'/images/about/logoassetclient/logo-bank-syariah-mandiri-complex-design-studio.png',
		'/images/about/logoassetclient/dkt-international-colour-compelx-design.png',
		'/images/about/logoassetclient/logo-hipmi-complex-design-studio.png',
		'/images/about/logoassetclient/logo-kementerian-luar-negeri-complex-design-studio.png',
		'/images/about/logoassetclient/logo-kemenparekraf-complex-design-studio.png'
	];

	// Tidak perlu diduplikasi jika tidak ingin ada pengulangan
	const displayLogos = logos;
</script>

<section class="overflow-hidden py-16 md:py-24">
	<div class="padding-global mb-10 text-center">
		<h2 class="text-sm font-medium tracking-widest text-neutral-500 uppercase md:text-base">
			{m.about_trusted_by()}
		</h2>
		<div class="slide-hint" aria-hidden="true">
			<span class="slide-hint__text">{m.about_slide_hint()}</span>
			<span class="slide-hint__track">
				<span class="slide-hint__arrow slide-hint__arrow--left"></span>
				<span class="slide-hint__line"></span>
				<span class="slide-hint__line"></span>
				<span class="slide-hint__arrow slide-hint__arrow--right"></span>
			</span>
		</div>
	</div>

	<!-- 
		Container dengan efek terpotong (fade to transparent) di sisi kiri & kanan.
		Menggunakan CSS mask-image linear-gradient.
	-->
	<div
		class="relative mx-auto w-full"
		style="mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);"
	>
		<!-- Scrollable wrapper -->
		<div
			class="hide-scrollbar flex snap-x snap-mandatory items-center gap-12 overflow-x-auto px-[15vw] pb-4 md:gap-20"
			style="scrollbar-width: none; -ms-overflow-style: none;"
		>
			<!-- Fallback untuk menyembunyikan scrollbar di webkit -->
			<style>
				.hide-scrollbar::-webkit-scrollbar {
					display: none;
				}
			</style>

			{#each displayLogos as logo, i}
				<div
					class="flex h-20 w-40 shrink-0 cursor-pointer snap-center items-center justify-center opacity-60 grayscale transition-opacity duration-300 hover:opacity-100 hover:grayscale-0 md:h-28 md:w-56"
				>
					<img
						src={logo}
						alt={`Client Logo ${i}`}
						class="h-full w-full object-contain"
						loading="lazy"
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.slide-hint {
		display: inline-grid;
		justify-items: center;
		gap: 0.08rem;
		margin-top: 1.45rem;
		color: #c2c2c2;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 0.68rem;
		font-weight: 600;
		line-height: 1;
		opacity: 0.8;
		pointer-events: none;
	}

	.slide-hint__text {
		white-space: nowrap;
	}

	.slide-hint__track {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.slide-hint__line {
		display: block;
		width: 1.9rem;
		height: 0.16rem;
		background: currentColor;
	}

	.slide-hint__arrow {
		display: block;
		width: 0;
		height: 0;
		border-top: 0.42rem solid transparent;
		border-bottom: 0.42rem solid transparent;
	}

	.slide-hint__arrow--left {
		border-right: 1.1rem solid currentColor;
	}

	.slide-hint__arrow--right {
		border-left: 1.1rem solid currentColor;
	}

	@media (min-width: 768px) {
		.slide-hint {
			margin-top: 1.75rem;
		}
	}
</style>
