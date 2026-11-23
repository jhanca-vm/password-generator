import clsx from 'clsx/lite'
import { PASSWORD_LENGTH } from '@/constants'
import useClipboard from '@/hooks/use-clipboard'
import useForm from '@/hooks/use-form'
import ArrowIcon from '@/icons/arrow.svg'
import CopyIcon from '@/icons/copy.svg'
import Checkbox from './checkbox'
import Meter from './meter'
import Range from './range'

export default function Form() {
  const {
    handleSubmit,
    isPending,
    password,
    rules,
    strength,
    setLength,
    toggleCharacter
  } = useForm()
  const { isCopied, copy } = useClipboard()

  return (
    <form className="max-w-lg mt-4 mx-auto sm:mt-8" onSubmit={handleSubmit}>
      <div
        className={clsx(
          'h-16 mb-4 p-4 flex items-center justify-between gap-4 bg-gray-700',
          'sm:mb-6 sm:px-8',
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
                <CopyIcon className="h-5 fill-current sm:h-6" />
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
      <div className="p-4 bg-gray-700 sm:px-8 sm:py-6">
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
            onChange={() => toggleCharacter('includesUppercase')}
          />
          <Checkbox
            label="Incluir minúsculas"
            id="includes-lowercase"
            checked={rules.includesLowercase}
            onChange={() => toggleCharacter('includesLowercase')}
          />
          <Checkbox
            label="Incluir números"
            id="includes-numbers"
            checked={rules.includesNumbers}
            onChange={() => toggleCharacter('includesNumbers')}
          />
          <Checkbox
            label="Incluir símbolos"
            id="includes-symbols"
            checked={rules.includesSymbols}
            onChange={() => toggleCharacter('includesSymbols')}
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
          type="submit"
          disabled={!strength}
        >
          Generar
          <ArrowIcon className="w-3 fill-current" />
        </button>
      </div>
    </form>
  )
}
