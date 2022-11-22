import styled from 'styled-components'
import React, { Component, useState,useEffect } from 'react'
import { Button,Icon } from 'antd';
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker, Select,Empty, PaginationConfig, Modal, message, Input, Spin, Cascader } from 'src/vendors/antd'
const { TextArea } = Input
import { workInfoData } from './WorkInfoData';
import BaseTable, { DoCon } from "src/components/BaseTable";
import {nursingHandlerApi} from './../api/NursingHandlerApi';

export interface Props {
	payload: any;
}

export default function InfoManage(props: Props) {
	// 弹框
	const [visible, setVisible] = useState(false);
	const [textArea, setTextArea] = useState('');
	const [iptVal, setIptVal] = useState('');
	const [modalTitle, setModalTitle] = useState('添加内容');

	const [curItem, setCurItem] = useState({} as any);
	const user = JSON.parse(sessionStorage.getItem('user') || '')
	const [tableLoading, setTableLoading] = useState(false);
	const [confirmVisible, setConfirmVisible] = useState(false);

	const [columns, setColumns] = useState([
		{
			title: "提纲",
			dataIndex: "title",
			align: "center",
			width: 200
		},
		{
			title: "内容",
			dataIndex: "content",
			render: (text: any, record: any, index: number)=>{
				return <p className='textAreaP'>{text}</p>
			},
			// align: "center",
			// width: 30
			
		}
	] as any);
	const [data2, setData2] = useState([]);

	/**工作职责列表 */
	const getInfoList = ()=>{
		setTableLoading(true)
		nursingHandlerApi.getWorkInfoList({empNo:user.empNo}).then(res=>{
			setTableLoading(false)
			if(res.code == '200'){
				let dataList = res.data || []
				setData2(dataList)
			}else{
				message.error(res.desc)
			}
		}).catch(err=>{
			setTableLoading(false)
		})
	}

	/**添加内容 添加一行 */
	const addContent = ()=>{
		// let tableData2 = data2 || []
		// tableData2.unshift({
		// 	title:'',
		// 	id:'789'+data2.length,
		// 	content:''
		// })
		// setData2([])
		// setData2([...tableData2])
		
		// 弹框
		setVisible(true)
		// 初始化数据
		setIptVal('')
		setCurItem({})
		setTextArea('')
		setModalTitle('添加内容')
	}

	/**取消 */
	const handleCancel = ()=>{
		setVisible(false)
	}
	/**保存 */
	const checkForm = ()=>{
		// data2.map((it:any)=>{
		// 	if(it.id == curItem.id){
		// 		it.title = iptVal
		// 		it.content = textArea
		// 	}
		// })
		// handleCancel()
		if(iptVal.trim().length===0){
			message.warning('请输入提纲')
			return false
		}else if(textArea.trim().length===0){
			message.warning('请输入护士职责')
			return false
		}
		let paramter = {
			title:iptVal,
			content:textArea
		} as any
		if(curItem.id){
			paramter.id = curItem.id
		}
		// console.log(paramter)
		// return false
		nursingHandlerApi.saveWorkInfo(paramter).then(res=>{
			if(res.code=='200'){
				message.success('保存成功')
				setVisible(false)
				setData2(res.data || [])
			}else{
				message.error(res.desc)
			}
		}).catch(err=>{

		})
	}

	/**删除 */
	const handleDelete = ()=>{
		nursingHandlerApi.delWorkInfoItem({id:curItem.id}).then(res=>{
			if(res.code=='200'){
				message.success('删除成功')
				setVisible(false)
				setConfirmVisible(false)
				setData2(res.data || [])
			}else{
				message.error(res.desc)
			}
		}).catch(err=>{

		})
	}

	useEffect(() => {
		// console.log(JSON.parse(sessionStorage.getItem('user') || ''))
		
	  getInfoList()
	}, [])
	

	return (
		<Wrapper>
			<PageHeader>
				<h3 className='manage-title'>工作职责管理</h3>
				{/* <Place /> */}
			</PageHeader>
			<div className="main-contain">
				<Button type='primary' onClick={() => addContent()}>添加内容</Button>
				<p style={{fontSize:'12px',marginTop:'10px',marginBottom:'6px'}}><Icon type="exclamation-circle" style={{color:'#ee8c0b',fontSize:'14px'}} />&nbsp;双击表格进行内容修改和删除</p>
				<div>
					<BaseTable 
					locale={{emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"暂无工作职责"}/>}}
						className="record-page-table"
						loading={tableLoading}
						dataSource={data2}
						columns={columns.filter((item: any) => item)}
						surplusHeight={260}
						surplusWidth={300}	
						onRow={record => {
							return {
							  onDoubleClick: (event:any) => {
								setVisible(true)
								setCurItem(record)
								setIptVal(record.title || '')
								setTextArea(record.content || '')
								setModalTitle('修改')
								// console.log(record,event)
							  },
							};
						  }}
					/>
				</div>
			</div>
			<Modal
				width={540}
				visible={visible}
				onCancel={handleCancel}
				forceRender={true}
				title={modalTitle}
				footer={
			  		<div style={{ textAlign: "center" }}>
					<Button onClick={() => handleCancel()}>取消</Button>
					<Button
				  	type="primary"
				//   loading={editLoading}
				  	onClick={() => checkForm()}
					>保存
				</Button>
				{curItem.id && <Button onClick={()=>{setConfirmVisible(true)}} type="danger">删除</Button>}
			  </div>
			}>
				<ManageModal>
				<div className='info-manage-modal-body'>
				<p>提纲</p>
					<div className='info-manage-modal-title'>
						
						{/* <div> */}
						<Input placeholder="输入提纲…" maxLength={10} value={iptVal}
						onChange={(e: any) => {setIptVal(e.target.value)}} /></div>
					{/* </div> */}
					<div className="info-manage-modal-textarea">
					<p>请输入内容</p>
						<Input.TextArea autosize={{minRows: 8, maxRows: 15}} 
							placeholder="请输入内容…" value={textArea}
							onChange={(e: any) => {setTextArea(e.target.value)}}/>
					</div>
				</div>
				</ManageModal>
			</Modal>
			<Modal
				title="提示"
				visible={confirmVisible}
				onOk={() => handleDelete()}
				onCancel={()=>{setConfirmVisible(false)}}
				>
				<p>确定要删除吗？</p>
			</Modal>
		</Wrapper>
	)

}
const Wrapper = styled.div`
.manage-title{
	font-size: 20px;
    color: #333;
    font-weight: bold
}
.main-contain{
	/* position: absolute; */
  /* left: 0; */
  /* right: 0; */
  /* top: 50px; */
  /* bottom: 0; */
  background: #fff;
  padding: 15px;
  height: calc(100vh - 95px);
  &>div{
    /* background: #fff; */
  }
}

.textAreaP{
	/* white-space:normal;  */
	margin: 0;
	white-space:pre-wrap;
	word-break:break-all;
}



`
const ManageModal=styled.div`
p{
	margin: 0;
	margin-bottom: .3em;
	font-weight: bold;
}
/* 弹框 */
.info-manage-modal-body{
	width: 100%;
}
.info-manage-modal-title{
	display: flex;
	span{
		line-height: 32px;
	}
	input{
		flex: 1;
	}
}
.info-manage-modal-textarea{
	margin-top:15px;
	width: 100%;
}
`