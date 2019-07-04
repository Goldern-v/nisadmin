import * as React from 'react'
import styled from 'styled-components'

/** 用于弹性盒子占位用 */
export const Place = styled.div`
  flex: 1;
`

/** 用于弹性盒子占位用 */
export const ScrollBox = styled.div`
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-track {
    border-radius: 50px;
    background-color: #eaeaea;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #c2c2c2;
  }
`
