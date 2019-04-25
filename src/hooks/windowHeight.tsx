import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

export default function windowHeight () {
  const [wih, setWih] = useState(document.body.offsetHeight)
  useEffect(() => {
    const onresize = () => {
      let h = document.body.offsetHeight
      setWih(h)
    }
    window.addEventListener('resize', onresize)

    return () => {
      window.removeEventListener('resize', onresize)
    }
  })
  return wih
}
const Wrapper = styled.div``
