<script lang="ts">
	import { services } from '$lib/data/services';
</script>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
	<!-- Left Side: Heading -->
	<div class="lg:col-span-5 flex flex-col gap-8 sticky top-32">
		<h1 class="text-3xl md:text-5xl lg:text-[64px] font-medium leading-[1.1] tracking-tight">
			Talk to our support Team
		</h1>
		<div class="flex flex-col gap-2 text-sm text-neutral-500 font-light">
			<p>Have a project in mind? We'd love to hear about it.</p>
			<p>Fill out the form and our team will get back to you within 24 hours.</p>
		</div>
		
		<div class="mt-8 flex flex-col gap-4 text-sm">
			<div>
				<p class="font-medium text-neutral-900 mb-1">Email</p>
				<a href="mailto:hello@complexdesignstudio.com" class="text-neutral-500 hover:text-black transition-colors">hello@complexdesignstudio.com</a>
			</div>
			<div>
				<p class="font-medium text-neutral-900 mb-1">Location</p>
				<p class="text-neutral-500">Jakarta, Indonesia</p>
			</div>
		</div>
	</div>

	<!-- Right Side: Form -->
	<div class="lg:col-span-7">
		<form 
			class="flex flex-col gap-10"
			on:submit|preventDefault={() => console.log('Form submitted')}
		>
			<!-- Personal Details -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div class="flex flex-col gap-2">
					<label for="firstName" class="text-sm font-medium text-neutral-700">First Name</label>
					<input 
						type="text" 
						id="firstName" 
						name="firstName" 
						placeholder="Jane"
						class="w-full border-b border-neutral-300 py-3 bg-transparent focus:border-black focus:outline-none transition-colors placeholder:text-neutral-400"
						required 
					/>
				</div>
				<div class="flex flex-col gap-2">
					<label for="lastName" class="text-sm font-medium text-neutral-700">Last Name</label>
					<input 
						type="text" 
						id="lastName" 
						name="lastName" 
						placeholder="Doe"
						class="w-full border-b border-neutral-300 py-3 bg-transparent focus:border-black focus:outline-none transition-colors placeholder:text-neutral-400"
						required 
					/>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div class="flex flex-col gap-2">
					<label for="email" class="text-sm font-medium text-neutral-700">Email Address</label>
					<input 
						type="email" 
						id="email" 
						name="email" 
						placeholder="jane@example.com"
						class="w-full border-b border-neutral-300 py-3 bg-transparent focus:border-black focus:outline-none transition-colors placeholder:text-neutral-400"
						required 
					/>
				</div>
				<div class="flex flex-col gap-2">
					<label for="phone" class="text-sm font-medium text-neutral-700">Phone Number (Optional)</label>
					<input 
						type="tel" 
						id="phone" 
						name="phone" 
						placeholder="+62 812 3456 7890"
						class="w-full border-b border-neutral-300 py-3 bg-transparent focus:border-black focus:outline-none transition-colors placeholder:text-neutral-400"
					/>
				</div>
			</div>

			<!-- Services Interested In -->
			<div class="flex flex-col gap-4 mt-4">
				<p class="text-sm font-medium text-neutral-700">Services are interested in</p>
				<!-- 3-3 Grid for Services -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
					{#each services as service}
						<label class="flex items-center gap-3 cursor-pointer group">
							<div class="relative flex items-center justify-center w-5 h-5 border border-neutral-300 rounded-full group-hover:border-black transition-colors shrink-0">
								<input type="checkbox" class="peer sr-only" name="services" value={service.slug} />
								<div class="w-2.5 h-2.5 rounded-full bg-black scale-0 peer-checked:scale-100 transition-transform"></div>
							</div>
							<span class="text-sm font-light text-neutral-600 group-hover:text-black transition-colors leading-tight">
								{service.title}
							</span>
						</label>
					{/each}
				</div>
			</div>

			<!-- Message -->
			<div class="flex flex-col gap-2 mt-4">
				<label for="message" class="text-sm font-medium text-neutral-700">Project Details</label>
				<textarea 
					id="message" 
					name="message" 
					rows="4" 
					placeholder="Tell us about your project, goals, and timeline..."
					class="w-full border-b border-neutral-300 py-3 bg-transparent focus:border-black focus:outline-none transition-colors placeholder:text-neutral-400 resize-none"
					required 
				></textarea>
			</div>

			<!-- Submit Button -->
			<div class="mt-4">
				<button 
					type="submit" 
					class="w-full md:w-auto px-8 py-4 bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors rounded-full flex items-center justify-center gap-2"
				>
					Send Message
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</button>
			</div>
		</form>
	</div>
</div>
