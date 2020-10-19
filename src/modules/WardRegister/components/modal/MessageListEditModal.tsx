import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button, Input, Modal, DatePicker, Select, message } from 'antd'
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
        return JSON.parse(JSON.stringify({
          ...item,
          vsUserList: (item.vsUserList || []).map((emp: any) => ({ label: emp.empName, key: emp.empNo }))
        }))
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
      align: 'left',
      className: "input-cell",
      render: (text: string, record: any, idx: number) => {
        return <Input.TextArea
          autosize={{ minRows: 1 }}
          style={{ width: "100%", textAlign: 'left' }}
          onChange={(e: any) =>
            handleRowEidt({ ...record, content: e.target.value }, idx)}
          value={text} />
      }
    },
    {
      dataIndex: 'appointHandleTime',
      title: '提醒时间',
      className: "input-cell",
      width: 100,
      render: (text: string, record: any, idx: number) => {

        return <DatePicker
          value={text ? moment(text) : undefined}
          style={{ width: "100%" }}
          onChange={(val: any) =>
            handleRowEidt({ ...record, appointHandleTime: val.format('YYYY-MM-DD') }, idx)} />
      }
    },
    {
      dataIndex: 'appointRange',
      title: '提醒班次',
      width: 120,
      className: "input-cell",
      render: (text: string, record: any, idx: number) => {
        return <Select
          style={{ width: "100%" }}
          value={text}
          onChange={(val: any) =>
            handleRowEidt({ ...record, appointRange: val }, idx)}>
          {rangeDictMap.map((item: any, itemIdx: number) => (
            <Select.Option
              value={item.name}
              key={itemIdx}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      }
    },
    {
      dataIndex: 'vsUserList',
      title: '提醒护士',
      className: "input-cell",
      render: (list: any, record: any, idx: number) => {
        return <Select
          mode="multiple"
          labelInValue
          style={{ width: "100%" }}
          value={list}
          onChange={(val: any) =>
            handleRowEidt({ ...record, vsUserList: val }, idx)}>
          {(empList || []).map((item: any) => {
            return (
              <Select.Option key={item.empNo} value={item.empNo}>
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
    let deleteRow = () => {
      let newArr = msgList.concat()
      newArr.splice(idx, 1)
      setMsgList(newArr)
    }

    if (record.id) {
      // setDelected(true)
      Modal.confirm({
        centered: true,
        title: '提示',
        content: '是否删除该提醒',
        onOk: () => {
          setLoading(true)

          wardRegisterService
            .deleteMsgItem(record.id, registerCode)
            .then(res => {
              setLoading(false)
              message.success('删除成功')
              setDelected(true)
              deleteRow()
            }, () => setLoading(false))
        }
      })
    } else {
      deleteRow()
    }
  }

  const handleAdd = () => {
    let newArr = msgList.concat()

    let newItem = {
      blockId,
      recordId: rowData.id,
      fieldEn: dataIndex,
      appointHandleTime: moment().format('YYYY-MM-DD'),
      appointRange: '',
      wardCode: authStore.selectedDeptCode,
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

  const handleCancel = (hasChange = false) => {
    let _hasChange = hasChange || delected

    onCancel && onCancel(_hasChange)
  }

  const handleSave = () => {
    let errMsgArr = []

    for (let i = 0; i < msgList.length; i++) {
      let item = msgList[i]
      let errMsg = []
      if (!item.content.trim()) errMsg.push('提醒内容')
      if (!item.appointHandleTime) errMsg.push('提醒时间')
      if (!item.appointRange) errMsg.push('提醒班次')
      if (!item.vsUserList || item.vsUserList.length <= 0) errMsg.push('提醒护士')
      if (errMsg.length > 0) {
        errMsgArr.push(`第${i + 1}条记录 ${errMsg.join('、')}不能为空`)
      }
    }

    if (errMsgArr.length <= 0) {
      let saveParams = msgList.map((item: any) => ({
        ...item,
        vsUserList: item.vsUserList.map((emp: any) => ({ empName: emp.label, empNo: emp.key }))
      }))

      setLoading(true)

      wardRegisterService
        .saveBlockMsgList(saveParams, registerCode)
        .then(res => {
          setLoading(false)
          message.success('保存成功')

          handleCancel(true)
        }, () => setLoading(false))
    } else {
      Modal.error({
        width: 500,
        content: <div>
          {errMsgArr.map((msg: string) => <div key={msg}>{msg}</div>)}
        </div>
      })
    }
  }

  return <Modal
    width={1000}
    visible={visible}
    forceRender={true}
    okText="保存"
    centered
    bodyStyle={{
      padding: '15px 0px 0px 0px'
    }}
    confirmLoading={loading}
    onCancel={() => handleCancel()}
    onOk={() => handleSave()}
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

  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  
  .ant-table-tbody > tr.ant-table-row:hover{
    .input-cell{
      &.disabled{
        background-color: #f5f5f5!important;
      }
    }
  }

  .input-cell {
    padding: 0 !important;
    &.disabled{
      background-color: #f5f5f5;
    }

    .ant-input, .ant-select, .ant-select-selection, .ant-input-number {
      position: relative;
      z-index: 1000;
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: 0;
      box-shadow: none;
      outline: none;
      text-align: center;
      /* &:focus {
        background: ${p => p.theme.$mlc};
      } */
      input {
        text-align: center;
      }
    }
  }
  .ant-select{
    .ant-select-remove-icon{
      color: #00A680;
    }
  }
  textarea{
    resize:none;
    overflow: hidden;
  }
`