import styled from 'styled-components'
import React from 'react'
import { ThItem } from './ScheduleTable'

interface Props {
  th: ThItem[]
}

export default function Col (props: Props) {
  return (
    <Wrapper>
      {props.th.map((item, index) => (
        <col key={index} width={item.width} />
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.colgroup``
