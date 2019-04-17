import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import SelectDepartment from '../common/SelectDepartment'
import SelectData from '../common/SelectData'
import { Button } from 'antd'

export default function BedSituation () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Con>
      <SelectDepartment />
      <Spacing />
      <SelectData />
      <Button className='searchButton'>查询</Button>
      <Button className='exportButton'>导出excl</Button>
    </Con>
  )
}

const Con = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  line-height: 45px;
  padding-left: 57px;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  .searchButton {
    margin-left: 10px;
    width: 90px;
    background: rgba(91, 190, 152, 1);
    border-radius: 3px;
    border: 1px solid rgba(62, 152, 98, 1);
    font-size: 13px;
    color: rgba(255, 255, 255, 1);
  }
  .exportButton {
    margin-left: 10px;
    width: 120px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    border: 1px solid rgba(192, 203, 206, 1);
    font-size: 13px;
    color: rgba(51, 51, 51, 1);
  }
`
const Spacing = styled.div`
  width: 20px;
`
