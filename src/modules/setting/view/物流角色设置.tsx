import React, { useState, useEffect } from 'react'
// import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import SettingView from 'src/modules/setting/SettingViewModel.ts'
import { observer } from 'mobx-react-lite'
const staticData = ['记录单', '记录单']

export default observer(function RoleSetting() {
  useEffect(() => {})
  const [value, setValue] = useState('护理单')

  const testClick1 = () => {
    let cache = '记录单'
    // let cache1 = [...cache]
    // let aa = cache1[0]
    setValue(cache)
  }
  const testClick2 = () => {
    let cache = '护理单'
    // let cache1 = [...cache]
    // let aa = cache1[0]
    setValue(cache)
  }
  const testClick = () => {}
  SettingView.testArr = [{ a: 1 }, { b: 1 }, { c: 1 }, { d: 1 }, { e: 1 }]

  return (
    <Con>
      <Button onClick={testClick}>test</Button>
      <Button onClick={testClick1}>记录单</Button>
      <Button onClick={testClick2}>护理单</Button>

      {/* <div>{value}</div> */}
      <Carousel>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    </Con>
  )
})
const Con = styled.div``
const Carousel = styled.div``
