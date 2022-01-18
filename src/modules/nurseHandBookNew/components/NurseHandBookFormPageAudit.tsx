//有审核流程（江门妇幼）
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, message, Spin } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite'
import NurseHandBookService from '../services/NurseHandBookService'
import NurseHandBookFormPage from 'src/components/nurseHandBookFormPage/NurseHandBookFormPage'
import AuditProcessDetail from './AuditProcessDetail'
import UploadView from './Upload'
import GroupsAduitModalJM from 'src/global/modal/GroupsAduitModal-jm'
import createModal from 'src/libs/createModal'
import FormPageBody from './FormPageBody'
import { authStore, appStore, scheduleStore } from "src/stores";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const api = new NurseHandBookService();
export interface Props { }
export default observer(function NurseHandBookFormPageAudit(props: any) {
  const [tableHeadContent,setTableHeadContent]:any = useState([])
  const [iframeSrc, setIframeSrc]: any = useState('')
  const [bodyModal, setBodyModal]: any = useState([])
  let [detailData, setDetailData]: any = useState([])
  let [showFixHeader, setShowFixHeader]: any = useState(false)
  const [isPrint, setIsPrint]: any = useState(false)
  const { queryObj } = appStore
  const [data, setData]: any = useState({})
  const [fileList, setFileList]: any = useState([])
  const [fileIdList, setFileIdList]: any = useState([])
  const [complexHeadList, setComplexHeadList]: any = useState([])
  const [complexHeaderContent,setComplexHeaderContent] :any = useState([])
  const [synchronousData, setSynchronousData]: any = useState([])
  const [formContentList, setFormContentList]: any = useState([])
  const [tableTitle, setTableTitle]: any = useState("")
  const [remark, setRemark]: any = useState("")
  const [submitSign, setSubmitSign]: any = useState([])
  const [signList, setSignList]: any = useState([])
  const [computeRow, setComputeRow]: any = useState([])
  const [buttonLoading, setButtonLoading]: any = useState(false)
  const [saveLoading, setSaveLoading]: any = useState(false)
  const [submitLoading, setSubmitLoading]: any = useState(false)
  const [onScroll, setOnScroll]: any = useState(true)
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
        let [tableContent, tableRemark, line, recordName, complexHead, recordDate, tableHead] = res.data.formDataDtoList
        setTableHeadContent(tableHead.formContent)
        let templeContent:any = []
        let lineList:any = []
        if(tableContent.formContent.length){
          tableContent.formContent.map((item:any)=>{
            templeContent.push({tableData:JSON.parse(item.tableData)})
          })
        }
        if(line.formContent.length){
          line.formContent.map((item:any)=>{    
            lineList.push(JSON.parse(item.computeRow))
          })
        }
        setFormContentList(templeContent)
        setComplexHeaderContent(complexHead.formContent)
        setRemark(tableRemark.formContent[0].remark)
        setSignList(recordName.formContent)
        setComputeRow(lineList)
        setSpinning(false)
      })
    }else{
      setComplexHeaderContent([])
    }
  }
  useEffect(() => {
    onload()
  }, [])
  const deepCcreateArr = (arr:any,submitArr:any)=>{
    arr.map((item:any)=>{
      if(item.key){
        item.value = item.name
        submitArr.push(item)
      }
        item.mid && deepCcreateArr(item.mid,submitArr)
        item.bottom && deepCcreateArr(item.bottom,submitArr)
    })
  }
  const beforeSetTableHeadContent = ((arr:any)=>{
    let submitArr:any = []
    deepCcreateArr(arr,submitArr)
    let result = fiterList([submitArr])
    setTableHeadContent(result)
  })
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
  const fiterList = ( oldList: any) => {
    let newList: any = []
    oldList.map((tr: any, trIndex: any) => {
      newList.push({})
      tr.map((td: any, tdIndex: any) => {
        // formContent[trIndex][tdIndex] = JSON.parse(JSON.stringify(td))
        newList[trIndex][td.key] = td.value
      })
    })
    return newList
  }
  const handleSave = () => {
    setSaveLoading(true)
    let tBodyList: any = []
    let computeList: any = []
    bodyModal.map((item:any)=>{
      tBodyList.push({tableData:JSON.stringify(fiterList(item.tableData))}) 
    })
    let cHeaderList:any = fiterList([complexHeadList])
    computeRow.map((item:any)=>{
      computeList.push({computeRow:JSON.stringify(item)}) 
    })
    api.saveDraft(queryObj.type, {
      id: queryObj.id || "",
      fileIds: fileIdList,
      manualType: queryObj.manualType,
      title: tableTitle,
      formDataDtoList: [
        {
          tableType: "tableHead",
          formContent: tableHeadContent,
        },
        {
          tableType: "tableContent",
          formContent: tBodyList,
        },
        {
          tableType: "tableRemark",
          formContent: [{remark:remark}],
        },
        {
          tableType: "line",
          formContent: computeList,
        },
        {
          tableType: "complexHead",
          formContent: cHeaderList,
        },
        {
          tableType: "recordName",
          formContent: submitSign,
        }
      ]
    })
      .then((res) => {
        message.success('保存成功')
        scheduleStore.setIsSave(false)
        appStore.history.goBack()
        setSaveLoading(false)
      })
  }
  const handleSubmit = () => {
    setSubmitLoading(true)
    let tBodyList: any = []
    let computeList: any = []
    bodyModal.map((item:any)=>{
      tBodyList.push({tableData:JSON.stringify(fiterList(item.tableData))}) 
    })
    let cHeaderList:any = fiterList([complexHeadList])
    computeRow.map((item:any)=>{
      computeList.push({computeRow:JSON.stringify(item)}) 
    })
    api.auditJM(queryObj.type, {
      id: queryObj.id || "",
      manualType: queryObj.manualType,
      fileIds: fileIdList,
      title: tableTitle,
      formDataDtoList: [
        {
          tableType:"tableHead",
          formContent:tableHeadContent,
        },
        {
          tableType: "tableContent",
          formContent: tBodyList,
        },
        {
          tableType: "tableRemark",
          formContent: [{remark:remark}],
        },
        {
          tableType: "line",
          formContent: computeList,
        },
        {
          tableType: "complexHead",
          formContent: cHeaderList,
        },
        {
          tableType: "recordName",
          formContent: submitSign,
        }
      ]
    })
      .then((res) => {
        message.success('提交成功')
        scheduleStore.setIsSave(false)
        appStore.history.goBack()
        setSubmitLoading(false)
      })
  }
  const handleAudit = () => {
    groupsAduitModalJM.show({})
  }
  const handleBack = () => {
    if (scheduleStore.getIsSave()) {
      Modal.confirm({
        title: "操作还未保存，确认返回吗？",
        centered: true,
        onOk: () => {
          appStore.history.goBack()
          scheduleStore.setIsSave(false)
        }
      })
    } else {
      appStore.history.goBack()
    }
  }
  const isNone = () => {
    if (queryObj.isAdd) {
      return "新建"
    } else if (queryObj.audit == "1") {
      return "审核"
    } else if (queryObj.audit == "2") {
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
  const handlerScroll = (e: any) => {
    if(onScroll){
      let ch: any = document.getElementById("ch")
      let { top } = ch.getBoundingClientRect()
      if (top < 150) {
        setShowFixHeader(true)
      } else {
        setShowFixHeader(false)
      }
    }
  }
  const onPrint = () => {
    setButtonLoading(true)
    let element = document.getElementById("print-content") // 这个dom元素是要导出的pdf的div容器
    const w = element?.offsetWidth || 0;  // 获得该容器的宽
    const h = element?.offsetHeight || 0;  // 获得该容器的高
    const offsetTop = element?.offsetTop || 0; // 获得该容器到文档顶部的距离  
    const offsetLeft = element?.offsetLeft || 0; // 获得该容器到文档最左的距离
    const canvas = document.createElement("canvas");
    let abs = 0;
    const win_i = document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
    const win_o = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
    if (win_o > win_i) {
      abs = (win_o - win_i) / 2; // 获得滚动条宽度的一半
    }
    canvas.width = w * 2; // 将画布宽&&高放大两倍
    canvas.height = h * 2;
    const context = canvas.getContext('2d');
    context && context.scale(2, 2);
    context && context.translate(-offsetLeft - abs, -offsetTop);
    const iframe: any = document.getElementById("iframe") || document.createElement("iframe")
    setIsPrint(true)
    setTimeout(() => {
      // 这里默认横向没有滚动条的情况，因为offset.left()，有无滚动条的时候存在差值，因此translate的时候，要把这个差值去掉
      html2canvas(element || document.createElement("div"), {
        allowTaint: true,
        scale: 2 // 提升画面质量，但是会增加文件大小
      }).then(canvas => {
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        // 一页pdf显示html页面生成的canvas高度
        const pageHeight = contentWidth / 592.28 * 841.89;
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight;
        // 页面偏移
        let position = 0;
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 595.28;
        const imgHeight = 592.28 / contentWidth * contentHeight;
        const pageDate = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4', true);
        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面的高度（841.89）
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(pageDate, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        } else { // 分页
          while (leftHeight > 0) {
            pdf.addImage(pageDate, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST')
            leftHeight -= pageHeight;
            position -= 841.89;
            // 避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        let src = pdf.output('dataurlstring');
        let arr: any = src.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        let blob = new Blob([u8arr], { type: mime });
        src = window.URL.createObjectURL(blob)
        setIframeSrc(src)
        setButtonLoading(false)
      })
    });

  }
  const toPrint = () => {
    let iframeEl = document.getElementById("iframe") as any
    if (iframeEl && isPrint) {
      iframeEl.contentWindow.print()
      setIsPrint(false)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      toPrint()
    })
  }, [iframeSrc])
  const NurseHandBookFormPageProps = {
    beforeSetTableHeadContent,
    tableHeadContent,
    isPrint,
    setComplexHeadList,
    complexHeadList,
    showFixHeader,
    bodyModal,
    setBodyModal,
    formContent:formContentList,
    complexHeaderContent,
    setTableTitle,
    tableTitle,
    setRemark,
    remark,
    setComputeRow,
    computeRow,
    signList,
    setSubmitSign,
    submitSign, 
    setOnScroll,
    synchronousData,
  }
  return <Wrapper>
    <Spin spinning={spinning}>
      <div className="topCon">
        {!queryObj.fileId && <div className="title">护士长手册&gt;{titleArr[queryObj.type]}&gt;{isNone()}{titleArr[queryObj.type]}</div>}
        {queryObj.fileId && <div className="title">护士长手册&gt;{queryObj.type}&gt;{isNone()}{queryObj.type}</div>}
        {queryObj.isAdd && <div className="name">新建{titleArr[queryObj.type]}</div>}
        {!queryObj.isAdd && <div className="name">{data.title}</div>}
        {!queryObj.isAdd && <div className="message">任务状态:<span className={data.status == "0" ? "active1" : data.status == "1" ? "active" : data.status == "2" ? "active2" : ""}>{data.status == "0" ? "待审核" : data.status == "1" ? "审核通过" : data.status == "2" ? "驳回" : "草稿"}</span></div>}
        <div className="buttonBody">
          {queryObj.isAdd && <Button onClick={handleSave} loading={saveLoading}>保存</Button>}
          {data.status == "0" && <Button onClick={handleUndo} className="red">撤销</Button>}
          {data.status != "1" && !queryObj.audit && <Button className="ml-20" loading={submitLoading} type="primary" onClick={handleSubmit}>提交</Button>}
          {queryObj.audit == "1" && <Button className="ml-20" type="primary" onClick={handleAudit}>审核</Button>}
          <Button className="ml-20" loading={buttonLoading} onClick={onPrint}>打印</Button>
          <Button className="ml-20" onClick={handleBack}>返回</Button>
        </div>
      </div>
      <div className="main">
        <div className="formPage" onScroll={handlerScroll}>
          <NurseHandBookFormPage {...NurseHandBookFormPageProps}></NurseHandBookFormPage>
        </div>
        <div className="rightCon">
          {!queryObj.isAdd && <div className="rightBottom">
            <AuditProcessDetail detailData={detailData}></AuditProcessDetail>
          </div>}
          <div className="rightTop">
            <UploadView
              setEditVisible2={setEditVisible2}
              setFileIdList={setFileIdList}
              setFileList={setFileList}
              fileList={fileList}
              setIdChange={setIdChange}
              setPathChange={setPathChange}
            ></UploadView>
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
    <iframe
      src={iframeSrc}
      id="iframe"
      style={{ display: "none" }}
    ></iframe>
  </Wrapper>
})

const Wrapper = styled.div`
  height: calc(100vh - 50px);
  .ant-spin-nested-loading {
    overflow: hidden;
  }
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
      position: absolute;
      top: 50px;
      right: 50px;
    }
  }
  .main {
    flex: 1;
    padding-top: 100px;
    display: flex;
    justify-content: space-between;
    .formPage {
      flex: 1;
      overflow-x: auto;
      min-height: 85vh; 
      max-height: 85vh; 
    }
    .rightCon {
      min-width: 340px;
      height: 80vh; 
      background-color: #fff;
      margin: 20px 10px;
      border-radius: 10px;
      overflow-y: auto;
      .rightTop {
        min-height: 20%;
      }
      .rightBottom {
        min-height: 60%;
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

