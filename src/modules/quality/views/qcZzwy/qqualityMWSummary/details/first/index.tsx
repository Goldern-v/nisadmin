import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHeader, PageTitle } from 'src/components/common'
import {
	Button,
} from "src/vendors/antd";
import BaseTable from "src/components/BaseTable";
import { firstData } from './firstData';
import FirsrtAddTable from './model/addTable';
import Table1Add from './model/table1_add'
import Table2Add from './model/table2_add'

export interface Props {
}

const TableList: React.FC<Props> = observer(function(props: Props) {
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
      dataIndex: 'groupName',
      width: 100,
      render: (value: any, row: any, index: number) => {
				const obj = {
					children: value,
					props: {},
				} as any;
				obj.props.rowSpan = mergeCells(row.groupId, firstData.firstTableList_UD, 'groupId', index)
				return obj
			}
    },
    {
			dataIndex: "qcName",
			align: "center",
      colSpan: 0,
      width: 160,
		},
		{
			title: "目标值",
			dataIndex: "nurseDeptTargetValue",
			align: "center",
      width: 100,
		},
		{
			title: "合格率",
			dataIndex: "evalRate",
			align: "center",
      width: 100,
		},
   
	]

  // 科室表
  const columns_DE: any = [
    {
      title: '项目',
      align: "center",
      dataIndex: 'qcName',
      width: 200
    },
		{
			title: "护理部目标值",
			dataIndex: "nurseDeptTargetValue",
			align: "center",
      width: 100,
		},
    {
			title: "科室目标值",
			dataIndex: "deptTargetValue",
			align: "center",
      width: 100,
		},
		{
			title: "合格率",
			dataIndex: "evalRate",
			align: "center",
      width: 100,
		},
   
	]

  let { qcReportItemDtoList, reportMasterData } = firstData?.detailsData

  const [table1_add, setTable1_add] = useState(false)
  const handleCancel = () => {
    setTable1_add(false);
  };

  const [table2_add, setTable2_add] = useState(false)
  const handleCancel2 = () => {
    setTable2_add(false);
  };
  const onEdit = (type: string) => {
    firstData.firstModalAdd = true
    if (type === 'nurse') {
      firstData.edit_type = 'nurse'
      firstData.edit_name = firstData.name_nurse
    } else {
      firstData.edit_type = 'deptName'
      firstData.edit_name = firstData.name_deptName
    }
    firstData.del = true;
  }
	
  return (
    <Wrapper>
      <PageHeader style={{ justifyContent: 'space-between'}}>
				<div>一、护理质量检查指标</div>
				<Button type="primary" size="small" onClick={() => firstData.firstModalAdd = true }>添加表</Button>
			</PageHeader>
      <FirsrtAddTable />
      { (firstData.name_nurse || firstData.type_deptName) && <>
        {/* 护理部 */}
        { (firstData.name_nurse)  && <ScrollCon>
          <div className='button'>
            <Button size="small" type="primary" onClick={() => onEdit('nurse')}>编辑</Button>
            <Button size="small" type="primary" onClick={() => setTable1_add(true) }>添加</Button>
          </div>
          <div className="hearder">{ firstData.name_nurse }</div>
          <BaseTable
            className="details-first_table"
            loading={firstData.tableLoading}
            dataSource={firstData.firstTableList_UD}
            columns={columns_UD.filter((item: any) => item)}
            surplusWidth={780}
          />
        </ScrollCon>}

        {/* 表1 添加数据model */}
        <Table1Add table_add={table1_add} handleCancel={handleCancel} />
        
        {/* 科室 */}
        {(firstData.name_deptName) && <ScrollCon>
          <div className='button'>
            <Button size="small" type="primary" onClick={() => onEdit('')}>编辑</Button>
            <Button size="small" type="primary" onClick={() => setTable2_add(true) }>添加</Button>
          </div>
          <div className="hearder">{ firstData.name_deptName }</div>
          <BaseTable
            className="details-first_table"
            loading={firstData.tableLoading}
            dataSource={firstData.firstTableList_DE}
            columns={columns_DE.filter((item: any) => item)}
            surplusWidth={780}
          />
        </ScrollCon>}

        {/* 表2 添加数据model */}
        <Table2Add table_add={table2_add} handleCancel={handleCancel2} />
      </>}
      
    </Wrapper>
  )
})

export default TableList;

const Wrapper = styled.div`
  .details-first_table{
    width: 100%;
    
  }
  #baseTable{
    padding: 10px 0 !important;
  }
  #baseTable .ant-table-body{
    overflow: auto !important;
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