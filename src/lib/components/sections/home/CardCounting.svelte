<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	interface Props {
		number: string;
		label: string;
		class?: string;
		numberClass?: string;
	}

	let { number, label, class: className = '', numberClass = '' }: Props = $props();

	let match = $derived(number.match(/^(\d+)(.*)$/));
	let targetValue = $derived(match ? parseInt(match[1], 10) : 0);
	let suffix = $derived(match ? match[2] : '');

	const count = tweened(0, {
		duration: 6000,
		easing: cubicOut
	});

	$effect(() => {
		count.set(targetValue);
	});
</script>

<div
	class="flex min-h-[160px] flex-col justify-between rounded-[24px] bg-[#EBEBEB] p-6 md:min-h-[220px] {className}"
>
	<div class="text-sm font-medium text-[#8e8e8e] md:text-lg">
		{label}
	</div>
	<div
		class="flex justify-end bg-linear-to-b from-[#b3b3b3] to-[#e0e0e0] bg-clip-text text-[64px] leading-none font-medium tracking-tighter text-transparent opacity-50 md:text-[80px] lg:justify-start lg:text-[120px] {numberClass}"
	>
		{Math.floor($count)}{suffix}
	</div>
</div>
