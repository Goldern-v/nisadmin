import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import BadEventHeader from './components/BadEventHeader'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { badEventData_gxjb } from './BadEvent_gxjb';
import { badEventApi_gxjb } from './api';


export default observer(function BadEventSummaryClassfiyGxjb(props) {
	// 解决方法2：const [students, setStudents] = useState<any>()
	// 解决方法3：const [students, setStudents] = useState([] as any[])
	// const [columnClass, setColumnClass] = useState<Array<{title?:any;dataIndex?:string;render?:any;align?:string;width?:number}>>([]);
	const [columnClass, setColumnClass] = useState<Array<{}>>([]);
	// const [deptList, setDeptList] = useState([]);

	useEffect(() => {
		badEventData_gxjb.init()

	}, [])

	useEffect(() => {
		setColumnClass([
			{
				title: "序号",
				dataIndex: "",
				render: (text: any, record: any, index: number) => index + 1,
				align: "center",
				width: 50
			},
			{
				title: "事件发生科室",
				dataIndex: "natureOfLearning",
				align: "center",
				width: 100
			},
			{
				title: "不良事件类型",
				dataIndex: "name",
				align: "center",
				width: 100
			},
			{
				title: "事件发生对象的姓名",
				dataIndex: "sex",
				align: "center",
				width: 100
			},
			{
				title: "病案号",
				dataIndex: "age",
				align: "center",
				width: 80
			},
			{
				title: "住院流水号",
				dataIndex: "post",
				align: "center",
				width: 80
			},
			{
				title: "入院日期",
				dataIndex: "title",
				align: "center",
				width: 80
			},
			{
				title: "年龄",
				dataIndex: "jit",
				align: "center",
				width: 40
			},
			{
				title: "诊断",
				dataIndex: "jite",
				align: "center",
				width: 100
			},
			{
				title: badEventData_gxjb.eventType.label + "风险评估结果",
				dataIndex: "jiter",
				align: "center",
				width: 100
			},

			{
				title: "Barthel指数评定结果",
				dataIndex: "jiterk",
				align: "center",
				width: 80
			},
			{
				title: "事件发生时间",
				dataIndex: "education",
				align: "center",
				width: 80
			},
			{
				title: "事件发生班次",
				dataIndex: "originalWorkUnit",
				align: "center",
				width: 80
			},
			{
				title: "事件发生地点",
				dataIndex: "studyDeptName01",
				align: "center",
				width: 100
			},
			{
				title: "事件发生相关人员",
				dataIndex: "studyTimeBegin",
				align: "center",
				width: 80
			},
			{
				title: "事件发生相关人员/责任人姓名",
				dataIndex: "studyTimeEnd",
				align: "center",
				width: 60
			},
			{
				title: "发生时当事人层级",
				dataIndex: "duration",
				align: "center",
				width: 80
			},
			{
				title: "报告人",
				dataIndex: "mattersForStudy",
				align: "center",
				width: 60
			},
			{
				title: "上报护理部时间",
				dataIndex: "phone",
				align: "center",
				width: 80
			},
			{
				title: badEventData_gxjb.eventType.label + "时患者状态",
				dataIndex: "jiterd",
				align: "center",
				width: 100
			},
			{
				title: "事件发生的简要描述",
				dataIndex: "teachingTeacher",
				align: "center",
				width: 100
			},
			{
				title: "事件处理结果",
				dataIndex: "teachingTeacherff",
				align: "center",
				width: 100
			},
			{
				title: "事件发生造成的后果",
				dataIndex: "teachingTeachefr",
				align: "center",
				width: 100
			},
			{
				title: "护理部讨论不良事件定性",
				dataIndex: "operationScore",
				align: "center",
				width: 100
			},
			{
				title: "护理部讨论不良事件级别",
				dataIndex: "theoryScore",
				align: "center",
				width: 100
			},
		])
	}, [badEventData_gxjb.eventType])

	return (
		<Wrapper>
			<BadEventHeader />
			<ScrollCon>
				{/* <BadEventTable /> */}
				<BaseTable
					// loading={bacisPostgraduateData.tableLoading}
					// dataSource={bacisPostgraduateData.tableList}
					columns={columnClass as any}
					surplusHeight={230}
					surplusWidth={100}
				// pagination={{
				//   current: bacisPostgraduateData.pageIndex,
				//   total: bacisPostgraduateData.total,
				//   pageSize: bacisPostgraduateData.pageSize,
				// }}
				// onChange={(pagination) => {
				//   bacisPostgraduateData.pageIndex = pagination.current;
				//   bacisPostgraduateData.total = pagination.total;
				//   bacisPostgraduateData.pageSize = pagination.pageSize;
				//   bacisPostgraduateData.onload();
				// }}
				/>
			</ScrollCon>
		</Wrapper>
	)
})
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollCon = styled.div`
  flex: 1;
`;