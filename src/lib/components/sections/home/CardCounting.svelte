<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	interface Props {
		number: string;
		label: string;
		class?: string;
	}

	let { number, label, class: className = '' }: Props = $props();

	const match = number.match(/^(\d+)(.*)$/);
	const targetValue = match ? parseInt(match[1], 10) : 0;
	const suffix = match ? match[2] : '';

	const count = tweened(0, {
		duration: 2000,
		easing: cubicOut
	});

	onMount(() => {
		count.set(targetValue);
	});
</script>

<div class="flex flex-col justify-between p-6 bg-[#EBEBEB] rounded-[24px] min-h-[220px] {className}">
	<div class="text-[120px] leading-none font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#b3b3b3] to-[#e0e0e0] opacity-50">
		{Math.floor($count)}{suffix}
	</div>
	<div class="text-[#8e8e8e] font-medium text-lg">
		{label}
	</div>
</div>
