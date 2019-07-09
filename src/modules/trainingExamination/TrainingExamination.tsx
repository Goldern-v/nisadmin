import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import SpaceView from './common/SpaceView'

import LeftList from './components/LeftList'
export default function trainingExamination() {
  return (
    <Con>
      {/* <LeftListCon>ff</LeftListCon>
      <RightCon>ggg</RightCon> */}
      <SpaceView />
      {/* <div>fff</div> */}
    </Con>
  )
}

const Con = styled.div`
  height: 100%;
  width: 100%;
  /* display: flex; */
`
const LeftListCon = styled.div`
  width: 158px;
  /* background-color: red; */
`
const RightCon = styled.div`
  flex: 1;
  width: 0;
  /* background-color: yellow; */
`
