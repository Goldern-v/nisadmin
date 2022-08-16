import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message,Switch } from 'antd'
import { ModalComponentProps } from 'src/libs/createModal'
import Form from 'src/components/Form'
import { to } from 'src/libs/fns'
import { InputNumber } from 'src/vendors/antd'
import { Rules } from "src/components/Form/interfaces";
const Option = Select.Option
export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: (value?: any) => void
  data: any
}
const rules: Rules = {
  // type: val => !!val || "请选择班次"
};

export default function SettingGeneralModal(props: Props) {
  let { visible, onCancel, onOkCallBack, data = {} } = props
  let refForm = React.createRef<Form>()
  
  const onSave = async () => {
    if (!refForm.current) return
    let [err, value] = await to(refForm.current.validateFields())
    if (err) return
    let flag = Object.keys(value).every((item: any, index: any) => {
      return !value[item]
    })
    
    if (flag) return message.error('请选择操作内容')
    
    if(value.sign && value.cancelSign) return message.error('签名和取消签名只能选择一项，请重新选择！')
    // if(!value.type && !value.sign && !value.copy && !value.time) return message.error('请选择操作内容')
    onOkCallBack && onOkCallBack({...value,signName:data.signName})
    onCancel()
  }
  useLayoutEffect(() => {
    if (refForm.current && visible) refForm!.current!.clean()
    /** 如果是修改 */
    if (refForm.current && visible) {
      /** 表单数据初始化 */
      refForm!.current!.setFields({
        type: "",
        sign: false,
        copy: false,
        time: null,
        cancelSign:false,
      })
    }
  }, [visible])
  const onFormChange = (name: string, value: any, form: Form<any>) => {
    // if (name == "sign" && value == true) {
    //   form.setField("cancelSign", false);
    // }
    // if (name == "cancelSign" && value == true) {
    //   form.setField("sign", false);
    // }
  };
  return (
    <Modal
      title={'批量修改'}
      width={400}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText='保存'
      centered
      forceRender
    >
      <Form ref={refForm} onChange={onFormChange} rules={rules} labelWidth={90}>
        <Row>
          <Col span={24}>
            <Form.Field label={`日期`} name='time'>
              <DatePicker />
            </Form.Field>
          </Col>
          {
            data?.optionList && 
              <Col span={24}>
                <Form.Field label={`班次`} name='type'>
                  <Select>
                    {
                      (data?.optionList || []).map((item:any) => {
                        return <Option value={item} key={item}>
                        {item}
                      </Option>
                      })
                    }
                  </Select>
                </Form.Field>
              </Col>
          }
          <Col span={24}>
            <Form.Field label={`复制新增`} name='copy'>
              <Switch checkedChildren="是" unCheckedChildren="否" />
            </Form.Field>
          </Col>
          {
            data?.signName && <React.Fragment>
              <Col span={24}>
                <Form.Field label={data?.signName.indexOf('签名') !=-1 ? data?.signName : data?.signName+'签名'} name='sign'>
                  <Switch checkedChildren="是" unCheckedChildren="否" />
                </Form.Field>
              </Col>
              <Col span={24}>
                <Form.Field label={data?.signName.indexOf('签名') !=-1 ? '取消'+data?.signName : '取消'+data?.signName+'签名'} name='cancelSign'>
                  <Switch checkedChildren="是" unCheckedChildren="否" />
                </Form.Field>
              </Col>
            </React.Fragment>
          }
        </Row>
        
      </Form>
    </Modal>
  )
}
const Wrapper = styled.div``
