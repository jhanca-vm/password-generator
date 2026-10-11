import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'island-react': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}
