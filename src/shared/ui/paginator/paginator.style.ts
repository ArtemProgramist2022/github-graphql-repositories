import clsx from 'clsx'

export function getPageClassName(selected: boolean) {
  return clsx(
    'w-[52px]',
    'inline-flex',
    'justify-center',
    'transition',
    selected
      ? 'text-primary_50 border-t-[2px] border-t-primary_100'
      : 'text-gray_900 border-t-[2px] border-t-white',
  )
}
