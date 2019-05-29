import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import ReactZmage from 'react-zmage'
export interface Props {
  list: string[]
  text: string
}

export default function Zimage (props: Props | any) {
  let option = Object.assign(
    {
      backdrop: 'rgba(0,0,0, .8)'
    },
    props
  )
  let imgRef = React.createRef<any>()
  if (option.text) {
    if (option.list && option.list.length > 0) {
      return (
        <Wrapper
          onClick={() => {
            imgRef.current && imgRef.current.cover.click()
          }}
        >
          <Text>{option.text}</Text>

          <ReactZmage
            {...option}
            ref={imgRef}
            set={option.list.map((item: any) => {
              return { src: item }
            })}
          />
        </Wrapper>
      )
    } else if (option.src) {
      return (
        <Wrapper
          onClick={() => {
            imgRef.current && imgRef.current.cover.click()
          }}
        >
          <Text>{option.text}</Text>
          <ReactZmage {...option} ref={imgRef} />
        </Wrapper>
      )
    } else {
      return <React.Fragment />
    }
  } else {
    return option.src ? <ReactZmage {...option} /> : <span />
  }
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
