// import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

export default function StatisticView () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  return (
    <div>
      <div>dfdff</div>
    </div>
  )
}
