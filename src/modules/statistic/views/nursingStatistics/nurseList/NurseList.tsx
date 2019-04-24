import styled from 'styled-components'
import React from 'react'
// import React, { useState, useEffect } from 'react'

export default function BedSituation () {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   console.log(count, setCount)
  // })
  return (
    <div>
      <Con>
        <img src={require('src/modules/login/img/pageTable.png')} alt='logo' />
      </Con>
    </div>
  )
}

const Con = styled.div`
  /* width: 700px; */
  /* background-image: url(${require('src/modules/login/img/pageTable.png')}); */
  img{
    width:930px;
  }
`
