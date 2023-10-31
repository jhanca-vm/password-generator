<script>
  import { length } from './stores'

  /** @type {HTMLInputElement} */
  let input

  function handleInput () {
    const percent = `${(($length - 4) / 16) * 100}%`

    input.style.setProperty('--un-gradient-from-position', percent)
    input.style.setProperty('--un-gradient-to-position', percent)
  }
</script>

<label for="length" class="mb-2 flex items-center justify-between sm:mb-4">
  <span class="sm:text-4.5">Character Length</span>
  <span class="text-6 text-primary sm:text-8">{$length}</span>
</label>
<input
  bind:this={input}
  class="appearance-none h-2 bg-gradient-to-r from-primary to-default-400"
  style="--un-gradient-from-position: 50%; --un-gradient-to-position: 50%"
  type="range"
  name="length"
  id="length"
  min="4"
  max="20"
  bind:value={$length}
  on:input={handleInput}
/>
