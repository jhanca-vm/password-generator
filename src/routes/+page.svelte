<script>
  import '@fontsource/jetbrains-mono/latin-700.css'
  import '../app.css'
  import 'virtual:uno.css'
  import { numbers, symbols, uppercase } from '$lib/stores'
  import generatePassword from '$lib/generate-password'
  import Password from '$lib/password.svelte'
  import CharacterLength from '$lib/character-length.svelte'
  import Checkbox from '$lib/checkbox.svelte'
  import Strength from '$lib/strength.svelte'

  const title = 'Password Generator'
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main class="overflow-x-hidden max-w-135 w-full">
  <h1 class="text-center text-default-200 sm:text-6">{title}</h1>
  <Password />
  <form
    class="p-4 bg-default-300 sm:(p-8 pt-6)"
    on:submit|preventDefault={generatePassword}
  >
    <CharacterLength />
    <div class="my-8 grid gap-y-4">
      <Checkbox
        name="uppercase"
        label="Include Uppercase Letters"
        bind:checked={$uppercase}
      />
      <Checkbox
        name="numbers"
        label="Include Numbers"
        bind:checked={$numbers}
      />
      <Checkbox
        name="symbols"
        label="Include Symbols"
        bind:checked={$symbols}
      />
    </div>
    <Strength />
    <button
      class="mt-4 h-14 w-full flex items-center justify-center gap-x-4
        bg-primary text-default-300 outline-none transition-colors
        sm:(mt-8 h-16 gap-x-6)"
    >
      <span class="uppercase sm:text-4.5">Generate</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="currentColor"
      >
        <path
          d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
        />
      </svg>
    </button>
  </form>
</main>

<style>
  button:hover,
  button:focus-visible {
    background-color: transparent;
    border: 2px solid theme('colors.primary');
    color: theme('colors.primary');
  }
</style>
