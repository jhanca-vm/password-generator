import { hydrateRoot } from 'react-dom/client'
import Form from './components/form'
import './styles/fonts.css'
import './styles/tailwind.css'

class IslandReact extends HTMLElement {
  async connectedCallback() {
    hydrateRoot(this, <Form />)
  }
}

customElements.define('island-react', IslandReact)
