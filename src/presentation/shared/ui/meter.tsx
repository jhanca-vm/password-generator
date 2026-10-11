import clsx from 'clsx/lite'
import { useId } from 'react'

interface Props {
  htmlFor: string
  label: string
  levels: string[]
  value: number
  low: number
  high: number
  optimum: number
}

export default function Meter({
  htmlFor,
  label,
  levels,
  value,
  low,
  high,
  optimum
}: Props) {
  const id = useId()
  const levelIndex = value - 1

  function isInRange(index: number, min: number, max = Infinity) {
    return value >= min && value < max && index <= levelIndex
  }

  return (
    <div
      className={clsx(
        'flex flex-wrap items-center justify-between gap-4 bg-gray-800',
        'p-4 sm:px-8 sm:py-5'
      )}
    >
      <label htmlFor={id}>{label}</label>
      <div className="flex items-center gap-4">
        <output
          className={clsx(
            'uppercase',
            value < low
              ? 'text-red-500'
              : value < high
                ? 'text-orange-400'
                : value < optimum
                  ? 'text-yellow-300'
                  : 'text-green-200'
          )}
          htmlFor={htmlFor}
          id={id}
        >
          {levels[levelIndex]}
        </output>
        <div className="flex gap-2">
          {levels.map((level, index) => (
            <span
              className={clsx(
                'h-7 w-2.5 border-2',
                isInRange(index, 1, low) && 'border-red-500 bg-red-500',
                isInRange(index, low, high) &&
                  'border-orange-400 bg-orange-400',
                isInRange(index, high, optimum) &&
                  'border-yellow-300 bg-yellow-300',
                isInRange(index, optimum) && 'border-green-200 bg-green-200'
              )}
              key={level}
            ></span>
          ))}
        </div>
      </div>
    </div>
  )
}
