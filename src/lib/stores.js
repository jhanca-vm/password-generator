import { writable } from 'svelte/store'

export const password = writable('')

export const length = writable(12)

export const uppercase = writable(true)

export const numbers = writable(true)

export const symbols = writable(false)
