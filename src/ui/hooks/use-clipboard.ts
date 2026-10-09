import { useState } from 'react'

export default function useClipboard() {
  const [isCopied, setIsCopied] = useState(false)

  return {
    isCopied,
    async copy(text: string) {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }
}
