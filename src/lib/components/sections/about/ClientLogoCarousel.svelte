<!--
  ClientLogoCarousel.svelte — Komponen carousel logo untuk halaman About.
  Fitur: Scrollable horizontal, efek fade di ujung kiri & kanan.
-->
<script lang="ts">
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

<section class="py-16 md:py-24 overflow-hidden">
	<div class="padding-global mb-10 text-center">
		<h2 class="text-sm md:text-base font-medium text-neutral-500 uppercase tracking-widest">
			Trusted By
		</h2>
		<div class="slide-hint" aria-hidden="true">
			<span class="slide-hint__text">slide to more</span>
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
		class="relative w-full mx-auto"
		style="mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);"
	>
		<!-- Scrollable wrapper -->
		<div 
			class="flex items-center gap-12 md:gap-20 overflow-x-auto snap-x snap-mandatory px-[15vw] pb-4 hide-scrollbar" 
			style="scrollbar-width: none; -ms-overflow-style: none;"
		>
			<!-- Fallback untuk menyembunyikan scrollbar di webkit -->
			<style>
				.hide-scrollbar::-webkit-scrollbar { display: none; }
			</style>
			
			{#each displayLogos as logo, i}
				<div 
					class="shrink-0 snap-center w-40 md:w-56 h-20 md:h-28 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer"
				>
					<img 
						src={logo} 
						alt={`Client Logo ${i}`}
						class="w-full h-full object-contain"
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
