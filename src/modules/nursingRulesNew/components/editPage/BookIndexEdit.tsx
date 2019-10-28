import styled from 'styled-components'
import React, { useState, useEffect, Fragment } from 'react'
import { Button, Row, Col, message as Message } from 'antd'
import { editPageModel } from './../../models/editPageModel'
import { observer } from 'mobx-react-lite'
import { nursingRulesApiService } from './../../api/nursingRulesNewService'
import IndexList from './../IndexList'
export interface Props { }

export default observer(function BookIndexEdit() {
  let fileRef = React.createRef<HTMLInputElement>()
  let { indexParams, baseInfo } = editPageModel;

  const handleUpload = () => {
    if (fileRef.current) fileRef.current.click();
  }

  const handleDownload = () => {
    nursingRulesApiService.getCatalogTemplate().then(res => {
      fileDownload(res, { fileName: '书籍目录上传模板.xlsx' })
    })
  }

  const fileDownload = (res: any, record?: any) => {
    let filename = record.fileName
    let resExtra = res.headers['content-disposition'].split(';');
    for (let i = 0; i < resExtra.length; i++) {
      if (/filename/.test(resExtra[i])) {
        if (resExtra[i].split('=')[1]) filename = decodeURIComponent(resExtra[i].split('=')[1])
      }
    }
    // decodeURIComponent
    // "attachment;filename=????2019-3-18-2019-3-24??.xls"
    // "application/json"
    let blob = new Blob([res.data], {
      type: res.data.type // 'application/vnd.ms-excel;charset=utf-8'
    })
    // console.log('fileDownload', res)
    // if (res.data.type && res.data.type.indexOf('excel') > -1) {
    if (true) {
      let a = document.createElement('a')
      let href = window.URL.createObjectURL(blob) // 创建链接对象
      a.href = href
      a.download = filename // 自定义文件名
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(href)
      document.body.removeChild(a) // 移除a元素
    }
  }

  const handleChange = (e: any) => {
    let files = e.target.files

    if (files.length > 0) {
      editPageModel.setBaseLoading(true)
      nursingRulesApiService.upLoadTaskCataLog({
        taskCode: baseInfo.taskCode,
        cataLog: files[0]
      }).then(res => {
        editPageModel.setBaseLoading(false)

        editPageModel.getIndex(() => {
          Message.success('目录上传成功')
        })

      }, () => editPageModel.setBaseLoading(false))
    }
  }

  return <Wrapper>
    <div className="row">
      <div className="label">目录上传：</div>
      <div className="content">
        <Button onClick={handleUpload}>{indexParams.length > 0 ? '重新上传' : '点击上传'}</Button>
        <span className="tips"> (需要按照目录模板格式，点击此处<span className="template-download" onClick={handleDownload}>下载</span>目录模板)</span>
        <input ref={fileRef} type="file" accept=".xls,.xlsx" onChange={handleChange} />
      </div>
    </div>
    <IndexList indexList={indexParams} />
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
  .tips{
    color: #999;
  }
  .template-download{
    color: blue;
    cursor: pointer;
    text-decoration: underline;
    :hover{
      font-weight: bold;
    }
  }
  input[type="file"]{
    display: none;
  }
`