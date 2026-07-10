<script lang="ts">
  let { title, description } = $props<{ title: string; description: string }>();
</script>

<section class="padding-global pt-32 pb-16 md:pt-40 md:pb-20">
  <div class="cd-container">
    <div class="flex flex-col md:flex-row md:justify-between gap-8 md:gap-16">
      <div class="w-full md:w-1/2">
        <h1 class="text-2xl md:text-4xl lg:text-5xl font-medium uppercase tracking-tight">
          {title}
        </h1>
      </div>
      
      <div class="w-full md:w-1/2 flex flex-col gap-6">
        <p class="text-sm text-gray-500 max-w-md italic">
          {description || "Strategy defines the foundation of a brand. Through research, analysis, and strategic thinking, we clarify positioning, messaging, and long term direction."}
        </p>
        <h2 class="text-xl md:text-3xl font-medium leading-relaxed">
          Complex is a design and technology studio. We build digital products, from concept to production.
        </h2>
      </div>
    </div>
  </div>
</section>
