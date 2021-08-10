import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, InputNumber, Modal, Radio, Row, Select, Spin } from 'src/vendors/antd'
import BaseTable from 'src/components/BaseTable'
import { DoCon } from 'src/components/BaseTable'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  params?: any,
  isAdd?: boolean
}


export default function EidtModal(props: Props) {
  const { visible, isAdd, params, onOk, onCancel } = props
  const [editUserType, setEditUserType] = useState('1')
  const [loading, setLoading] = useState(false)
  const [editParams, setEidtParams] = useState({} as any)
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)
  
  const addFollowUpGroup = () => {}

  //删除
  const onDelete = (record: any) => {
    Modal.confirm({
      title: '确认删除该记录吗',
      centered: true,
      onOk: () => {
        // setPageLoading(true)

        // wardLogService
        //   .deleteRecord(record.id)
        //   .then(res => {
        //     message.success('删除成功', 1, () => getData())
        //   }, err => setPageLoading(false))

      }
    })
  }

  

  const handleOk = () => {
    // let currentRules = rules(userType) as any
    // let errMsgList = []
    // let ruleKeys = Object.keys(currentRules)
    // for (let key in currentRules) {
    //   let item = currentRules[key]
    //   let val = editParams[key] || ''
    //   for (let i = 0; i < item.length; i++) {
    //     let rule = item[i]
    //     let result = rule(val)
    //     if (result !== true) errMsgList.push(result)
    //   }
    // }

    // if (errMsgList.length > 0) {
    //   Modal.error({
    //     title: '提示',
    //     content: <div>
    //       {errMsgList.map((text: string, idx: number) => <div key={idx}>{text}</div>)}
    //     </div>
    //   })
    //   return
    // }

    // let saveParams = { ...editParams }
    // if (isAdd) saveParams.userType = editUserType

    // setLoading(true)
    // otherEmpService
    //   .addOrUpdatePerson(saveParams)
    //   .then(res => {
    //     setLoading(false)
    //     message.success('操作成功')
    //     onOk && onOk()
    //   }, () => setLoading(false))
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
      dataIndex: 'type',
      key: 'type',
      align: 'left',
      width: 100,
    },
    {
      title: '操作',
      width: 80,
      render(text: any, record: any, index: number) {
        return (
          <DoCon>
            <span onClick={() => onDelete(record)}>删除</span>
          </DoCon>
        )
      }
    }
  ]

  return <Modal
    title={'设置随访小组'}
    width={500}
    centered
    confirmLoading={loading}
    visible={visible}
    onOk={handleOk}
    onCancel={() => onCancel()}>
    <Wrapper>
      <Button onClick={addFollowUpGroup}>
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

  
`