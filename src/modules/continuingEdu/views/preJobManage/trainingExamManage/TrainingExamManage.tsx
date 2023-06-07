import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Select, Button, message } from "antd";
import BaseTable, { DoCon } from "src/components/BaseTable";
import { PageTitle } from "src/components/common";
import YearPicker from "src/components/YearPicker";
import moment from "moment";
import { globalModal } from "src/global/globalModal"
import { trainExamData } from './TrainExamData';
import AddBatchExamModal from './AddBatchExamModal';
import { appStore, authStore } from 'src/stores'
import { preJobManageApi } from "../PreJobManageApi";
import { fileDownload } from 'src/utils/file/file';
import qs from 'qs'
// import CopyBatch from './CopyBatch';
export interface Props {
	payload: any;
	getTitle: any;
}
const Option = Select.Option;

export default observer(function TrainingExamManage(props: Props) {
	const columns: any = [
		{
			title: "批次",
			dataIndex: "batch",
			align: "center",
			width: 80,
			//   render: (text: any, record: any, index: number)=>index+1
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
			render: (text: any, record: any, index: number) => {
				return (
					<DoCon>
						{/* <span className={Number(record.status)>0?'disable-sty':''} onClick={()=>{rutnToAduit(record,idx)}}>审核</span> */}
						{/* <span className={record.status=='1'?'':'disable-sty'} onClick={()=>{turnToUndo(record,idx)}}>撤销</span> */}
						{/* <span onClick={()=>{trainExamData.deptModal = true}}>分配科室</span> */}
						<span onClick={() => { turnToDetail(record) }}>查看</span>
						<span onClick={() => { turnToEdit(record) }}>修改</span>
						<span onClick={() => { removeTableItem(record, index) }}>删除</span>
					</DoCon>
				);
			}
		},
	]
	useEffect(() => {
		/**岗前理论考核 trainingExamManage 
 *  岗前实操考核 practiceExamManage */
		let pathnameArr = appStore.history.location.pathname.split('/')
		trainExamData.module = pathnameArr[pathnameArr.length - 1]
		// //   判断标题
		trainExamData.componentTitle = props.getTitle
		trainExamData.preType = trainExamData.module == 'trainingExamManage' ? '1' : '2'

		// // 初始化数据
		trainExamData.pageBatch = ''
		trainExamData.year = moment()
		trainExamData.getTableList()
		// console.log(props.getTitle)

	}, [props.getTitle])

	/**移除单个item */
	const removeTableItem = (record: any, index: number) => {
		globalModal
			.confirm(`提示`, `确定删除吗？`)
			.then((res) => {
				preJobManageApi.delTrainExam({ id: record.id }).then(resp => {
					message.success('删除成功！')
					trainExamData.tableList.splice(index, 1)
				}).catch(error => {

				})
			}).catch(err => {

			})
	}

	const turnToEdit = (record: any) => {
		trainExamData.modalTitle = '修改'
		trainExamData.batchExamModal = true
		// 初始化表单数据。。。
		trainExamData.addExam = record
	}

	useEffect(() => {
		trainExamData.getBatchList()
		trainExamData.getTableList()

	}, [])


	const handelInquire = () => {
		trainExamData.getTableList()
	}

	/**导出 */
	const onExport = () => {
		const { year, pageBatch: batch, preType } = trainExamData
		let fn = preJobManageApi.exportWithTE
		if (preType === '2') fn = preJobManageApi.exportWithTESC
		fn.call(preJobManageApi, {
			year: year?.format('YYYY'), batch, hospitalName: appStore.HOSPITAL_Name
		}).then(fileDownload)
	}

	const handleOk = () => {
		trainExamData.batchExamModal = false
	}
	const handleCancel = () => {
		trainExamData.batchExamModal = false

	}

	const turnToDetail = (record: any) => {
		// ?${qs.stringify(record)}
		const { id, batch } = record
		trainExamData.currentDetail = record
		trainExamData.passScore = record.passScore || 60
		appStore.history.push(`/trainExamDetail?${qs.stringify({ id, batch, year: trainExamData.year?.format('YYYY') })}`)
	}

	const turnToScore = () => {
		if (trainExamData.pageBatch == '') {
			message.warning('请选择一个批次进行查看')
			return false
		}
		appStore.history.push(`/trainExamScore`)
		trainExamData.getTableListAllScore()
	}

	// 点击新增
	const clickAdd = () => {
		trainExamData.batchExamModal = true;
		trainExamData.modalTitle = '新增';
		trainExamData.getNursingAll();
		trainExamData.addExam = {}
		trainExamData.addExam = trainExamData.addItem
	}

	return (
		<Wrapper>
			<Headerr>
				<LeftIcon>
					<PageTitle maxWidth={1000}>{trainExamData.componentTitle}</PageTitle>
				</LeftIcon>
				<RightIcon>
					<span style={{ marginRight: '10px' }}>年份：</span>
					<YearPicker
						allowClear={false}
						style={{ width: 120 }}
						value={trainExamData.year}
						onChange={(year: any) => {
							trainExamData.year = year;
							trainExamData.pageBatch = ''
							trainExamData.getTableList()
							trainExamData.getBatchList()
							// traineeShiftModal.allGroupOnload();
						}}
					/>

					<span style={{ marginRight: '10px', marginLeft: '15px' }}>批次：</span>
					<Select
						style={{ width: 160 }}
						value={trainExamData.pageBatch}
						onChange={(val: string) => {
							trainExamData.pageBatch = val
							trainExamData.getTableList()
						}}
					>
						<Select.Option value="">全部</Select.Option>
						{trainExamData.batchList.map((item: any, index: number) => {
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
					<Button className="span" onClick={() => onExport()} >导出</Button>
				</RightIcon>
			</Headerr>
			<ScrollCon>
				<BaseTable
					loading={trainExamData.tableLoading}
					dataSource={trainExamData.tableList}
					columns={columns}
					surplusWidth={300}
					surplusHeight={220}
					pagination={false}
				// pagination={{
				//     current: trainExamData.pageIndex,
				//     total: trainExamData.total,
				//     pageSize: trainExamData.pageSize,
				// }}
				// onChange={(pagination:any) => {
				//     trainExamData.pageIndex = pagination.current;
				//     trainExamData.total = pagination.total;
				//     trainExamData.pageSize = pagination.pageSize;
				// }}
				/>
			</ScrollCon>
			<AddBatchExamModal visible={trainExamData.batchExamModal} handleOk={handleOk} handleCancel={handleCancel} />

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