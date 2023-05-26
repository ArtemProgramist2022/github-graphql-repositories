import { ChangeEvent } from 'react'

export type InputProps = {
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
}
