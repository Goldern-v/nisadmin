//无审核流程（聊城二院）
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, message, Spin } from 'antd'
import { observer } from 'src/vendors/mobx-react-lite'
import NurseHandBookService from '../services/NurseHandBookService'
import NurseHandBookFormPage from 'src/components/nurseHandBookFormPage/NurseHandBookFormPage'
import UploadView from './Upload'
import GroupsAduitModalJM from 'src/global/modal/GroupsAduitModal-jm'
import createModal from 'src/libs/createModal'
import FormPageBody from './FormPageBody'
import { authStore, appStore, scheduleStore } from "src/stores";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment'
import { DatePicker } from 'antd';
import {useRef} from "src/types/react";
import printFn from "printing";
import printing from "printing";
const api = new NurseHandBookService();
export interface Props { }
export default observer(function nurseHandBookFormPage(props: any) {
  const { MonthPicker } = DatePicker;
  const refPrint: any = useRef<HTMLElement>();
  const [tableHeadContent,setTableHeadContent]:any = useState([])
  const [iframeSrc, setIframeSrc]: any = useState('')
  const [bodyModal, setBodyModal]: any = useState([])
  const [detailData, setDetailData]: any = useState([])
  const [showFixHeader, setShowFixHeader]: any = useState(false)
  const [isPrint, setIsPrint]: any = useState(false)
  const { queryObj } = appStore
  const [data, setData]: any = useState({})
  const [fileList, setFileList]: any = useState([])
  const [fileIdList, setFileIdList]: any = useState([])
  const [complexHeadList, setComplexHeadList]: any = useState([])
  const [complexHeaderContent,setComplexHeaderContent] :any = useState([])
  const [formContentList, setFormContentList]: any = useState([])
  const [synchronousData, setSynchronousData]: any = useState([])
  const [tableTitle, setTableTitle]: any = useState("")
  const [remark, setRemark]: any = useState("")
  const [submitSign, setSubmitSign]: any = useState([])
  const [signList, setSignList]: any = useState([])
  const [computeRow, setComputeRow]: any = useState([])
  const [buttonLoading, setButtonLoading]: any = useState(false)
  const [saveLoading, setSaveLoading]: any = useState(false)
  const [onScroll, setOnScroll]: any = useState(true)
  const [typeList, setTypeList] = useState([])
  const [date, setDate]: any = useState(moment(new Date))

  const titleArr: any = {
    lcBaseInfo: '护士基本情况',
    lcAttendance: '护士考勤记录',
    lcPlan: '护理工作计划',
    lcConclusion: '护理工作总结',
    lcEducation: '继续教育及科研',
    lcWard: '病区工作',
  }
  //不需要保存的表单
  const noSaveList: any = ['lc_consultationDj']
  const [editVisible2, setEditVisible2] = useState(false)
  const [pathChange, setPathChange] = useState("")
  const [idChange, setIdChange] = useState("")
  const groupsAduitModalJM = createModal(GroupsAduitModalJM)
  const [spinning, setSpinning] = useState(false)

  const onload = () => {
    if (!queryObj.isAdd) {
      setSpinning(true)
      api.getById(queryObj.id).then((res) => {
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
  const getTypeList = () => {
    api
      .getChildCodeList(queryObj.type)
      .then((res) => {
        setTypeList(res.data)
      })
  }
  useEffect(() => {
    onload()
    getTypeList()
    setDate(moment())
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
    api.saveOrUpdate(queryObj.type, {
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
    if(noSaveList.includes(queryObj.manualType)){
      return "查询"
    }
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

  const manualType = () => {
    let obj:any = typeList.find((item:any) => {
      return item.code == queryObj.manualType
    })
    if(obj){
      return obj.name
    }
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
  // const onPrint = () => {
  //   setButtonLoading(true)
  //   let element = document.getElementById("print-content") // 这个dom元素是要导出的pdf的div容器
  //   const w = element?.offsetWidth || 0;  // 获得该容器的宽
  //   const h = element?.offsetHeight || 0;  // 获得该容器的高
  //   const offsetTop = element?.offsetTop || 0; // 获得该容器到文档顶部的距离
  //   const offsetLeft = element?.offsetLeft || 0; // 获得该容器到文档最左的距离
  //   const canvas = document.createElement("canvas");
  //   let abs = 0;
  //   const win_i = document.body.clientWidth; // 获得当前可视窗口的宽度（不包含滚动条）
  //   const win_o = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
  //   if (win_o > win_i) {
  //     abs = (win_o - win_i) / 2; // 获得滚动条宽度的一半
  //   }
  //   canvas.width = w * 2; // 将画布宽&&高放大两倍
  //   canvas.height = h * 2;
  //   const context = canvas.getContext('2d');
  //   context && context.scale(2, 2);
  //   context && context.translate(-offsetLeft - abs, -offsetTop);
  //   const iframe: any = document.getElementById("iframe") || document.createElement("iframe")
  //   setIsPrint(true)
  //   setTimeout(() => {
  //     // 这里默认横向没有滚动条的情况，因为offset.left()，有无滚动条的时候存在差值，因此translate的时候，要把这个差值去掉
  //     html2canvas(element || document.createElement("div"), {
  //       allowTaint: true,
  //       scale: 2 // 提升画面质量，但是会增加文件大小
  //     }).then(canvas => {
  //        try{
  //          const contentWidth = canvas.width;
  //          const contentHeight = canvas.height;
  //          // 一页pdf显示html页面生成的canvas高度
  //          const pageHeight = contentWidth / 592.28 * 841.89;
  //          // 未生成pdf的html页面高度
  //          let leftHeight = contentHeight;
  //          // 页面偏移
  //          let position = 0;
  //          // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
  //          const imgWidth = 595.28;
  //          const imgHeight = 592.28 / contentWidth * contentHeight;
  //
  //          const pageDate = canvas.toDataURL('image/png');
  //
  //          const pdf = new jsPDF('p', 'pt', 'a4', true);
  //          // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面的高度（841.89）
  //          // 当内容未超过pdf一页显示的范围，无需分页
  //          if (leftHeight < pageHeight) {
  //            pdf.addImage(pageDate, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
  //          } else { // 分页
  //            while (leftHeight > 0) {
  //              pdf.addImage(pageDate, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST')
  //              leftHeight -= pageHeight;
  //              position -= 841.89;
  //              // 避免添加空白页
  //              if (leftHeight > 0) {
  //                pdf.addPage()
  //              }
  //            }
  //          }
  //          console.log(pdf);
  //          let src = pdf.output('dataurlstring');
  //          let arr: any = src.split(',');
  //          let mime = arr[0].match(/:(.*?);/)[1];
  //          let bstr = atob(arr[1]);
  //          let n = bstr.length;
  //          let u8arr = new Uint8Array(n);
  //          while (n--) {
  //            u8arr[n] = bstr.charCodeAt(n);
  //          }
  //          let blob = new Blob([u8arr], { type: mime });
  //          src = window.URL.createObjectURL(blob)
  //          console.log('blob===',blob,src);
  //          setIframeSrc(src)
  //          setButtonLoading(false)
  //        }catch (e){
  //          console.log('e',e)
  //        }
  //     })
  //   },1000);
  //
  // }
  const defaultPrintCss = `
    @page{
      margin:0mm;
      color:red
    }
    #print-page{
      padding:20px;
      transform: scaleX(1) scaleY(0.8);
    }
  `
  /*lcBaseInfo基本信息  lcAttendance考勤记录 lcPlan护理工作计划 lcConclusion护理工作总结 lcEducation继续教育与科研 lcWard病区工作*/
   const newOnPrint =()=>{
     const horizontal =['lcBaseInfo','lcAttendance'].includes(queryObj.type)
     /*默认horizontal 聊城二院的基础信息跟考勤信息外的需要另外处理*/
     if(appStore.HOSPITAL_ID==='lcey'){
     return  printing(refPrint.current, {
         direction:horizontal ? "horizontal":"vertical",
         injectGlobalCss: true,
         scanStyles: true,
         css: defaultPrintCss
       });
     }else{
       printing(refPrint.current, {
         direction: "horizontal",
         injectGlobalCss: true,
         scanStyles: true,
         css: defaultPrintCss
       });
     }
  }
  /*旧版打印不生效，原因不明*/
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

  useEffect(() => {
    if (!noSaveList.includes(queryObj.manualType)) return
    let year = date.format('YYYY')
    let month = date.format('MM')
    api.getListToManual({month:month,year:year}).then((res) => {
      let templeContent:any = []
      templeContent.push({tableData:res.data})
      setSynchronousData(templeContent)
    })
  }, [date])

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
    date,
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
         <div className="title">护士长手册&gt;{titleArr[queryObj.type]}&gt;{isNone()}{manualType()}</div>
          {queryObj.isAdd && <div className="name">{isNone()}{manualType()}</div>}
          {!queryObj.isAdd && <div className="name">{data.title}</div>}
        <div className="buttonBody">
          {queryObj.manualType == 'lc_consultationDj' && <span className='label ml-20'>月份:</span>}
          {queryObj.manualType == 'lc_consultationDj' && <MonthPicker value={date} onChange={(val: any) => setDate(val)} />}
          {queryObj.audit != "2" && !noSaveList.includes(queryObj.manualType) && <Button onClick={handleSave} type="primary" loading={saveLoading}>保存</Button>}
          <Button className="ml-20" loading={buttonLoading} onClick={newOnPrint}>打印</Button>
          <Button className="ml-20" onClick={handleBack}>返回</Button>
        </div>
      </div>
      <div className="main">
        <div ref={refPrint} className="formPage" onScroll={handlerScroll}>
          <NurseHandBookFormPage {...NurseHandBookFormPageProps}></NurseHandBookFormPage>
        </div>
        {!noSaveList.includes(queryObj.manualType) && <div className="rightCon">
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
        </div>}
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
    height: 11vh;
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
      /* width: 320px; */
      position: absolute;
      bottom: 2vh;
      right: 50px;
    }
  }
  .main {
    flex: 1;
    padding-top: 11vh;
    display: flex;
    justify-content: space-between;
    .formPage {
      flex: 1;
      /* min-width: 77vw;
      max-width: 77vw; */
      overflow-x: auto;
      height: 82vh; 
      color: #000000;
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

