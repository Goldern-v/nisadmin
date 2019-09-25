import styled, { keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, Modal, message as Message } from 'antd'
import { editPageModel, FileItem } from './../../models/editPageModel'
import { observer } from 'mobx-react-lite'
import { getFilePrevImg, getFileSize } from 'src/utils/file/file'

import CoverPreview from './CoverPreview'
import PagesUploader from './PagesUploader'

export interface Props { }

const TextArea = Input.TextArea

export default observer(function BookFileEdit() {
  const { baseParams, fileList, loading, uploadLoading } = editPageModel;
  const handleCoverChange = (data: any) => {
    editPageModel.setBaseParams({ ...baseParams, cover: data })
  }

  const handleDelete = (item: FileItem) => {
    Modal.confirm({
      centered: true,
      title: '删除文件',
      content: `是否删除 ${item.fileName}`,
      onOk: () => {
        editPageModel.deletFile(item, (success: boolean) => {
          if (success) Message.success('删除成功')
        })
      }
    })

  }

  const FileList = () => {
    let viewFileList = [...fileList];

    viewFileList.sort((prev: any, next: any) => {
      return parseInt(prev.fileName) - parseInt(next.fileName)
    })

    return viewFileList.map((item: any, idx: number) => <div className="file-item" key={idx}>
      <div className="file-icon">
        <span className="icon">
          <img src={getFilePrevImg(item.fileName)} />
        </span>
      </div>
      <div className="file-info">
        <div className="book-name">{item.fileName}</div>
        <div className="file-size">{getFileSize(item.fileSize)}</div>
        <div className="success">上传完成</div>
      </div>
      <div className="delete" onClick={() => handleDelete(item)}>删除</div>
    </div>)
  }

  return <Wrapper>
    <div className="row">
      <div className="label">书籍封面：</div>
      <div className="content">
        <CoverPreview data={baseParams.cover} onChange={handleCoverChange} />
      </div>
    </div>
    <div className="row">
      <div className="label">*书籍名称：</div>
      <div className="content">
        <TextArea
          autosize
          value={baseParams.bookName}
          onChange={(e: any) => editPageModel.setBaseParams({ ...baseParams, bookName: e.target.value })} />
      </div>
    </div>
    <div className="row">
      <div className="label">书籍介绍：</div>
      <div className="content">
        <TextArea autosize={{ minRows: 3 }} value={baseParams.bookBrief} onChange={(e: any) => editPageModel.setBaseParams({ ...baseParams, bookBrief: e.target.value })} />
      </div>
    </div>
    <div className="row">
      <div className="label">书籍上传：</div>
      <div className="content">
        <PagesUploader />
      </div>
    </div>
    <div className="row">
      <div className="label"></div>
      <div className="content">
        <div className="tips">(请将书籍每一页拆分好，并设置文件名称为页码数字，文件目前只支持pdf和图片格式)</div>
      </div>
    </div>
    <div className="file-list">
      {FileList()}
    </div>
  </Wrapper>
})


const easeIn = keyframes`
  from {left:20px;top:5px;}
  to {left:0;top:0;}
`

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
  .file-list{
    padding: 0 10px;
    .file-item{
      float: left;
      border: 1px solid #1890ff;
      border-radius: 5px;
      width: 280px;
      background: rgba(0,0,255,0.02);
      overflow: hidden;
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;
      animation: ${easeIn} .3s;
      .file-icon{
        width: 60px;
        height: 60px;
        float: left;
        margin-right: 5px;
        position: relative;
        .icon{
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          width: 50px;
          height: 50px;
          background: #ddd;

          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .file-info{
        overflow: hidden;
        position: relative;
        &>div{
          height: 30px;
          line-height: 30px;
        }
      }
      .file-size{
        margin-right:10px;
        float: left;
        min-width: 50px;
      }
      .book-name{
        float: left;
        display: inline-block;
        width: 175px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .success{
        color: #1db38b;
        position: absolute;
        right: 50%;
        top: 30px;
        transform: translate(50%);
        font-weight: bold;
      }
      .delete{
        position: absolute;
        height: 30px;
        line-height: 30px;
        right: 10px;
        top: 0;
        color: #1890ff;
        cursor: pointer;
        :hover{
          color: red;
          font-weight: bold;
        }
      }
    }
  }
 .tips,.file-size{
  color: #999;
  }
`