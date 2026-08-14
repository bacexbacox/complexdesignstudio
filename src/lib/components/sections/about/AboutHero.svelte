<!--
  AboutHero.svelte — Hero section untuk halaman /about
  Meniru layout dari halaman Service sesuai permintaan user.
-->
<script lang="ts">
	import ScrollRevealText from '$lib/components/shared/ScrollRevealText.svelte';
	import { m } from '$lib/paraglide/messages';

	let sectionEl: HTMLElement | undefined = $state();
	let isVisible = $state(false);
	let scrollProgress = $state(0);
	let prefersReducedMotion = $state(false);

	const START_TRANSLATE = 80;
	const END_TRANSLATE = 100;
	const CENTER_PROGRESS = START_TRANSLATE / (START_TRANSLATE + END_TRANSLATE);

	const title = $derived(m.about_hero_title());
	const intro = $derived(m.about_hero_right());
	const headline = $derived(m.about_hero_center_primary());
	const descriptions = $derived([
		m.about_hero_center_secondary(),
		m.about_hero_center_tertiary()
	]);
	const firstTranslate = $derived(
		prefersReducedMotion ? 0 : -START_TRANSLATE + scrollProgress * (START_TRANSLATE + END_TRANSLATE)
	);
	const secondTranslate = $derived(-firstTranslate);
	const descriptionOpacity = $derived(
		prefersReducedMotion
			? 1
			: scrollProgress <= CENTER_PROGRESS
				? scrollProgress / CENTER_PROGRESS
				: (1 - scrollProgress) / (1 - CENTER_PROGRESS)
	);

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

	/**
	 * Dua paragraf masuk dari sisi berlawanan, terlihat penuh di tengah,
	 * lalu terus bergerak dan menghilang saat pengguna scroll lebih jauh.
	 */
	$effect(() => {
		if (!sectionEl) return;

		const section = sectionEl;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let frameId = 0;

		const updateProgress = () => {
			frameId = 0;
			prefersReducedMotion = reducedMotion.matches;

			if (prefersReducedMotion) return;

			const rect = section.getBoundingClientRect();
			const rawProgress = -rect.top / Math.max(section.offsetHeight * 0.6, 1);
			scrollProgress = Math.max(0, Math.min(1, rawProgress));
		};

		const requestUpdate = () => {
			if (frameId) return;
			frameId = window.requestAnimationFrame(updateProgress);
		};

		updateProgress();
		window.addEventListener('scroll', requestUpdate, { passive: true });
		window.addEventListener('resize', requestUpdate);
		reducedMotion.addEventListener('change', requestUpdate);

		return () => {
			window.removeEventListener('scroll', requestUpdate);
			window.removeEventListener('resize', requestUpdate);
			reducedMotion.removeEventListener('change', requestUpdate);
			if (frameId) window.cancelAnimationFrame(frameId);
		};
	});
</script>

<section
	bind:this={sectionEl}
	class="padding-global flex min-h-[70vh] flex-col justify-end overflow-x-clip pt-32 pb-12 md:min-h-[80vh] md:pt-40 md:pb-20 lg:pb-28"
>
	<!-- Row atas: Judul "About" kiri + deskripsi kanan -->
	<div
		class="mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-12"
	>
		<div class="overflow-hidden">
			<h1
				class="text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-medium tracking-tight transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)]"
				style="transform: translateY({isVisible ? '0%' : '110%'})"
			>
				{title}
			</h1>
		</div>

		<div
			class="ml-auto max-w-xs text-right transition-all delay-300 duration-700 md:max-w-[280px] lg:max-w-[320px]"
			style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '16px'})"
		>
			<p class="text-xs leading-relaxed font-light text-neutral-500 md:text-sm">
				{intro}
			</p>
		</div>
	</div>

	<!-- Tagline besar di bawah -->
	<div
		class="transition-all delay-500 duration-900 ease-[cubic-bezier(0.16,1,0.3,1)]"
		style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '32px'})"
	>
		<ScrollRevealText
			text={headline}
			anchor={sectionEl}
			class="mx-auto mb-10 max-w-4xl text-center text-2xl leading-[1.15] font-medium tracking-tight md:mb-14 md:text-4xl lg:text-[3.5vw]"
		/>

		<div
			class="mx-auto max-w-3xl space-y-6 text-center text-sm leading-relaxed font-light text-neutral-500 md:text-base"
		>
			<p
				class="will-change-transform"
				style="transform: translateX({firstTranslate}px); opacity: {descriptionOpacity};"
			>
				{descriptions[0]}
			</p>
			<p
				class="will-change-transform"
				style="transform: translateX({secondTranslate}px); opacity: {descriptionOpacity};"
			>
				{descriptions[1]}
			</p>
		</div>
	</div>
</section>
