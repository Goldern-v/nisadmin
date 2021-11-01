import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Upload, Icon, Modal, message, Input, Spin} from 'antd'
import { ColumnProps, PaginationConfig } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { appStore, authStore } from 'src/stores'
import NurseHandBookService from '../services/NurseHandBookService'
import BaseTable from 'src/components/BaseTable'
import { fileDownload } from 'src/utils/file/file'
import { DoCon } from 'src/components/BaseTable'
import AuditProcessDetail from './AuditProcessDetail'
import GroupsAduitModalJM from 'src/global/modal/GroupsAduitModal-jm'
import createModal from 'src/libs/createModal'
import CKEditorFn from "./CKEditor"
const api = new NurseHandBookService();

export interface Props { }

export default observer(function followUpDetailView(props: any) {
  let [detailData, setDetailData]: any = useState([])
  const { queryObj } = appStore
  const [data, setData]: any = useState({})
  let header:any = {'App-Token-Nursing':'51e827c9-d80e-40a1-a95a-1edc257596e7','Auth-Token-Nursing':authStore.getAuthToken()}
  const [fileList, setFileList]:any = useState([])
  const [fileIdList, setFileIdList]:any = useState([])
  const [textValue,setTextValue] = useState('')
  const [searchText, setSearchText] = useState('')
  const path = window.location.hash.split('/').reverse()[0]
  const titleArr:any = {
    year: '护士长年计划',  
    month: '护士长月计划',
    conclusion: '护士长年总结',
    innovation: '护理创新项目记录',
    businessStudy: '业务学习项目',
    meetingRecord: '管理小组会议记录',
    holidayRecord: '公休会记录',
    weekPlan: '护士长周计划',
    monthPlan: '护士长月度计划',
    quarterPlan: '护士长季度计划',
    yearPlan: '护士长年度计划',
    weekConclusion: '护士长周总结',
    monthConclusion: '护士长月度总结',
    quarterConclusion: '护士长季度总结',
    yearConclusion: '护士长年度总结',
  }
  const groupsAduitModalJM = createModal(GroupsAduitModalJM)
  const [spinning, setSpinning] = useState(false)
  const onload = () => {
    if(!queryObj.isAdd){
      setSpinning(true)
      api.getByIdAudited(queryObj.id).then((res) => {
        setData(res.data)
        setSearchText(res.data.title)
        setTextValue(res.data.content)
        setDetailData(res.data.flowList)
        res.data.files?.forEach((item:any) => {
          item.uid = item.id
        })
        setFileList(res.data.files)
        setSpinning(false)
      })
    }
  }
  
  useEffect(() => {
    onload()
  }, [])

  const handleUndo = (record: any) => {
    let undoTitle = ""
    if(path == "weekConclusion" || path == "monthConclusion" || path == "quarterConclusion" || path == "yearConclusion"){
      undoTitle = '确认撤销该总结吗？'
    }else{
      undoTitle = '确认撤销该计划吗？'
    }
    Modal.confirm({
      title: undoTitle,
      centered: true,
      onOk: () => {
        api
          .undo({id:queryObj.id,status:data.status})
          .then(res => {
            message.success('撤销成功')
            appStore.history.goBack()
          },)
      }
    })
  }

  const handleSave = () => {
    if (searchText == "") {
      message.error('标题不能为空！')
      return
    }
    api.saveDraft(queryObj.type,{
      id: queryObj.id || "",
      title: searchText,
      content: textValue,
      fileIds: fileIdList,
    })
    .then((res) => {
      message.success('保存成功')
      appStore.history.goBack()
    })
  }

  const handleSubmit = () => {
    if (searchText == "") {
      message.error('标题不能为空！')
      return
    }
    api.auditJM(queryObj.type,{
      id: queryObj.id || "",
      title: searchText,
      content: textValue,
      fileIds: fileIdList,
    })
    .then((res) => {
      message.success('提交成功')
      appStore.history.goBack()
    })
  }
  
  const handleAudit = () => {
    groupsAduitModalJM.show({})
  }

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

  const isNone = () => {
    if(queryObj.isAdd){
      return "新建"
    }else if(queryObj.audit){
      return "审核"
    }else if(data.status=="1"){
      return "查看"
    }else{
      return "编辑"
    }
  }

  const removeOnChange = (info:any) => {
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

  return <Wrapper>
    <Spin spinning={spinning}>
      <div className="topCon">
        <div className="title">护士长手册&gt;{titleArr[queryObj.type]}&gt;{isNone()}{titleArr[queryObj.type]}</div>
        {queryObj.isAdd && <div className="name">新建{titleArr[queryObj.type]}</div>}
        {!queryObj.isAdd && <div className="name">{data.title}</div>}
        {!queryObj.isAdd && <div className="message">任务状态:<span className={data.status == "0" ? "active1" : data.status == "1" ? "active" : data.status == "2" ? "active2" : ""}>{data.status == "0" ? "待审核" : data.status == "1" ? "审核通过" : data.status == "2" ? "驳回" : "草稿" }</span></div>}
        <div className="buttonBody">
        {queryObj.isAdd &&<Button onClick={handleSave}>保存</Button>}
        {!queryObj.isAdd && data.status == "2" &&<Button onClick={handleUndo} className="red">撤销</Button>}
        {data.status != "1" && !queryObj.audit &&<Button className="ml-20" type="primary" onClick={handleSubmit}>提交</Button>}
        {queryObj.audit &&<Button className="ml-20" type="primary" onClick={handleAudit}>审核</Button>}
        <Button className="ml-20" onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </div>
      <div className="mainCon">
        {data.status == "1"&&<div className="noEditor"></div>}
        <div className="leftCon">
          <div className="titleName">
            <h2>总结名称：</h2>
            <Input
              style={{ width: 600 }}
              value={searchText}
              onChange={(e)=>setSearchText(e.target.value)}
            />
          </div>
          <div className="Editor">
            {CKEditorFn({textValue,setTextValue})}
          </div>
          <div className="footer">
            <div className="upload">
              <h2>上传附件：</h2>
              <Upload 
                {...props} 
                action="/crNursing/api/nurseManualJM/attachment/nurseManual" 
                accept={".doc,.docx,.pdf,.ppt,.pptx,.xls,.xlsx,.jpg,.png"} 
                headers={header} 
                fileList={fileList} 
                onChange={uploadOnChange}
                onRemove={removeOnChange}
                multiple={true}
                >
                <Button type="primary" className="button">
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
              <div className="accept">支持格式：*.jpg;*.png;*.pdf;*.doc;*.docx;*.ppt;*.pptx;*.xls;*.xlsx;</div>
            </div>
          </div>
        </div>
        {!queryObj.isAdd && <div className="rightCon">
          <AuditProcessDetail detailData={detailData}></AuditProcessDetail>
        </div>}
      </div>
    </Spin>
    <groupsAduitModalJM.Component/>
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
  .noEditor{
    width: 56%;
    height: 100%;
    position: fixed;
    z-index: 999;
  }
  .mainCon{
    padding-top: 100px;
    margin: 0 auto;
    width: 75%;
    display: flex;
    /* background-color: #fff; */
    .leftCon{
      flex: 1;
      .titleName{
      width: 100%;
      height: 50px;
      margin-top: 10px;
      border-radius: 10px;
      background-color: #fff;
      display: flex;
      align-items: center;
      h2{
        margin: 0 0;
        line-height: 50px;
        margin-left: 30px;
      }
    }
    .Editor{
      width: 100%;
      background-color: #fff;
      margin-top: 10px;
      padding: 20px 30px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .upload{
      width: 100%;
      height: 220px;
      background-color: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      position: relative;
      h2{
        position: absolute;
        top: 10px;
        left: 30px;
        height: 32px;
        margin: 0 0;
      }
      .button{
        position: absolute;
        top: 10px;
        left: 120px;
      }
      .accept {
        position: absolute;
        top: 20px;
        left: 190px;
        margin-left: 20px;
      }
    }
    .footer{
      padding-bottom: 20px;
    }
    }
    .rightCon{
      width: 20%;
      background-color: #fff;
      margin-left: 10px;
      margin-top: 10px;
      margin-bottom: 20px;
      border-radius: 10px;
    }
    
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

