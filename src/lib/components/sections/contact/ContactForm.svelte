<script lang="ts">
	import { services } from '$lib/data/services';
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
			errors.firstName = 'First Name is required';
			isValid = false;
		}
		if (!formData.lastName.trim()) {
			errors.lastName = 'Last Name is required';
			isValid = false;
		}
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = 'Invalid email format';
			isValid = false;
		}
		if (!formData.phone.trim()) {
			errors.phone = 'Phone Number is required';
			isValid = false;
		} else {
			// Remove all non-digit characters for length checking
			const justNumbers = formData.phone.replace(/\D/g, '');
			if (justNumbers.length < 6) {
				errors.phone = 'Phone Number must contain at least 6 digits';
				isValid = false;
			}
		}
		if (!formData.message.trim()) {
			errors.message = 'Project Details are required';
			isValid = false;
		}
		if (formData.services.length === 0) {
			errors.services = 'Please select at least one service';
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
					(window as any).grecaptcha.execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' }).then((t: string) => {
						resolve(t);
					}).catch(reject);
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
				submitMessage = result.message;
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
				submitMessage = result.message || 'An error occurred while sending your message.';
			}
		} catch (error) {
			console.error('Submission error:', error);
			submitSuccess = false;
			submitMessage = 'System error occurred. Please try again.';
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

<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
	<!-- Left Side: Heading -->
	<div bind:this={sectionEl} class="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32">
		<div class="overflow-hidden pb-2 -mb-2">
			<h1 
				class="text-3xl md:text-5xl lg:text-[64px] font-medium leading-[1.1] tracking-tight transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)]"
				style="transform: translateY({isVisible ? '0%' : '110%'})"
			>
				Talk to our support Team
			</h1>
		</div>
		<div 
			class="flex flex-col gap-2 text-sm text-neutral-500 font-light transition-all duration-700 delay-300"
			style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '16px'})"
		>
			<p>Have a project in mind? We'd love to hear about it.</p>
			<p>Fill out the form and our team will get back to you within 24 hours.</p>
		</div>
		
		<div 
			class="mt-8 flex flex-col gap-4 text-sm transition-all duration-700 delay-500"
			style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '16px'})"
		>
			<div>
				<p class="font-medium text-neutral-900 mb-1">Email</p>
				<a href="mailto:admin@complexdesignstudio.com" class="text-neutral-500 hover:text-black transition-colors">admin@complexdesignstudio.com</a>
			</div>
			<div>
				<p class="font-medium text-neutral-900 mb-1">Workshop</p>
				<address class="not-italic text-neutral-500">
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
		class="lg:col-span-7 transition-all duration-700 delay-700"
		style="opacity: {isVisible ? 1 : 0}; transform: translateY({isVisible ? '0' : '24px'})"
	>
		{#if submitSuccess}
			<div class="bg-neutral-50 border border-neutral-200 text-neutral-800 p-8 md:p-12 rounded-3xl flex flex-col gap-6 items-center text-center" in:slide>
				<div class="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white mb-2">
					<svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 class="text-2xl font-medium tracking-tight">Message Received!</h3>
				<p class="text-neutral-600 leading-relaxed max-w-md">{submitMessage}</p>
				<button 
					type="button" 
					class="mt-4 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
					onclick={() => submitSuccess = false}
				>
					Send Another Message
				</button>
			</div>
		{:else}
			<form 
				class="flex flex-col gap-10"
				onsubmit={handleSubmit}
			>
				{#if submitMessage && !submitSuccess}
					<div class="bg-red-50 border border-red-200 text-red-600 px-4 py-4 rounded-xl text-sm" in:slide>
						{submitMessage}
					</div>
				{/if}

				<!-- Personal Details -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
					<div class="flex flex-col gap-2 relative">
						<label for="firstName" class="text-sm font-medium text-neutral-700">First Name <span class="text-red-500">*</span></label>
						<input 
							type="text" 
							id="firstName" 
							bind:value={formData.firstName}
							placeholder="Jane"
							class="w-full border-b py-3 bg-transparent focus:outline-none transition-colors placeholder:text-neutral-400 {errors.firstName ? 'border-red-500 focus:border-red-500 text-red-900' : 'border-neutral-300 focus:border-black'}"
						/>
						{#if errors.firstName}
							<span class="text-xs text-red-500 absolute -bottom-5" in:slide>{errors.firstName}</span>
						{/if}
					</div>
					<div class="flex flex-col gap-2 relative">
						<label for="lastName" class="text-sm font-medium text-neutral-700">Last Name <span class="text-red-500">*</span></label>
						<input 
							type="text" 
							id="lastName" 
							bind:value={formData.lastName}
							placeholder="Doe"
							class="w-full border-b py-3 bg-transparent focus:outline-none transition-colors placeholder:text-neutral-400 {errors.lastName ? 'border-red-500 focus:border-red-500 text-red-900' : 'border-neutral-300 focus:border-black'}"
						/>
						{#if errors.lastName}
							<span class="text-xs text-red-500 absolute -bottom-5" in:slide>{errors.lastName}</span>
						{/if}
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-2">
					<div class="flex flex-col gap-2 relative">
						<label for="email" class="text-sm font-medium text-neutral-700">Email Address <span class="text-red-500">*</span></label>
						<input 
							type="email" 
							id="email" 
							bind:value={formData.email}
							placeholder="jane@example.com"
							class="w-full border-b py-3 bg-transparent focus:outline-none transition-colors placeholder:text-neutral-400 {errors.email ? 'border-red-500 focus:border-red-500 text-red-900' : 'border-neutral-300 focus:border-black'}"
						/>
						{#if errors.email}
							<span class="text-xs text-red-500 absolute -bottom-5" in:slide>{errors.email}</span>
						{/if}
					</div>
					<div class="flex flex-col gap-2 relative">
						<label for="phone" class="text-sm font-medium text-neutral-700">Phone Number <span class="text-red-500">*</span></label>
						<input 
							type="tel" 
							id="phone" 
							bind:value={formData.phone}
							placeholder="+62 812 3456 7890"
							class="w-full border-b py-3 bg-transparent focus:outline-none transition-colors placeholder:text-neutral-400 {errors.phone ? 'border-red-500 focus:border-red-500 text-red-900' : 'border-neutral-300 focus:border-black'}"
						/>
						{#if errors.phone}
							<span class="text-xs text-red-500 absolute -bottom-5" in:slide>{errors.phone}</span>
						{/if}
					</div>
				</div>

				<!-- Services Interested In -->
				<div class="flex flex-col gap-4 mt-6 relative">
					<p class="text-sm font-medium text-neutral-700">Services are interested in <span class="text-red-500">*</span></p>
					<!-- 3-3 Grid for Services -->
					<div class="grid grid-cols-2 gap-x-4 gap-y-4 md:gap-x-8">
						{#each services as service}
							<label class="flex w-full cursor-pointer items-center gap-3 group">
								<div class="relative flex items-center justify-center w-5 h-5 border rounded-full transition-colors shrink-0 {errors.services ? 'border-red-500 group-hover:border-red-600' : 'border-neutral-300 group-hover:border-black'}">
									<input 
										type="checkbox" 
										class="peer sr-only" 
										name="services" 
										value={service.slug}
										checked={formData.services.includes(service.slug)}
										onchange={() => handleServiceToggle(service.slug)}
									/>
									<div class="w-2.5 h-2.5 rounded-full scale-0 peer-checked:scale-100 transition-transform {errors.services ? 'bg-red-500' : 'bg-black'}"></div>
								</div>
								<span class="text-sm font-light transition-colors leading-tight {errors.services ? 'text-red-600' : 'text-neutral-600 group-hover:text-black'}">
									{service.title}
								</span>
							</label>
						{/each}
					</div>
					{#if errors.services}
						<span class="text-xs text-red-500 absolute -bottom-6" in:slide>{errors.services}</span>
					{/if}
				</div>

				<!-- Message -->
				<div class="flex flex-col gap-2 mt-6 relative">
					<label for="message" class="text-sm font-medium text-neutral-700">Project Details <span class="text-red-500">*</span></label>
					<textarea 
						id="message" 
						bind:value={formData.message}
						rows="4" 
						placeholder="Tell us about your project, goals, and timeline..."
						class="w-full border-b py-3 bg-transparent focus:outline-none transition-colors placeholder:text-neutral-400 resize-none {errors.message ? 'border-red-500 focus:border-red-500 text-red-900' : 'border-neutral-300 focus:border-black'}"
					></textarea>
					{#if errors.message}
						<span class="text-xs text-red-500 absolute -bottom-5" in:slide>{errors.message}</span>
					{/if}
				</div>

				<!-- Submit Button -->
				<div class="mt-8">
					<button 
						type="submit" 
						disabled={isSubmitting}
						class="w-full md:w-auto px-8 py-4 bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors rounded-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{#if isSubmitting}
							<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Sending...
						{:else}
							Send Message
							<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
							</svg>
						{/if}
					</button>
					<p class="text-xs text-neutral-400 mt-4 font-light">
						This site is protected by reCAPTCHA and the Google 
						<a href="https://policies.google.com/privacy" class="underline hover:text-neutral-600">Privacy Policy</a> and 
						<a href="https://policies.google.com/terms" class="underline hover:text-neutral-600">Terms of Service</a> apply.
					</p>
				</div>
			</form>
		{/if}
	</div>
</div>
