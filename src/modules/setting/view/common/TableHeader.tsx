import styled from 'styled-components'
import React from 'react'
import settingViewModel from '../../SettingViewModel'
// import React, { useState, useEffect } from 'react'
export default function BedSituation () {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   
  // })
  return (
    <div>
      <Con>
        <TopCon>{settingViewModel.getHeadTitle}</TopCon>
      </Con>
    </div>
  )
}

const Con = styled.div`
  width: 100%;
`
const TopCon = styled.div`
  height: 45px;
  background: #f8f8f8;
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #dbe0e4;
  font-size: 13px;
  position: relative;
  font-size: 16px;
  color: #333333;
  padding: 0 20px;
  display: flex;
  align-items: center;
  z-index: 1;
`
