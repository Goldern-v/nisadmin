import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Select, Input, Button, Row, Col,Modal,message,DatePicker,TimePicker  } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { PageTitle } from "src/components/common";
import YearPicker from "src/components/YearPicker";
import moment, {Moment} from "moment";
import { globalModal } from "src/global/globalModal"
import { theoryExamData } from './TheoryExamData';
import AddBatchExamModal from './AddBatchExamModal';
import { appStore, authStore } from 'src/stores'
import { preJobApi } from '../PreJobApi';

const Option = Select.Option;
const TextArea = Input.TextArea;
export interface Props {
	payload: any;
	getTitle: any;
}

export default observer(function TheoryExam(props:Props) {
	const columns: any = [
        {
          title: "批次",
          dataIndex: "batch",
          align: "center",
          width: 80,
        },
		{
			title: "考核日期",
			dataIndex: "examDate",
			align: "center",
			width: 160,
		},
		{
			title: "主考科室",
			dataIndex: "examDept",
			align: "center",
			width: 160,
			
		},
		{
			title: "考核内容",
			dataIndex: "examContent",
			align: "center",
			width: 160,
			
		},
		{
			title: "应考人数",
			dataIndex: "examNum",
			align: "center",
			width: 160,
			
		},
		{
			title: "实考核人数",
			dataIndex: "examActNum",
			align: "center",
			width: 160,
			
		},
		{
			title: "平均分",
			dataIndex: "average",
			align: "center",
			width: 160,
			
		},
		{
			title: "合格率",
			dataIndex: "passRate",
			align: "center",
			width: 160,
			
		},
		{
			title: "操作 ",
			dataIndex: "cz",
			align: "center",
			width: 100,
			render:(text: any, record: any, index: number)=>{
				return (
					<DoCon>
                        <span onClick={()=>{turnToDetail(record)}}>查看</span>
						<span onClick={()=>{turnToEdit(record)}}>修改</span>
						<span onClick={()=>{removeTableItem(record,index)}}>删除</span>
					</DoCon>
				);
			}
		},
	]

	useEffect(() => {
		/**岗前理论考核 preJobTheory 
 *  岗前实操考核 preJobPractice */
		let pathnameArr = appStore.history.location.pathname.split('/')
		theoryExamData.module = pathnameArr[pathnameArr.length-1]
		// //   判断标题
		theoryExamData.componentTitle = props.getTitle
		theoryExamData.preType = theoryExamData.module=='preJobTheory'?'1':'2'

		// // 初始化数据
		theoryExamData.pageBatch = ''
		theoryExamData.year = moment()
		theoryExamData.getTableList()

}, [props.getTitle])

	/**移除单个item */
	const removeTableItem = (record:any,index:number)=>{
		globalModal
		.confirm( `提示`,`确定删除吗？`)
		.then((res) => {
			preJobApi.delTheoryExam({id:record.id}).then(resp=>{
				message.success('删除成功！')
				theoryExamData.tableList.splice(index,1)
			}).catch(error=>{
	
			})
		}).catch(err=>{

		})	
	}

	const turnToEdit = (record:any)=>{
		theoryExamData.batchExamModal = true
		theoryExamData.modalTitle = '修改'
		// 初始化表单数据。。。
		theoryExamData.addExam = record
	}

	useEffect(() => {
		theoryExamData.getBatchList()
		theoryExamData.getTableList()
	
	}, [])
	

	const handelInquire = ()=>{
		theoryExamData.getTableList()
	}
	const handleOk = ()=>{
		theoryExamData.batchExamModal = false
	}
	const handleCancel = ()=>{
		theoryExamData.batchExamModal = false
	
	}

	const turnToDetail = (record:any)=>{
		theoryExamData.currerntDetail = record
		theoryExamData.passScore = record.passScore || 60
		appStore.history.push(`/theoryExamDetail`)
		theoryExamData.getTableListAll(record.id)
	}

	const turnToScore = ()=>{
		if(theoryExamData.pageBatch==''){
			message.warning('请选择一个批次进行查看')
			return false
		}
		appStore.history.push(`/theoryExamScore`)
		theoryExamData.getTableListAllScore()
	}

	/**点击新增 */
	const clickAdd = ()=>{
		theoryExamData.batchExamModal = true;
		theoryExamData.addExam = {}
		theoryExamData.addExam = theoryExamData.addItem
		theoryExamData.modalTitle='新增';
		theoryExamData.getNursingAll();
	}

	return (
		<Wrapper>
			<Headerr>
				<LeftIcon>
					<PageTitle maxWidth={1200}>{theoryExamData.componentTitle}</PageTitle>
				</LeftIcon>
				<RightIcon>
				<span style={{marginRight:'10px'}}>年份：</span>
					<YearPicker
						allowClear={false}
						style={{ width: 120 }}
						value={theoryExamData.year}
						onChange={(year: any) => {
							theoryExamData.year = year;
							theoryExamData.pageBatch = ''
							theoryExamData.getTableList()
							theoryExamData.getBatchList()
						// traineeShiftModal.allGroupOnload();
						}}
					/>
					
					<span style={{marginRight:'10px',marginLeft:'15px'}}>批次：</span>
					<Select
					style={{ width: 160 }}
					value={theoryExamData.pageBatch}
					onChange={(val: string) => {
						theoryExamData.pageBatch = val
						theoryExamData.getTableList()
					}}
					>
						<Select.Option value="">全部</Select.Option>
					{theoryExamData.batchList.map((item:any,index:number)=>{
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
					{/* <Button className="span" onClick={addTableItem}>新增一行</Button> */}
					<Button className="span" onClick={turnToScore} >全部成绩</Button> 
					<Button className="span" onClick={clickAdd}>新增</Button>
				</RightIcon>
			</Headerr>
			<ScrollCon>
                <BaseTable
                loading={theoryExamData.tableLoading}
                dataSource={theoryExamData.tableList}
                columns={columns}
                surplusWidth={300}
                surplusHeight={220}
								pagination={false}
               
                />
            </ScrollCon>
			<AddBatchExamModal visible={theoryExamData.batchExamModal} handleOk={handleOk} handleCancel={handleCancel} />

		</Wrapper>
	)
})
const Wrapper = styled.div`
	height: 100%;
    display: flex;
    flex-direction: column;
	.none-border {
		.ant-input,.ant-time-picker-input{
			border: none;
		}
	}
`
const ScrollCon = styled.div`
  flex: 1;
  .cell-ipt:focus {
    background: yellow !important;
  }

`;
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