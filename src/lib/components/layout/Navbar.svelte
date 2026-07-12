<!-- Navbar.svelte - Komponen navigasi utama dengan mega menu services dan smooth scroll -->
<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';

	// State untuk menu aktif dan mega menu
	let activeMenu = $state<string | null>(null);
	let isMegaMenuOpen = $state(false);
	let hoveredService = $state<number | null>(null);
	let isMobileMenuOpen = $state(false);
	let navElement = $state<HTMLElement | null>(null);

	// Data navigasi utama
	const navItems = [
		{ label: 'Services', href: '/service', hasMegaMenu: true },
		{ label: 'About', href: '/about', hasMegaMenu: false },
		{ label: 'Contact', href: '/contact', hasMegaMenu: false }
	];

	// Data layanan untuk mega menu dengan gambar asli
	const services = [
		{
			title: 'Web Development',
			count: 6,
			href: '/portfolio/website-development',
			image: '/images/service/website-development-complexdesignstudio.webp',
			icon: '💻'
		},
		{
			title: 'Mobile Application',
			count: 6,
			href: '/portfolio/mobile-application',
			image: '/images/service/web-and-mobile-applications-complexdesignstudio.webp',
			icon: '📱'
		},
		{
			title: 'Digital Marketing',
			count: 6,
			href: '/portfolio/digital-marketing',
			image: '/images/service/digitak-marketing-complexdesignstudio.webp',
			icon: '🛒'
		},
		{
			title: 'User Experience Design',
			count: 4,
			href: '/portfolio/ux-design',
			image: '/images/service/user-experience-design-complexdesignstudio.webp',
			icon: '📐'
		},
		{
			title: 'Creative Design',
			count: 4,
			href: '/portfolio/creative-design',
			image: '/images/service/creative-design-complexdesignstudio.webp',
			icon: '🎨'
		},
		{
			title: 'Branding Product',
			count: 5,
			href: '/portfolio/branding-product',
			image: '/images/service/branding-product-complexdesignstudio.webp',
			icon: '⚙️'
		}
	];

	// Accordion: pisahkan services menjadi 2 kolom independen
	// Kolom kiri: index 0, 2, 4 — Kolom kanan: index 1, 3, 5
	const leftCol = $derived(services.filter((_, i) => i % 2 === 0).map((s, ci) => ({ ...s, globalIndex: ci * 2 })));
	const rightCol = $derived(services.filter((_, i) => i % 2 !== 0).map((s, ci) => ({ ...s, globalIndex: ci * 2 + 1 })));

	// Hitung flex-grow berdasarkan apakah ada card yang di-hover di kolom yang sama
	function getFlexGrow(globalIndex: number): number {
		if (hoveredService === null) return 1; // Semua sama rata jika tidak ada hover
		const isLeftCol = globalIndex % 2 === 0;
		const hoveredIsLeftCol = hoveredService % 2 === 0;

		// Jika hover ada di kolom lain, kolom ini tidak terpengaruh
		if (isLeftCol !== hoveredIsLeftCol) return 1;

		// Card yang di-hover mendapat porsi besar, yang lain menyusut
		return globalIndex === hoveredService ? 1.5 : 0.4;
	}

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
		} else {
			// Jika hover ke menu lain (About/Contact), tutup mega menu
			isMegaMenuOpen = false;
		}
	}

	// Close mega menu
	function closeMegaMenu() {
		isMegaMenuOpen = false;
		activeMenu = null;
		hoveredService = null;
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

<!-- Logo Utama (Fixed di kiri atas) -->
<a href="/" class="global-logo" aria-label="Complex Design Studio Home">
	<img src="/images/global/logo-complex-design-studio.svg" alt="Complex Design Studio Logo" class="logo-image" />
</a>

<!-- Nav container utama (Pill Navigation) -->
<nav
	bind:this={navElement}
	class="navbar-wrapper"
	aria-label="Main navigation"
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
							if (item.href.startsWith('#') && item.href.length > 1) {
								handleSmoothScroll(e, item.href);
							} else if (item.href === '#' && item.hasMegaMenu) {
								e.preventDefault();
								toggleMegaMenu(item.label);
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
		<!-- Backdrop tak kasat mata untuk mendeteksi kursor keluar -->
		<div
			class="mega-menu-backdrop-desktop"
			onmouseenter={closeMegaMenu}
			aria-hidden="true"
		></div>

		<div
			class="mega-menu"
			transition:slide={{ duration: 400, easing: cubicOut }}
			onmouseleave={closeMegaMenu}
			role="menu"
			tabindex="-1"
			aria-label="Services menu"
		>
			<div class="mega-menu-grid">
				<!-- Kolom Kiri (accordion independen) -->
				<div class="service-col">
					{#each leftCol as service, colIndex}
						<a
							href={service.href}
							class="service-card"
							role="menuitem"
							style="flex-grow: {getFlexGrow(service.globalIndex)}"
							onmouseenter={() => (hoveredService = service.globalIndex)}
							onmouseleave={() => (hoveredService = null)}
							in:fade={{ delay: colIndex * 60, duration: 300 }}
						>
							<!-- Gambar background yang muncul saat hover -->
							<div class="service-image" class:visible={hoveredService === service.globalIndex}>
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

				<!-- Kolom Kanan (accordion independen) -->
				<div class="service-col">
					{#each rightCol as service, colIndex}
						<a
							href={service.href}
							class="service-card"
							role="menuitem"
							style="flex-grow: {getFlexGrow(service.globalIndex)}"
							onmouseenter={() => (hoveredService = service.globalIndex)}
							onmouseleave={() => (hoveredService = null)}
							in:fade={{ delay: colIndex * 60 + 30, duration: 300 }}
						>
							<!-- Gambar background yang muncul saat hover -->
							<div class="service-image" class:visible={hoveredService === service.globalIndex}>
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
		</div>
	{/if}

</nav>

<!-- Mobile Menu Overlay (Fullscreen Popup) -->
{#if isMobileMenuOpen}
	<!-- Backdrop blur overlay -->
	<div
		class="mobile-overlay"
		transition:fade={{ duration: 300 }}
		onclick={toggleMobileMenu}
		aria-hidden="true"
	></div>

	<!-- Menu panel -->
	<div
		class="mobile-panel"
		transition:fade={{ duration: 300 }}
		role="dialog"
		aria-modal="true"
		aria-label="Navigation menu"
	>
		<!-- Close button (X) — absolute top-right -->
		<button
			class="mobile-close"
			onclick={toggleMobileMenu}
			aria-label="Close navigation menu"
		>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
				<path d="M4 4L16 16M16 4L4 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			</svg>
		</button>

		<!-- Nav links utama -->
		<nav class="mobile-nav" aria-label="Mobile navigation">
			<!-- Logo centered di atas nav links -->
			<a
				href="/"
				class="mobile-logo"
				aria-label="Complex Design Studio — Back to Home"
				onclick={() => (isMobileMenuOpen = false)}
			>
				<img
					src="/images/global/logo-complex-design-studio.svg"
					alt="Complex Design Studio Logo"
					width="80"
					height="32"
				/>
			</a>
			{#each navItems as item, i}
				<a
					href={item.href}
					class="mobile-nav-link"
					in:fade={{ delay: 80 + i * 60, duration: 300 }}
					onclick={(e) => {
						if (item.href.startsWith('#') && item.href.length > 1) {
							handleSmoothScroll(e, item.href);
						} else {
							isMobileMenuOpen = false;
						}
					}}
				>
					{item.label}
				</a>
			{/each}

			<!-- Divider -->
			<div class="mobile-divider" in:fade={{ delay: 320, duration: 300 }}></div>

			<!-- Services sub-menu -->
			{#each services as service, i}
				<a
					href={service.href}
					class="mobile-service-link"
					in:fade={{ delay: 360 + i * 40, duration: 280 }}
					onclick={() => (isMobileMenuOpen = false)}
				>
					<span class="mobile-service-icon">{service.icon}</span>
					<span class="mobile-service-name">{service.title}</span>
					<span class="mobile-service-num">/{service.count}</span>
				</a>
			{/each}
		</nav>
	</div>
{/if}

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

	/* === Global Logo (Fixed Top Left) === */
	.global-logo {
		position: fixed;
		top: 24px;
		left: 32px;
		z-index: 1001; /* Pastikan di atas layer lain */
		display: flex;
		align-items: center;
		text-decoration: none;
		transition: transform 0.3s var(--transition-smooth), opacity 0.3s ease;
	}

	.global-logo:hover {
		transform: scale(1.05);
		opacity: 0.9;
	}

	/* Styling jika menggunakan tag img */
	.logo-image {
		width: 70px;
		height: 32px;
		object-fit: contain;
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
		pointer-events: none; /* Mencegah wrapper selebar 820px memblokir interaksi di sekitarnya */
	}

	/* === Navbar Bar === */
	.navbar-bar {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		width: 100%;
		max-width: 400px;
		height: 40px;
		background: var(--navbar-bg);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-radius: 50px;
		padding: 0 8px;
		pointer-events: auto; /* Mengembalikan interaksi yang dimatikan wrapper */
		box-shadow:
			0 4px 24px rgba(0, 0, 0, 0.15),
			0 1px 3px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	/* === Nav List (Desktop) === */
	.nav-list {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2px;
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	/* === Nav Link === */
	.nav-link {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 20px;
		height: 32px;
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
		position: relative; /* For pseudo-element bridge */
		z-index: 2;
		margin-top: 8px;
		background: var(--mega-bg);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border-radius: var(--border-radius);
		padding: 16px;
		pointer-events: auto; /* Mengembalikan interaksi yang dimatikan wrapper */
		box-shadow:
			0 20px 60px rgba(0, 0, 0, 0.25),
			0 4px 16px rgba(0, 0, 0, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		max-width: 820px;
	}

	/* Bridge pseudo-element to connect navbar-bar and mega-menu for seamless hovering */
	.mega-menu::before {
		content: '';
		position: absolute;
		top: -16px;
		left: 0;
		right: 0;
		height: 16px;
		background: transparent;
	}

	/* Backdrop untuk menutup menu saat kursor keluar area aktif */
	.mega-menu-backdrop-desktop {
		position: fixed;
		inset: 0;
		z-index: 1; /* Di bawah navbar/menu, di atas halaman agar bisa menangkap kursor keluar */
		pointer-events: auto; /* Harus bisa menangkap event mouse */
	}

	/* === Mega Menu Grid - 2 kolom === */
	.mega-menu-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
		height: 360px; /* Tinggi lebih besar agar gambar accordion terlihat lebih jelas */
	}

	/* === Service Column (flex container independen per kolom) === */
	.service-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
		height: 100%;
	}

	/* === Service Card (accordion item) === */
	.service-card {
		position: relative;
		display: flex;
		align-items: flex-end; /* Content di bawah agar gambar di atas bisa bernafas */
		justify-content: space-between;
		padding: 14px 18px;
		background: var(--card-bg);
		border-radius: 10px;
		text-decoration: none;
		color: var(--text-primary);
		overflow: hidden;
		min-height: 0; /* Penting agar flex-grow berfungsi optimal */
		flex-shrink: 1;
		/* Transisi smooth untuk flex-grow (accordion) + visual properties */
		transition:
			flex-grow 0.4s var(--transition-smooth),
			background 0.4s var(--transition-smooth),
			box-shadow 0.4s var(--transition-smooth);
		cursor: pointer;
	}

	.service-card:hover {
		background: var(--card-hover-bg);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
	}

	/* === Service Image (muncul saat hover, mengisi card yang membesar) === */
	.service-image {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: 0;
		pointer-events: none;
	}

	.service-image.visible {
		opacity: 1;
	}

	.service-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center; /* Posisikan tengah, profesional */
	}

	/* === Service Overlay (gradient halus agar text tetap terbaca) === */
	.service-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.7) 0%,
			rgba(0, 0, 0, 0.2) 50%,
			transparent 100%
		);
		z-index: 1;
		opacity: 0;
		transition: opacity 0.5s var(--transition-smooth);
		pointer-events: none;
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

	/* === Mobile Overlay (backdrop blur) === */
	:global(.mobile-overlay) {
		position: fixed;
		inset: 0;
		z-index: 1998;
		background: rgba(5, 4, 10, 0.58);
		backdrop-filter: blur(18px) saturate(0.8);
		-webkit-backdrop-filter: blur(18px) saturate(0.8);
		pointer-events: auto;
		cursor: pointer;
	}

	/* === Mobile Panel (fullscreen popup) === */
	:global(.mobile-panel) {
		position: fixed;
		inset: 0;
		z-index: 1999;
		background: rgba(8, 7, 15, 0.76);
		backdrop-filter: blur(32px) saturate(0.9);
		-webkit-backdrop-filter: blur(32px) saturate(0.9);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 60px 32px 40px;
		overflow-y: auto;
		pointer-events: auto;
	}

	/* === Mobile Logo (centered di atas nav links) === */
	:global(.mobile-logo) {
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		opacity: 0.9;
		margin-bottom: 32px;
		transition: opacity 0.25s ease, transform 0.25s ease;
	}

	:global(.mobile-logo:hover) {
		opacity: 1;
		transform: scale(1.04);
	}

	:global(.mobile-logo img) {
		width: 80px;
		height: 32px;
		object-fit: contain;
		filter: brightness(1.1);
	}

	/* === Close Button === */
	:global(.mobile-close) {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 50%;
		color: rgba(255, 255, 255, 0.8);
		cursor: pointer;
		transition: all 0.25s ease;
	}

	:global(.mobile-close:hover) {
		background: rgba(255, 255, 255, 0.15);
		color: #ffffff;
		transform: rotate(90deg);
	}

	/* === Mobile Nav container === */
	:global(.mobile-nav) {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
		width: 100%;
		max-width: 320px;
	}

	/* === Main nav links (large) === */
	:global(.mobile-nav-link) {
		display: block;
		width: 100%;
		text-align: center;
		padding: 8px 24px;
		color: #ffffff;
		text-decoration: none;
		font-size: clamp(22px, 6.4vw, 32px);
		font-weight: 300;
		letter-spacing: 0.02em;
		border-radius: 12px;
		transition: all 0.25s ease;
		position: relative;
		text-shadow: 0 2px 16px rgba(0, 0, 0, 0.55);
	}

	:global(.mobile-nav-link::after) {
		content: '';
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%) scaleX(0);
		width: 40%;
		height: 1px;
		background: rgba(255, 255, 255, 0.4);
		transition: transform 0.3s ease;
	}

	:global(.mobile-nav-link:hover) {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.05);
	}

	:global(.mobile-nav-link:hover::after) {
		transform: translateX(-50%) scaleX(1);
	}

	/* === Divider === */
	:global(.mobile-divider) {
		width: 40px;
		height: 1px;
		background: rgba(255, 255, 255, 0.15);
		margin: 16px auto;
	}

	/* === Service sub-links (small) === */
	:global(.mobile-service-link) {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 10px 20px;
		color: rgba(255, 255, 255, 0.78);
		text-decoration: none;
		font-size: 13px;
		font-weight: 400;
		border-radius: 8px;
		transition: all 0.2s ease;
	}

	:global(.mobile-service-link:hover) {
		color: rgba(255, 255, 255, 0.8);
		background: rgba(255, 255, 255, 0.06);
	}

	:global(.mobile-service-icon) {
		font-size: 14px;
		opacity: 0.7;
	}

	:global(.mobile-service-name) {
		flex: 1;
	}

	:global(.mobile-service-num) {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.55);
	}

	/* Fallback saat browser tidak mendukung backdrop-filter. */
	@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
		:global(.mobile-overlay) {
			background: rgba(5, 4, 10, 0.86);
		}

		:global(.mobile-panel) {
			background: rgba(8, 7, 15, 0.94);
		}
	}

	/* === Responsive (Tablet & Mobile) === */
	@media (max-width: 768px) {
		.global-logo {
			top: 16px;
			left: 16px;
		}

		.logo-image {
			height: 24px;
		}

		.navbar-wrapper {
			top: 16px;
			width: calc(100% - 32px);
		}

		.nav-list {
			display: none;
		}

		.mobile-toggle {
			display: flex;
			width: 100%;
			height: 100%;
		}

		.navbar-bar {
			margin-left: auto;
			margin-right: 0;
			width: 42px;
			height: 42px;
			padding: 0;
			border-radius: 10px;
			justify-content: center;
		}

		.mega-menu {
			padding: 12px;
		}

		.mega-menu-grid {
			grid-template-columns: 1fr;
			gap: 6px;
			height: auto; /* Disable fixed height di mobile */
		}

		.service-col {
			height: auto;
		}

		.service-card {
			padding: 14px 16px;
			min-height: 50px;
			flex-grow: 0 !important; /* Disable accordion di mobile */
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
