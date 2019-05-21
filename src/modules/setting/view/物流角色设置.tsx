import React, { useState, useEffect } from 'react'
// import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
const staticData = ['记录单', '记录单']

console.log('组件全局中上层的执行')

export default function RoleSetting () {
  console.log('66666666666中间上运行')
  useEffect(() => {
    console.log('rander里的userEffect 上方')
    // console.log('查看useState中的数据', value)
    console.log('rander里的userEffect 下方')
  })
  const [value, setValue] = useState('护理单')

  const testClick1 = () => {
    console.log('点击了一下记录单')
    let cache = '记录单'
    // let cache1 = [...cache]
    // let aa = cache1[0]
    setValue(cache)
  }
  const testClick2 = () => {
    console.log('点击了一下护理单')
    let cache = '护理单'
    // let cache1 = [...cache]
    // let aa = cache1[0]
    setValue(cache)
  }
  console.log('66666666666中间下运行')
  return (
    <Con>
      <Button onClick={testClick1}>记录单</Button>
      <Button onClick={testClick2}>护理单</Button>
      {console.log('return中的jsx执行')}
      {/* <div>{value}</div> */}
    </Con>
  )
}
const Con = styled.div``
