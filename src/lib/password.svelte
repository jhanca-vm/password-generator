<script>
  import { onMount } from 'svelte'
  import { generate } from 'generate-password-browser'
  import { password } from './stores'
  import CopyIcon from './copy-icon.svelte'

  let isCopied = false

  async function handleClick () {
    await navigator.clipboard.writeText($password)

    isCopied = true

    setTimeout(() => (isCopied = false), 1000)
  }

  onMount(() => password.set(generate({ length: 12, numbers: true })))
</script>

<div
  class="my-4 flex items-center gap-x-4 p-4 bg-default-300 sm:(mt-8 mb-6 py-5
    px-8)"
>
  <input
    class="text-6 truncate cursor-default sm:text-8"
    type="text"
    value={$password}
    placeholder="P4$5W0rD!"
    readonly
  />
  {#if isCopied}
    <span class="text-primary uppercase sm:text-4.5">Copied</span>
  {/if}
  <button
    class="text-primary outline-none transition-color svg:h-5 sm:svg:h-6"
    on:click={handleClick}
  >
    <CopyIcon />
  </button>
</div>

<style>
  button:hover,
  button:focus-visible {
    color: theme("colors.default.100");
  }
</style>
