import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Zimage from 'src/components/Zimage'
import {getFileType} from "src/utils/file/file";
import {appStore} from "src/stores";
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
              {getFileType(item.path) == 'img' && <Zimage
                      style={{ width: '100%', height: '100%' }}
                      src={item.path || ''}
                  />}
              {['word','excel'].includes(getFileType(item.path)) &&
                <div className='norwap'>{ item.path.split('/').pop()}
                  <div><a  href={item.path} download>下载</a></div>
              </div>}
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
  .norwap {
   white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
