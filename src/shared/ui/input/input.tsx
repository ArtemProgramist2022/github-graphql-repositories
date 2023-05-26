import React, {
  useState,
  ChangeEvent,
  forwardRef,
  ForwardedRef,
  useRef,
} from 'react'
import {
  inputClassName,
  inputWrapperClassName,
} from '@/shared/ui/input/input.style'
import { InputProps } from '@/shared/ui/input/input.type'

const Input = forwardRef(
  (props: InputProps, forwardedRef: ForwardedRef<HTMLInputElement>) => {
    const {
      value,
      onChange,
      placeholder,
      disabled = false,
      ...remindedProps
    } = props
    const [isFocus, setIsFocus] = useState(false)
    const prevDefaultValue = useRef<string>()

    const inputProps = {
      className: inputClassName,
      placeholder,
      disabled,
      onChange: handleOnChange,
      ...remindedProps,
      onFocus: setIsFocus.bind(null, true),
      onBlur: setIsFocus.bind(null, false),
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
      const value = event.target.value
      onChange?.(event)
      prevDefaultValue.current = value
    }

    const renderInput = (
      <input ref={forwardedRef} value={value} {...inputProps} />
    )

    return (
      <div className="w-full">
        <div
          className={inputWrapperClassName({
            isFocus,
            disabled,
          })}
        >
          {renderInput}
        </div>
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
