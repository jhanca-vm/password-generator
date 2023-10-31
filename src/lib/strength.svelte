<script>
  import { derived } from 'svelte/store'
  import { length, numbers, symbols, uppercase } from './stores'

  const levels = ['Too weak!', 'Weak', 'Medium', 'Strong']
  const colors = [
    'text-danger',
    'text-secondary',
    'text-warning',
    'text-primary'
  ]

  const level = derived(
    [length, uppercase, numbers, symbols],
    ([$length, $uppercase, $numbers, $symbols], set) => {
      set(($length >= 16 || $numbers) + $uppercase + $symbols)
    }
  )
</script>

<div
  class="flex items-center justify-between py-3.5 px-4 bg-default-400 uppercase
    sm:(py-5 px-8)"
>
  <span class="text-default-200 sm:text-4.5">Strength</span>
  <div class="flex items-center gap-x-4">
    <span class="text-4.5 sm:text-6">{levels[$level]}</span>
    <div class="flex gap-x-2 {colors[$level]}">
      {#each Array.from({ length: 4 }) as _, index}
        <span
          class="h-7 w-2.5 border-2"
          class:bg-current={index <= $level}
          class:border-current={index <= $level}
        />
      {/each}
    </div>
  </div>
</div>
