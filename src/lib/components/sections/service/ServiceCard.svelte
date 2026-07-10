<!--
  ServiceCard.svelte — Card service individual
  Animasi hover terinspirasi lessestudio.com:
  - Normal: Gambar dengan rounded corners, title kategori di top-left
  - Hover: Image zoom + blur, dark overlay fade-in, service tags muncul sebagai pills
-->
<script lang="ts">
	import type { Service } from '$lib/types';

	let { service, index = 0 }: { service: Service; index?: number } = $props();

	/**
	 * Mapping slug service ke nama file gambar di /static/images/service/
	 * Nama file tidak uniform (ada spasi, kapitalisasi berbeda), jadi butuh mapping manual
	 */
	const imageMap: Record<string, string> = {
		'website-development': 'website-development-complexdesignstudio.webp',
		'mobile-application': 'web-and-mobile-applications-complexdesignstudio.webp',
		'digital-marketing': 'digitak-marketing-complexdesignstudio.webp',
		'ux-design': 'user-experience-design-complexdesignstudio.webp',
		'creative-design': 'creative-design-complexdesignstudio.webp',
		'branding-product': 'branding-product-complexdesignstudio.webp'
	};

	const imageSrc = $derived(
		`/images/service/${imageMap[service.slug] ?? 'website-development-complexdesignstudio.webp'}`
	);
</script>

<a
	href="/portfolio/{service.slug}"
	class="service-card group"
	aria-label="Lihat portofolio {service.title}"
>
	<!-- Background image layer — zoom + blur on hover -->
	<div class="card-image-wrapper" aria-hidden="true">
		<img
			src={imageSrc}
			alt={service.title}
			class="card-image"
			loading="lazy"
			width="600"
			height="750"
		/>
	</div>

	<!-- Visible category title -->
	<div class="title-panel">
		<span class="title-kicker">Explore</span>
		<h2>{service.title}</h2>
	</div>

	<!-- Hover overlay: dark overlay + service tags + "View Service" link -->
	<div class="hover-overlay">
		<div class="tags-container">
			{#each service.items as item, i}
				<span
					class="tag"
					style="transition-delay: {i * 40 + 80}ms"
				>
					{item}
				</span>
			{/each}
		</div>

		<span class="view-link">View Service →</span>
	</div>
</a>

<style>
	/* === Card Container === */
	.service-card {
		position: relative;
		display: flex;
		overflow: hidden;
		cursor: pointer;
		text-decoration: none;
		color: #ffffff;
		border-radius: 12px;
		aspect-ratio: 4 / 5;
	}

	@media (min-width: 768px) {
		.service-card {
			border-radius: 14px;
		}
	}

	@media (min-width: 1024px) {
		.service-card {
			border-radius: 16px;
		}
	}

	/* === Image Layer — zoom & blur on hover === */
	.card-image-wrapper {
		position: absolute;
		inset: 0;
		z-index: 0;
		transition:
			transform 0.7s cubic-bezier(0.4, 0, 0.2, 1),
			filter 0.7s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.service-card:hover .card-image-wrapper {
		transform: scale(1.06);
		filter: blur(8px);
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
	}

	/* === Category Title === */
	.title-panel {
		position: absolute;
		left: 16px;
		top: 16px;
		z-index: 4;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
		text-shadow: 0 1px 18px rgba(0, 0, 0, 0.35);
	}

	.title-panel::before {
		content: '';
		width: 52px;
		height: 3px;
		background: #ef1d26;
		border-radius: 999px;
	}

	.title-kicker {
		font-size: 10px;
		font-weight: 500;
		line-height: 1;
		color: rgba(255, 255, 255, 0.72);
		text-transform: uppercase;
	}

	.title-panel h2 {
		max-width: 12ch;
		margin: 0;
		font-size: clamp(1.45rem, 3vw, 2.5rem);
		font-weight: 500;
		line-height: 0.98;
		color: #ffffff;
	}

	@media (min-width: 768px) {
		.title-panel {
			top: 24px;
			left: 20px;
		}
	}

	/* === Hover Overlay === */
	.hover-overlay {
		position: absolute;
		inset: 0;
		z-index: 3;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 16px;
		background: rgba(0, 0, 0, 0.55);
		opacity: 0;
		transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@media (min-width: 768px) {
		.hover-overlay {
			padding: 20px;
		}
	}

	@media (min-width: 1024px) {
		.hover-overlay {
			padding: 24px;
		}
	}

	.service-card:hover .hover-overlay {
		opacity: 1;
	}

	/* === Service Tags (pills) === */
	.tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 16px;
	}

	@media (min-width: 768px) {
		.tags-container {
			gap: 8px;
			margin-bottom: 20px;
		}
	}

	.tag {
		display: inline-block;
		padding: 5px 12px;
		background: rgba(255, 255, 255, 0.92);
		border-radius: 100px;
		font-size: 11px;
		font-weight: 400;
		color: #171717;
		white-space: nowrap;
		/* Tag individu slide-up saat hover */
		transform: translateY(10px);
		opacity: 0;
		transition:
			transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@media (min-width: 768px) {
		.tag {
			padding: 6px 14px;
			font-size: 12px;
		}
	}

	/* Staggered tag reveal saat card di-hover */
	.service-card:hover .tag {
		transform: translateY(0);
		opacity: 1;
	}

	/* === View Service Link === */
	.view-link {
		align-self: flex-end;
		font-size: 12px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		text-decoration: underline;
		text-underline-offset: 3px;
		opacity: 0;
		transform: translateX(-8px);
		transition:
			opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s,
			transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
	}

	.service-card:hover .view-link {
		opacity: 1;
		transform: translateX(0);
	}

	@media (min-width: 768px) {
		.view-link {
			font-size: 13px;
		}
	}
</style>
