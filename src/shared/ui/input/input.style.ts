import clsx from 'clsx'

export const inputWrapperClassName = ({
  disabled,
  isFocus,
}: {
  disabled: boolean
  isFocus: boolean
}) =>
  clsx(
    'border',
    'text-gray_600',
    'font-regular',
    'rounded-lg',
    'block',
    'w-full',
    'inline-flex',
    'items-center',
    'transition',
    disabled
      ? 'border-gray_300 bg-gray_50 cursor-not-allowed'
      : isFocus
      ? 'border-primary_100'
      : 'border-gray_300 text-gray_300 hover:border-gray_400 bg-white',
  )

export const inputClassName = clsx(
  'border-none',
  'focus:border-none',
  'outline-0',
  'focus:outline-0',
  'w-full',
  'px-[12px]',
  'py-[8px]',
  'rounded-lg',
  'text-gray_900',
  'disabled:bg-gray_50',
  'disabled:text-gray_400',
  'disabled:cursor-not-allowed',
)
