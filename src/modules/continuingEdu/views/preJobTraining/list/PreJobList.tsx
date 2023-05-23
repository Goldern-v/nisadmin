import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Select, Input, Button, Row, Col,Modal,message } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { PageTitle } from "src/components/common";
import YearPicker from "src/components/YearPicker";
import { preJobListData } from './PreJobListData';
import AddNewNurseModal from './AddNewNurseModal';
import ConfirmBatch from './ConfirmBatch';
import { preJobApi } from '../PreJobApi';
import { globalModal } from "src/global/globalModal"
const Option = Select.Option;
const TextArea = Input.TextArea;
export default observer(function PreJobList() {
	//选中的行下标
	const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[]);
	
	useEffect(() => {
		preJobListData.getTableList()
		preJobListData.getBatchList()
	}, [])
	
	const columns: any = [
        {
          title: "培训批次",
          dataIndex: "batch",
          align: "center",
          width: 120,
		  render: (text: any, record: any, index: number) => {
			return (<>
				<Select
          style={{ width: 80 }}
				defaultValue={text}
				key={record.id}
          onChange={(val: string) => {
						preJobListData.tableList[index].batch = val
          }}
        >
          {preJobListData.batchList.map((item:any,index:number)=>{
            return <Option value={item.batch} key={index}>{item.batch}</Option>
          })}
        </Select>
			</>)
		  }
        },
		{
			title: "姓名",
			dataIndex: "name",
			align: "center",
			width: 80
		},
		{
			title: "性别",
			dataIndex: "sex",
			align: "center",
			width: 80,
			render: (text: any, record: any, index: number)=>{
				return <span>{text=='1'?'男':'女'}</span>
				}
		},
		{
			title: "年龄",
			dataIndex: "age",
			align: "center",
			width: 80
		},
		{
			title: "职称",
			dataIndex: "title",
			align: "center",
			width: 80
		},
		{
			title: "初始学历",
			dataIndex: "1initialEducation12",
			align: "center",
			width: 80
		},
		{
			title: "最高学历",
			dataIndex: "highEducation",
			align: "center",
			width: 80
		},
		{
			title: "婚姻状态",
			dataIndex: "marryStatus",
			align: "center",
			width: 80
		},
		{
			title: "毕业院校",
			dataIndex: "school",
			align: "center",
			width: 80
		},
		{
			title: "分配科室",
			dataIndex: "dept",
			align: "center",
			width: 80
		},
		{
			title: "原工作单位",
			dataIndex: "oriWork",
			align: "center",
			width: 160,
			render: (text: any, record: any, index: number)=>{
				return(
					<TextArea className='cell-ipt' 
					defaultValue={text}
					key={record.id}
					autosize={{minRows: 1}} 
					onBlur={(e: any) =>
							preJobListData.tableList[index].oriWork = e.target.value
					  }
					 ></TextArea>
				)
			}
		},
		{
			title: "工龄",
			dataIndex: "workYear",
			align: "center",
			width: 80
		},
		{
			title: "现住址",
			dataIndex: "address",
			align: "center",
			width: 80
		},
		{
			title: "联系方式",
			dataIndex: "mobileNum",
			align: "center",
			width: 80
		},
		{
			title: "备注",
			dataIndex: "remark",
			align: "center",
			width: 160,
			render: (text: any, record: any, index: number)=>{
				return(
					<TextArea className='cell-ipt' 
						defaultValue={text}
						key={record.id}
						autosize={{minRows: 1}} 
						onBlur={(e: any) =>{
							preJobListData.tableList[index].remark = e.target.value;
						}}
					 ></TextArea>
				)
			}
		},
		{
			title: "操作 ",
			dataIndex: "cz",
			align: "center",
			width: 160,
			render:(text: any, record: any, index: number)=>{
				return (
					<DoCon>
						<span onClick={()=>{openDeptModal(index)}}>分配科室</span>
                        <span onClick={()=>{saveTableItem(record)}}>保存</span>
						<span onClick={()=>{removeTableItem(record,index)}}>移出</span>
					</DoCon>
				);
			}
		},
	]
	/**打开分配科室框 */
	const openDeptModal = (index:number)=>{
		preJobListData.getNursingAll();
		preJobListData.deptModal = true
		preJobListData.deptCurrentObj = preJobListData.tableList[index]
		preJobListData.deptCurrentIndex = index

	}
	const rowSelection = {
		selectedRowKeys: selectedRowKeys,
		onChange: (selectedRowKeys: any, selectedRows: any) => {
		  setSelectedRowKeys(selectedRowKeys)
		}
	  }
	  const handleCancel = ()=>{
        preJobListData.addModal = false
    }
    const handleOk = ()=>{
        preJobListData.addModal = false
    }

		/**保存 */
		const saveTableItem = (record:any)=>{
			// console.log(record)
			if(record.dept==""){
				message.warning('请先分配科室')
				return false
			}
			preJobApi.employeeModify(record).then(res=>{
				message.success('保存成功！')
			}).catch(err=>{

			})
		}
		/**移除单个item */
		const removeTableItem = (record:any,index:number)=>{
			
			globalModal
			.confirm( `提示`,`确定移出吗？`)
			.then((res) => {
				preJobApi.employeeDel([record.empNo]).then(resp=>{
					message.success('删除成功！')
					preJobListData.tableList.splice(index,1)
				}).catch(error=>{
		
				})
			}).catch(err=>{
	
			})	
		}

	// 录入批次确认
	const handleOkBatch = ()=>{
		preJobListData.batchModal = false
		handleOk()
	}
	const handleCancelBatch = ()=>{
		preJobListData.batchModal = false
	}

	const deptHandleOk = ()=>{
		preJobListData.deptModal = false
		preJobListData.tableList[preJobListData.deptCurrentIndex].dept = preJobListData.selectDeptObj.label
		preJobListData.tableList[preJobListData.deptCurrentIndex].deptCode = preJobListData.selectDeptObj.key
	}
	const deptHandleCancel = ()=>{
		preJobListData.deptModal = false
	
	}
	/**点击新增 */
	const clickAdd = ()=>{
		preJobListData.addModal=true;
		preJobListData.initParamter();
		preJobListData.getNurseList();
		preJobListData.getNursingAll()
	}
	/**移除很多 */
	const removeList = ()=>{
		console.log(selectedRowKeys)
		if(selectedRowKeys.length<1){
			message.warning('请先选择要移出的人！')
			return false
		}
		globalModal
		.confirm( `提示`,`确定移出吗？`)
		.then((res) => {
			preJobApi.employeeDel(selectedRowKeys).then(resp=>{
				message.success('移出成功！')
				preJobListData.getTableList()
				setSelectedRowKeys([])
			}).catch(error=>{
	
			})
		}).catch(err=>{

		})	
	}
	return (
		<Wrapper>
			<Headerr>
				<LeftIcon>
					<PageTitle maxWidth={1500}>{'岗前培训人员名单'}</PageTitle>
				</LeftIcon>
				<RightIcon>
				<span style={{marginRight:'10px'}}>年份：</span>
					<YearPicker
						allowClear={false}
						style={{ width: 120 }}
						value={preJobListData.year}
						onChange={(year: any) => {
							preJobListData.year = year;
							// 查询批次
							preJobListData.selectBatch = ''
							preJobListData.getBatchList()

							preJobListData.getTableList()
						}}
					/>
					
					<span style={{marginRight:'10px',marginLeft:'15px'}}>批次：</span>
					<Select
					style={{ width: 160 }}
					value={preJobListData.selectBatch}
					onChange={(val: string) => {
						preJobListData.selectBatch = val
						preJobListData.getTableList()
					}}
					>
						<Select.Option value="">全部</Select.Option>
					{preJobListData.batchList.map((item:any,index:number)=>{
						return <Option value={item.batch} key={index}>{item.batch}</Option>
					})}
					</Select>
					<Input
						style={{ width: 180, marginLeft: 10, marginRight: 5 }}
						placeholder="请输入姓名关键字信息"
						value={preJobListData.keyWord}
						onChange={(e: any) =>{
							preJobListData.keyWord = e.target.value
						}}
					/>
					<Button
						type="primary"
						className="span"
						onClick={()=>{preJobListData.getTableList();setSelectedRowKeys([])}}
						>
						查询
					</Button>
					<Button className="span" onClick={removeList}>移出</Button>
					<Button className="span" onClick={()=>preJobListData.exportExcel()}>导出</Button>
					<Button className="span" onClick={()=>{clickAdd()}}>新增</Button>
				</RightIcon>
			</Headerr>
			<ScrollCon>
                <BaseTable
                loading={preJobListData.tableLoading}
                dataSource={preJobListData.tableList}
				rowSelection={rowSelection}
                columns={columns}
				rowKey="id"
                surplusWidth={300}
                surplusHeight={220}
                pagination={{
                    current: preJobListData.pageIndex,
                    total: preJobListData.total,
                    pageSize: preJobListData.pageSize,
                }}
                onChange={(pagination:any) => {
                    preJobListData.pageIndex = pagination.current;
                    preJobListData.total = pagination.total;
                    preJobListData.pageSize = pagination.pageSize;
					setSelectedRowKeys([]);
                    preJobListData.getTableList();
                }}
                />
            </ScrollCon>
			<AddNewNurseModal visible={preJobListData.addModal} handleOk={handleOk} handleCancel={handleCancel}></AddNewNurseModal>
			<ConfirmBatch visible={preJobListData.batchModal} handleOk={handleOkBatch} handleCancel={handleCancelBatch} />
			<MModal>
				<Modal width={400}
					title="分配科室"
					visible={preJobListData.deptModal}
					onOk={deptHandleOk}
					onCancel={deptHandleCancel}
				>
					<div className='modal-content'>
						
						<Row className="item-row" style={{ marginTop: '15px' }}>
							<Col span={4}>
								<div className="label">新科室:</div>
							</Col>
							<Col span={16}>
								<Select
									style={{ width: '100%' }}
									labelInValue
									showSearch
									key={preJobListData.deptCurrentObj.id}
									defaultValue={
										{key: preJobListData.deptCurrentObj.deptCode,
										label: preJobListData.deptCurrentObj.dept}
								}
									filterOption={(input:any, option:any) =>
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
									onChange={(val: any) => {
										preJobListData.selectDeptObj = val
									}}
									>
									{
										preJobListData.deptList.map((v: any, i: number) => (
											<Select.Option key={i} value={v.code}>{v.name}</Select.Option>
										))
									}
								</Select>
							</Col>
						</Row>
					</div>
				</Modal>
			</MModal>
		</Wrapper>
	)
})
const MModal = styled.div``
const Wrapper = styled.div`
	height: 100%;
    display: flex;
    flex-direction: column;
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