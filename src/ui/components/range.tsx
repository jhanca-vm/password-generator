import clsx from 'clsx/lite'
import type { CSSProperties } from 'react'

interface Props {
  label: string
  id: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

export default function Range({ label, id, value, min, max, onChange }: Props) {
  const fillPercentage = ((value - min) / (max - min)) * 100

  return (
    <>
      <div className="flex items-center justify-between">
        <label htmlFor={id}>{label}</label>
        <output className="text-2xl text-green-200 sm:text-3xl" htmlFor={id}>
          {value}
        </output>
      </div>
      <input
        className={clsx(
          'mt-4.5 mb-2.5 h-2 w-full appearance-none bg-linear-to-r',
          'from-green-200 to-gray-800',
          'range-thumb:size-7 range-thumb:appearance-none',
          'range-thumb:rounded-full range-thumb:bg-current',
          'range-thumb:shadow-lg range-thumb:ring range-thumb:shadow-gray-800',
          'range-thumb:transition-shadow range-thumb:hover:shadow-gray-500',
          'active:range-thumb:bg-gray-800 active:range-thumb:ring-2',
          'active:range-thumb:ring-green-200 sm:mt-6.5'
        )}
        type="range"
        id={id}
        value={value}
        min={min}
        max={max}
        style={
          {
            '--tw-gradient-from-position': `${fillPercentage}%`,
            '--tw-gradient-to-position': `${fillPercentage}%`
          } as CSSProperties
        }
        onChange={(event) => onChange(event.target.valueAsNumber)}
      />
    </>
  )
}
