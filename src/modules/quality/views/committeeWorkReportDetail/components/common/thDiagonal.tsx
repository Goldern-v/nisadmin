import React from 'react'
import { Obj } from 'src/libs/types'
import styled from 'styled-components'

export interface Props extends Obj {
  h?: string
  title1?: string
  title2?: string
}
export default function (props: Props) {
  const { h = '40', title1 = "得分", title2 = "科室" } = props
  return (
    <Wrapper className='th-diagonal' h={h} title1={title1} title2={title2}>
      <div className='th-diagonal__line'></div>
    </Wrapper>
  )
}

const Wrapper: any = styled.div`
&.th-diagonal {

  width: 100%;
  height: ${(p:any) => p.h}px;
  position: relative;
  &::before {
    content: '';
    content: ${(p:any) => `'${p.title1}'`};
    position: absolute;
    left: 0;
    bottom: 0;
  }
  &::after {
    content: ${(p:any) => `'${p.title2}'`};
    position: absolute;
    right: 0;
    top: 0;
  }
  .th-diagonal__line {
    position: absolute;
    background: #000;
    width: 100%;
    height: 100%;
    clip-path: polygon(0% 0%, 1px 0%, 100% 100%, calc(100% - 1px) 100%);
  }
}
    
`