import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Select, Input, Button, Spin, Col,Modal,message } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { PageTitle } from "src/components/common";
import YearPicker from "src/components/YearPicker";
import { NullBox } from 'src/modules/WardRegister/components/NullBox';
import printing from 'printing' 
import moment from "moment";
import { useRef } from 'src/types/react'
import { implementRecordData } from './ImplementRecordData';
const Option = Select.Option;
const TextArea = Input.TextArea;
export interface Props {
	payload: any;
}
export default observer(function ImplementRecord(props: Props) {
	const [isPrint, setIsPrint] = useState(false)
	const pageRef: any = useRef<HTMLElement>()
	const [text1, setText1] = useState('实施记录实施记录实施记录');
	const [title, setTitle] = useState('哈哈哈哈哈哈');

	useEffect(() => {
		implementRecordData.getBatchList()

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
					margin: 7mm 10mm;
				}
				.print-page__ptext{
					padding:0 6px;
				}
				.page-title{
					font-size: 24px;
					text-align: center;
					color: #000;
				}
				.main{
					border: 1px solid;
					margin-top: 15px;
				}
				p{
					margin:0;
				}
				.page-tips{
					color: #000;
					margin: 0;
					padding: 7px 10px;
					font-size: 16px;
					border-bottom: 1px solid;
				}
				.print-page__ipt{
					font-size: 14px;
					margin: 0;
					padding: 6px 20px;
					border-bottom: 1px solid;
					min-height: 50px;
				}
           .ant-btn {
             display: none;
           }
           .print-page {
             box-shadow: none;
             -webkit-print-color-adjust: exact;
             margin: 0 auto;
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
           
           table { page-break-inside:auto }
           tr{ page-break-inside:avoid; page-break-after:auto }
          .chart-con>div{
            display: none;
          }
         
        `
			}).then(() => {
				setIsPrint(false)
			})
		}, 500)
	}
	const handelInquire = ()=>{
		implementRecordData.isEdit = false
		implementRecordData.getImplement()
	}
	return (
		<Wrapper>
			<Headerr>
				<LeftIcon>
					<PageTitle maxWidth={1000}>{'实施记录'}</PageTitle>
				</LeftIcon>
				<RightIcon>
				<span style={{marginRight:'10px'}}>年份：</span>
					<YearPicker
						allowClear={false}
						style={{ width: 120 }}
						value={implementRecordData.year}
						onChange={(year: any) => {
						implementRecordData.year = year;
						implementRecordData.getBatchList()
						}}
					/>
					
					<span style={{marginRight:'10px',marginLeft:'15px'}}>批次：</span>
					<Select
					style={{ width: 160 }}
					value={implementRecordData.selectBatch}
					onChange={(val: string) => {
						implementRecordData.selectBatch = val
						implementRecordData.getImplement()
					}}
					>
					{implementRecordData.batchList.map((item:any,index:number)=>{
						return <Option value={item.batch} key={index}>{item.batch}</Option>
					})}
					</Select>
					
					<Button
						type="primary"
						className="span"
						onClick={handelInquire}
						>
						查询 
					</Button>
					
				</RightIcon>
			</Headerr>
			<ScrollCon>
			<Spin spinning={implementRecordData.loading}>
				{implementRecordData.master.batch?<><div className='top'>
					<div className="top-left">
						<p style={{marginBottom:'5px'}}><span>创建时间：
							</span>{implementRecordData.master.createDate?moment(implementRecordData.master.createDate).format('YYYY-MM-DD HH:mm:ss'):moment().format('YYYY-MM-DD HH:mm:ss')}</p>
						<p><span>创建人：</span>{implementRecordData.master.createName}</p>
					</div>
					<div className="top-right">
					{implementRecordData.isEdit&&<Button type="primary" onClick={()=>{implementRecordData.saveImplement()}} >保存</Button>}
					{implementRecordData.isEdit&&<Button style={{marginLeft:'15px'}} onClick={()=>{implementRecordData.isEdit=false}} >取消</Button>}
					{!implementRecordData.isEdit&&<Button type="primary" onClick={()=>{implementRecordData.isEdit = true}} >编辑</Button>}
					<Button style={{marginLeft:'15px'}} disabled={implementRecordData.isEdit} onClick={() => onPrint(true)} >打印</Button>
					</div>
				</div>
				<div className="content-wrapper">
					<div className="content">
					<Page ref={pageRef} className='print-page'>
						<div className="title">
						{implementRecordData.isEdit && <Input className='cell-ipt'
						defaultValue={implementRecordData.master.title}
						key={implementRecordData.master.id}
						onBlur={(e: any) =>
							implementRecordData.master.title = e.target.value
							} />}
						{!implementRecordData.isEdit &&<h3 className='page-title'>{implementRecordData.master.title}</h3>}
						</div>
						<div className="main">
							<p className='page-tips'>一、培训计划落实情况：（是否按培训计划进行/列改计划的内容及原因/人员参加情况等。）</p>
							{implementRecordData.isEdit && <TextArea className='cell-ipt' autosize={{minRows: 5}} 
							defaultValue={implementRecordData.master.implementStatus}
							key={'implementStatus'+implementRecordData.master.id}
							onBlur={(e: any) =>
								implementRecordData.master.implementStatus = e.target.value
								} />}
								{!implementRecordData.isEdit && <p className='print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{implementRecordData.master.implementStatus}</p>}
								<p className='page-tips'>二、培训效果评估：（如培训的内容、对象、效果/受训人对培训内容、形式、实用性是否满意等//如有考核还需要针对考核结果进行合格、不合格情况分析——考核人数、合格/不合格人数、合格率等）</p>
							{implementRecordData.isEdit&&<TextArea className='cell-ipt' autosize={{minRows: 5}} 
							defaultValue={implementRecordData.master.evaluation}
							key={'evaluation'+implementRecordData.master.id}
							onBlur={(e: any) =>
								implementRecordData.master.evaluation = e.target.value
								} />}
								{!implementRecordData.isEdit && <p className='print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{implementRecordData.master.evaluation}</p>}

								<p className='page-tips'>三、不合格处理意见：（对培训中存在的不足之处的改进措施/考核不合格的处理）</p>
							{implementRecordData.isEdit&&<TextArea className='cell-ipt' autosize={{minRows: 5}} 
							defaultValue={implementRecordData.master.unqualOpinion}
							key={'unqualOpinion'+implementRecordData.master.id}
							onBlur={(e: any) =>
								implementRecordData.master.unqualOpinion = e.target.value
								} />}
								{!implementRecordData.isEdit && <p className='print-page__ipt' style={{ 'whiteSpace': 'pre-wrap' }}>{implementRecordData.master.unqualOpinion}</p>}
						</div>
					
					</Page>
					</div>
				</div></>:<NullBox
                onClick={()=>{implementRecordData.createTips()}}
                text={"创建实施小结"}
              /> }
			  </Spin>
			</ScrollCon>
		</Wrapper>
	)
})
const Wrapper = styled.div`
	height: 100%;
    display: flex;
    flex-direction: column;
`
const ScrollCon = styled.div`
height: 100%;
  flex: 1;
  display: flex;
	flex-direction: column;
	.cell-ipt:focus {
    background: yellow !important;
  }


  .top{
		height: 74px;
		width: 100%;
		display: flex;
		background-color: #fff;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 20px;
		align-items: center;
		.top-left p{
			margin: 0;
			font-size: 14px;
			color: #000;
			span{
				color: #999;
			}
		}
  }
  .content-wrapper{
		max-height: calc(100vh - 200px);
	/* flex: 1; */
	width: 100%;
	background-color: #fff;
	display: flex;
	justify-content: center;
	margin-top: 5px;
	overflow-y: auto;
  }
  .content{
		width: 768px;
		margin-top: 15px;
		margin-bottom: 15px;
		.title input{
			font-size: 24px;
			text-align: center;
			border: none;
			border-bottom: 1px solid;
			color: #000;
			border-radius: inherit;
		}
		.page-title{
			font-size: 24px;
			text-align: center;
			color: #000;
		}
		.main{
			border: 1px solid;
			margin-top: 15px;
			.page-tips{
				color: #000;
				margin: 0;
				padding: 7px 10px;
				font-size: 14px;
				border-bottom: 1px solid;
			}
			.print-page__ipt{
				margin: 0;
    		padding: 6px 20px;
    		border-bottom: 1px solid;
				min-height: 50px;
			}
			.ant-input{
				border: none;
				border-bottom: 1px solid;
				border-radius: inherit;
			}
		}
  }
`;
const Page = styled.div`
  width: 768px;
  /* margin: 20px auto 20px; */
  padding-bottom: 15px;
  /* background: #fff; */
  /* box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5); */
  overflow: hidden;
  /* min-height:700px; */
`
const Headerr = styled.div`
width: calc(100vw-200px);
  justify-content: space-between;
  height: 55px;
  font-size: 13px;
  color: #333;
  padding: 12px 15px 0 15px;`;
  
  const LeftIcon = styled.div`
	padding: 0;
	float: left;
  `;
  const RightIcon = styled.div`
	padding: 0 0 0 15px;
	float: right;
	.span {
	  /* font-size:16px; */
	  margin-left: 15px;
	}
  `;