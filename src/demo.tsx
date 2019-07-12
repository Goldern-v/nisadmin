import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Select } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import MultipleImageUploader from './components/ImageUploader/MultipleImageUploader'

const { Option } = Select
export interface Props extends RouteComponentProps {}

export default function demo() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState([])
  useEffect(() => {
    console.log(count, setCount)
  })
  const upload: any = (file: File) => {
    console.log(file, 'file')
  }
  const onChange: any = (files: any) => {
    setValue(files)
    console.log(files, 'file')
  }
  const loadFunc = (a: any) => {
    console.log(a, 'aaa')
  }
  return (
    <Wrapper>
      {/* <MultipleImageUploader value={value} onChange={onChange} /> */}
      <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true || false}
        loader={
          <div className='loader' key={0}>
            Loading ...
          </div>
        }
        useWindow={true}
      >
        <div>1</div>
      </InfiniteScroll>
    </Wrapper>
  )
}
const Wrapper = styled.div``
