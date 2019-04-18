import * as React from 'react'

import { noop } from 'src/libs/fns'

export interface FormContextValue {
  labelWidth?: number
  getFieldValue: (name: string) => any
  onFieldChange: (name: string, args: any[]) => void
  getFieldError: (name: string) => string | undefined
}

const FormContext = React.createContext<FormContextValue>({
  getFieldValue: noop,
  onFieldChange: noop,
  getFieldError: noop as any
})

export default FormContext
