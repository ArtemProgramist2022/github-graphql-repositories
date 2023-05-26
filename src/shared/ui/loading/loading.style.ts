import { LoadingSize } from './loading.type'
import clsx from 'clsx'

export function getWrapperLoadingClassName(full: boolean) {
  return clsx(
    full ? 'fixed' : 'absolute',
    'inset-0',
    'z-[999]',
    'flex',
    'justify-center',
    'items-center',
    'bg-white/75',
    'transition-all',
  )
}

export function getLoadingClassName(size: LoadingSize) {
  return clsx(
    'inline-block',
    'relative',
    size === 'large' && 'w-[80px] h-[80px]',
    size === 'medium' && 'w-[60px] h-[60px]',
    size === 'small' && 'w-[40px] h-[40px]',
  )
}

export function getLoadingChildClassName(size: LoadingSize) {
  return clsx(
    'block',
    'absolute',
    size === 'large' && 'w-[64px] h-[64px] m-[8px] border-[8px]',
    size === 'medium' && 'w-[44px] h-[44px] m-[6px] border-[6px]',
    size === 'small' && 'w-[24px] h-[24px] m-[4px] border-[4px]',
    'border-l-primary_100',
    'border-y-transparent',
    'border-r-transparent',
    'rounded-[50%]',
    'animation-loading',
  )
}
