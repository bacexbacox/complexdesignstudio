<script lang="ts">
	import SeoHead from '$lib/components/shared/SeoHead.svelte';
	import ContactForm from '$lib/components/sections/contact/ContactForm.svelte';

	let { data } = $props();
</script>

<SeoHead meta={data.meta} />

<section class="padding-global min-h-screen pt-32 pb-16">
	<ContactForm />
</section>
