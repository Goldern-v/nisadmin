import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Select, Input, Button, Row, Col,Modal,message,DatePicker,TimePicker  } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { PageTitle } from "src/components/common";
import YearPicker from "src/components/YearPicker";
import moment, {Moment} from "moment";
import { preJobTrainingPlanData } from './PreJobTrainingPlanData';
import { globalModal } from "src/global/globalModal"
import CopyBatch from './CopyBatch';
import { preJobApi } from '../PreJobApi';

const Option = Select.Option;
const TextArea = Input.TextArea;

export default observer(function PreJobTrainingPlan() {


	const columns: any = [
        {
          title: "批次",
          dataIndex: "batch",
          align: "center",
          width: 80,
        },
		{
			title: "日期",
			dataIndex: "batchDate",
			align: "center",
			width: 160,
			render: (text: any, record: any, index: number)=>{
				return(
					<DatePicker className='none-border'
					defaultValue={text!=''?moment(record.year+'-'+text) : moment()} key={record.id}
					disabledDate={(date:any) =>
						date > moment(preJobTrainingPlanData.year).endOf("year") ||
						date <= moment(preJobTrainingPlanData.year).startOf("year")
					  }
						format="MM-DD"
						onChange={(date:any)=>{
							preJobTrainingPlanData.tableList[index].batchDate = date.format("MM-DD")
							
						}}
					/>
				)
			}
		},
		{
			title: "时间",
			dataIndex: "time",
			align: "center",
			width: 220,
			render:(text: any, record: any, index: number)=>{
				let startTime = text,endTime = ''
				if(text.indexOf('-')>-1){
					// 有时间范围
					startTime = text.split('-')[0] || ''
					endTime = text.split('-')[1] || ''
				}
				return (
					<><TimePicker className='none-border' allowClear={false} style={{width:'95px'}}
					defaultValue={startTime!=''?moment(startTime, 'HH:mm') :undefined}
					 key={record.id} format={'HH:mm'} placeholder='开始时间'
					onChange={(time: any, timeString: string)=>{
						startTime = timeString
						preJobTrainingPlanData.tableList[index].time = startTime+'-'+endTime
					}} />~<TimePicker className='none-border' allowClear={false} style={{width:'95px'}}
					defaultValue={endTime!=''?moment(endTime, 'HH:mm') :undefined}
					 key={record.id+'end'} format={'HH:mm'} placeholder='结束时间'
					onChange={(time: any, timeString: string)=>{
						endTime = timeString
						preJobTrainingPlanData.tableList[index].time = startTime+'-'+endTime
					}} /></>
				)
			}
		},
		{
			title: "内容",
			dataIndex: "content",
			align: "center",
			width: 160,
			render: (text: any, record: any, index: number)=>{
				return(
					<TextArea className='cell-ipt' 
					defaultValue={text} key={record.id}
					autosize={{minRows: 1}} 
					onBlur={(e: any) =>
						preJobTrainingPlanData.tableList[index].content = e.target.value
						
					  }
					 ></TextArea>
				)
			}
		},
		{
			title: "培训师资",
			dataIndex: "teacher",
			align: "center",
			width: 160,
			render: (text: any, record: any, index: number)=>{
				return(
					<TextArea className='cell-ipt' 
					defaultValue={text} key={record.id}
					autosize={{minRows: 1}} 
					onBlur={(e: any) =>
						preJobTrainingPlanData.tableList[index].teacher = e.target.value
						
					  }
					 ></TextArea>
				)
			}
		},
		{
			title: "培训形式",
			dataIndex: "way",
			align: "center",
			width: 160,
			render: (text: any, record: any, index: number)=>{
				return(
					<TextArea className='cell-ipt' 
					defaultValue={text} key={record.id}
					autosize={{minRows: 1}} 
					onBlur={(e: any) =>
						preJobTrainingPlanData.tableList[index].way = e.target.value
						
					  }
					 ></TextArea>
				)
			}
		},
		{
			title: "备注",
			dataIndex: "remark",
			align: "center",
			width: 160,
			render: (text: any, record: any, index: number)=>{
				return(
					<TextArea className='cell-ipt' 
					defaultValue={text} key={record.id}
					autosize={{minRows: 1}} 
					onBlur={(e: any) =>
						
						preJobTrainingPlanData.tableList[index].remark = e.target.value
					  }
					 ></TextArea>
				)
			}
		},
		{
			title: "操作 ",
			dataIndex: "cz",
			align: "center",
			width: 100,
			render:(text: any, record: any, index: number)=>{
				return (
					<DoCon>
						
                        <span onClick={()=>{saveTableItem(index)}}>保存</span>
						<span onClick={()=>{removeTableItem(record,index)}}>删除</span>
					</DoCon>
				);
			}
		},
	]


	useEffect(() => {
		preJobTrainingPlanData.getBatchList()
	  
	}, [])

	/**确认删除数据 */
	const removeTableItem = (record:any,index:number)=>{
		globalModal
		.confirm( `提示`,`确认删除数据吗？`)
		.then((res) => {
			if((record.id).toString().indexOf('save')>-1){
				message.success('删除成功！')
                preJobTrainingPlanData.tableList.splice(index,1)
				return false
			}
			preJobApi.delPlan({id:record.id}).then(resp=>{
				message.success('删除成功！')
				preJobTrainingPlanData.tableList.splice(index,1)
			}).catch(error=>{
	
			})
		}).catch(err=>{

		})	
	}
	

	/**保存 */
	const saveTableItem = (index:number)=>{
		let paramter = preJobTrainingPlanData.tableList[index]
		if(paramter.time.indexOf('-')>-1){
			if(paramter.time.split('-')[0]>paramter.time.split('-')[1]){
				message.warning('开始时间不得大于结束时间！')
				return false
			}
		}
		// console.log(paramter)
		// return false
		
		if((paramter.id+'').indexOf('save')>-1){
			// 就是新建
			paramter.id = null
		}
		preJobApi.addPlan(paramter).then(res=>{
			message.success('保存成功！')
			preJobTrainingPlanData.getTableList()
		}).catch(err=>{

		})
	}


	const handelInquire = ()=>{
		preJobTrainingPlanData.getTableList()
	}
	/**新增一行 */
	const addTableItem = ()=>{
		console.log({...preJobTrainingPlanData.tableItem,id:preJobTrainingPlanData.S4()})
		preJobTrainingPlanData.tableList.unshift({...preJobTrainingPlanData.tableItem,id:preJobTrainingPlanData.S4()})
	}

	

	const handleOk = ()=>{
		preJobTrainingPlanData.copyBatchModal = false
	}
	const handleCancel = ()=>{
		preJobTrainingPlanData.copyBatchModal = false
	
	}

	return (
		<Wrapper>
			<Headerr>
				<LeftIcon>
					<PageTitle maxWidth={1500}>{'培训计划'}</PageTitle>
				</LeftIcon>
				<RightIcon>
				<span style={{marginRight:'10px'}}>年份：</span>
					<YearPicker
						allowClear={false}
						style={{ width: 120 }}
						value={preJobTrainingPlanData.year}
						onChange={(year: any) => {
							preJobTrainingPlanData.year = year;
							preJobTrainingPlanData.getBatchList()
						}}
					/>
					
					<span style={{marginRight:'10px',marginLeft:'15px'}}>批次：</span>
					<Select
					style={{ width: 160 }}
					value={preJobTrainingPlanData.selectBatch}
					onChange={(val: string) => {
						preJobTrainingPlanData.selectBatch = val
						preJobTrainingPlanData.getTableList()
					}}
					>
					{preJobTrainingPlanData.batchList.map((item:any,index:number)=>{
						return <Option value={item.batch} key={index}>{item.batch}</Option>
					})}
					</Select>
					<Input
						style={{ width: 180, marginLeft: 10, marginRight: 5 }}
						placeholder="请输入姓名关键字信息"
						value={preJobTrainingPlanData.keyWord}
						onChange={e => {
							preJobTrainingPlanData.keyWord = e.target.value;
						}}
					/>
					<Button
						type="primary"
						className="span"
						onClick={handelInquire}
						>
						查询
					</Button>
					<Button className="span" onClick={addTableItem}>新增一行</Button>
					<Button className="span" onClick={()=>{preJobTrainingPlanData.copyBatchModal=true}} >复制计划</Button>
				</RightIcon>
			</Headerr>
			<ScrollCon>
                <BaseTable
                loading={preJobTrainingPlanData.tableLoading}
                dataSource={preJobTrainingPlanData.tableList}
                columns={columns}
                surplusWidth={300}
                surplusHeight={200}
								pagination={false}
                // pagination={{
                //     current: preJobTrainingPlanData.pageIndex,
                //     total: preJobTrainingPlanData.total,
                //     pageSize: preJobTrainingPlanData.pageSize,
                // }}
                // onChange={(pagination:any) => {
                //     preJobTrainingPlanData.pageIndex = pagination.current;
                //     preJobTrainingPlanData.total = pagination.total;
                //     preJobTrainingPlanData.pageSize = pagination.pageSize;
                // }}
                />
            </ScrollCon>
			<CopyBatch visible={preJobTrainingPlanData.copyBatchModal} handleOk={handleOk} handleCancel={handleCancel} />
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