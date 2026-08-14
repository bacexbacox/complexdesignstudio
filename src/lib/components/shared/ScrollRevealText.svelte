<script lang="ts">
	interface Props {
		text: string;
		anchor?: HTMLElement;
		class?: string;
	}

	let { text, anchor, class: className = '' }: Props = $props();
	let scrollProgress = $state(0);

	const words = $derived(text.trim().split(/\s+/));
	const wordColors = $derived(
		words.map((_, index) => {
			const wordProgress = Math.max(0, Math.min(1, scrollProgress * words.length - index));
			const channel = Math.round(212 - wordProgress * 189);

			return `rgb(${channel}, ${channel}, ${channel})`;
		})
	);

	/**
	 * Mengubah warna teks kata demi kata selama 55% tinggi viewport pertama.
	 * requestAnimationFrame menjaga kalkulasi scroll maksimal satu kali per frame.
	 */
	$effect(() => {
		if (!anchor) return;

		const section = anchor;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let frameId = 0;

		const updateProgress = () => {
			frameId = 0;

			if (reducedMotion.matches) {
				scrollProgress = 1;
				return;
			}

			const sectionTop = section.getBoundingClientRect().top + window.scrollY;
			const revealDistance = Math.max(window.innerHeight * 0.55, 1);
			const rawProgress = (window.scrollY - sectionTop) / revealDistance;
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

<p class={className}>
	<span class="sr-only">{text}</span>
	<span aria-hidden="true">
		{#each words as word, index}
			<span style:color={wordColors[index]}>{word}{index < words.length - 1 ? ' ' : ''}</span>
		{/each}
	</span>
</p>
