<script lang="ts">
	import { services } from '$lib/data/services';
	import { m } from '$lib/paraglide/messages';
	import { slide } from 'svelte/transition';

	let formData = $state({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		message: '',
		services: [] as string[]
	});

	let errors = $state({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		message: '',
		services: ''
	});

	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitMessage = $state('');

	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';

	function validateForm() {
		let isValid = true;

		// Reset errors
		errors.firstName = '';
		errors.lastName = '';
		errors.email = '';
		errors.phone = '';
		errors.message = '';
		errors.services = '';

		if (!formData.firstName.trim()) {
			errors.firstName = m.contact_error_first_name();
			isValid = false;
		}
		if (!formData.lastName.trim()) {
			errors.lastName = m.contact_error_last_name();
			isValid = false;
		}
		if (!formData.email.trim()) {
			errors.email = m.contact_error_email_required();
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = m.contact_error_email_invalid();
			isValid = false;
		}
		if (!formData.phone.trim()) {
			errors.phone = m.contact_error_phone_required();
			isValid = false;
		} else {
			// Remove all non-digit characters for length checking
			const justNumbers = formData.phone.replace(/\D/g, '');
			if (justNumbers.length < 6) {
				errors.phone = m.contact_error_phone_invalid();
				isValid = false;
			}
		}
		if (!formData.message.trim()) {
			errors.message = m.contact_error_project();
			isValid = false;
		}
		if (formData.services.length === 0) {
			errors.services = m.contact_error_services();
			isValid = false;
		}

		return isValid;
	}

	function handleServiceToggle(slug: string) {
		if (formData.services.includes(slug)) {
			formData.services = formData.services.filter((s) => s !== slug);
		} else {
			formData.services = [...formData.services, slug];
		}
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (!validateForm()) return;

		isSubmitting = true;
		submitMessage = '';
		submitSuccess = false;

		try {
			// Get reCAPTCHA token using Promise wrapper
			const token = await new Promise<string>((resolve, reject) => {
				if (typeof (window as any).grecaptcha === 'undefined') {
					reject(new Error('reCAPTCHA not loaded'));
					return;
				}
				(window as any).grecaptcha.ready(() => {
					(window as any).grecaptcha
						.execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' })
						.then((t: string) => {
							resolve(t);
						})
						.catch(reject);
				});
			});

			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...formData,
					recaptchaToken: token
				})
			});

			const result = await response.json();

			if (response.ok && result.success) {
				submitSuccess = true;
				submitMessage = m.contact_success_message();
				// Reset form
				formData = {
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					message: '',
					services: []
				};
			} else {
				submitSuccess = false;
				submitMessage = m.contact_error_send();
			}
		} catch (error) {
			console.error('Submission error:', error);
			submitSuccess = false;
			submitMessage = m.contact_error_system();
		} finally {
			isSubmitting = false;
		}
	}

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

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPTCHA_SITE_KEY}"></script>
</svelte:head>

