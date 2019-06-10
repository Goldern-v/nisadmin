import * as React from 'react'
import styled from 'styled-components'
import { get, set } from 'lodash'

import { noop } from 'src/libs/fns'

import FormField from './FormField'
import FormContext, { FormContextValue } from './FormContext'
import { Rules } from './interfaces'

export interface Props<T> {
  defaultValues?: Partial<T>
  labelWidth?: number
  rules?: Rules
  className?: string
  children?: React.ReactNode
  onChange?: (name: string, value: any, form: Form) => void
  onSubmit?: (e: React.FormEvent, form: Form) => void
}

export interface State<T> {
  values: T
  errors: { [name in keyof T]: string } | {}
}

export default class Form<T extends Object = any> extends React.Component<Props<T>, State<T>> {
  public static Field = FormField

  public static defaultProps: Partial<Props<any>> = {
    rules: {},
    onChange: noop,
    onSubmit: noop
  }

  public constructor (props: Props<T>) {
    super(props)

    this.state = {
      values: {} as any,
      errors: {} as any
    }
  }

  public componentDidMount () {
    const { defaultValues } = this.props

    if (defaultValues) {
      this.setFields(defaultValues)
    }
  }

  public getField = (name: string) => {
    return get(this.state.values, name)
  }

  public setField = (name: string, value: any, trigger: boolean = true) => {
    return new Promise((resolve) => {
      this.setState(
        (state) => {
          const values = { ...(state.values as any) }
          return { values: set(values, name, value) }
        },
        () => {
          if (trigger) {
            this.props.onChange!(name, value, this)
            // this.validateField(name, true)
          }

          resolve()
        }
      )
    })
  }

  public getFields = () => {
    return this.state.values
  }

  public setFields = async (newValues: any = {}, trigger: boolean = true) => {
    const keys = Object.keys(newValues)
    if (!keys.length) return

    return Promise.all(Object.keys(newValues).map((name) => this.setField(name, newValues[name], trigger)))
  }

  public clear = (callback: () => void = noop) => {
    this.setState({ values: {} as any, errors: {} as any }, callback)
  }

  public validateField = (name: string, apply?: boolean) => {
    const validator = this.props.rules![name]
    if (!validator) return undefined

    const result = validator(this.getField(name), this.getFields())
    const error = result === true || result === undefined ? undefined : result || ''

    if (apply) {
      this.setState({
        errors: { ...(this.state.errors as any), [name]: error }
      })
    }

    return error
  }

  public validateFields = () => {
    const errors: any = {}

    Object.keys(this.props.rules!).forEach((name) => {
      const error = this.validateField(name)
      if (error) errors[name] = error
    })

    const message = errors[Object.keys(errors)[0]]
    this.setState({ errors })

    // todo: scroll
    // npm install dom-scroll-into-view --save

    return message === undefined
      ? Promise.resolve({ ...(this.state.values as any) })
      : Promise.reject(new Error(message))
  }

  private onFieldChange = (name: string, args: any[]) => {
    const e = args[0]

    const value = e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e

    this.setField(name, value)
  }

  private getFieldError = (name: string) => {
    return (this.state.errors as any)[name]
  }

  private onSubmit = (e: React.FormEvent) => {
    this.props.onSubmit!(e, this)
  }

  public cleanErrors = () => {
    this.setState({
      errors: {}
    })
  }

  public clean = () => {
    this.clear()
    this.cleanErrors()
  }

  public render () {
    const { className, labelWidth = 120, children } = this.props

    const context: FormContextValue = {
      labelWidth,
      getFieldValue: this.getField,
      onFieldChange: this.onFieldChange,
      getFieldError: this.getFieldError,
      cleanErrors: this.cleanErrors
    }

    return (
      <FormContext.Provider value={context}>
        <OriginalForm className={className} onSubmit={this.onSubmit}>
          {children}
        </OriginalForm>
      </FormContext.Provider>
    )
  }
}

const OriginalForm = styled.form``
