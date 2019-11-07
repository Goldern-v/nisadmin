import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Zimage from 'src/components/Zimage'
export interface Props {
  pageData: any
}

interface FileItem {
  channel: any
  createDate: any
  entity: any
  entityId: any
  id: any
  name: any
  path: any
  publicFile: any
  size: any
  sort: any
  status: any
  type: any
  userId: 999
}

export default function FileCon(props: Props) {
  return (
    <Wrapper>
      <div className='title'>附件</div>
      <div className='list'>
        {props.pageData.detail.attachmentList &&
          props.pageData.detail.attachmentList.map((item: any, index: number) => (
            <div className='file-Item' key={index}>
              <Zimage
                style={{ width: '100%', height: '100%' }}
                src={
                  'http://120.25.105.45:9866/crNursing/asset/nurseAttachment/20190710/20190710095946UhOQtPBk.jpg' ||
                  item.path
                }
              />
            </div>
          ))}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .title {
    font-size: 17px;
    color: #333333;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .list {
    overflow: hidden;
    margin-left: -10px;
  }
  .file-Item {
    float: left;
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
    margin-left: 10px;
  }
`
