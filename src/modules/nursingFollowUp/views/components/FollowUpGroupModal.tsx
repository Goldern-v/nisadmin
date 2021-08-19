import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'src/vendors/antd'
import BaseTable from 'src/components/BaseTable'
import { DoCon } from 'src/components/BaseTable'
import FollowUpGroupManageServices from '../followUpGroupManage/services/FollowUpGroupManageServices'
const api = new FollowUpGroupManageServices();




export default function EidtModal(props: any) {
  const { visible, onCancel } = props
  const [editUserType, setEditUserType] = useState('1')
  const [loading, setLoading] = useState(false)
  const [editParams, setEidtParams] = useState({} as any)
  const [searchText, setSearchText] = useState('')
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)

  useEffect(() => {
    let {templateList = [], setTemplateList} = props;
    setTableData(templateList)
  }, [
    props.templateList
  ])
  const addFollowUpGroup = () => {
    let index = tableData.length + 1
    let tableArr:any = [...tableData,{teamId :index, teamName:""}]
    setTableData(tableArr)
  }

  //删除
  const onDelete = (record: any, index: any) => {
    Modal.confirm({
      title: '确认删除该记录吗',
      centered: true,
      onOk: () => {
        
        api
          .delete({
            teamId: record.teamId,
          })
          .then((res) => {
            tableData.splice(index, 1);
            let newArr = [...tableData];
            setTableData(newArr)
          }, )
      }
    })
  }
  const handleOk = () => {
    console.log(tableData);
    // props.getData();
    // props.getTemplateList();
    
  }
  const onAdd =(record: any) => {
    api
      .saveOrUpdate({
        teamId: record.teamId,
        teamName: record.teamName,
      })
      .then((res) => {
        
      }, )
  }
  const columns: any = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50,
    },
    {
      title: '小组名称',
      dataIndex: 'teamName',
      key: 'teamName',
      align: 'center',
      width: 100,
      render: (text: string, record: any) => {
        return (
          <div>
            <Input
              style={{ width: 150 }}
              value={record.teamName}
              onChange={(e: any) => {
                record.teamName = e.currentTarget.value
                setTableData([...tableData])
              }}
            />
          </div>
        )
      }
    },
    {
      title: '操作',
      width: 80,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onAdd(record)}>保存</span>
            <span onClick={() => onDelete(record,index)}>删除</span>
          </DoCon>
        )
      }
    }
  ]

  return <Modal
    title={'设置随访小组'}
    width={500}
    centered
    okText={'保存'}
    confirmLoading={loading}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Button onClick={addFollowUpGroup} className='ml-20'>
        添加小组
      </Button>
      <BaseTable
        dataSource={tableData}
        columns={columns}
        bordered
        loading={loadingTable}
      />
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
.ml-20 {
  margin-left: 20px;
}
  
`