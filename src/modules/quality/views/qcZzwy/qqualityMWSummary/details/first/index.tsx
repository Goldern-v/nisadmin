import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { PageHeader, PageTitle } from 'src/components/common'
import {
	Button,
} from "src/vendors/antd";
import BaseTable from "src/components/BaseTable";
import { firstData } from './firstData';
import { table1AddDaeta } from './model/table1_add_data';
import { table2AddDaeta } from './model/table2_add_data';
import FirsrtAddTable from './model/addTable';
import Table1Add from './model/table1_add'
import Table2Add from './model/table2_add'

export default observer(function TableList() {
	// 动态合并单元格
	const mergeCells = (text: string, data: any, key: string, index: number) => {
		if (text == '') {
			// 没有code值的时候
			return 1
		}
		if (index !== 0 && text === data[index - 1][key]) {
			return 0
		}
		let rowSpan = 1

		for (let i = index + 1; i < data.length; i++) {
			if (text !== data[i][key]) {
				break;
			}
			rowSpan++
		}
		return rowSpan
	}
  // 护理部表
  const columns_UD: any = [
    {
      title: '项目',
      colSpan: 2,
      align: "center",
      dataIndex: 'qcName',
      width: 160,
      render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: {},
				} as any;
				obj.props.rowSpan = mergeCells(row.id, firstData.firstTableList_UD, 'id', index)
				return obj
			}
    },
    {
			dataIndex: "totalScore",
			align: "center",
      colSpan: 0,
      width: 100,
		},
		{
			title: "目标值",
			dataIndex: "totalScore",
			align: "center",
      width: 100,
		},
		{
			title: "合格率",
			dataIndex: "realScore",
			align: "center",
      width: 100,
		},
   
	]

  // 科室表
  const columns_DE: any = [
    {
      title: '项目',
      colSpan: 2,
      align: "center",
      dataIndex: 'qcName',
      width: 160,
      render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: {},
				} as any;
				obj.props.rowSpan = mergeCells(row.id, firstData.firstTableList_UD, 'id', index)
				return obj
			}
    },
    {
			dataIndex: "totalScore",
			align: "center",
      colSpan: 0,
      width: 100,
		},
		{
			title: "护理部目标值",
			dataIndex: "totalScore1",
			align: "center",
      width: 100,
		},
    {
			title: "科室目标值",
			dataIndex: "totalScore2",
			align: "center",
      width: 100,
		},
		{
			title: "合格率",
			dataIndex: "realScore",
			align: "center",
      width: 100,
		},
   
	]

	useEffect(() => {
		firstData.getTableList()
	}, [])
	
  return (
    <Wrapper>
      <PageHeader style={{ justifyContent: 'space-between'}}>
				<div>一、护理质量检查指标</div>
				<Button type="primary" size="small" onClick={() => firstData.firstModalAdd = true }>添加表</Button>
			</PageHeader>
      <FirsrtAddTable />

      {/* 护理部 */}
			<ScrollCon>
        <div className='button'>
          <Button size="small" type="primary">编辑</Button>
          <Button size="small" type="primary" onClick={() => table1AddDaeta.table1_add = true }>添加</Button>
        </div>
        <div className="hearder">表1  202x年第x季度临床护理质量检查过程指标情况</div>
				<BaseTable
					className="details-first_table"
					loading={firstData.tableLoading}
					dataSource={firstData.firstTableList_UD}
					columns={columns_UD.filter((item: any) => item)}
					surplusWidth={780}
					surplusHeight={420}
				/>
			</ScrollCon>

      {/* 表1 添加数据model */}
      <Table1Add />
      
      {/* 科室 */}
      <ScrollCon>
        <div className='button'>
          <Button size="small" type="primary">编辑</Button>
          <Button size="small" type="primary" onClick={() => table2AddDaeta.table2_add = true }>添加</Button>
        </div>
        <div className="hearder">表2  202x年第x季度临床护理质量检查过程指标情况</div>
				<BaseTable
					className="details-first_table"
					loading={firstData.tableLoading}
					dataSource={firstData.firstTableList_DE}
					columns={columns_DE.filter((item: any) => item)}
					surplusWidth={780}
					surplusHeight={420}
				/>
			</ScrollCon>

       {/* 表2 添加数据model */}
       <Table2Add />
      
    </Wrapper>
  )
})
const Wrapper = styled.div`
  .details-first_table{
    width: 100%;
  }
  #baseTable{
    padding: 10px 0 !important;
  }
`
const ScrollCon = styled.div`
  width: 100%;
  flex: 1;
  .button{
    display: flex;
    justify-content: flex-end;
  }
  .hearder{
    text-align: center;
    font-weight: bold;
  }
`;