<script>
  /** @type {string} */
  export let name

  /** @type {string} */
  export let label

  /** @type {boolean} */
  export let checked
</script>

<label class="w-fit flex items-center gap-x-5 leading-none sm:gap-x-6">
  <input
    class="appearance-none h-5 w-5 border-2 bg-no-repeat bg-center
      transition-colors checked:(bg-primary border-primary)"
    type="checkbox"
    {name}
    bind:checked
  />
  <span class="sm:text-4.5">{label}</span>
</label>

<style>
  input:checked {
    background-image: url(/icons/check.svg);
  }
</style>
