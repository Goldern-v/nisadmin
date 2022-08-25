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
			
		])
	}, [badEventData_gxjb.eventType])
	const columnList = [
		{
			title: "序号",
			dataIndex: "",
			render: (text: any, record: any, index: number) => index + 1,
			align: "center",
			width: 30
		},
		{
			title: "事件发生科室",
			dataIndex: "deptName",
			align: "center",
			width: 100
		},
		{
			title: "不良事件类型",
			dataIndex: "badEventType",
			align: "center",
			width: 100
		},
		{
			title: "事件发生对象的姓名",
			dataIndex: "patientName",
			align: "center",
			width: 100
		},
		{
			title: "病案号",
			dataIndex: "inHospitalNo",
			align: "center",
			width: 80
		},
		{
			title: "年龄",
			dataIndex: "age",
			align: "center",
			width: 40
		},
		{
			title: "诊断",
			dataIndex: "diagnosis",
			align: "center",
			width: 100
		},
		{
			title: "风跌倒/坠床风险评估结果",
			dataIndex: "ddzcfxpgjg",
			align: "center",
			width: 100
		},

		{
			title: "Barthel指数评定结果",
			dataIndex: "barthelAssess",
			align: "center",
			width: 80
		},
		{
			title: "事件发生日期",
			dataIndex: "happenDay",
			align: "center",
			width: 80
		},
		{
			title: "事件发生时间",
			dataIndex: "happenTime",
			align: "center",
			width: 80
		},
		{
			title: "事件发生班次",
			dataIndex: "happenShift",
			align: "center",
			width: 80
		},
		{
			title: "事件发生地点",
			dataIndex: "happenPlace",
			align: "center",
			width: 100
		},
		{
			title: "事件发生相关人员",
			dataIndex: "relevantPeople",
			align: "center",
			width: 80
		},
		{
			title: "事件发生相关人员/责任人姓名",
			dataIndex: "relevantPeopleName",
			align: "center",
			width: 60
		},
		{
			title: "发生时当事人层级",
			dataIndex: "relevantHierarchy",
			align: "center",
			width: 80
		},
		{
			title: "报告人",
			dataIndex: "reportPeople",
			align: "center",
			width: 60
		},
		{
			title: "上报护理部日期",
			dataIndex: "reportDay",
			align: "center",
			width: 80
		},
		{
			title: "上报护理部时间",
			dataIndex: "reportTime",
			align: "center",
			width: 80
		},
		{
			title: "跌倒/坠床时状态",
			dataIndex: "ddzcszt",
			align: "center",
			width: 100
		},
		{
			title: "事件发生的简要描述",
			dataIndex: "briefDesciption",
			align: "center",
			width: 100
		},
		
		{
			title: "跌倒/坠床造成的伤害",
			dataIndex: "ddzczcdsh",
			align: "center",
			width: 100
		},
		{
			title: "跌倒/坠床伤害级别",
			dataIndex: "ddzcshjb",
			align: "center",
			width: 100
		},
		{
			title: "护理部讨论不良事件级别",
			dataIndex: "eventLevel",
			align: "center",
			width: 100
		},
	]
	return (
		<Wrapper>
			<BadEventHeader />
			<ScrollCon>
				{/* <BadEventTable /> */}
				<BaseTable
					loading={badEventData_gxjb.tableLoading}
					dataSource={badEventData_gxjb.tableList}
					columns={columnClass as any}
					surplusHeight={230}
					surplusWidth={100}
					pagination={{
						current: badEventData_gxjb.pageIndex,
						total: badEventData_gxjb.total,
						pageSize: badEventData_gxjb.pageSize,
					}}
					onChange={(pagination) => {
						badEventData_gxjb.pageIndex = pagination.current;
						badEventData_gxjb.total = pagination.total;
						badEventData_gxjb.pageSize = pagination.pageSize;
						badEventData_gxjb.onload();
					}}
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