import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Input, Modal, message as Message } from 'antd'
import { editPageModel, FileItem } from '../../models/editPageModel'
import { observer } from 'mobx-react-lite'
// import { getFilePrevImg, getFileSize } from 'src/utils/file/file'

import CoverPreview from './CoverPreview'
// import PagesUploader from './PagesUploader'

export interface Props { }

const TextArea = Input.TextArea

export default observer(function BookBaseInfoEdit() {
  const { baseParams, fileList, loading, uploadLoading } = editPageModel;
  const handleCoverChange = (data: any) => {
    editPageModel.setBaseParams({ ...baseParams, cover: data }, true)
  }

  const uploadCover = () => {
    if (!baseParams.cover) {
      return ''
    } else if (Object.prototype.toString.call(baseParams.cover) == '[object String]') {
      return `/crNursing/asset${baseParams.cover}`
    } else {
      return baseParams.cover
    }
  }

  return <Wrapper>
    <div className="row">
      <div className="label">书籍封面：</div>
      <div className="content">
        <CoverPreview data={uploadCover()} onChange={handleCoverChange} />
      </div>
    </div>
    <div className="row">
      <div className="label">*书籍名称：</div>
      <div className="content">
        <TextArea
          autosize
          placeholder="请输入书籍名称"
          value={baseParams.bookName}
          onChange={(e: any) => editPageModel.setBaseParams({ ...baseParams, bookName: e.target.value })}
          onBlur={(e: any) => editPageModel.setBaseParams({ ...baseParams, bookName: e.target.value }, true)} />
      </div>
    </div>
    <div className="row">
      <div className="label">书籍介绍：</div>
      <div className="content">
        <TextArea
          placeholder="请输入书籍介绍"
          autosize={{ minRows: 3 }}
          value={baseParams.bookBrief}
          onChange={(e: any) => editPageModel.setBaseParams({ ...baseParams, bookBrief: e.target.value })}
          onBlur={(e: any) => editPageModel.setBaseParams({ ...baseParams, bookBrief: e.target.value }, true)} />
      </div>
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
  padding: 10px;
 .row{
   width: 800px;
   display: flex;
   margin-bottom: 10px;
   &>div{
    line-height: 30px;
   }
   .label{
     width: 80px;
     font-size: 14px;
     text-align: right;
     margin-right: 10px;
   }
   .content{
     flex: 1;
   }
 }
`