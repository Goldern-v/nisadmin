import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Drawer } from 'antd'
import moment from 'moment'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
export interface Props {
  pageUrl?: '',
  reversionList: any[],
  visible: boolean,
  handleSelect?: Function,
  onClose: Function
}

export default observer(function ReversionPannel(props: Props) {
  const { reversionList, visible, onClose, handleSelect, pageUrl } = props

  const handleClick = (item: any) => {
    handleSelect && handleSelect(item)
  }

  const activeClass = (item: any) => {
    if (item.urls && item.urls.length > 0 && item.urls[0] == appStore.queryObj.pageUrl) return 'active'
    return ''
  }

  let formatList = () => {
    let newList = [...reversionList]
    newList.unshift({ upLoadTime: '当前版本', urls: [pageUrl] })
    return newList.sort((a: any, b: any) => {
      return Number(moment(b.upLoadTime || '').format('x')) - Number(moment(a.upLoadTime || '').format('x'))
    })
  }

  // console.log(formatList())

  return <Drawer
    placement="left"
    title="修订记录"
    onClose={() => onClose && onClose()}
    visible={visible}>
    <Wrapper>
      {formatList().map((item: any, idx: number) => <p
        key={idx}
        className={activeClass(item)}
        onClick={() => handleClick(item)}>
        {item.upLoadTime}  {item.upLoaderEmpName}
      </p>)}
    </Wrapper>
  </Drawer>
})

const scrollBarStyle = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-track {
    background-color: #ddd;
  }
`

const Wrapper = styled.div`
  padding: 15px;
  padding-bottom: 0;
  position: fixed;
  top: 55px;
  width: 256px;
  left: 0;
  bottom: 0;
  overflow: auto;
  ${scrollBarStyle}
 p{
   cursor: pointer;
   :hover{
     color: #00A680;
   }
   &.active{
    color: #00A680;
    font-weight: bold;
   }
 }
`