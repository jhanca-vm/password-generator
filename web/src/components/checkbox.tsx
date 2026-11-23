import clsx from 'clsx/lite'

interface Props {
  label: string
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Checkbox({ label, id, checked, onChange }: Props) {
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <input
        className={clsx(
          'm-[2px] size-4 appearance-none border border-transparent ring-2',
          'shadow-green-200 transition-shadow checked:bg-green-200',
          'checked:not-active:ring-green-200 hover:shadow-lg',
          'active:not-checked:ring-green-200'
        )}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
