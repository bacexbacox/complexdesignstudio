<!--
  ClientLogoCarousel.svelte — Komponen carousel logo untuk halaman About.
  Fitur: Scrollable horizontal, efek fade di ujung kiri & kanan.
-->
<script lang="ts">
	// Asset logo client
	const logos = [
		'/images/about/logoassetclient/ANTAM banner.png',
		'/images/about/logoassetclient/ASTRA VENTURE banner.png',
		'/images/about/logoassetclient/ASTRA banner.png',
		'/images/about/logoassetclient/BNI banner.png',
		'/images/about/logoassetclient/MANDIRI banner.png',
		'/images/about/logoassetclient/SHOOPE banner.png',
		'/images/about/logoassetclient/banner-3-d.png'
	];
	
	// Duplikasi array untuk memastikan scroll container terasa penuh
	// Terutama jika layar lebar dan jumlah logo sedikit
	const duplicatedLogos = [...logos, ...logos, ...logos];
</script>

<section class="py-16 md:py-24 overflow-hidden border-t border-neutral-200/50 dark:border-neutral-800/50">
	<div class="padding-global mb-12 text-center">
		<h2 class="text-sm md:text-base font-medium text-neutral-500 uppercase tracking-widest">
			Trusted By
		</h2>
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
			
			{#each duplicatedLogos as logo, i}
				<div 
					class="shrink-0 snap-center w-28 md:w-36 h-12 md:h-16 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer"
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
