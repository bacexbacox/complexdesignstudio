<!--
  TeamSection.svelte — Section "Meet The Team" untuk halaman About.
  Menampilkan grid kartu anggota tim dengan foto, nama, deskripsi, dan social links.
-->
<script lang="ts">
	/** Data anggota tim */
	interface TeamMember {
		name: string;
		role: string;
		description: string;
		image: string;
		socials: {
			facebook?: string;
			twitter?: string;
			linkedin?: string;
			instagram?: string;
			behance?: string;
			email?: string;
		};
	}

	const teamMembers: TeamMember[] = [
		{
			name: 'Taufik Ridha',
			role: 'Lead Developer',
			description:
				'Full-stack engineer passionate about scalable architecture and cutting-edge web technology.',
			image: '/images/about/Team/complexdesign-taufikridha.webp',
			socials: {
				linkedin: 'https://www.linkedin.com/in/taufiqridha/',
				email: 'mailto:taufik@complexdesignstudio.com'
			}
		},
		{
			name: 'Ahmad Danzo',
			role: 'Creative Design',
			description:
				'Creative mind behind the stunning visuals and brand identities that define our work.',
			image: '/images/about/Team/complexdesign-ahmaddanzo.webp',
			socials: {
				linkedin: 'https://www.linkedin.com/in/ahmad-abdul-soleh-ab589b363/',
				instagram: 'https://www.instagram.com/ahmad.danzo/',
				behance: 'https://www.behance.net/ahmadanzo',
				email: 'mailto:ahmad@complexdesignstudio.com'
			}
		},
		{
			name: 'Ian Danan',
			role: 'Social Media Planner',
			description:
				'Strategic thinker who crafts engaging social media campaigns that drive growth and visibility.',
			image: '/images/about/Team/complexdesign-iandanan.webp',
			socials: {
				instagram: 'https://www.instagram.com/kibokribo/',
				email: 'mailto:danan@complexdesignstudio.com'
			}
		},
		{
			name: 'Andrian Tarigan',
			role: 'Business Development',
			description:
				'Builds meaningful partnerships and drives business growth through strategic client relationships.',
			image: '/images/about/Team/complexdesign-andriantarigan.webp',
			socials: {
				linkedin: 'https://linkedin.com/in/andriantarigan',
				email: 'mailto:andrian@complexdesignstudio.com'
			}
		}
	];

	// IntersectionObserver untuk animasi masuk
	let sectionEl: HTMLElement | undefined = $state();
	let isVisible = $state(false);

	$effect(() => {
		if (!sectionEl) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(sectionEl);

		return () => observer.disconnect();
	});
</script>

