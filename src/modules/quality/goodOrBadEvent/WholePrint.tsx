import styled from 'styled-components'
import React, { useState, useEffect,MutableRefObject } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button, message, Spin } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import printing from 'printing'
import { useRef } from 'src/types/react'
import { appStore, authStore } from 'src/stores'
import { globalModal } from 'src/global/globalModal'
import { goodOrBadApi } from './GoodOrBadApi'
import PrintContent from "./PrintContent"
import qs from 'qs'
export interface Props extends RouteComponentProps { }

export default observer(function NursingReportDetailView() {
  // 输入框
  const [textArea1_1, setTextArea1_1] = useState('');
  const [textArea1_2, setTextArea1_2] = useState('');
  const [textArea1_3, setTextArea1_3] = useState('');
  const [textArea1_4, setTextArea1_4] = useState('');
  const [textArea2_1, setTextArea2_1] = useState('');
  const [textArea3_1, setTextArea3_1] = useState('');
  const [textArea4_1, setTextArea4_1] = useState('');
  // const textArea1_1: MutableRefObject<any> = useRef('');
	// const textArea1_2: MutableRefObject<any> = useRef(null);


  const [pageData, setPageData] = useState([])
  const [deductionData, setdeductionData] = useState([])
  const [currentPage, setCurrentPage]: any = useState({})
  const pageRef: any = useRef<HTMLElement>()
  const [isPrint, setIsPrint] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [quarterRate, setQuarterRate] = useState("")
  const [defaultDept, setDefaultDept] = useState("")
  const [text, setText] = useState('')
  const showText = ['fsxt'].includes(appStore.HOSPITAL_ID)

  useEffect(() => {
    let search = appStore.location.search
    let query = qs.parse(search.replace('?', ''))
    query.name = query.name || query.themeName
    let createData = []
    let currData:any = []
    setCurrentPage(query)
    // setSpinning(true)
    createData = query.list;
    if(createData){
      createData.map((item:any,index:any)=>{
        let everylist ={month:'',shouldCheckNum:'',actualCheckNum:''};
        everylist.month = item.month
        everylist.shouldCheckNum = item.shouldNum
        everylist.actualCheckNum = '0'
        currData.push(everylist)
      })
      setPageData(currData)
    }
    // goodOrBadApi.getDetailList(query).then((res: any) => {
    //   let list = res.data.list
    //   if(list.length){
    //     console.log(list);
    //     setPageData(list)
    //     setQuarterRate(res.data.quarterRate)
    //   }
    //   setSpinning(false)
    // })
    let params: any = { beginDate: query.startDate, endDate: query.endDate }
    // goodOrBadApi.getPointCount(params).then((res: any) => {
    //   if (res.code == 200) {
    //     setdeductionData(res.data)
    //     setSpinning(false)
    //   }
    // })
    //   .catch(err => { })
    if (showText) {
      // goodOrBadApi.getText(query.id).then((res: any) => {
      //   setText(res.data)
      // })
      //   .catch(e => {})
    }
  }, [])


  const onPrint = (isPrint: boolean) => {
    setIsPrint(isPrint)
    let printFun = isPrint ? printing : printing.preview
    setTimeout(() => {
      printFun(pageRef.current, {
        // 插入所有link和style标签到打印，默认是false
        injectGlobalCss: true,
        // 指定扫描样式，默认是true（全部）
        scanStyles: false,
        css: `
           .ant-btn {
             display: none;
           }
           .print-page {
             box-shadow: none;
             -webkit-print-color-adjust: exact;
             margin: 0 auto;
           }
           .page-title {
             min-height: 20px;
             padding: 0px 30px 20px;
           }
           .page-title .title {
             text-align: center;
             margin-right: 0;
           }
           table, img {
             page-break-inside: avoid;
           }
           pre {
            page-break-after: avoid;
           }
           * {
             color: #000 !important;
           }
           .ant-spin-nested-loading{
             height:auto;
           }
           .footer-title {
             min-height: 0;
             margin-bottom: 0;
           }
           table { page-break-inside:auto }
           tr{ page-break-inside:avoid; page-break-after:auto }
          .chart-con>div{
            display: none;
          }
          .chart-con .chart-con-img{
            max-width: 100%;
            display: inline!important;
          }
        `
      }).then(() => {
        setIsPrint(false)
      })
    }, 500)
  }
  // const onDelete = () => {
  //   if (!currentPage.id) return message.warning('此报表尚未保存！')
  //   globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
  //     goodOrBadApi.deleteReport(currentPage).then((res) => {
  //       message.success('删除成功')
  //       setTimeout(() => {
  //         appStore.history.push('/checkWard/quarterScoringRecord')
  //       }, 500)
  //     })
  //   })
  // }
  const onSave = async () => {
    console.log(textArea1_1)
    console.log(textArea1_2)
    // try {
    //   let params = { list: pageData, rateId: currentPage.id }
    //   const promiseList: any[] = [goodOrBadApi.saveReport(params)]
    //   if (showText) {
    //     promiseList.push(goodOrBadApi.saveText({
    //       id: currentPage.id,
    //       text
    //     }))
    //   }
    //   const res = await Promise.all(promiseList)
    //   if (res) {
    //     message.success('保存成功')
    //     setTimeout(() => {
    //       appStore.history.push('/checkWard/quarterScoringRecord')
    //     }, 500)
    //   }     
      
    // } catch (e) {
    // }
  }

  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[{ name: '护长季度查房分析报告', link: '/checkWard/quarterScoringRecord' }, { name: '报告详情', link: '' }]} />
        {/* <div className='title'>{currentPage.title}</div> */}
        <div className='title'>德国社会</div>
        <div className='aside'>
          <span>
            {/* 由{currentPage.creatorName}创建于{currentPage.createDate}<span></span> */}
            由{`hsj`}创建于{`jint`}<span></span>
          </span>
        </div>
        <div className='tool-con'>
          <Button onClick={() => onSave()} loading={spinning}>保存</Button>
          <Button onClick={() => onPrint(true)} loading={spinning}>打印</Button>
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        <Spin spinning={spinning} >
          <Page ref={pageRef} className='print-page'>
            <div style={{ fontSize: '30px', fontWeight: 700, textAlign: 'center', lineHeight: '60px' }}>{currentPage.title}</div>
            <PrintContent 
            deductionData={deductionData} 
            quarterRate={quarterRate} 
            isPrint={isPrint} 
            pageData={pageData} 
            currentPage={currentPage} 
            text={text} 
            setText={setText}

            textArea1_1={textArea1_1}
            textArea1_2={textArea1_2}
            textArea1_3={textArea1_3}
            textArea1_4={textArea1_4}
            textArea2_1={textArea2_1}
            textArea3_1={textArea3_1}
            textArea4_1={textArea4_1}
            setTextArea1_1={setTextArea1_1}
            setTextArea1_2={setTextArea1_2}
            setTextArea1_3={setTextArea1_3}
            setTextArea1_4={setTextArea1_4}
            setTextArea2_1={setTextArea2_1}
            setTextArea3_1={setTextArea3_1}
            setTextArea4_1={setTextArea4_1}
            ></PrintContent>
          </Page>
        </Spin>
      </ScrollCon>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  * {
    font-size: 14px;
  }
`

const HeadCon = styled.div`
  height: 100px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #dddddd;
  .title {
    font-size: 20px;
    margin: 0 0 5px 20px;
    font-weight: bold;
    min-height: 30px;
  }
  .aside {
    font-size: 12px;
    margin: 0 0 0 20px;
  }
  .tool-con {
    position: absolute;
    bottom: 20px;
    right: 20px;
    button {
      margin-left: 15px;
    }
  }
`
const Page = styled.div`
  width: 780px;
  margin: 20px auto 20px;
  padding-bottom: 10px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  min-height:700px;
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
`
