<!--
  AboutHero.svelte — Hero section untuk halaman /about
  Meniru layout dari halaman Service sesuai permintaan user.
-->
<script lang="ts">
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
	<!-- Row atas: Judul "About" kiri + deskripsi kanan -->
	<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12 mb-10 md:mb-16">
		<div
			class="overflow-hidden"
		>
			<h1
				class="text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95] tracking-tight transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)]"
				style="transform: translateY({isVisible ? '0%' : '110%'})"
			>
				About
			</h1>
		</div>

		<div
			class="ml-auto max-w-xs text-right transition-all duration-700 delay-300 md:max-w-[280px] lg:max-w-[320px]"
			style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '16px'})"
		>
			<p class="text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
				We are a collective of designers, developers, and strategists. We blend creativity with technology to build digital experiences that matter.
			</p>
		</div>
	</div>

	<!-- Tagline besar di bawah -->
	<div
		class="transition-all duration-900 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
		style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '32px'})"
	>
		<p class="mb-10 md:mb-14 text-2xl md:text-4xl lg:text-[3.5vw] font-medium leading-[1.15] tracking-tight text-center max-w-4xl mx-auto">
			Driven by innovation, crafted with precision. We bring your vision to life.
		</p>

		<div class="mx-auto max-w-3xl space-y-6 text-center text-sm md:text-base font-light leading-relaxed text-neutral-500">
			<p>
				Complex Design was founded in 2015, built on the support of several teams united by a shared vision and mission. While our individual skill sets differ from one another, it is precisely this diversity that allows us to complement each other, adapt, and keep pace with the evolving Digital World.
			</p>
			<p>
				We operate on a solid and legitimate legal foundation under the auspices of PT Nikmat Agra Solusi. Over the years, we have grown and evolved into a professional agency that has provided extensive support to government institutions, State-Owned Enterprises (BUMN), and several major national corporations across Indonesia — while also helping to empower Small and Medium Enterprises (UMKM) in their growth journey.
			</p>
		</div>
	</div>
</section>
