<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { deLocalizeHref, getLocale, localizeHref, type Locale } from '$lib/paraglide/runtime';
	import { getLocalizedPortfolioPath } from '$lib/utils/portfolio-routes';

	const currentLocale = getLocale();
	const targetLocale: Locale = currentLocale === 'en' ? 'id' : 'en';
	const currentHref = $derived(
		browser ? `${page.url.pathname}${page.url.search}${page.url.hash}` : page.url.pathname
	);
	const targetHref = $derived.by(() => {
		const portfolioPath = getLocalizedPortfolioPath(page.url.pathname, targetLocale);
		if (portfolioPath) return `${portfolioPath}${currentHref.slice(page.url.pathname.length)}`;

		return localizeHref(deLocalizeHref(currentHref), { locale: targetLocale }).replace(
			/^\/id\/([?#]|$)/,
			'/id$1'
		);
	});
</script>

<a
	class="language-switcher"
	href={targetHref}
	data-sveltekit-reload
	aria-label={targetLocale === 'id' ? 'Switch to Bahasa Indonesia' : 'Switch to English'}
>
	<span class:active={currentLocale === 'en'} class="language-label">EN</span>

	<span class="switch-track" aria-hidden="true">
		<span class:flag-en={currentLocale === 'en'} class:flag-id={currentLocale === 'id'} class="flag"
		></span>
		<span class:knob-right={currentLocale === 'id'} class="switch-knob"></span>
	</span>

	<span class:active={currentLocale === 'id'} class="language-label">ID</span>
</a>

<style>
	.language-switcher {
		position: fixed;
		top: 18px;
		right: 32px;
		z-index: 1001;
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
		padding: 3px 8px;
		color: rgba(31, 35, 48, 0.35);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-decoration: none;
		border-radius: 9999px;
		transition: background-color 0.2s ease;
	}

	.language-switcher:focus-visible {
		outline: 2px solid rgba(31, 35, 48, 0.9);
		outline-offset: 2px;
	}

	.language-label {
		transition: color 0.2s ease;
	}

	.language-label.active {
		color: #1f2330;
	}

	.switch-track {
		position: relative;
		display: block;
		width: 54px;
		height: 28px;
		overflow: hidden;
		border-radius: 9999px;
		background: #21468b;
		box-shadow:
			0 -1px 1px rgba(8, 13, 31, 0.4),
			0 1px 1px rgba(255, 255, 255, 0.95),
			0 3px 7px rgba(15, 21, 40, 0.16);
	}

	.switch-track::after {
		position: absolute;
		inset: 0;
		z-index: 1;
		border-radius: inherit;
		box-shadow:
			inset 0 1px 0 rgba(8, 13, 31, 0.72),
			inset 0 -1px 0 rgba(255, 255, 255, 0.78),
			inset 0 3px 4px rgba(8, 13, 31, 0.22),
			inset 0 -2px 3px rgba(255, 255, 255, 0.16);
		pointer-events: none;
		content: '';
	}

	.flag {
		position: absolute;
		inset: 0;
	}

	.flag-en {
		background:
			linear-gradient(28deg, transparent 43%, #ffffff 43%, #ffffff 57%, transparent 57%),
			linear-gradient(-28deg, transparent 43%, #ffffff 43%, #ffffff 57%, transparent 57%), #21468b;
	}

	.flag-en::after {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(to bottom, transparent 37%, #cf142b 37%, #cf142b 63%, transparent 63%),
			linear-gradient(to right, transparent 40%, #cf142b 40%, #cf142b 60%, transparent 60%);
		content: '';
	}

	.flag-id {
		background: linear-gradient(to bottom, #e70011 0 50%, #ffffff 50% 100%);
	}

	.switch-knob {
		position: absolute;
		top: 3px;
		left: 3px;
		z-index: 2;
		box-sizing: border-box;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: linear-gradient(145deg, #ffffff 12%, #f7f8fb 55%, #e8ebf1 100%);
		box-shadow:
			0 5px 8px rgba(8, 13, 31, 0.38),
			0 2px 2px rgba(8, 13, 31, 0.5),
			inset 0 2px 2px rgba(255, 255, 255, 0.98),
			inset 0 -2px 3px rgba(24, 33, 61, 0.1);
		transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.switch-knob.knob-right {
		transform: translateX(26px);
	}

	@media (max-width: 768px) {
		.language-switcher {
			top: 17px;
			right: 72px;
			gap: 0;
			padding: 6px;
		}

		.language-label {
			display: none;
		}
	}
</style>
