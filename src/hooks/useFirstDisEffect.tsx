import React, { useEffect, useRef } from 'react'
/**useEffect第一次不执行 */
export default function useFirstDisEffect(fn: Function, val: any[]) {
  const flag = useRef(false)
  useEffect(() => {
    if (flag.current) fn()
    else flag.current = true
  }, val)
  
}