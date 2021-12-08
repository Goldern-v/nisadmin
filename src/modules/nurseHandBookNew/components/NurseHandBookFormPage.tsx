import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Upload, Icon, Modal, message, Input, Spin } from 'antd'
import { ColumnProps, PaginationConfig } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { appStore, authStore } from 'src/stores'
import NurseHandBookService from '../services/NurseHandBookService'
import BaseTable from 'src/components/BaseTable'
import NurseHandBookFormPage from 'src/components/nurseHandBookFormPage/NurseHandBookFormPage'
import { fileDownload } from 'src/utils/file/file'
import { DoCon } from 'src/components/BaseTable'
import AuditProcessDetail from './AuditProcessDetail'
import UploadView from './Upload'
import GroupsAduitModalJM from 'src/global/modal/GroupsAduitModal-jm'
import createModal from 'src/libs/createModal'
import CKEditorFn from "./CKEditor"
import FormPageBody from './FormPageBody'

const api = new NurseHandBookService();

export interface Props { }

export default observer(function nurseHandBookFormPage(props: any) {
  const [bodyModal, setBodyModal]: any = useState([])
  let [detailData, setDetailData]: any = useState([])
  let [showFixHeader, setShowFixHeader]: any = useState(false)
  const { queryObj } = appStore
  const [data, setData]: any = useState({})
  let header: any = { 'App-Token-Nursing': '51e827c9-d80e-40a1-a95a-1edc257596e7', 'Auth-Token-Nursing': authStore.getAuthToken() }
  const [fileList, setFileList]: any = useState([])
  const [fileIdList, setFileIdList]: any = useState([])
  const [formContentList, setFormContentList]: any = useState([])
  const [tableTitle, setTableTitle]: any = useState("")
  const [textValue, setTextValue] = useState('')
  const path = window.location.hash.split('/').reverse()[0]
  const titleArr: any = {
    planJM: '护士长工作计划',
    conclusionJM: '护士长工作总结',
  }
  const [editVisible2, setEditVisible2] = useState(false)
  const [pathChange, setPathChange] = useState("")
  const [idChange, setIdChange] = useState("")
  const groupsAduitModalJM = createModal(GroupsAduitModalJM)
  const [spinning, setSpinning] = useState(false)
  const onload = () => {
    if (!queryObj.isAdd) {
      setSpinning(true)
      api.getByIdAudited(queryObj.id).then((res) => {
        setData(res.data)
        setDetailData(res.data.flowList)
        res.data.files?.forEach((item: any) => {
          item.uid = item.id
        })
        setTableTitle(res.data.title)
        setFileList(res.data.files)
        setFormContentList(res.data.formContent)
        setSpinning(false)
      })
    }
  }

  useEffect(() => {
    onload()
  }, [])

  const handleUndo = (record: any) => {
    let undoTitle = ""
    if (path == "weekConclusion" || path == "monthConclusion" || path == "quarterConclusion" || path == "yearConclusion") {
      undoTitle = '确认撤销该总结吗？'
    } else {
      undoTitle = '确认撤销该计划吗？'
    }
    Modal.confirm({
      title: undoTitle,
      centered: true,
      onOk: () => {
        api
          .undo({ id: queryObj.id, status: data.status })
          .then(res => {
            message.success('撤销成功')
            appStore.history.goBack()
          })
      }
    })
  }
  const changeValue = (e: any, key: any) => {
    console.log(e, key);

  }
  const handleSave = () => {
    let formContent: any = []
    bodyModal.map((tr: any, trIndex: any) => {
      formContent.push({})
      tr.map((td: any, tdIndex: any) => {
        // formContent[trIndex][tdIndex] = JSON.parse(JSON.stringify(td))
        formContent[trIndex][td.key] = td.value
      })
    })
    api.saveDraft(queryObj.type, {
      id: queryObj.id || "",
      fileIds: fileIdList,
      manualType: queryObj.manualType,
      title: tableTitle,
      formContent,
    })
      .then((res) => {
        message.success('保存成功')
        appStore.history.goBack()
      })
  }

  const handleSubmit = () => {
    api.auditJM(queryObj.type, {
      id: queryObj.id || "",
      manualType: queryObj.manualType,
      fileIds: fileIdList,
      title: tableTitle,
    })
      .then((res) => {
        message.success('提交成功')
        appStore.history.goBack()
      })
  }

  const handleAudit = () => {
    groupsAduitModalJM.show({})
  }

  const uploadOnChange = (info: any) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-5);
    fileList = fileList.map(file => {
      if (file.response) {
        file.id = file?.response?.data[0];
      }
      return file;
    });
    setFileList(fileList);
    let idList = fileList?.map((item: any) => {
      return item.id
    })
    setFileIdList(idList)
  }

  const isNone = () => {
    if (queryObj.isAdd) {
      return "新建"
    } else if (queryObj.audit) {
      return "审核"
    } else if (data.status == "1") {
      return "查看"
    } else {
      return "编辑"
    }
  }

  const removeOnChange = (info: any) => {
    let pro = new Promise((resolve, reject) => {
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
        onCancel: () => {
          resolve(false)
        }
      })
    })
    return pro.then(res => res)
  }
  const PreviewOnChange = (info: any) => {
    setEditVisible2(true)
    let str: any = info.path;
    let pdfStr: any = info.pdfPath;
    let index = str.lastIndexOf("\.");
    let type = str.substr(index + 1, str.length);
    let start = str.indexOf("/crNursing/")
    if (type == 'jpg' || type == 'png' || type == 'pdf') {
      let path = str.substring(start, start + info.path.length)
      setPathChange(path)
    } else {
      let pdfPath = pdfStr.substring(start, start + pdfStr.length)
      setPathChange(pdfPath)
    }
    setIdChange(info.id)
  }
  const handlerScroll = (e: any) => {
    let ch: any = document.getElementById("ch")
    let { top } = ch.getBoundingClientRect()
    if (top < 150) {
      setShowFixHeader(true)
    } else {
      setShowFixHeader(false)
    }

  }
  return <Wrapper>
    <Spin spinning={spinning}>
      <div className="topCon">
        <div className="title">护士长手册&gt;{titleArr[queryObj.type]}&gt;{isNone()}{titleArr[queryObj.type]}</div>
        {queryObj.isAdd && <div className="name">新建{titleArr[queryObj.type]}</div>}
        {!queryObj.isAdd && <div className="name">{data.title}</div>}
        {!queryObj.isAdd && <div className="message">任务状态:<span className={data.status == "0" ? "active1" : data.status == "1" ? "active" : data.status == "2" ? "active2" : ""}>{data.status == "0" ? "待审核" : data.status == "1" ? "审核通过" : data.status == "2" ? "驳回" : "草稿"}</span></div>}
        <div className="buttonBody">
          {queryObj.isAdd && <Button onClick={handleSave}>保存</Button>}
          {!queryObj.isAdd && data.status == "2" && <Button onClick={handleUndo} className="red">撤销</Button>}
          {data.status != "1" && !queryObj.audit && <Button className="ml-20" type="primary" onClick={handleSubmit}>提交</Button>}
          {queryObj.audit && <Button className="ml-20" type="primary" onClick={handleAudit}>审核</Button>}
          <Button className="ml-20" onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </div>
      <div className="main">
        <div className="formPage" onScroll={handlerScroll}>
          <NurseHandBookFormPage
            showFixHeader={showFixHeader}
            bodyModal={bodyModal}
            setBodyModal={setBodyModal}
            formContent={formContentList}
            setTableTitle={setTableTitle}
            tableTitle={tableTitle}
          ></NurseHandBookFormPage>
        </div>
        <div className="rightCon">
          {!queryObj.isAdd && <div className="rightTop">
            <AuditProcessDetail detailData={detailData}></AuditProcessDetail>
          </div>}
          <div className="rightBottom">
            <UploadView></UploadView>
          </div>
        </div>
      </div>
    </Spin>
    <groupsAduitModalJM.Component />
    <FormPageBody
      visible={editVisible2}
      path={pathChange}
      id={idChange}
      onOk={() => { }}
      onCancel={() => setEditVisible2(false)} />
  </Wrapper>
})

