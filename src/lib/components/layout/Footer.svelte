<script lang="ts">
	const items = [
		{ label: 'INSTAGRAM', href: 'https://instagram.com/complexdesignstudio', target: '_blank' },
		{ label: 'LINKEDIN', href: 'https://www.linkedin.com/in/complex-design-studio-6170b8418', target: '_blank' },
		{ label: 'ComplexDesign@2026', href: '/', target: '' },
		{ label: 'MAIL', href: 'mailto:admin@complexdesignstudio.com', target: '' },
		{
			label: '+62 851 1133 1688',
			href: 'https://wa.me/6285111331688?text=Halloo.%21%20selamat%20datang%20to%20Complex%20Design%20Studio',
			target: '_blank'
		}
	];
</script>

<footer class="w-full mt-20">
	<div class="mx-2 md:mx-8 lg:mx-16 border-t border-black/80 pt-4 pb-8 md:pt-6 md:pb-12">
		<div class="flex flex-row items-center justify-between gap-2 md:gap-6 text-[10px] sm:text-xs md:text-sm font-medium tracking-tight md:tracking-widest w-full">
			{#each items as item}
				<a 
					href={item.href} 
					target={item.target}
					rel={item.target === '_blank' ? 'noopener noreferrer' : ''}
					class="hover:opacity-60 transition-opacity"
				>
					{#if item.label === 'ComplexDesign@2026'}
						<span class="normal-case tracking-normal md:tracking-wide">{item.label}</span>
					{:else}
						<span class="uppercase whitespace-nowrap">{item.label}</span>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</footer>