<div class="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
	<!-- Left Side: Heading -->
	<div bind:this={sectionEl} class="flex flex-col gap-8 lg:sticky lg:top-32 lg:col-span-5">
		<div class="-mb-2 overflow-hidden pb-2">
			<h1
				class="text-3xl leading-[1.1] font-medium tracking-tight transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] md:text-5xl lg:text-[64px]"
				style="transform: translateY({isVisible ? '0%' : '110%'})"
			>
				{m.contact_heading()}
			</h1>
		</div>
		<div
			class="flex flex-col gap-2 text-sm font-light text-neutral-500 transition-all delay-300 duration-700"
			style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '16px'})"
		>
			<p>{m.contact_left_description()}</p>
		</div>

		<div
			class="mt-8 flex flex-col gap-4 text-sm transition-all delay-500 duration-700"
			style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '16px'})"
		>
			<div>
				<p class="mb-1 font-medium text-neutral-900">Email</p>
				<a
					href="mailto:admin@complexdesignstudio.com"
					class="text-neutral-500 transition-colors hover:text-black"
					>admin@complexdesignstudio.com</a
				>
			</div>
			<div>
				<p class="mb-1 font-medium text-neutral-900">{m.contact_workshop()}</p>
				<address class="text-neutral-500 not-italic">
					Perum Taman Aries<br />
					JL. Aries Elok II Blok F 11 no 22<br />
					Meruya Utara, Kembangan<br />
					Jakarta Barat, Indonesia<br />
					11620
				</address>
			</div>
		</div>
	</div>

	<!-- Right Side: Form -->
	<div
		class="transition-all delay-700 duration-700 lg:col-span-7"
		style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '24px'})"
	>
		<p class="mb-10 max-w-2xl text-sm leading-relaxed font-light text-neutral-500 md:text-base">
			{m.contact_right_description()}
		</p>

		{#if submitSuccess}
			<div
				class="flex flex-col items-center gap-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-8 text-center text-neutral-800 md:p-12"
				in:slide
			>
				<div
					class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white"
				>
					<svg
						class="h-8 w-8"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 class="text-2xl font-medium tracking-tight">{m.contact_success_title()}</h3>
				<p class="max-w-md leading-relaxed text-neutral-600">{submitMessage}</p>
				<button
					type="button"
					class="mt-4 rounded-full bg-black px-8 py-4 font-medium text-white transition-colors hover:bg-neutral-800"
					onclick={() => (submitSuccess = false)}
				>
					{m.contact_send_another()}
				</button>
			</div>
		{:else}
			<form class="flex flex-col gap-10" onsubmit={handleSubmit}>
				{#if submitMessage && !submitSuccess}
					<div
						class="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-600"
						in:slide
					>
						{submitMessage}
					</div>
				{/if}

				<!-- Personal Details -->
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
					<div class="relative flex flex-col gap-2">
						<label for="firstName" class="text-sm font-medium text-neutral-700"
							>{m.contact_first_name()} <span class="text-red-500">*</span></label
						>
						<input
							type="text"
							id="firstName"
							bind:value={formData.firstName}
							placeholder="Jane"
							class="w-full border-b bg-transparent py-3 transition-colors placeholder:text-neutral-400 focus:outline-none {errors.firstName
								? 'border-red-500 text-red-900 focus:border-red-500'
								: 'border-neutral-300 focus:border-black'}"
						/>
						{#if errors.firstName}
							<span class="absolute -bottom-5 text-xs text-red-500" in:slide
								>{errors.firstName}</span
							>
						{/if}
					</div>
					<div class="relative flex flex-col gap-2">
						<label for="lastName" class="text-sm font-medium text-neutral-700"
							>{m.contact_last_name()} <span class="text-red-500">*</span></label
						>
						<input
							type="text"
							id="lastName"
							bind:value={formData.lastName}
							placeholder="Doe"
							class="w-full border-b bg-transparent py-3 transition-colors placeholder:text-neutral-400 focus:outline-none {errors.lastName
								? 'border-red-500 text-red-900 focus:border-red-500'
								: 'border-neutral-300 focus:border-black'}"
						/>
						{#if errors.lastName}
							<span class="absolute -bottom-5 text-xs text-red-500" in:slide>{errors.lastName}</span
							>
						{/if}
					</div>
				</div>

				<div class="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
					<div class="relative flex flex-col gap-2">
						<label for="email" class="text-sm font-medium text-neutral-700"
							>{m.contact_email()} <span class="text-red-500">*</span></label
						>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							placeholder="jane@example.com"
							class="w-full border-b bg-transparent py-3 transition-colors placeholder:text-neutral-400 focus:outline-none {errors.email
								? 'border-red-500 text-red-900 focus:border-red-500'
								: 'border-neutral-300 focus:border-black'}"
						/>
						{#if errors.email}
							<span class="absolute -bottom-5 text-xs text-red-500" in:slide>{errors.email}</span>
						{/if}
					</div>
					<div class="relative flex flex-col gap-2">
						<label for="phone" class="text-sm font-medium text-neutral-700"
							>{m.contact_phone()} <span class="text-red-500">*</span></label
						>
						<input
							type="tel"
							id="phone"
							bind:value={formData.phone}
							placeholder="+62 812 3456 7890"
							class="w-full border-b bg-transparent py-3 transition-colors placeholder:text-neutral-400 focus:outline-none {errors.phone
								? 'border-red-500 text-red-900 focus:border-red-500'
								: 'border-neutral-300 focus:border-black'}"
						/>
						{#if errors.phone}
							<span class="absolute -bottom-5 text-xs text-red-500" in:slide>{errors.phone}</span>
						{/if}
					</div>
				</div>

				<!-- Services Interested In -->
				<div class="relative mt-6 flex flex-col gap-4">
					<p class="text-sm font-medium text-neutral-700">
						{m.contact_services_label()} <span class="text-red-500">*</span>
					</p>
					<!-- 3-3 Grid for Services -->
					<div class="grid grid-cols-2 gap-x-4 gap-y-4 md:gap-x-8">
						{#each services as service}
							<label class="group flex w-full cursor-pointer items-center gap-3">
								<div
									class="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors {errors.services
										? 'border-red-500 group-hover:border-red-600'
										: 'border-neutral-300 group-hover:border-black'}"
								>
									<input
										type="checkbox"
										class="peer sr-only"
										name="services"
										value={service.slug}
										checked={formData.services.includes(service.slug)}
										onchange={() => handleServiceToggle(service.slug)}
									/>
									<div
										class="h-2.5 w-2.5 scale-0 rounded-full transition-transform peer-checked:scale-100 {errors.services
											? 'bg-red-500'
											: 'bg-black'}"
									></div>
								</div>
								<span
									class="text-sm leading-tight font-light transition-colors {errors.services
										? 'text-red-600'
										: 'text-neutral-600 group-hover:text-black'}"
								>
									{service.title}
								</span>
							</label>
						{/each}
					</div>
					{#if errors.services}
						<span class="absolute -bottom-6 text-xs text-red-500" in:slide>{errors.services}</span>
					{/if}
				</div>

				<!-- Message -->
				<div class="relative mt-6 flex flex-col gap-2">
					<label for="message" class="text-sm font-medium text-neutral-700"
						>{m.contact_project_details()} <span class="text-red-500">*</span></label
					>
					<textarea
						id="message"
						bind:value={formData.message}
						rows="4"
						placeholder={m.contact_project_placeholder()}
						class="w-full resize-none border-b bg-transparent py-3 transition-colors placeholder:text-neutral-400 focus:outline-none {errors.message
							? 'border-red-500 text-red-900 focus:border-red-500'
							: 'border-neutral-300 focus:border-black'}"
					></textarea>
					{#if errors.message}
						<span class="absolute -bottom-5 text-xs text-red-500" in:slide>{errors.message}</span>
					{/if}
				</div>

				<!-- Submit Button -->
				<div class="mt-8">
					<button
						type="submit"
						disabled={isSubmitting}
						class="flex w-full items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
					>
						{#if isSubmitting}
							<svg
								class="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							{m.contact_sending()}
						{:else}
							{m.contact_send()}
							<svg
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
							</svg>
						{/if}
					</button>
					<p class="mt-4 text-xs font-light text-neutral-400">
						{m.contact_recaptcha_intro()}
						<a href="https://policies.google.com/privacy" class="underline hover:text-neutral-600"
							>{m.contact_privacy_policy()}</a
						>
						{m.contact_and()}
						<a href="https://policies.google.com/terms" class="underline hover:text-neutral-600"
							>{m.contact_terms_service()}</a
						>
						{m.contact_recaptcha_suffix()}
					</p>
				</div>
			</form>
		{/if}
	</div>
</div>
