import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import ReactZmage from 'react-zmage'
export interface Props {}

export default function Zimage (props: any) {
  let option = Object.assign(
    {
      backdrop: 'rgba(0,0,0, .8)'
    },
    props
  )
  let imgRef = React.createRef<any>()
  if (option.text) {
    return (
      <Wrapper
        onClick={() => {
          console.log(imgRef, 'imgRefimgRefimgRef')
          imgRef.current && imgRef.current.cover.click()
        }}
      >
        <Text>{option.text}</Text>
        <ReactZmage {...option} ref={imgRef} />
      </Wrapper>
    )
  }
  return <ReactZmage {...option} />
}
const Wrapper = styled.div`
  cursor: pointer;
  img {
    width: 0;
    height: 0;
    position: absolute;
  }
`

const Text = styled.div`
  color: ${(p: any) => p.theme.$mtc};
  font-size: 14px;
`
