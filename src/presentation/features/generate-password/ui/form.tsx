import clsx from 'clsx/lite'

import { PASSWORD_LENGTH } from '@/core/password/domain/constants'
import useClipboard from '@/presentation/shared/lib/clipboard/use-clipboard'
import Checkbox from '@/presentation/shared/ui/checkbox'
import IconArrow from '@/presentation/shared/ui/icons/arrow.svg'
import IconCopy from '@/presentation/shared/ui/icons/copy.svg'
import Meter from '@/presentation/shared/ui/meter'
import Range from '@/presentation/shared/ui/range'

import usePasswordForm from '../model/use-form'

export default function PasswordForm() {
  const {
    isPending,
    password,
    rules,
    strength,
    handleSubmit,
    setLength,
    toggleCharacterType
  } = usePasswordForm()
  const { isCopied, copy } = useClipboard()

  return (
    <form className="mx-auto mt-4 max-w-lg sm:mt-8" onSubmit={handleSubmit}>
      <div
        className={clsx(
          'mb-4 flex h-16 items-center justify-between gap-4 bg-gray-700',
          'p-4 sm:mb-6 sm:px-8',
          isPending && 'animate-pulse'
        )}
      >
        {password ? (
          <>
            <output className="truncate text-2xl">{password}</output>
            <div className="flex gap-2 sm:gap-4">
              <span className="text-green-200 uppercase" aria-live="polite">
                {isCopied ? 'Copiado' : null}
              </span>
              <button
                className={clsx(
                  'text-green-200 transition-opacity hover:text-green-200/90',
                  'active:text-white'
                )}
                type="button"
                aria-label="Copiar"
                onClick={() => copy(password)}
              >
                <IconCopy className="h-5 fill-current sm:h-6" />
              </button>
            </div>
          </>
        ) : (
          <span
            className={clsx(
              'bg-linear-to-b from-gray-500 to-gray-600 bg-clip-text',
              'text-2xl text-transparent'
            )}
            aria-hidden
          >
            C0nTr@S3ñ@!
          </span>
        )}
      </div>
      <div className="bg-gray-700 p-4 sm:px-8 sm:py-6">
        <Range
          label="Caracteres"
          id="password-length"
          value={rules.length}
          min={PASSWORD_LENGTH.MIN}
          max={PASSWORD_LENGTH.MAX}
          onChange={setLength}
        />
        <div className="my-8 grid gap-4">
          <Checkbox
            label="Incluir mayúsculas"
            id="includes-uppercase"
            checked={rules.includesUppercase}
            onChange={() => toggleCharacterType('includesUppercase')}
          />
          <Checkbox
            label="Incluir minúsculas"
            id="includes-lowercase"
            checked={rules.includesLowercase}
            onChange={() => toggleCharacterType('includesLowercase')}
          />
          <Checkbox
            label="Incluir números"
            id="includes-numbers"
            checked={rules.includesNumbers}
            onChange={() => toggleCharacterType('includesNumbers')}
          />
          <Checkbox
            label="Incluir símbolos"
            id="includes-symbols"
            checked={rules.includesSymbols}
            onChange={() => toggleCharacterType('includesSymbols')}
          />
        </div>
        <Meter
          htmlFor={
            'password-length includes-uppercase includes-lowercase' +
            'includes-numbers includes-symbols'
          }
          label="Seguridad"
          levels={['Muy débil', 'Débil', 'Media', 'Fuerte']}
          value={strength}
          low={2}
          high={3}
          optimum={4}
        />
        <button
          className={clsx(
            'my-4 flex w-full justify-center gap-4 bg-green-200 p-4',
            'leading-none text-gray-700 uppercase ring-2 ring-green-200',
            'transition-opacity hover:bg-green-200/90 active:bg-gray-700',
            'active:not-disabled:text-green-200 disabled:bg-gray-500',
            'disabled:ring-gray-500 sm:mt-8'
          )}
          disabled={!strength}
        >
          Generar
          <IconArrow className="w-3 fill-current" />
        </button>
      </div>
    </form>
  )
}
