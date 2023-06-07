import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Button, InputNumber, Checkbox, message } from 'src/vendors/antd'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { appStore } from 'src/stores'
import BaseTable from "src/components/BaseTable";
import moment from 'moment'
import { theoryExamData } from './TheoryExamData'
import { preJobApi } from "../PreJobApi";
import { fileDownload } from 'src/utils/file/file'
export interface Props {
	payload: any;
}
export default observer(function TheoryExamDetail(props: Props) {
	const columns: any = [
		{
			title: "序号",
			dataIndex: "",
			align: "center",
			width: 30,
			render: (text: any, record: any, index: number) => index + 1
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
			render: (text: any, record: any, index: number) => <span className='pre-wrap'>{text}</span>
		},
		{
			title: "考核成绩",
			dataIndex: "examScore",
			align: "center",
			width: 80,
			render: (text: any, record: any, index: number) => {
				return (
					<InputNumber className='cell-ipt'
						defaultValue={text}
						key={record.id}
						step={1} min={1} max={150} style={{ width: '100%' }}
						onBlur={(e: any) => {
							theoryExamData.tableDetailList[index].examScore = e.target.value
							theoryExamData.tableDetailList = [...theoryExamData.tableDetailList]
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
			render: (text: any, record: any, index: number) => {
				return (
					// 1是，0否
					<Checkbox
						key={record.id}
						defaultChecked={text == '1' ? true : false}
						onChange={(e) => {
							theoryExamData.tableDetailList[index].resitFlag = e.target.checked ? '1' : '0'
							theoryExamData.tableDetailList = [...theoryExamData.tableDetailList]
						}}></Checkbox>
				)
			}
		},
		{
			title: "补考后的成绩",
			dataIndex: "resitScore",
			align: "center",
			width: 80,
			render: (text: any, record: any, index: number) => {
				return (
					<InputNumber className='cell-ipt'
						defaultValue={text}
						key={record.id}
						step={1} min={1} max={150} style={{ width: '100%' }}
						onBlur={(e: any) => {
							theoryExamData.tableDetailList[index].resitScore = e.target.value
							theoryExamData.tableDetailList = [...theoryExamData.tableDetailList]
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
			render: (text: any, record: any, index: number) => {
				// 0：及格，1=不及格
				if (theoryExamData.tableDetailList[index].resitScore == null && theoryExamData.tableDetailList[index].examScore == null) {
					return <span>--</span>
				}
				if (Number(theoryExamData.tableDetailList[index].examScore) < Number(theoryExamData.passScore)) {
					record.examResult = '不及格'
					return <span className='col-red'>不及格</span>
				}
				record.examResult = '及格'
				return <span className='col-green'>及格</span>

				// if (theoryExamData.tableDetailList[index].resitFlag == '1') {
				// 	// 有补考
				// 	if (Number(theoryExamData.tableDetailList[index].resitScore) < Number(theoryExamData.passScore)) {
				// 		return <span className='col-red'>不及格</span>
				// 	}
				// 	return <span className='col-green'>及格</span>
				// } else {
				// 	if (Number(theoryExamData.tableDetailList[index].examScore) < Number(theoryExamData.passScore)) {
				// 		return <span className='col-red'>不及格</span>
				// 	}
				// 	return <span className='col-green'>及格</span>
				// }
				// return <span>--</span>
			}
		},
	]

	const saveDetailList = () => {
		theoryExamData.tableDetailLoading = true
		preJobApi.updateExamDetail(theoryExamData.tableDetailList).then(res => {
			message.success('保存成功')
			theoryExamData.tableDetailLoading = false
		}).catch(err => {
			theoryExamData.tableDetailLoading = false
		})
	}

	/**导出 */
	const onExport = () => {
		preJobApi.exportWithTED({
			...appStore.queryObj, hospitalName: appStore.HOSPITAL_Name,
		}).then(fileDownload)
	}
	useEffect(() => {
		theoryExamData.getTableListAll(appStore.queryObj.id)
	}, [])

	return (
		<Wrapper>
			<HeadCon>
				<BaseBreadcrumb data={[{ name: theoryExamData.componentTitle, link: '/continuingEdu/' + theoryExamData.module }, { name: '详情', link: '' }]} />
				<div className='title'>{theoryExamData.componentTitle}{'详情'}</div>
				<div className='aside'>
					<span>
						创建时间:{theoryExamData.currerntDetail.createDate || moment().format('YYYY-MM-DD HH:mm:ss')}
					</span>
				</div>
				<div className='tool-con'>
					<Button onClick={() => appStore.history.goBack()}>返回</Button>
					<Button type='primary' onClick={() => { saveDetailList() }}>保存</Button>
					<Button className="span" onClick={() => onExport()} >导出</Button>
				</div>
			</HeadCon>
			<ScrollCon>
				<BaseTable
					loading={theoryExamData.tableDetailLoading}
					dataSource={theoryExamData.tableDetailList}
					columns={columns}
					surplusWidth={300}
					surplusHeight={255}
					pagination={{
						current: theoryExamData.pageDetailIndex,
						total: theoryExamData.totalDetail,
						pageSize: theoryExamData.pageDetailSize,
					}}
					onChange={(pagination: any) => {
						theoryExamData.pageDetailIndex = pagination.current;
						theoryExamData.totalDetail = pagination.total;
						theoryExamData.pageDetailSize = pagination.pageSize;
						// theoryExamData.getTableList();
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