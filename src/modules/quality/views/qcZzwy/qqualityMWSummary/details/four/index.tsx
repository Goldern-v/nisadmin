import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHeader, PageTitle } from 'src/components/common'
import {
	Button,
  Input
} from "src/vendors/antd";
import BaseTable from "src/components/BaseTable";
import { fourData } from './fourData';
import FirsrtAddTable from './model/addTable';
import TableAddData from './model/table_add_data'

const { TextArea } = Input;

export default observer(function TableList() {

  // 科室表
  const columns: any = [
    {
      title: '项目',
      align: "center",
      dataIndex: 'qcName',
      width: 180
    },
		{
			title: "合格率",
			dataIndex: "evalRate",
			align: "center",
      width: 120,
		},
    {
			title: "本季度",
			dataIndex: "evalRate",
			align: "center",
      width: 120,
		},
   
	]

  const [table_add_data, setTable_add_data] = useState(false)
  const handleCancel = () => {
    setTable_add_data(false);
  };

  const onEdit = () => {
    fourData.Addtable = true
    fourData.del = true
  }

	useEffect(() => {
		fourData.getTableList()
	}, [])
	
  return (
    <Wrapper>
      <PageHeader style={{ justifyContent: 'space-between'}}>
				<div>四、特殊科室质量检查完成情况</div>
				<Button type="primary" size="small" onClick={() => fourData.Addtable = true }>添加表</Button>
			</PageHeader>
      <div>
        <TextArea value={fourData.performance} onInput={(e: any) => fourData.performance =  e.target.value } rows={5} />
      </div>
      <FirsrtAddTable />

      {(fourData.nameTS) && <>
        
        {/* 科室 */}
        <ScrollCon>
          <div className='button'>
            <Button size="small" type="primary" onClick={onEdit} >编辑</Button>
            <Button size="small" type="primary" onClick={() => setTable_add_data(true) }>添加</Button>
          </div>
          <div className="hearder">{ fourData.nameTS }</div>
          <BaseTable
            className="details-first_table"
            loading={fourData.tableLoading}
            dataSource={fourData.tableList}
            columns={columns.filter((item: any) => item)}
            surplusWidth={780}
          />
        </ScrollCon>
        {/* table添加数据 */}
        <TableAddData table_add_data={table_add_data} handleCancel={handleCancel} />
      </>}
      
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
  .bHdIpD#baseTable .ant-table-body{
    overflow-y: auto !important
  }
`
const ScrollCon = styled.div`
  width: 100%;
  flex: 1;
  margin-top: 10px;
  .button{
    display: flex;
    justify-content: flex-end;
  }
  .hearder{
    text-align: center;
    font-weight: bold;
  }
`;