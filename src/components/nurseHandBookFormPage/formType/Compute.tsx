import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import menuOperation from '../function/menuOperation';
import SelectModal from '../selectModal/SelectModal'
import { authStore, appStore, scheduleStore } from "src/stores";

export interface Props {
  masterInfo: any
  bodyModal: any
}
export default function Compute(props: Props) {
  const { masterInfo, bodyModal } = props
  
  useEffect(() => {
    // console.log(bodyModal);
  }, [bodyModal])

  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {masterInfo.computeRow.map((col: any, colIdx: any) =>
          <div
            id={`${col.key}_${colIdx}`}
            className="compute"
            style={{ 
              width: `${col.width}px`,
              ...col.style,
            }}
            key={`${colIdx}`}
          >
            {col.value}
          </div>)}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.compute {
  border: 1px solid #000;
  font-size: 16px;
  min-height: 35px;
  text-align: center;
  outline: none;
  margin-right:-1px; 
  margin-bottom:-1px;
  display: -webkit-box;
  display: box;
  -webkit-box-pack: center; 
  box-pack: center; 
  -webkit-box-align: center; 
  box-align: center;
  word-break: break-all;
}
`