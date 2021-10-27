import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Upload, Icon, Modal, message, Input} from 'antd'
import { ColumnProps, PaginationConfig } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { appStore, authStore } from 'src/stores'
import NurseHandBookService from '../services/NurseHandBookService'
import BaseTable from 'src/components/BaseTable'
import { fileDownload } from 'src/utils/file/file'
import { DoCon } from 'src/components/BaseTable'
import CKEditorFn from "./CKEditor"
const api = new NurseHandBookService();

export interface Props { }

export default observer(function followUpDetailView(props: any) {
  const { queryObj, history, location } = appStore
  const [pageLoading, setPageLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [total, setTotal]: any = useState(0)
  const [data, setData]: any = useState([])
  const [surveyTitle, setSurveyTitle]: any = useState("")
  const [editVisible, setEditVisible] = useState(false)
  const [previewPaperData, setPreviewPaperData]: any = useState([])
  let header:any = {'App-Token-Nursing':'51e827c9-d80e-40a1-a95a-1edc257596e7','Auth-Token-Nursing':authStore.getAuthToken()}
  const [fileList, setFileList]:any = useState([])
  const [fileIdList, setFileIdList]:any = useState([])
  const [textValue,setTextValue] = useState('')
  const [searchText, setSearchText] = useState('')

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

  const onload = () => {
    let id = queryObj.Id
    // setPageLoading(true)
    // api.surveyShow(id).then((res) => {
    //   setPageLoading(false)
    //   setTotal(res.data.participationNum)
    //   setDataSource(res.data.showDtoList)
    //   setSurveyTitle(res.data.showDtoList[0].surveyTitle)
    //   setData(res.data)
    // })
  }

  useEffect(() => {
    onload()
  }, [])

  const onDetail = (record: any) => {
    // api.getAppPaper(record.fillRecordId)
    // .then((res) => {
    //   setEditVisible(true)
    //   setPreviewPaperData(res.data)
    // }, err => setPageLoading(false))
  }

  const handleSave = () => {
    if (searchText == "") {
      message.error('标题不能为空！')
      return
    }
    api.saveDraft(queryObj.type,{
      id: "",
      content: searchText,
      field_3: textValue,
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
      id: "",
      content: searchText,
      field_3: textValue,
      fileIds: fileIdList,
    })
    .then((res) => {
      message.success('提交成功')
      appStore.history.goBack()

    })
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
  };
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
    <div className="topCon">
      <div className="title">护士长手册&gt;{titleArr[queryObj.type]}&gt;{queryObj.isAdd?"新建":"编辑"}{titleArr[queryObj.type]}</div>
      {queryObj.isAdd && <div className="name">新建{titleArr[queryObj.type]}</div>}
      {!queryObj.isAdd && <div className="name">编辑</div>}
      {!queryObj.isAdd && <div className="message"><span>任务状态:审核通过</span></div>}
      <div className="buttonBody">
      {queryObj.isAdd &&<Button onClick={handleSave}>保存</Button>}
      {!queryObj.isAdd &&<Button onClick={handleSave} className="red">撤销</Button>}
      <Button className="ml-20" type="primary" onClick={handleSubmit}>提交</Button>
      <Button className="ml-20" onClick={() => appStore.history.goBack()}>返回</Button>
      </div>
    </div>
    <div className="mainCon">
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
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
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
      display: flex;
      justify-content: space-between;
    }
    .buttonBody {
      width: 240px;
      position: absolute;
      top: 50px;
      right: 30px;
    }
  }
  .mainCon{
    margin: 0 auto;
    width: 80%;
    /* background-color: #fff; */
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
  .ant-upload-list{
    width: 50%;
    margin-top: 30px;
    margin-left: 120px;
  }
`

