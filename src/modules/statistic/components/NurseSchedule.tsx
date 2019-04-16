import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { Table } from 'antd'
// import { string } from 'prop-types'

export default function BedSituation () {
  const [count, setCount] = useState(0)
  // let columns: Array<{
  //   title: string
  //   width?: number
  //   dataIndex?: string
  //   key: string
  //   fixed?: string
  // }>

  useEffect(() => {
    console.log(count, setCount)
  })
  return <Con>ss</Con>
}

const Con = styled.div`
  width: 100%;
  overflow: auto;
`
