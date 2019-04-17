import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import TableModel from '../../common/TableModel'

export default function BedSituation () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <Con>
      <TableModel />
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
`
