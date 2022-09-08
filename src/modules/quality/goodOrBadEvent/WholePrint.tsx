import styled from 'styled-components'
import React, { useState, useEffect, MutableRefObject } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button, message, Spin } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import printing from 'printing'
import { useRef } from 'src/types/react'
import { appStore, authStore } from 'src/stores'
import { goodOrBadApi } from './GoodOrBadApi'
import PrintContent from "./PrintContent"
import qs from 'qs'
import { clinicalApi } from './ClinicalApi'
import { wholePrintData } from './tsData/WholePrintData'
import { globalModal } from 'src/global/globalModal'
// export interface Props extends RouteComponentProps { }
export interface Props extends RouteComponentProps<{ name?: string }> { }
export default observer(function EventReportDetailView(props: Props) {
	// 输入框
	const [textArea1_1, setTextArea1_1] = useState('');
	const [textArea1_2, setTextArea1_2] = useState('');
	const [textArea1_3, setTextArea1_3] = useState('');
	const [textArea1_4, setTextArea1_4] = useState('');
	const [textArea2_1, setTextArea2_1] = useState('');
	const [textArea3_1, setTextArea3_1] = useState('');
	const [textArea4_1, setTextArea4_1] = useState('');
	const [textArea5_1, setTextArea5_1] = useState('');
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

	const [propsData, setPropsData] = useState({} as any);
	// console.log(sessionStorage.getItem('myreport'))
	useEffect(() => {
		// console.log(appStore.location)
		let propsData = qs.parse(sessionStorage.getItem('myreport') as string)
		setPropsData(propsData)
		setSpinning(true)
		clinicalApi.getReportById({ masterId: propsData.id }).then((res: any) => {
			wholePrintData.master = res.data.master || {}
			wholePrintData.rowList = res.data.rowList || []
			wholePrintData.evaluationList = res.data.evaluationList || []
			if(res.data.evaluationList.length>0){
				res.data.evaluationList.map((it:any)=>{
					switch (it.evaluationCode) {
						case 'Problem':
							setTextArea1_1(it.content)
							break;
						case 'Analysis':
							setTextArea1_2(it.content)
							break;
						case 'Target':
							setTextArea1_3(it.content)
							break;
						case 'Plan':
							setTextArea1_4(it.content)
							break;
						case 'Do':
							setTextArea2_1(it.content)
							break;
						case 'Check':
							setTextArea3_1(it.content)
							break;
						case 'Action':
							setTextArea4_1(it.content)
							break;
						case 'Comment':
							setTextArea5_1(it.content)
							break;
						default:
							break;
					}
				})
			}
			// res.data.evaluationList
			setSpinning(false)
		}).catch(err => {

		})

		// 卸载函数
		return ()=>{
			// sessionStorage.removeItem('myreport')
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
				@page {
					size: auto;
					margin: 5mm 0mm;
				}
				.print-page__ptext{
					padding:0 6px;
				}
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
		   img{
			height:500px;
			margin-top:20px;
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
          }import { data } from 'jquery';

        `
			}).then(() => {
				setIsPrint(false)
			})
		}, 500)
	}

	// 删除
	const turnToDel = () => {
		let params={
			masterId:wholePrintData.master.id
		}
	  globalModal.confirm('删除确认', '你确定要删除该报告吗？').then((res) => {
	    clinicalApi.delReportById(params).then((res) => {
	      message.success('删除成功')
	      setTimeout(() => {
				appStore.history.goBack()
	        // appStore.history.push('/checkWard/quarterScoringRecord')
	      }, 500)
	    })
	  })
	}
	// 保存
	const onSave = async () => {
		let params = {
			master:wholePrintData.master,
			"evaluationList": [
				{
					"masterId": propsData.id,
					"evaluationCode": "Problem",
					"content": textArea1_1
				},
				{
					"masterId": propsData.id,
					"evaluationCode": "Analysis",
					"content": textArea1_2
				},
				{
					"masterId": propsData.id,
					"evaluationCode": "Target",
					"content": textArea1_3
				},
				{
					"masterId": propsData.id,
					"evaluationCode": "Plan",
					"content": textArea1_4
				},
				{
					"masterId": propsData.id,
					"evaluationCode": "Do",
					"content": textArea2_1
				},
				{
					"masterId": propsData.id,
					"evaluationCode": "Check",
					"content": textArea3_1
				},
				{
					"masterId": propsData.id,
					"evaluationCode": "Action",
					"content": textArea4_1
				},
				{
					"masterId": propsData.id,
					"evaluationCode": "Comment",
					"content": textArea5_1
				},
			],
		}
		// 本来已有报告
		if(wholePrintData.evaluationList.length>0){
			params.evaluationList = wholePrintData.evaluationList
			let isCommentFlag = false//后来新增了Comment，如果没有comment，要另外加一段
			params.evaluationList.map((it:any)=>{
				switch (it.evaluationCode) {
					case 'Problem':
						it.content = textArea1_1
						break;
					case 'Analysis':
						it.content = textArea1_2
						break;
					case 'Target':
						it.content = textArea1_3
						break;
					case 'Plan':
						it.content = textArea1_4
						break;
					case 'Do':
						it.content = textArea2_1
						break;
					case 'Check':
						it.content = textArea3_1
						break;
					case 'Action':
						it.content = textArea4_1
						break;
					case 'Comment':
						it.content = textArea5_1
						isCommentFlag = true
						break;
					default:
						break;
				}
			})
			if(!isCommentFlag){
				params.evaluationList.push({
					"masterId": propsData.id,
					"evaluationCode": "Comment",
					"content": textArea5_1
				})
			}
		}
		
		// console.log(params)
		// return false
		setSpinning(true)
		clinicalApi.saveNewReport(params).then(res=>{
			if(res.code=='200'){
				message.success('保存成功')
				setTimeout(() => {
					// appStore.history.push('/goodOrBadRouter/wholeAysi')
					appStore.history.goBack()
				}, 500)
			}
			setSpinning(false)
		}).catch(err=>{
			setSpinning(false)
		})
	}

	
	

	return (
		<Wrapper>
			<HeadCon>
				<BaseBreadcrumb data={[{ name: '全院护理质量分析', link: '/goodOrBadRouter/wholeAysi' }, { name: '报告详情', link: '' }]} />
				{propsData.reportType == '0' && <div className='title'>{propsData.belongsYear}年{Number(propsData.belongsCycle)}月全院护理质量汇总报告</div>}
				{/* <div className='title'>{propsData.belongsYear}年第一季度全院护理质量汇总报告</div> */}
				<div className='aside'>
					<span>
						{/* 由{currentPage.creatorName}创建于{currentPage.createDate}<span></span> */}
						由{`${propsData.createName}`}创建于{`${propsData.createDate}`}<span></span>
					</span>
				</div>
				<div className='tool-con'>
					{authStore.isDepartment &&
						<>
							<Button onClick={() => turnToDel()}>删除</Button>
							<Button onClick={() => onSave()} loading={spinning}>保存</Button>
						</>
					}
					
					<Button onClick={() => onPrint(true)} loading={spinning}>打印</Button>
					<Button onClick={() => appStore.history.goBack()}>返回</Button>
				</div>
			</HeadCon>
			<ScrollCon>
				<Spin spinning={spinning} >
					<Page ref={pageRef} className='print-page'>
						<div style={{ fontSize: '30px', fontWeight: 700, textAlign: 'center', lineHeight: '60px' }}>{currentPage.title}</div>
						<PrintContent
							propsData={propsData}
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
							textArea5_1={textArea5_1}
							setTextArea1_1={setTextArea1_1}
							setTextArea1_2={setTextArea1_2}
							setTextArea1_3={setTextArea1_3}
							setTextArea1_4={setTextArea1_4}
							setTextArea2_1={setTextArea2_1}
							setTextArea3_1={setTextArea3_1}
							setTextArea4_1={setTextArea4_1}
							setTextArea5_1={setTextArea5_1}
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
