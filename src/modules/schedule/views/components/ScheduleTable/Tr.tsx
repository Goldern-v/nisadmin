import styled from 'styled-components'
import React from 'react'
import { TdItem } from './ScheduleTable'

interface Props {
  tr: TdItem[]
}

export default function Tr (props: Props) {
  return (
    <Wrapper>
      {props.tr.map((item, index) => (
        <td key={item.key + index}>{item.value}</td>
      ))}
    </Wrapper>
  )
}
const Wrapper = styled.tr``
