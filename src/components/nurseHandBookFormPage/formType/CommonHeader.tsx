import styled from 'styled-components'
import React, { useState, useEffect } from 'react'


export interface Props {
  masterInfo: any
  
}
export default function CommonHeader(props: Props) {
  const { masterInfo } = props
  const { tHead } = masterInfo

  return(
    <Wrapper>
      {Object.keys(tHead).map((item: any, idx: any) =>
        <div key={idx} style={{ background: '#f9f9f9', display: 'flex', justifyContent: 'start' }}>
          {tHead[item].map((thItem: any, thIdx: any) =>
            <div className="commonHeader" key={thIdx} style={{height: `${thItem.rowspan*30}px`}}>{thItem.name}</div>)}
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
.commonHeader{
  border: 1px solid #000;
  min-height: 30px;
  width: 100px;
  font-size: 16px;
  text-align: center;
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
