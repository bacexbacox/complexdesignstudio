<script lang="ts">
	const items = [
		{ label: 'INSTAGRAM', href: 'https://instagram.com/complexdesignstudio', target: '_blank' },
		{ label: 'FACEBOOK', href: '#', target: '_blank' },
		{ label: 'LINKEDIN', href: '#', target: '_blank' },
		{ label: 'MAIL', href: 'mailto:hello@complexdesignstudio.com', target: '' },
		{ label: 'WHATSAPP', href: '#', target: '_blank' },
		{ label: '@2026 ComplexDesign', href: '/', target: '' }
	];
</script>

<footer class="w-full mt-20">
	<div class="mx-4 md:mx-8 lg:mx-16 border-t border-black/80 pt-6 pb-12">
		<div class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-6 text-xs md:text-sm font-medium tracking-widest">
			{#each items as item}
				<a 
					href={item.href} 
					target={item.target}
					rel={item.target === '_blank' ? 'noopener noreferrer' : ''}
					class="hover:opacity-60 transition-opacity"
				>
					{#if item.label === '@2026 ComplexDesign'}
						<span class="normal-case tracking-wide">{item.label}</span>
					{:else}
						<span class="uppercase">{item.label}</span>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</footer>
