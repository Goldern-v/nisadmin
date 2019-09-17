import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { Rules } from 'src/components/Form/interfaces'
import { qualityControlRecordApi } from '../../api/QualityControlRecordApi'
import { Checkbox, Spin } from 'src/vendors/antd'

const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {}
  nodeCode: any
  id: any
  title?: string
  qcLevel?: any
}

/** 设置规则 */
const rules: Rules = {
  publicDate: (val) => !!val || '请填写发表日期'
}

export default function EjkhszModal(props: Props) {
  const [selectList, setSelectList] = useState([])
  const [modalLoading, setModalLoading] = useState(false)
  let { visible, onCancel } = props
  let refForm = React.createRef<Form>()
  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return

    qualityControlRecordApi
      .handleNode({
        id: props.id,
        // empNo: '',
        // password: '',
        nodeCode: props.nodeCode,
        handleContent: '',
        noPass: value.noPass,
        measureGroupList: selectList.reduce((total: any[], current: any) => {
          let list = current.measureList.filter((item: any) => item.checked)
          if (list.length) {
            total.push({ ...current, measureList: list })
          }
          return total
        }, [])
      })
      .then((res) => {
        message.success('操作成功')
        props.onOkCallBack && props.onOkCallBack()
      })

    /** 保存接口 */
    // service(value).then((res: any) => {
    //   message.success('保存成功')
    //   props.onOkCallBack && props.onOkCallBack()
    //   onCancel()
    // })
  }

  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    if (visible) {
      /** 如果是修改 */
      refForm.current &&
        refForm!.current!.setFields({
          noPass: false,
          handleContent: '',
          setSelectList: []
        })

      /** 二级质控科护士长审核 */
      setModalLoading(true)
      qualityControlRecordApi.getMeasureList(props.id).then((res) => {
        setSelectList(res.data.measureGroupList)
        setModalLoading(false)
      })
    }
  }, [visible])

  return (
    <Modal
      width={600}
      title={props.title}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='保存'
      forceRender
    >
      <Form ref={refForm} labelWidth={80}>
        <Spin spinning={modalLoading}>
          {/* <Col span={24}>
            <Form.Field label={`审核结果`} name='noPass'>
              <Radio.Group buttonStyle='solid'>
                <Radio.Button value={false}>通过</Radio.Button>
                <Radio.Button value={true}>退回</Radio.Button>
              </Radio.Group>
            </Form.Field>
          </Col> */}

          {/* <Col span={24}>
            <Form.Field label={`审核意见`} name='handleContent'>
              <Input.TextArea />
            </Form.Field>
          </Col> */}
          <Wrapper>
            {selectList.length > 0
              ? selectList.map((item: any, index: number) => (
                  <div key={index}>
                    <div className='title'>{index + 1 + ',' + item.itemName}</div>
                    {item.measureList.map((m: any) => (
                      <div key={m.measureCode}>
                        <Checkbox
                          onChange={() => {
                            m.checked = !m.checked
                            setSelectList([...selectList])
                          }}
                          checked={m.checked}
                        >
                          {m.measureName}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                ))
              : !modalLoading && <div className='null-text'>暂无数据</div>}
          </Wrapper>
        </Spin>
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div`
  margin-top: -10px;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .null-text {
    font-size: 14px;
    text-align: center;
    padding-top: 10px;
  }
`
