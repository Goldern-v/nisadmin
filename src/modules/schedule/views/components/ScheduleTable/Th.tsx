import styled from 'styled-components'
import React from 'react'
import { ThItem } from './ScheduleTable'

interface Props {
  th: ThItem[]
}

export default function Th (props: Props) {
  return (
    <Wrapper>
      {props.th.map((item, index) => (
        <th key={index}>{item.value}</th>
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.tr``
