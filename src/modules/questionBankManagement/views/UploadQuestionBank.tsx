import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Spin, message as Message } from 'src/vendors/antd'
import NavCon from './../components/common/NavCon'

import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { questionBankManageService } from './../api/QuestionBankManageService'
// import qs from 'qs';

export default observer(function QuestionBankManagement() {
  let { location, history } = appStore;
  let fileRef = React.createRef<any>();
  let [loading, setLoading] = useState(false);

  const handleUploadBtn = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  const handleFileChange = (e: any) => {
    let files = e.target.files;
    if (files.length > 0) {
      let form = new FormData()
      form.set('file', files[0])

      setLoading(true)
      questionBankManageService.uploadQuestionBank(form).then(res => {
        Message.success('题库上传成功')
        setLoading(false)
      }, err => {
        setLoading(false)
      })
    }
  }

  const handleDownload = () => {
    questionBankManageService.getUploadQuestionBankTemplate().then(res => {
      fileDownload(res, { fileName: '题库上传模板' })
    })
  }

  const fileDownload = (res: any, record?: any) => {
    let filename = record.fileName;
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

  const FileInput = () => {
    if (!loading) return <input type="file" style={{ display: 'none' }} ref={fileRef} onChange={handleFileChange} accept=".xls" />

    return <span style={{ display: 'none' }}></span>
  }

  return (
    <Wrapper>
      <div className="header">
        <NavCon className="nav">
          <Link to="/continuingEdu">培训考试</Link>
          <span> > </span>
          <Link to="/continuingEdu/questionBankManagement">题库管理</Link>
          <span> > </span>
          <span>导入题库</span>
        </NavCon>
        <div className="topbar">
          <div className="left">
            <div className="title">导入题库</div>
          </div>
          <div className="right">
            <Button className="item" onClick={handleDownload} type="primary">模板下载</Button>
            <Button className="item" onClick={() => history.goBack()}>返回</Button>
          </div>
        </div>
      </div>
      <div className="main-contain">
        <div className="upload-box">
          <div className="upload-btn" onClick={handleUploadBtn}>立刻上传</div>
          <div className="desc">
            <span>说明：</span>
            <span className="desc-content">
              <span>1. 上传前请下载模版，按照模版要求将内容填完后，再点击上方按钮进行导入。</span>
              <br />
              <span>2. 请设置文件格式：题库名.xls，需要注意的是题库名也将作为快速筛选项目，以请设置有含义的文件名称。</span>
            </span>
          </div>
        </div>
        {FileInput()}
        {/* 载入遮罩层 */}
        <div className="loading-mask" style={{ display: loading ? 'block' : 'none' }}>
          <Spin />
        </div>
      </div>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 80px;
  .header{
    padding: 10px 15px;
    overflow: hidden;
    margin-top: -80px;
    border-bottom: 1px solid #ddd;
    background: #fff;
    .nav{
      margin-bottom: 5px;
      color: #888;
      .nav-item{
        color: #666;
        cursor: pointer;
        :hover{
          color: #333;
        }
      }
    }
    .topbar{
      &>div{
        display: inline-block;
      }
      .left{
        float:left;
        .title{
          font-size: 22px;
          font-weight: bold;
        }
      }
      .right{
        float:right;
        .item{
          margin-left: 5px;
        }
      }
    }
  }
  
  .main-contain{
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;

    .upload-box{
      width: 700px;
      height: 250px;
      padding: 0 60px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 5px;
      border: 2px dashed #ccc;

      .upload-btn{
        width: 200px;
        height: 60px;
        line-height: 60px;
        margin: 10px auto;
        background: rgba(255,102,153,1);
        color: #fff;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
        margin-top: 40px;
        transition: background .2s;
        :hover{
          background: rgba(255,102,153,0.6);
        }
        :active{
          background: rgba(255,102,153,1);
        }
      }

      .desc{
        cursor: default;
        margin-top: 40px;
        display: flex;
        &>span{
          display:block;
          &.desc-content{
            flex: 1;
          }
        }
      }
    }
  }
  .loading-mask{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(255,255,255,0.6);
    .ant-spin{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
`
