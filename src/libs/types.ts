import { type } from 'os';
export type Fallible<T> = [null | Error, T]

/**
 * 映射类型
 */
export type Mapping<V = string, K extends string = string> = { [key in K]: V }

export type Obj = Record<string, any>