const Wrapper = styled.div`
  height: calc(100vh - 50px);
  .ml-20{
    margin-left: 20px;
  }
  .active{
    color: #09a9f0;
  }
  .active1{
    color: #f6ac4b;
  }
  .red{
    color: red;
  }
  .topCon{
    width: 100%;
    height: 100px;
    background-color: #fff;
    padding-left: 30px;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    z-index:9;
    .title{
      color: #666666;
    }
    .name{
      font-size: 22px;
      font-weight: 600;
    }
    .message {
      width: 200px;
      padding-right: 10px;
      
    }
    .buttonBody {
      width: 240px;
      position: absolute;
      top: 50px;
      right: 30px;
    }
  }
  .main {
    flex: 1;
    padding-top: 100px;
    display: flex;
    justify-content: space-between;
    .formPage {
      min-width: 81vw;
      max-width: 81vw;
      overflow-x: auto;
      min-height: 85vh; 
      max-height: 85vh; 
    }
    .rightCon {
      width: 19vw;
      min-height: 82vh; 
      background-color: #fff;
      margin: 20px 10px;
      border-radius: 10px;
      .rightTop {
        min-height: 50%;
      }
      .rightBottom {
        min-height: 50%;
      }
    }
    
  }
  
  .noEditor {
    width: 56%;
    height: 100%;
    position: fixed;
    z-index: 999;
  }
  
  .ant-upload-list{
    width: 50%;
    margin-top: 30px;
    margin-left: 120px;
  }
  .active{
    color: #09a9f0;
  }
  .active1{
    color: #f6ac4b;
  }
  .active2{
    color: red;
  }
`

