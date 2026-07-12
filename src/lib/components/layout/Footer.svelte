<script lang="ts">
	const whatsappMessage = 'Halloo.!\nselamat datang to Complex Design Studio';
	const whatsappUrl = `https://wa.me/6285111331688?text=${encodeURIComponent(whatsappMessage)}`;

	const items = [
		{
			label: 'INSTAGRAM',
			href: 'https://instagram.com/complexdesignstudio',
			external: true,
			ariaLabel: 'Instagram Complex Design Studio'
		},
		{
			label: 'LINKEDIN',
			href: 'https://www.linkedin.com/in/complex-design-studio-6170b8418',
			external: true,
			ariaLabel: 'LinkedIn Complex Design Studio'
		},
		{
			label: 'ComplexDesign@2026',
			href: '/',
			external: false,
			ariaLabel: 'Complex Design Studio home'
		},
		{
			label: 'MAIL',
			href: 'mailto:admin@complexdesignstudio.com',
			external: false,
			ariaLabel: 'Email Complex Design Studio'
		},
		{
			label: 'WHATSAPP',
			href: whatsappUrl,
			external: true,
			ariaLabel: 'WhatsApp Complex Design Studio di +62 851 1133 1688'
		}
	];
</script>

<footer class="relative z-10 mt-20 w-full">
	<div class="mx-2 md:mx-8 lg:mx-16 border-t border-black/80 pt-4 pb-8 md:pt-6 md:pb-12">
		<nav
			aria-label="Footer navigation"
			class="flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-1 text-[10px] font-medium tracking-tight md:gap-6 md:text-sm md:tracking-widest"
		>
			{#each items as item}
				<a
					href={item.href}
					target={item.external ? '_blank' : undefined}
					rel={item.external ? 'noopener noreferrer' : undefined}
					aria-label={item.ariaLabel}
					class="py-2 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
				>
					{#if item.label === 'ComplexDesign@2026'}
						<span class="normal-case tracking-normal md:tracking-wide">{item.label}</span>
					{:else}
						<span class="whitespace-nowrap uppercase">{item.label}</span>
					{/if}
				</a>
			{/each}
		</nav>
	</div>
</footer>
