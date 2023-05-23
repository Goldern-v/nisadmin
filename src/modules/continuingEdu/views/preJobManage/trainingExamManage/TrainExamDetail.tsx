import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, InputNumber,Checkbox, Col, DatePicker, Row,message,Input,Icon,Spin } from 'src/vendors/antd'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { appStore, authStore } from 'src/stores'
import { ScrollBox } from 'src/components/common'
import BaseTable, { DoCon } from "src/components/BaseTable";
import moment from 'moment'
import qs from 'qs'
import { trainExamData } from './TrainExamData'
import {preJobManageApi} from "../PreJobManageApi";
export interface Props {
payload: any;
}
export default observer(function TrainExamDetail(props: Props) {
	const columns: any = [
        {
          title: "序号",
          dataIndex: "",
          align: "center",
          width: 30,
		  		render: (text: any, record: any, index: number)=>index+1
        },
		{
			title: "姓名",
			dataIndex: "name",
			align: "center",
			width: 90,
		},
		{
			title: "科室",
			dataIndex: "dept",
			align: "center",
			width: 120,
			
		},
		{
			title: "考核内容",
			dataIndex: "examContent",
			align: "center",
			width: 160,
			render: (text: any, record: any, index: number)=><span className='pre-wrap'>{text}</span>
			
		},
		{
			title: "考核成绩",
			dataIndex: "examScore",
			align: "center",
			width: 80,
			render: (text: any, record: any, index: number)=>{
				return(
					<InputNumber className='cell-ipt' 
					defaultValue={text}
					key={record.id}
					step={1} min={1} max={150} style={{ width: '100%' }}
					onBlur={(e: any) =>{
						trainExamData.tableDetailList[index].examScore = e.target.value
						trainExamData.tableDetailList = [...trainExamData.tableDetailList]
						// console.log(trainExamData.tableDetailList[index].resitFlag)
					}}
					 />
				)
			}
		},
		{
			title: "是否补考",
			dataIndex: "resitFlag",
			align: "center",
			width: 50,
			render: (text: any, record: any, index: number)=>{
				return(
					// 1是，0否
					<Checkbox 
					key={record.id}
					defaultChecked={text=='1'?true:false}
					onChange={(e)=>{
						trainExamData.tableDetailList[index].resitFlag = e.target.checked?'1':'0'
						trainExamData.tableDetailList = [...trainExamData.tableDetailList]
					}}></Checkbox>
				)
			}
		},
		{
			title: "补考后的成绩",
			dataIndex: "resitScore",
			align: "center",
			width: 80,
			render: (text: any, record: any, index: number)=>{
				return(
					<InputNumber className='cell-ipt' 
					defaultValue={text}
					key={record.id}
					step={1} min={1} max={150} style={{ width: '100%' }}
					onBlur={(e: any) =>{
						trainExamData.tableDetailList[index].resitScore = e.target.value
						trainExamData.tableDetailList=[...trainExamData.tableDetailList]
						// console.log(e.target.value)
					}}
					 />
				)
			}
		},
		{
			title: "考核结果",
			dataIndex: "examResultState",
			align: "center",
			width: 80,
			render: (text: any, record: any, index: number)=>{
				// 0：及格，1=不及格
				if(trainExamData.tableDetailList[index].resitScore==null && trainExamData.tableDetailList[index].examScore==null){
					return <span>--</span>
				}
				if(Number(trainExamData.tableDetailList[index].examScore)<Number(trainExamData.passScore)){
					record.examResult='不及格'
					return <span className='col-red'>不及格</span>
				}
				record.examResult='及格'
				return <span className='col-green'>及格</span>

				if(trainExamData.tableDetailList[index].resitFlag=='1'){
					// 有补考
					if(Number(trainExamData.tableDetailList[index].resitScore)<Number(trainExamData.passScore)){
					return <span className='col-red'>不及格</span>

					}
					return <span className='col-green'>及格</span>
				}else{
					if(Number(trainExamData.tableDetailList[index].examScore)<Number(trainExamData.passScore)){
						return <span className='col-red'>不及格</span>
					}
					return <span className='col-green'>及格</span>
				}
				return <span>--</span>
			}
			
		},
		
	]
	const saveDetailList = ()=>{
		// console.log(trainExamData.tableDetailList)
		trainExamData.tableDetailLoading = true
		preJobManageApi.updateTrainDetail(trainExamData.tableDetailList).then(res=>{
			message.success('保存成功')
			trainExamData.tableDetailLoading = false
		}).catch(err=>{
			trainExamData.tableDetailLoading = false

		})
	}
	return (
		<Wrapper>
			<HeadCon>
            {/* {name:'学习培训',link:'/continuingEdu'},{name:'人员管理',link:'/continuingEdu/人员管理'}, */}
                <BaseBreadcrumb data={[{name:trainExamData.componentTitle,link:'/continuingEdu/'+trainExamData.module},{ name: '详情', link: '' }]} />
                <div className='title'>{trainExamData.componentTitle}{'详情'}</div>
                <div className='aside'>
                <span>
                创建时间:{trainExamData.currentDetail.createDate || moment().format('YYYY-MM-DD HH:mm:ss')}
                </span>
                </div>
                <div className='tool-con'>
                    <Button onClick={() => appStore.history.goBack()}>返回</Button>
                    <Button type='primary' onClick={()=>{saveDetailList()}}>保存</Button>
                </div>
            </HeadCon>
			<ScrollCon>
                <BaseTable
                loading={trainExamData.tableDetailLoading}
                dataSource={trainExamData.tableDetailList}
                columns={columns}
                surplusWidth={300}
                surplusHeight={255}
                pagination={{
                    current: trainExamData.pageDetailIndex,
                    total: trainExamData.totalDetail,
                    pageSize: trainExamData.pageDetailSize,
                }}
                onChange={(pagination:any) => {
                    trainExamData.pageDetailIndex = pagination.current;
                    trainExamData.totalDetail = pagination.total;
                    trainExamData.pageDetailSize = pagination.pageSize;
                    // trainExamData.getTableList();
                }}
                />
            </ScrollCon>
		</Wrapper>
	)
})
const Wrapper = styled.div``
const ScrollCon = styled.div`
  flex: 1;
  .cell-ipt .ant-input-number-input:focus {
    background: yellow !important;
  }
  .pre-wrap{
	white-space: pre-wrap;
  }
  .col-green{
	color: #06AA18;
  }
  .col-red{
	color: #f00;
  }

`;
const HeadCon = styled.div`
  height: 100px;
  background: #f2f2f2;
  position: relative;
  border-bottom: 1px solid #dddddd;
  .title {
    font-size: 24px;
    margin: 0 0 0 20px;
    font-weight: bold;
    min-height: 30px;
	color: #000;
  }
  .aside {
    font-size: 12px;
    color: #8c8c8c;
    margin: 0 0 0 20px;
  }
  .tool-con {
    position: absolute;
    bottom: 20px;
    right: 20px;
    /* width: 400px; */
    height: 45px;
    display: flex;
    align-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    button {
      margin-left: 15px;
      margin-bottom: 10px;
    }
  }
`