<section bind:this={sectionEl} class="padding-global py-16 md:py-24 lg:py-32">
	<!-- Header: Title + Subtitle + Accent line -->
	<div
		class="mb-14 text-center transition-all duration-700 ease-out md:mb-20"
		style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '24px'})"
	>
		<h2 class="mb-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
			Meet The Team
		</h2>
		<p class="mx-auto mb-5 max-w-md text-sm font-light text-neutral-500 md:text-base">
			The team below is who will rack their brains to design the strategy, architecture, design,
			in-depth research, and positioning so your brand can compete.
		</p>
		<!-- Accent line -->
		<div class="mx-auto h-[3px] w-12 rounded-full bg-[#E30613]"></div>
	</div>

	<!-- Grid kartu tim: 1 kolom mobile, 2 kolom tablet, 4 kolom desktop -->
	<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
		{#each teamMembers as member, i}
			<article
				class="group overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
				style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible
					? '0'
					: '40px'}); transition-delay: {150 + i * 120}ms"
			>
				<!-- Foto anggota tim -->
				<div class="relative aspect-3/4 overflow-hidden bg-neutral-100">
					<img
						src={member.image}
						alt="Foto {member.name} — {member.role} di Complex Design Studio"
						class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
						loading="lazy"
						width="400"
						height="533"
					/>
					<!-- Overlay gradient halus di bawah foto untuk transisi ke card body -->
					<div
						class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white/60 to-transparent"
					></div>
				</div>

				<!-- Info anggota -->
				<div class="px-5 pt-5 pb-6 text-center">
					<!-- Nama -->
					<h3 class="mb-0.5 text-base font-semibold text-neutral-900 md:text-lg">
						{member.name}
					</h3>

					<!-- Role/jabatan kecil -->
					<p class="mb-3 text-xs font-medium tracking-wider text-neutral-500 uppercase">
						{member.role}
					</p>

					<!-- Accent divider -->
					<div class="mx-auto mb-3 h-[2px] w-8 rounded-full bg-[#E30613]"></div>

					<!-- Deskripsi singkat -->
					<p class="mb-5 text-xs leading-relaxed font-light text-neutral-500 md:text-sm">
						{member.description}
					</p>

					<!-- Social icons -->
					<div class="flex items-center justify-center gap-3">
						{#if member.socials.linkedin}
							<a
								href={member.socials.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn {member.name}"
								class="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors duration-300 hover:border-[#0A66C2] hover:text-[#0A66C2]"
							>
								<!-- LinkedIn icon -->
								<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
									/>
								</svg>
							</a>
						{/if}
						{#if member.socials.twitter}
							<a
								href={member.socials.twitter}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Twitter {member.name}"
								class="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors duration-300 hover:border-neutral-900 hover:text-neutral-900"
							>
								<!-- X / Twitter icon -->
								<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
									/>
								</svg>
							</a>
						{/if}
						{#if member.socials.instagram}
							<a
								href={member.socials.instagram}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram {member.name}"
								class="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors duration-300 hover:border-[#E4405F] hover:text-[#E4405F]"
							>
								<!-- Instagram icon -->
								<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
									/>
								</svg>
							</a>
						{/if}
						{#if member.socials.facebook}
							<a
								href={member.socials.facebook}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook {member.name}"
								class="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors duration-300 hover:border-[#1877F2] hover:text-[#1877F2]"
							>
								<!-- Facebook icon -->
								<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
									/>
								</svg>
							</a>
						{/if}
						{#if member.socials.behance}
							<a
								href={member.socials.behance}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Behance {member.name}"
								class="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors duration-300 hover:border-[#1769FF] hover:text-[#1769FF]"
							>
								<!-- Behance icon -->
								<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.63.165-1.3.248-2.004.248H0V4.51h6.938v-.007zM16.94 16.665c.44.428 1.073.643 1.894.643.59 0 1.1-.148 1.53-.447.424-.29.68-.61.78-.94h2.588c-.403 1.28-1.048 2.2-1.9 2.75-.85.56-1.884.83-3.08.83-.84 0-1.604-.13-2.294-.4-.69-.26-1.28-.65-1.77-1.15-.49-.5-.87-1.1-1.14-1.8-.27-.7-.405-1.49-.405-2.36 0-.84.145-1.62.437-2.33.29-.71.69-1.33 1.2-1.83.51-.51 1.1-.9 1.8-1.18.69-.28 1.44-.42 2.26-.42.91 0 1.71.17 2.4.49.7.33 1.27.78 1.73 1.35.46.58.8 1.25 1.02 2.03.21.78.29 1.61.24 2.5h-7.69c.05 1.08.42 1.84.86 2.27zM10.77 8.29H6.88v3.06h3.42c.72 0 1.38-.09 1.82-.41.45-.33.66-.81.66-1.44 0-.69-.26-1.14-.72-1.4-.45-.25-1.04-.37-1.29-.37zm-.4 4.72H6.88v3.56h3.14c.37 0 .72-.03 1.05-.09.33-.06.62-.17.87-.33.24-.15.44-.37.58-.65.14-.29.2-.66.2-1.1 0-.88-.28-1.48-.84-1.79-.56-.32-1.3-.48-2.22-.48v-.12h.01l.91-.01zm8.57-.67c-.32-.33-.77-.5-1.36-.5-.39 0-.72.07-.99.2-.27.14-.49.3-.67.5-.18.2-.3.42-.38.65-.08.24-.12.47-.14.7h4.26c-.07-.63-.4-1.22-.72-1.55zM15.44 5.89h4.78v1.47h-4.78V5.89z" />
								</svg>
							</a>
						{/if}
						{#if member.socials.email}
							<a
								href={member.socials.email}
								aria-label="Email {member.name}"
								class="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors duration-300 hover:border-[#E30613] hover:text-[#E30613]"
							>
								<!-- Email icon -->
								<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
									/>
								</svg>
							</a>
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
