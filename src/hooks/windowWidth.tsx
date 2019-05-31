import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
export interface Props extends RouteComponentProps {}

export default function windowWidth () {
  const [wiw, setWiw] = useState(document.body.offsetWidth)
  useEffect(() => {
    const onresize = () => {
      let w = document.body.offsetHeight
      setWiw(w)
    }
    window.addEventListener('resize', onresize)

    return () => {
      window.removeEventListener('resize', onresize)
    }
  })
  return wiw
}
const Wrapper = styled.div``
