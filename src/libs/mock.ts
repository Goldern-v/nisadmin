export type MockFunction = (...args: any[]) => any

const isMockEnv = process.env.REACT_APP_MOCK === 'true'

if (isMockEnv) {
  console.warn('[Mock] 当前项目正在以mock模式运行。')
}

export function Mock (fn: MockFunction, force?: boolean) {
  return function (target: object, name: string, descriptor: TypedPropertyDescriptor<any>) {
    const method: () => void = descriptor.value
    
    if (typeof method === 'function' && (force || isMockEnv)) {
      descriptor.value = (...args: any[]) => {
        console.warn(`[Mock] ${target.constructor.name}.${name}`)
        return fn(...args)
      }
    }

    return descriptor
  }
}
