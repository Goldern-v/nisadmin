export type Fallible<T> = [null | Error, T]

/**
 * 映射类型
 */
export type Mapping<V = string, K extends string = string> = { [key in K]: V }

export type Obj = Record<string, any>

export interface SelectItem extends Obj {
  label: string
  value: any
}

export interface navConfigItem {
  onClick?: any;
  name: string;
  path?: string;
  children?: navConfigItem[];
  hidden?: boolean | Function;
  icon?: any;
  menuStyle?: React.CSSProperties;
}