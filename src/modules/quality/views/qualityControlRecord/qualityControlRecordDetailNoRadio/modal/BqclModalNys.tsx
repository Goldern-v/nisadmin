import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { qualityControlRecordApi } from '../../api/QualityControlRecordApi'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
  nodeCode: any
  id: any,
  list: any[]
}

/** 设置规则 */
const rules: Rules = {
  expand: (val) => !!val || '请填写原因分析',
  handleContent: (val) => !!val || '请填写整改措施'
}

export default function BqclModal(props: Props) {

  let { visible, onCancel, list } = props

  const [loading, setLoading] = useState(false)
  const [editList, setEditList] = useState([] as any[])

  const onSave = async () => {
    var checked = checkItemList()

    if (!checked)
      return

    let paramsList = editList.map((item: any) => {
      return {
        itemCode: item.qcItemCode,
        itemName: item.qcItemName,
        cause: item.cause,
        measure: item.measure,
      }
    })

    setLoading(true)

    qualityControlRecordApi
      .handleNode({
        id: props.id,
        // empNo: '',
        // password: '',
        nodeCode: props.nodeCode,
        // handleContent: value.handleContent,
        // expand: value.expand,
        measureGroupList: paramsList
      })
      .then((res) => {
        setLoading(false)
        message.success('操作成功')
        props.onOkCallBack && props.onOkCallBack()
      }, () => setLoading(false))
  }

  const handleChange = (key: string, val: string, index: number) => {
    editList[index][key] = val

    setEditList([...editList])
  }

  const checkItemList = (): boolean => {
    let errMsgList = []
    for (let i = 0; i < editList.length; i++) {
      let item = editList[i]
      if (!item.cause.trim() || !item.measure.trim()) {
        let errMsg = `${item.itemShowCode} ${item.qcItemName}`
        if (!item.cause.trim()) errMsg += ` 原因分析不能为空`
        if (!item.measure.trim()) errMsg += ` 整改措施不能为空`
        errMsgList.push(errMsg)
      }
    }
    if (errMsgList.length > 0) {
      Modal.error({
        title: '项目未填写',
        centered: true,
        content: <div>
          {errMsgList.map((msg) => <div
            key={msg}
            style={{ fontSize: '12px', marginBottom: '10px' }}>
            {msg}
          </div>)}
        </div>
      })
      return false
    }
    return true
  }

  useLayoutEffect(() => {
    if (visible && list && list.length > 0) {
      let newEditList = [] as any[]
      for (let i = 0; i < list.length; i++) {
        let itemList = list[i].itemList || []
        if (itemList && itemList.length > 0)
          newEditList = newEditList.concat(itemList
            .filter((item: any) => item.qcItemValue == '否')
            .map((item: any) => {
              return {
                ...item,
                cause: '',
                measure: '',
              }
            }))
      }

      setEditList(newEditList)
    } else {
      setEditList([])
    }
    /** 如果是修改 */
  }, [visible])

  return (
    <Modal
      title={'病区处理'}
      visible={visible}
      onCancel={onCancel}
      centered
      onOk={onSave}
      okText='保存'
      confirmLoading={loading}
      forceRender>
      {editList.length > 0 && editList
        .map((item, idx) => (
          <EditItem key={idx}>
            <div className="item-title">{item.itemShowCode}.{item.qcItemName}</div>
            <div className="sub-title">原因分析</div>
            <div>
              <Input.TextArea
                autosize={{ minRows: 2 }}
                value={item.cause}
                onChange={(e: any) =>
                  handleChange('cause', e.target.value, idx)} />
            </div>
            <div className="sub-title">整改措施</div>
            <div>
              <Input.TextArea
                autosize={{ minRows: 2 }}
                value={item.measure}
                onChange={(e: any) =>
                  handleChange('measure', e.target.value, idx)} />
            </div>
          </EditItem>
        ))}
      {editList.length <= 0 && <div style={{ textAlign: 'center' }}>无待处理条目</div>}
    </Modal>
  )
}
const EditItem = styled.div`
  border-bottom: 1px dashed #999;
  padding: 15px 0;
  .item-title{
    font-size: 14px;
    font-weight: bold;
  }
  .sub-title{
    height: 30px;
    line-height: 30px;
  }
  &:first-of-type{
    padding-top: 0;
  }
  &:last-of-type{
    border-bottom: none;
  }
`
