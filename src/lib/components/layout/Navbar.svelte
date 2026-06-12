<!-- Navbar.svelte - Komponen navigasi utama dengan mega menu services dan smooth scroll -->
<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';

	// State untuk menu aktif dan mega menu
	let activeMenu = $state<string | null>(null);
	let isMegaMenuOpen = $state(false);
	let hoveredService = $state<number | null>(null);
	let isMobileMenuOpen = $state(false);
	let navElement = $state<HTMLElement | null>(null);

	// Data navigasi utama
	const navItems = [
		{ label: 'Services', href: '#', hasMegaMenu: true },
		{ label: 'About', href: '#', hasMegaMenu: false },
		{ label: 'Contact', href: '#', hasMegaMenu: false }
	];

	// Data layanan untuk mega menu dengan gambar
	const services = [
		{
			title: 'Web Development',
			count: 7,
			href: '/portofolio/web-development',
			image: '/image/portofolio/web-development.svg',
			icon: '💻'
		},
		{
			title: 'Web & Mobile Applications',
			count: 6,
			href: '/portofolio/web-mobile-applications',
			image: '/image/portofolio/web-mobile-applications.svg',
			icon: '📱'
		},
		{
			title: 'Digital Marketing',
			count: 7,
			href: '/portofolio/digital-marketing',
			image: '/image/portofolio/digital-marketing.svg',
			icon: '🛒'
		},
		{
			title: 'User Experience Design',
			count: 6,
			href: '/portofolio/user-experience-design',
			image: '/image/portofolio/user-experience-design.svg',
			icon: '📐'
		},
		{
			title: 'Creative Design',
			count: 5,
			href: '/portofolio/creative-design',
			image: '/image/portofolio/creative-design.svg',
			icon: '🎨'
		},
		{
			title: 'Branding Product',
			count: 6,
			href: '/portofolio/branding-product',
			image: '/image/portofolio/branding-product.svg',
			icon: '⚙️'
		}
	];

	// Smooth scroll handler
	function handleSmoothScroll(e: MouseEvent, href: string) {
		if (href.startsWith('#')) {
			e.preventDefault();
			if (href.length > 1) {
				const target = document.querySelector(href);
				if (target) {
					target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			}
			// Tutup mega menu dan mobile menu setelah klik
			closeMegaMenu();
			isMobileMenuOpen = false;
		}
	}

	// Toggle mega menu
	function toggleMegaMenu(label: string) {
		if (label === 'Services') {
			isMegaMenuOpen = !isMegaMenuOpen;
			activeMenu = isMegaMenuOpen ? 'Services' : null;
		} else {
			isMegaMenuOpen = false;
			activeMenu = label;
		}
	}

	// Hover handler untuk nav item
	function handleNavHover(label: string) {
		activeMenu = label;
		if (label === 'Services') {
			isMegaMenuOpen = true;
		}
	}

	// Close mega menu
	function closeMegaMenu() {
		isMegaMenuOpen = false;
		activeMenu = null;
		hoveredService = null;
	}

	// Handle mouse leave dari seluruh navbar area
	function handleNavAreaLeave() {
		closeMegaMenu();
	}

	// Handle keyboard accessibility
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeMegaMenu();
			isMobileMenuOpen = false;
		}
	}

	// Toggle mobile menu
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		if (!isMobileMenuOpen) {
			closeMegaMenu();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Nav container utama -->
<nav
	bind:this={navElement}
	class="navbar-wrapper"
	aria-label="Main navigation"
	onmouseleave={handleNavAreaLeave}
>
	<!-- Navbar bar -->
	<div class="navbar-bar">
		<!-- Desktop navigation -->
		<ul class="nav-list" role="menubar">
			{#each navItems as item}
				<li role="none">
					<a
						href={item.href}
						role="menuitem"
						class="nav-link"
						class:active={activeMenu === item.label}
						onclick={(e) => {
							if (item.hasMegaMenu) {
								e.preventDefault();
								toggleMegaMenu(item.label);
							} else {
								handleSmoothScroll(e, item.href);
							}
						}}
						onmouseenter={() => handleNavHover(item.label)}
						aria-expanded={item.hasMegaMenu ? isMegaMenuOpen : undefined}
						aria-haspopup={item.hasMegaMenu ? 'true' : undefined}
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Mobile hamburger button -->
		<button
			class="mobile-toggle"
			onclick={toggleMobileMenu}
			aria-label="Toggle navigation menu"
			aria-expanded={isMobileMenuOpen}
		>
			<span class="hamburger-line" class:open={isMobileMenuOpen}></span>
			<span class="hamburger-line" class:open={isMobileMenuOpen}></span>
			<span class="hamburger-line" class:open={isMobileMenuOpen}></span>
		</button>
	</div>

	<!-- Mega Menu - Services dropdown -->
	{#if isMegaMenuOpen}
		<div
			class="mega-menu"
			transition:slide={{ duration: 400, easing: cubicOut }}
			onmouseleave={closeMegaMenu}
			role="menu"
			tabindex="-1"
			aria-label="Services menu"
		>
			<div class="mega-menu-grid">
				{#each services as service, index}
					<a
						href={service.href}
						class="service-card"
						role="menuitem"
						onmouseenter={() => (hoveredService = index)}
						onmouseleave={() => (hoveredService = null)}
						in:fade={{ delay: index * 50, duration: 300 }}
					>
						<!-- Gambar background yang muncul saat hover/scroll -->
						<div class="service-image" class:visible={hoveredService === index}>
							<img src={service.image} alt={service.title} loading="lazy" />
						</div>

						<!-- Overlay gelap -->
						<div class="service-overlay"></div>

						<!-- Content -->
						<div class="service-content">
							<span class="service-icon">{service.icon}</span>
							<h3 class="service-title">{service.title}</h3>
						</div>

						<!-- Count -->
						<span class="service-count">/{service.count} services</span>
					</a>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Mobile Menu -->
	{#if isMobileMenuOpen}
		<div class="mobile-menu" transition:slide={{ duration: 350, easing: quintOut }}>
			{#each navItems as item}
				<a
					href={item.href}
					class="mobile-link"
					class:active={activeMenu === item.label}
					onclick={(e) => {
						if (item.hasMegaMenu) {
							e.preventDefault();
							toggleMegaMenu(item.label);
						} else {
							handleSmoothScroll(e, item.href);
							isMobileMenuOpen = false;
						}
					}}
				>
					{item.label}
					{#if item.hasMegaMenu}
						<svg
							class="chevron"
							class:rotated={isMegaMenuOpen}
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
						>
							<path
								d="M3 4.5L6 7.5L9 4.5"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
						</svg>
					{/if}
				</a>
			{/each}

			<!-- Mobile Mega Menu -->
			{#if isMegaMenuOpen}
				<div class="mobile-mega" transition:slide={{ duration: 300, easing: cubicOut }}>
					{#each services as service, index}
						<a
							href={service.href}
							class="mobile-service-card"
							in:fade={{ delay: index * 40, duration: 250 }}
						>
							<span class="service-icon">{service.icon}</span>
							<span class="mobile-service-title">{service.title}</span>
							<span class="mobile-service-count">/{service.count}</span>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</nav>

<style>
	/* === Reset & Variables === */
	:root {
		--navbar-bg: rgba(120, 120, 120, 0.85);
		--navbar-bg-solid: #6b6b6b;
		--mega-bg: rgba(180, 180, 180, 0.95);
		--card-bg: rgba(100, 100, 100, 0.9);
		--card-hover-bg: rgba(80, 80, 80, 0.95);
		--text-primary: #ffffff;
		--text-secondary: rgba(255, 255, 255, 0.6);
		--text-count: rgba(255, 255, 255, 0.45);
		--active-bg: rgba(90, 90, 90, 0.9);
		--transition-smooth: cubic-bezier(0.4, 0, 0.2, 1);
		--border-radius: 12px;
	}

	/* === Navbar Wrapper === */
	.navbar-wrapper {
		position: fixed;
		top: 16px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
		width: calc(100% - 32px);
		max-width: 820px;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
	}

	/* === Navbar Bar === */
	.navbar-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--navbar-bg);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 50px;
		padding: 6px 8px;
		box-shadow:
			0 4px 24px rgba(0, 0, 0, 0.15),
			0 1px 3px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	/* === Nav List (Desktop) === */
	.nav-list {
		display: flex;
		align-items: center;
		gap: 2px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	/* === Nav Link === */
	.nav-link {
		display: block;
		padding: 10px 24px;
		color: var(--text-primary);
		text-decoration: none;
		font-size: 14px;
		font-weight: 400;
		letter-spacing: 0.01em;
		border-radius: 40px;
		transition: all 0.3s var(--transition-smooth);
		white-space: nowrap;
		user-select: none;
		position: relative;
	}

	.nav-link:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.nav-link.active {
		background: var(--active-bg);
		font-weight: 500;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	/* === Mega Menu === */
	.mega-menu {
		margin-top: 8px;
		background: var(--mega-bg);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border-radius: var(--border-radius);
		padding: 16px;
		box-shadow:
			0 20px 60px rgba(0, 0, 0, 0.25),
			0 4px 16px rgba(0, 0, 0, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		max-width: 820px;
	}

	/* === Mega Menu Grid - 2 kolom === */
	.mega-menu-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	/* === Service Card === */
	.service-card {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18px 20px;
		background: var(--card-bg);
		border-radius: 10px;
		text-decoration: none;
		color: var(--text-primary);
		overflow: hidden;
		min-height: 60px;
		transition: all 0.4s var(--transition-smooth);
		cursor: pointer;
	}

	.service-card:hover {
		background: var(--card-hover-bg);
		transform: translateY(-1px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
	}

	/* === Service Image (muncul saat hover) === */
	.service-image {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.5s var(--transition-smooth);
		z-index: 0;
	}

	.service-image.visible {
		opacity: 1;
	}

	.service-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: brightness(0.5) saturate(0.8);
	}

	/* === Service Overlay === */
	.service-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%);
		z-index: 1;
		opacity: 0;
		transition: opacity 0.4s var(--transition-smooth);
	}

	.service-card:hover .service-overlay {
		opacity: 1;
	}

	/* === Service Content === */
	.service-content {
		display: flex;
		align-items: center;
		gap: 12px;
		z-index: 2;
		position: relative;
	}

	.service-icon {
		font-size: 16px;
		line-height: 1;
		opacity: 0.8;
	}

	.service-title {
		font-size: 14px;
		font-weight: 500;
		margin: 0;
		letter-spacing: 0.01em;
	}

	.service-count {
		font-size: 12px;
		color: var(--text-count);
		font-weight: 400;
		z-index: 2;
		position: relative;
		white-space: nowrap;
	}

	/* === Mobile Toggle === */
	.mobile-toggle {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
		width: 40px;
		height: 40px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 8px;
		border-radius: 8px;
		transition: background 0.2s ease;
	}

	.mobile-toggle:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.hamburger-line {
		display: block;
		width: 20px;
		height: 2px;
		background: var(--text-primary);
		border-radius: 2px;
		transition: all 0.3s var(--transition-smooth);
		transform-origin: center;
	}

	/* Animasi hamburger ke X */
	.hamburger-line.open:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.hamburger-line.open:nth-child(2) {
		opacity: 0;
		transform: scaleX(0);
	}

	.hamburger-line.open:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* === Mobile Menu === */
	.mobile-menu {
		margin-top: 8px;
		background: var(--navbar-bg-solid);
		backdrop-filter: blur(20px);
		border-radius: var(--border-radius);
		padding: 8px;
		box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
		overflow: hidden;
	}

	.mobile-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 20px;
		color: var(--text-primary);
		text-decoration: none;
		font-size: 15px;
		font-weight: 400;
		border-radius: 8px;
		transition: all 0.2s ease;
	}

	.mobile-link:hover,
	.mobile-link.active {
		background: rgba(255, 255, 255, 0.1);
	}

	.chevron {
		transition: transform 0.3s var(--transition-smooth);
	}

	.chevron.rotated {
		transform: rotate(180deg);
	}

	/* === Mobile Mega Menu (layanan) === */
	.mobile-mega {
		padding: 4px 8px 8px;
	}

	.mobile-service-card {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 12px 16px;
		color: var(--text-primary);
		text-decoration: none;
		font-size: 13px;
		border-radius: 8px;
		transition: background 0.2s ease;
	}

	.mobile-service-card:hover {
		background: rgba(255, 255, 255, 0.08);
	}

	.mobile-service-title {
		flex: 1;
		font-weight: 400;
	}

	.mobile-service-count {
		font-size: 11px;
		color: var(--text-count);
	}

	/* === Responsive (Tablet & Mobile) === */
	@media (max-width: 768px) {
		.navbar-wrapper {
			top: 12px;
			width: calc(100% - 24px);
		}

		.nav-list {
			display: none;
		}

		.mobile-toggle {
			display: flex;
		}

		.navbar-bar {
			justify-content: flex-end;
			padding: 4px 8px;
		}

		.mega-menu {
			padding: 12px;
		}

		.mega-menu-grid {
			grid-template-columns: 1fr;
			gap: 6px;
		}

		.service-card {
			padding: 14px 16px;
			min-height: 50px;
		}
	}

	/* === Responsive (Tablet landscape) === */
	@media (min-width: 769px) and (max-width: 1024px) {
		.navbar-wrapper {
			max-width: 700px;
		}

		.nav-link {
			padding: 10px 18px;
			font-size: 13px;
		}
	}

	/* === Smooth scrolling global (akan diaplikasikan via <svelte:head>) === */
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
