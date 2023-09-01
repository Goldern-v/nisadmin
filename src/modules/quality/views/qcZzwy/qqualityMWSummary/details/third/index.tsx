import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHeader } from 'src/components/common'
import {
	Button,
  Input,
  Popconfirm
} from "src/vendors/antd";
import BaseTable from "src/components/BaseTable";
import { thirdData } from './data'

const { TextArea } = Input;


export default observer(function TableList() {

  // 护理部表
  const columns: any = [
    {
      key: 'idx',
      dataIndex: 'idx',
      title: '序号',
      width: 50,
      align: 'center',
      render(text: any, record: any, idx: number) {
        return idx + 1
      }
    },
    {
      title: '项目',
      dataIndex: 'project',
      width: 120,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return thirdData.tableList.length >= 1 ? (
          <Input 
            value={record['project']} 
            onChange={e => handleInputChange(e, index, 'project')} 
          />
          
        ) : null
      }
    },
		{
      title: '追踪前得分率',
      dataIndex: 'beforeScore',
      width: 80,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return thirdData.tableList.length >= 1 ? (
          <Input 
            value={record['beforeScore']} 
            onChange={e => handleInputChange(e, index, 'beforeScore')} 
          />
          
        ) : null
      }
    },
    {
      title: '追踪者',
      dataIndex: 'trailer',
      width: 80,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return thirdData.tableList.length >= 1 ? (
          <Input 
            value={record['trailer']} 
            onChange={e => handleInputChange(e, index, 'trailer')} 
          />
          
        ) : null
      }
    },
    {
      title: '追踪时间',
      dataIndex: 'time',
      width: 80,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return thirdData.tableList.length >= 1 ? (
          <Input 
            value={record['time']} 
            onChange={e => handleInputChange(e, index, 'time')} 
          />
          
        ) : null
      }
    },
    {
      title: '追踪前后分率',
      dataIndex: 'afterScore',
      width: 80,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return thirdData.tableList.length >= 1 ? (
          <Input 
            value={record['afterScore']} 
            onChange={e => handleInputChange(e, index, 'afterScore')} 
          />
          
        ) : null
      }
    },
    {
      title: '追踪结果',
      dataIndex: 'result',
      width: 80,
      align: 'center',
      render: (text: any, record: any, index: number) => {
        return thirdData.tableList.length >= 1 ? (
          <Input 
            value={record['result']} 
            onChange={e => handleInputChange(e, index, 'result')} 
          />
          
        ) : null
      }
    },
    {
      title: '操作',
      width: 60,
      align: 'center',
      dataIndex: 'operation',
      render: (text:any, record: any, index: number) => 
        thirdData.tableList.length >= 1 ? (
          <Popconfirm title="确定删除吗?" onConfirm={() => rowDelete(record, index)}>
            <a>删除</a>
          </Popconfirm>
      ) : null,
    },
	]
  const rowDelete = (row: any, index: number) => {
    thirdData.tableList.splice(index, 1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, text: string) => {
    const { value } = e.target;
    let newLsit = [...thirdData.tableList]
    newLsit[index][text] = value;
    thirdData.tableList = [...newLsit]
  }

  const addTableList = () => {
    let list = {
      project: '',
      beforeScore: '',
      trailer: '',
      time: '',
      afterScore: '',
      result: '',
    }
    thirdData.tableList = [ list, ...thirdData.tableList]
  }

	useEffect(() => {
    thirdData.getTableList()
	}, [])
	
  return (
    <Wrapper>
      <PageHeader style={{ justifyContent: 'space-between'}}>
				<div>三、效果评价</div>
			</PageHeader>
      <div>
        <TextArea value={thirdData.evaluate} onInput={(e: any) => thirdData.evaluate =  e.target.value } rows={5} />
      </div>

			<ScrollCon>
        <div className='button'>
          <div>追踪评价汇总表</div>
          <Button size="small" type="primary" onClick={ addTableList }>添加</Button>
        </div>
				<BaseTable
					className="details-first_table"
					loading={thirdData.tableLoading}
					dataSource={thirdData.tableList}
					columns={columns.filter((item: any) => item)}
					surplusWidth={780}
				/>
			</ScrollCon>
      
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
  .measures{
    margin-bottom: 10px;
  }
`
const ScrollCon = styled.div`
  width: 100%;
  flex: 1;
  .button{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  input {
    height: 26px;
    border: none;
  }
`;