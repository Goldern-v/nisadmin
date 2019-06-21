import styled from 'styled-components'
import React, { Component, useState, useEffect } from 'react'
import BaseTable from 'src/components/BaseTable'
import { Modal, Input } from 'antd'
export interface Props {
  isShow: any,
  setNoShow: any
}

// import { aMServices } from '../services/AMServices'

const columns: any = [
  {
    title: '序号',
    dataIndex: '1',
    key: '1',
    render: (text: any, record: any, index: number) => index + 1,
    align: 'center',
    width: 50
  },
  {
    title: '类型名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'cz',
    key: 'cz',
    width: 50,
    align: 'center',
    render: (a: any, b: any, c: any) => {
      const DoCon = styled.div`
        display: flex;
        justify-content: space-around;
        font-size: 12px;
        color: ${(p) => p.theme.$mtc};
      `
      return (
        <DoCon>
          <a
            href='javascript:;'
            onClick={(e: any) => {
              console.log('删除', e)
            }}
          >
            删除
          </a>
        </DoCon>
      )
    }
  }
]

export default function AuditsTableDHSZ (props: Props) {
  const [tableData, setTableData] = useState([])
  const [current, setCurrent] = useState(1)
  const onChange = () => {}
  const handleOk = () => {}
  const onload = () => {
    // aMServices.auditeStatusNurse('waitAuditedNurse', current).then((res) => {
    //   setTableData(res.data.list)
    // })
  }
  const dataSource = [
    {
      key: '1',
      name: '入院宣教'
    },
    {
      key: '2',
      name: '导管宣教'
    },
    {
      key: '3',
      name: '导管宣教'
    },
    {
      key: '4',
      name: '导管宣教'
    },
    {
      key: '5',
      name: '导管宣教'
    },
    {
      key: '6',
      name: '导管宣教'
    }
  ]
  useEffect(() => {
    onload()
  }, [])
  return (
    <Wrapper>
      <BaseTable
        dataSource={dataSource}
        columns={columns}
        surplusHeight={305}
        // pagination={{
        //   total: 100,
        //   current: 1
        // }}
        onChange={onChange}
      />
      <Modal
        title="添加类别"
        visible={props.isShow}
        onOk={handleOk}
        okText="保存"
        cancelText="返回"
        onCancel={props.setNoShow}
      >
        <div className="category">
          <div>类别名称</div>
          <Input defaultValue="" />
        </div>
      </Modal>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .ant-table-wrapper {
    width: 60%;
  }
  .category {
    display: flex;
  }
`
