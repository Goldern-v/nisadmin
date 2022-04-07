import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { aMServices } from '../services/AMServices'
import { appStore } from 'src/stores'
// import { qualityControlRecordApi } from '../../api/QualityControlRecordApi'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  selectedRows?: any
  getTableData?: any
}

/** 设置规则 */
const rules: Rules = {
  publicDate: (val) => !!val || '请填写发表日期'
}

export default function GroupsHlbModal(props: Props) {
  const [title, setTitle] = useState('')

  let { visible, onCancel, selectedRows } = props
  let refForm = React.createRef<Form>()
  // 是否进行通过率判断
  const [passRateCheck, setPassRateCheck] = useState(false)
  const [filterArr, setFilterArr] = useState<number[]>([])

  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return

    if (passRateCheck) {
      Modal.confirm({
        content: `选中的第${filterArr.join('、')}张表单通过率不为100%，是否继续审核？`,
        onOk: () => {
          setPassRateCheck(false)
        }
      })
      return
    }
      
    let list = selectedRows.map((item: any, index: number) => {
      return {
        id: item.othersMessage.id,
        nodeCode: item.othersMessage.nextNodeCode,
        handleContent: value.handleContent
      }
    })

    let obj = {
      noPass: value.noPass,
      list
    }
    aMServices.batchHandleNode(obj).then((res) => {
      message.success('审核成功')
      props.getTableData && props.getTableData()
      onCancel()
    })
    // qualityControlRecordApi
    //   .handleNode({
    //     id: props.id,
    //     // empNo: '',
    //     // password: '',
    //     nodeCode: props.nodeCode,
    //     handleContent: value.handleContent,
    //     noPass: value.noPass
    //   })
    //   .then((res) => {
    //     message.success('操作成功')
    //     props.onOkCallBack && props.onOkCallBack()
    //   })

    /** 保存接口 */
    // service(value).then((res: any) => {
    //   message.success('保存成功')
    //   props.onOkCallBack && props.onOkCallBack()
    //   onCancel()
    // })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    refForm.current &&
      refForm!.current!.setFields({
        noPass: false
      })

    // 通过率不为100
    let arr: number[] = [];
    (selectedRows || []).map((item: any, index: number) => {
      if (item?.othersMessage?.evalRate != '100') {
        arr.push(index + 1)
      }
      return
    })
    setFilterArr(arr)
    if(['wh'].includes(appStore.HOSPITAL_ID) && arr.length > 0) {
      setPassRateCheck(true)
    }
  }, [visible])

  return (
    <Modal title={'批量审核质量检查'} visible={visible} onCancel={onCancel} onOk={onSave} okText='保存' forceRender>
      <Form ref={refForm} labelWidth={80}>
        <Row>
          <Col span={24}>
            <Form.Field label={`审核结果`} name='noPass'>
              <Radio.Group buttonStyle='solid'>
                <Radio.Button value={false}>通过</Radio.Button>
                <Radio.Button value={true}>退回</Radio.Button>
              </Radio.Group>
            </Form.Field>
          </Col>

          <Col span={24}>
            <Form.Field label={`审核意见`} name='handleContent'>
              <Input.TextArea />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
