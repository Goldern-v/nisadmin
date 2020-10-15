import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button, Input, Modal, DatePicker, Select } from 'antd'
import BaseTable, { DoCon } from "src/components/BaseTable"
import { ModalComponentProps } from "src/libs/createModal"
import moment from 'moment'
import { wardRegisterService } from "src/modules/WardRegister/services/WardRegisterService"
import { ColumnProps } from "src/vendors/antd"
import service from 'src/services/api'
import { authStore } from 'src/stores'

export interface Props {
  registerCode: string | number,
  blockId: string | number,
  originList: any[],
  dataIndex: string,
  rowData: any,
  visible: boolean,
  onCancel?: Function,
}

export default function MessageListEditModal(props: Props) {
  const { visible, onCancel, originList, rowData, blockId, registerCode, dataIndex } = props

  const [msgList, setMsgList] = useState([] as any[])
  const [rangeDictMap, setRangeDictMap]: any = useState([])
  const [empList, setEmpList]: any = useState([])
  const [loading, setLoading] = useState(false)
  //判断是否有调用删除接口，调用过关闭时刷新病区登记本
  const [delected, setDelected] = useState(false)

  useEffect(() => {
    if (!visible) setDelected(false)
    else {
      setMsgList(originList.map((item: any) => {
        return JSON.parse(JSON.stringify(item))
      }))
    }
  }, [visible, originList])

  useEffect(() => {
    wardRegisterService.getArrangeMenu().then(res => {
      let map = res.data.filter(
        (item: any) => !(item.name.includes("休") || item.name.includes("假"))
      )
      setRangeDictMap(map)
    })
    service.commonApiService
      .userDictInfo(authStore.selectedDeptCode)
      .then(res => setEmpList(res.data));
  }, [])

  const columns: ColumnProps<any>[] = [
    {
      dataIndex: 'content',
      title: '内容',
      render: (text: string, record: any, idx: number) => {
        return <Input.TextArea
          autosize={{ minRows: 1 }}
          onChange={(e: any) =>
            handleRowEidt({ ...record, content: e.target.value }, idx)}
          value={text} />
      }
    },
    {
      dataIndex: 'appointHandleTime',
      title: '提醒时间',
      render: (text: string, record: any, idx: number) => {
        return <DatePicker value={text ? moment(text) : undefined} />
      }
    },
    {
      dataIndex: 'appointRange',
      title: '提醒班次',
      render: (text: string, record: any, idx: number) => {
        return <Select value={text}>
          {rangeDictMap.map((item: any) => (
            <Select.Option
              value={item.name}
              key={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      }
    },
    {
      dataIndex: 'vsUserList',
      title: '提醒护士',
      render: (list: any, record: any, idx: number) => {
        return <Select
          mode="multiple"
          labelInValue
          value={list}>
          {(empList || []).map((item: any) => {
            return (
              <Select.Option key={item.code} value={JSON.stringify(item)}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      }
    },
    {
      key: "operate",
      title: '操作',
      width: 60,
      render: (text: any, record: any, idx: number) => {
        return <DoCon>
          <span onClick={() => handleDelete(record, idx)}>删除</span>
        </DoCon>
      }
    }
  ]

  const handleDelete = (record: any, idx: number) => {
    if (record.id) {
      setDelected(true)
    }
  }

  const handleAdd = () => {
    let newArr = msgList.concat()

    let newItem = {
      blockId,
      recordId: '',
      fieldEn: dataIndex,
      appointHandleTime: moment().format('YYYY-MM-DD'),
      appointRange: '',
      wardCode: authStore.selectDeptCode,
      content: '',
      vsUserList: [],
    }

    newArr.push(newItem)

    setMsgList(newArr)
  }

  const handleRowEidt = (newRecord: any, idx: number) => {
    let newArr = msgList.concat()
    newArr[idx] = { ...newRecord }
    setMsgList(newArr)
  }

  const handleSave = () => {
    onCancel && onCancel()
  }

  return <Modal
    width={1000}
    visible={visible}
    forceRender={true}
    centered
    bodyStyle={{
      padding: '15px 0px 0px 0px'
    }}
    confirmLoading={loading}
    onOk={() => handleSave}
    title="提醒设置">
    <Wrapper>
      <div className="top-bar">
        <div className="fl-r">
          <Button disabled={loading} onClick={() => handleAdd()}>添加</Button>
        </div>
      </div>
      <BaseTable
        type={['index']}
        loading={loading}
        columns={columns}
        dataSource={msgList}
        surplusHeight={320} />
    </Wrapper>
  </Modal>
}
const Wrapper = styled.div`
  min-height: 300px;
  .top-bar{
    overflow: hidden;
    padding: 0 15px;
  }
  .fl-r{
    float:right;
    width: auto;
    &>*{
      margin-left: 5px;
    }
  }
`