import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

import { BaseStepCon, BaseStepBoxImg } from 'src/components/BaseStep'
import { getWeekString } from 'src/utils/date/week'
import { Button, Upload, Icon, Modal, message, Input, Spin} from 'antd'
import { appStore, authStore } from 'src/stores'
import NurseHandBookService from '../services/NurseHandBookService'

const api = new NurseHandBookService();

interface Props {
  setEditVisible2: Function
  setFileIdList: Function
  setFileList: Function
  fileList: any
  setIdChange: Function
  setPathChange: Function
}
export default function auditProcessDetail(props: Props) {
  const { setEditVisible2, setFileIdList, setFileList, fileList, setIdChange, setPathChange } = props
  let header:any = {'App-Token-Nursing':'51e827c9-d80e-40a1-a95a-1edc257596e7','Auth-Token-Nursing':authStore.getAuthToken()}

  const uploadOnChange = (info:any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-5);
    fileList = fileList.map(file => {
      if (file.response) {
        file.id = file?.response?.data[0];
      }
      return file;
    });
    setFileList(fileList);
    let idList = fileList?.map((item:any) => {
      return item.id
    })
    setFileIdList(idList)
  }

  const removeOnChange:any = (info:any) => {
    let pro = new Promise((resolve,reject)=>{
      Modal.confirm({
        title: '确认删除该附件？',
        centered: true,
        onOk: () => {
          api
          .deleteAttachmentJM(info.id).then((res) => {
            resolve(true)
            message.success('删除成功')
          })
        },
        onCancel:()=>{
          resolve(false)
        }
      })
    })
    return pro.then(res=>res)
  }

  const PreviewOnChange = (info:any) => {
    setEditVisible2(true)
    let str:any = info.path;
    let pdfStr:any = info.pdfPath;
    let index = str.lastIndexOf("\.");
    let type = str.substr(index+1,str.length);
    let start = str.indexOf("/crNursing/")
    if(type=='jpg'||type=='png'||type=='pdf'){
      let path = str.substring(start,start+info.path.length)
      setPathChange(path)
    }else{
      let pdfPath = pdfStr.substring(start,start+pdfStr.length)
      setPathChange(pdfPath)
    }
    setIdChange(info.id)
  }

  return (
    <Con>
      <TopTitleCon>
        <div className='topTitleIcon' />
        <div className='topTitle'>上传附件</div>
      </TopTitleCon>
      <div className='upload'>
        <Upload 
          {...props} 
          action="/crNursing/api/nurseManualJM/attachment/nurseManual" 
          accept={".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx,.jpg,.png"} 
          headers={header} 
          fileList={fileList} 
          onChange={uploadOnChange}
          onRemove={removeOnChange}
          onPreview={PreviewOnChange}
          multiple={true}
          >
          <Button type="primary" className="button">
            <Icon type="upload" />上传
          </Button>
        </Upload>
        <div className="accept">支持格式：*.jpg;*.png;*.pdf;*.doc;*.docx;*.ppt;*.pptx;*.xls;*.xlsx;</div>
      </div>
    </Con>
  )
}

const Con = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 20px;

  .ant-steps-item-icon {
    margin-right: 8px;
  }
  .ant-steps-item-title {
    font-size: 14px;
    font-weight: bold;
  }
  .ant-steps-item-description {
    font-size: 13px;
    font-weight: 400;
    color: rgba(104, 113, 121, 1);
  }
  .upload{
      width: 100%;
      height: 220px;
      background-color: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      position: relative;
      h2 {
        position: absolute;
        top: 10px;
        left: 30px;
        height: 32px;
        margin: 0 0;
      }
      .button{
        position: absolute;
        top: 10px;
        left: 10px;
      }
      .accept {
        position: absolute;
        top: -20px;
        left: 100px;
        width: 195px;
        word-break: break-all;
      }
      .ant-upload-list-item-name{
        color: #03A613;
      }
      .ant-upload-list.ant-upload-list-text {
        position: absolute;
        top: 20px;
        left: -120px;
        width: 300px;
      }
    }
`
const TopTitleCon = styled.div`
  margin-bottom: 16px;
  .topTitleIcon {
    margin-left: -5px;
    display: inline-block;
    width: 6px;
    height: 12px;
    background: rgba(75, 176, 141, 1);
  }
  .topTitle {
    margin-left: 10px;
    display: inline-block;
    font-size: 16px;
    color: #333333;
  }
`

