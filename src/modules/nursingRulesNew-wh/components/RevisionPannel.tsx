import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Drawer, Icon } from 'antd'
import moment from 'moment'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { nursingRulesApiService } from './../api/nursingRulesNewService'
import { message } from 'antd/es'

export interface Props {
  pageUrl?: '',
  revisionList: any[],
  visible: boolean,
  handleSelect?: Function,
  onClose: Function
}

export default observer(function RevisionPannel(props: Props) {
  const { isDepartment } = authStore
  const { revisionList, visible, onClose, handleSelect, pageUrl } = props

  const handleClick = (item: any) => {
    handleSelect && handleSelect(item)
  }

  const activeClass = (item: any) => {
    if (item.urls && item.urls.length > 0 && item.urls[0] == appStore.queryObj.pageUrl) return 'active'
    return ''
  }

  let formatList = () => {
    let newList = [...revisionList]
    newList = newList.sort((a: any, b: any) => {
      return Number(moment(b.upLoadTime || null).format('x')) - Number(moment(a.upLoadTime || null).format('x'))
    })
    newList.unshift({ cataLogName: '当前版本', urls: [pageUrl] })

    return newList
  }

  const handleDownload = (item: any) => {
    if (item.urls && item.urls.length > 0) {
      nursingRulesApiService
        .downloadPage(
          `/crNursing/asset${item.urls[0]}`,
          `${item.cataLogName.replace('.pdf', '')}.pdf`
        )
    } else {
      message.error('缺少文件')
    }
  }

  return <Drawer
    placement="left"
    title="修订记录"
    width={300}
    onClose={() => onClose && onClose()}
    visible={visible}>
    <Wrapper>
      {formatList().map((item: any, idx: number) => <div
        key={idx}
        className={activeClass(item)}
      >
        <div
          className="title"
          title={item.cataLogName || ''}
          onClick={() => handleClick(item)}>
          {item.cataLogName || ''}
        </div>
        {idx > 0 && <div className="info">
          <span>{item.upLoadTime}</span>
          <span>  </span>
          <span>{item.upLoaderEmpName}</span>
          {isDepartment && <span className="download" title="下载">
            <Icon type='download' onClick={() => handleDownload(item)} />
          </span>}
        </div>}
      </div>)}
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
  width: 300px;
  left: 0;
  bottom: 0;
  overflow: auto;
  ${scrollBarStyle}
 &>div{
   padding: 0.5em 0;

   :hover{
     color: #00A680;
   }
   &.active{
    color: #00A680;
    .title{
      font-weight: bold;
    }
   }
   &>div>*{
     vertical-align: middle;
   }
   .title{
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    text-overflow:ellipsis;
    white-space: nowrap;
   }
   .info{
     color: #999;
   }
   .download{
      float:right;
      font-size: 16px;
      :hover{
        color: #00A680;
      }
    }
 }
`