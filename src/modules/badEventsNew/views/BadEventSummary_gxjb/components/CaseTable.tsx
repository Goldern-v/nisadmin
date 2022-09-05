import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { authStore } from 'src/stores'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { Button, Modal, message as Message, Table } from "antd";
import { badEventCaseData_gxjb } from './../BadEventCase_gxjb';

export default observer(function CaseTable(props) {

	const columns: any = [
		{
			title: () => {
				return (
					<div className='table-hed-left'>
						<span className='ml'>{badEventCaseData_gxjb.queryType == '1' ? '科室' : '月份'}</span>
						<span className='mr'>类别</span>
					</div>
				)
			},
			className: 'hua-line',
			dataIndex: "deptname",
			align: "center",
			width: 100,
			render: (text: any, record: any, index: number) => {
				if (badEventCaseData_gxjb.queryType == '1') {
					return text
				} else {
					if (Number(text) > 0) {
						return badEventCaseData_gxjb.monthList[Number(text)-1]
					}else{
						return text
					}
				}
			}
		},
		{
			title: "跌倒/坠床",
			dataIndex: "ddzc",
			align: "center",
			width: 100
		},
		{
			title: "非计划拔管",
			dataIndex: "fjhbg",
			align: "center",
			width: 100
		},
		{
			title: "院内压力性损伤",
			dataIndex: "ylxss",
			align: "center",
			width: 100
		},
		{
			title: "给药错误",
			dataIndex: "gycw",
			align: "center",
			width: 80
		},
		{
			title: "护士锐器伤",
			dataIndex: "rqs",
			align: "center",
			width: 80
		},
		{
			title: "其他",
			children: [
				{
					title: '烫伤',
					dataIndex: 'qtts',
					align: "center",
					width: 80
				},
				{
					title: '冻伤',
					dataIndex: 'qtds',
					align: "center",
					width: 80
				},
				{
					title: '标本采集错误',
					dataIndex: 'qtbbcjcw',
					align: "center",
					width: 90
				},
				{
					title: '输血相关事件',
					dataIndex: 'qtsxxgsj',
					align: "center",
					width: 90
				},
				{
					title: '患者走失',
					dataIndex: 'qthzzs',
					align: "center",
					width: 80
				},
				{
					title: '护理投诉',
					dataIndex: 'qthlts',
					align: "center",
					width: 80
				},
				{
					title: '其他',
					dataIndex: 'qtqt',
					align: "center",
					width: 80,
					className: 'table-border-right'
				},
			]
		},
		{
			title: "合计",
			dataIndex: "total",
			align: "center",
			width: 80
		},

	];

	return (
		<Wrapper>
			<BaseTable
				loading={badEventCaseData_gxjb.tableLoading}
				dataSource={badEventCaseData_gxjb.tableList}
				columns={columns}
				surplusHeight={230}
				surplusWidth={100}
			
			/>
		</Wrapper>
	)
})
// svg生成base64的网址  https://base64.us/  stroke是颜色 stroke-width线的粗细
{/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="100%" stroke="#333" stroke-width="0.5"/></svg> */ }
const Wrapper = styled.div`
.ant-table-thead .hua-line {
		background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9IiNjY2MiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+) no-repeat 100% center;   
		box-sizing: border-box;
	}
.ml{
  float: left;
  padding-left: 10px;
}
.mr{
  float: right;
  padding-right: 10px;
}
.table-border-right{
  border-right: 1px solid #e8e8e8 !important;
}


`