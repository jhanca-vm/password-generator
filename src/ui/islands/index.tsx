import type { FunctionComponent } from 'react'
import { hydrateRoot } from 'react-dom/client'

const islands = import.meta.glob<FunctionComponent>(
  ['./*.tsx', '!*.test.tsx'],
  { import: 'default' }
)

class IslandReact extends HTMLElement {
  async connectedCallback() {
    const name = this.getAttribute('data-name')
    const Component = await islands[`./${name}.tsx`]()

    hydrateRoot(this, <Component />)
  }
}

customElements.define('island-react', IslandReact)
