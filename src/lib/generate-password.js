import { generate } from 'generate-password-browser'
import { password } from './stores'

/**
 * @type {import("svelte/elements").EventHandler<SubmitEvent, HTMLFormElement>}
 */
const generatePassword = ({ currentTarget }) => {
  const formdata = new FormData(currentTarget)

  password.set(generate({
    length: Number(formdata.get('length')),
    uppercase: formdata.has('uppercase'),
    numbers: formdata.has('numbers'),
    symbols: formdata.has('symbols')
  }))
}

export default generatePassword
