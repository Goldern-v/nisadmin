import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'src/vendors/antd'
import BaseTable from 'src/components/BaseTable'
import { DoCon } from 'src/components/BaseTable'
import FollowUpGroupManageServices from '../followUpGroupManage/services/FollowUpGroupManageServices'
import { message } from 'antd/es'

const api = new FollowUpGroupManageServices();




export default function EidtModal(props: any) {
  let [query, setQuery] = useState({
    pageSize: 20,
    pageIndex: 1
  })
  const { visible, onCancel } = props
  const [editUserType, setEditUserType] = useState('1')
  const [loading, setLoading] = useState(false)
  const [editParams, setEidtParams] = useState({} as any)
  const [searchText, setSearchText] = useState('')
  const [pageLoading, setPageLoading] = useState(false)
  const [dataTotal, setDataTotal] = useState(0)
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value)
  }
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)

  useEffect(() => {
    getData()
  }, [
    query.pageIndex,
    query.pageSize,
    
  ])

  const getData = () => { 
    setPageLoading(true)
    api
      .queryPageList({
        ...query,
      })
      .then((res) => {
        setPageLoading(false)
        setDataTotal(res.data.totalCount)
        setTableData(res.data.list)
      }, err => setPageLoading(false))
  }
  

  const addFollowUpGroup = () => {
    let tableArr:any = [...tableData,{teamId :"", teamName:""}]
    setTableData(tableArr)
  }

  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  //删除
  const onDelete = (record: any, index: any) => {
    Modal.confirm({
      title: '确认删除该随访小组？',
      centered: true,
      onOk: () => {
        tableData.splice(index, 1);
        let newArr = [...tableData];
        setTableData(newArr)
        if(record.teamId) {
          api
          .delete({
            teamId: record.teamId,
          })
          .then((res) => {
            message.success('删除成功')
          }, )
        }
      }
    })
  }
  const handleOk = () => {
    api
    .saveOrUpdate({
      visitTeamList:tableData
    })
    .then((res) => {
      message.success('操作成功')
      props.getData();
      props.getTemplateList();
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
    afterClose={() => getData()}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Button onClick={addFollowUpGroup} className='ml-20'>
        添加小组
      </Button>
      <BaseTable columns={columns}
          dataSource={tableData}
          pagination={{
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            onShowSizeChange: handlePageSizeChange,
            onChange: handlePageChange,
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
          loading={pageLoading}/>
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
.ml-20 {
  margin-left: 20px;
}
  
`