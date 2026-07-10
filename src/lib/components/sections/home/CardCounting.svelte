<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	interface Props {
		number: string;
		label: string;
		class?: string;
	}

	let { number, label, class: className = '' }: Props = $props();

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

<div class="flex flex-col justify-between p-6 bg-[#EBEBEB] rounded-[24px] min-h-[160px] md:min-h-[220px] {className}">
	<div class="text-[#8e8e8e] font-medium text-sm md:text-lg">
		{label}
	</div>
	<div class="text-[64px] md:text-[80px] lg:text-[120px] leading-none font-medium tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-[#b3b3b3] to-[#e0e0e0] opacity-50 flex justify-end lg:justify-start">
		{Math.floor($count)}{suffix}
	</div>
</div>
