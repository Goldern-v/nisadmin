export interface Validator {
  // 返回true - 验证通过，返回false或string - 验证失败，string为错误信息
  (value: any, values: any): string | boolean | undefined
}

export interface Rules {
  [key: string]: Validator
}
