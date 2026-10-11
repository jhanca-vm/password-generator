import type { FunctionComponent } from 'react'
import { hydrateRoot } from 'react-dom/client'

type Islands = Record<string, () => Promise<{ default: FunctionComponent }>>

const islands: Islands = {
  'password-form': () => import('../features/generate-password/ui/form')
}

class IslandReact extends HTMLElement {
  async connectedCallback() {
    const name = this.getAttribute('data-name')

    if (name) {
      const { default: Component } = await islands[name]()

      hydrateRoot(this, <Component />)
    }
  }
}

customElements.define('island-react', IslandReact)
