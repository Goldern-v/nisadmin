import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Select, Input, Button, Row, Col,Modal,message,DatePicker,TimePicker  } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { PageTitle } from "src/components/common";
import moment, {Moment} from "moment";
import YearPicker from "src/components/YearPicker";
import { trainingPlanManageData } from './TrainingPlanManageData';
import AddModal from './AddModal';
import createModal from 'src/libs/createModal'
import { globalModal } from "src/global/globalModal"
import PreviewModal from 'src/utils/file/modal/PreviewModal';
import {preJobManageApi} from "../PreJobManageApi";
const Option = Select.Option;
const TextArea = Input.TextArea;
export interface Props {
	payload: any;
}
export default observer(function TrainingPlanManage(props: Props) {
	const previewModal = createModal(PreviewModal)
	const columns: any = [
        {
          title: "序号",
          dataIndex: "",
          align: "center",
          width: 80,
		  render: (text: any, record: any, index: number)=>index+1
        },
		{
			title: "标题",
			dataIndex: "courseName",
			align: "center",
			width: 200,
			
		},
		{
			title: "提交人",
			dataIndex: "submitter",
			align: "center",
			width: 120,
			
		},
		{
			title: "提交时间",
			dataIndex: "uploadDate",
			align: "center",
			width: 160,
			render: (text: any, record: any, index: number)=>moment(text).format('YYYY-MM-DD hh:mm:ss')
			
		},
		{
			title: "修改时间",
			dataIndex: "modifyDate",
			align: "center",
			width: 160,
			render: (text: any, record: any, index: number)=>moment(text).format('YYYY-MM-DD hh:mm:ss')
		},
		{
			title: "操作 ",
			dataIndex: "cz",
			align: "center",
			width: 160,
			render:(text: any, record: any, index: number)=>{
				return (
					<DoCon>
						{/* <span className={Number(record.status)>0?'disable-sty':''} onClick={()=>{rutnToAduit(record,idx)}}>审核</span> */}
						<span onClick={()=>{handDownload(record)}}>下载</span>
						<span onClick={()=>{resetFile(record)}}>重新上传</span>
                        <span onClick={() => showReview(record)}>预览</span>
						{/* <span onClick={() => showReview(record.file)}>{record.file?.name}</span> */}
						<span onClick={()=>{removeTableItem(record,index)}}>删除</span>
					</DoCon>
				);
			}
		},
	]
	
	useEffect(() => {
		trainingPlanManageData.getTableList()
	
	}, [])

	// 下载
  const handDownload = (record: any) => {
    // console.log(record.coursePath);
    let a = document.createElement("a");
    a.href = record.coursePath;
    a.download = record.courseName; // 自定义文件名
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // 移除a元素
  };

	const resetFile = (record:any)=>{
		trainingPlanManageData.currentItem = record
		trainingPlanManageData.uploadFileItem={
			id:record.attachmentId,
			name:record.courseName
		}
		trainingPlanManageData.importModal = true
	}
	

	// 文件预览
    const showReview = (file: any) => {
        previewModal.show({
		// 	title: '核心能力评估表模板.xls',
        //   path: 'http://192.168.1.54:9891/crNursing/asset/attachment/practiceManual/202303/20230316171222Y8L3mmmm.xls',
        //   id: '8216',
          title: file.courseName,
          path: file.coursePath,
          id: file.attachmentId,
        })
    }

	const removeTableItem = (record:any,index:number)=>{
		globalModal
			.confirm( `提示`,`是否确定删除？`)
			.then((res) => {
				preJobManageApi.delPlaning({id:record.id}).then(resp=>{
					message.success('删除成功！')
					trainingPlanManageData.tableList.splice(index,1)
				}).catch(error=>{
		
				})
			}).catch(err=>{
	
			})	
	}
	const handelInquire = ()=>{
		trainingPlanManageData.getTableList()
	}

	const handleOk = ()=>{
		trainingPlanManageData.importModal = false
	}
	const handleCancel = ()=>{
		trainingPlanManageData.importModal = false
	
	}
	const openModal = ()=>{
		trainingPlanManageData.currentItem = {}
		trainingPlanManageData.uploadFileItem = {}
		trainingPlanManageData.importModal = true
	
	}
	return (
		<Wrapper>
			<Headerr>
				<LeftIcon>
					<PageTitle maxWidth={1000}>{'培训计划'}</PageTitle>
				</LeftIcon>
				<RightIcon>
				<span style={{marginRight:'10px'}}>年份：</span>
					<YearPicker
						allowClear={false}
						style={{ width: 120 }}
						value={trainingPlanManageData.year}
						onChange={(year: any) => {
							trainingPlanManageData.year = year;
							trainingPlanManageData.getTableList()
						// traineeShiftModal.allGroupOnload();
						}}
					/>
					
					
					<Button
						type="primary"
						className="span"
						onClick={handelInquire}
						>
						查询
					</Button>
					<Button className="span" onClick={openModal}>导入</Button>
				</RightIcon>
			</Headerr>
			<ScrollCon>
                <BaseTable
                loading={trainingPlanManageData.tableLoading}
                dataSource={trainingPlanManageData.tableList}
                columns={columns}
                surplusWidth={300}
                surplusHeight={220}
                pagination={{
                    current: trainingPlanManageData.pageIndex,
                    total: trainingPlanManageData.total,
                    pageSize: trainingPlanManageData.pageSize,
                }}
                onChange={(pagination:any) => {
                    trainingPlanManageData.pageIndex = pagination.current;
                    trainingPlanManageData.total = pagination.total;
                    trainingPlanManageData.pageSize = pagination.pageSize;
                    trainingPlanManageData.getTableList();
                }}
                />
            </ScrollCon>
			<previewModal.Component />
			<AddModal visible={trainingPlanManageData.importModal} handleOk={handleOk} handleCancel={handleCancel} />
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