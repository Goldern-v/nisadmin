import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Modal, Form, Input,  Radio, Select} from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import {appStore, authStore} from 'src/stores'
import { observer } from 'mobx-react-lite'
import {to} from "src/libs/fns";
import {ModalComponentProps} from "src/libs/createModal";
export interface Props extends FormComponentProps,ModalComponentProps {
    visible: boolean;
    handleOk?: (value: any) => void;
}
const formItemLayout = {
    labelCol: {
        sm: { span: 20 }
    },
    wrapperCol: {
        sm: { span: 24 }
    }
}

/** 用户名/工号  密码确认签名弹窗 */
function TemplateSingModal(props: Props) {
    let {
        visible,
        handleOk,
        onCancel,
        form: { getFieldDecorator, validateFields}
    } = props
    const onSave = () => {
        validateFields((err, value:any) => {
            if (err) {
                return
            }else{
                props.handleOk && props.handleOk(value)
                 onCancel()
            }

        })
    }
    return (
        <Modal title={'签名验证'} visible={visible} onOk={onSave} onCancel={onCancel} okText='确定' centered>
            <Wrapper>
                <Form>
                    <Form.Item {...formItemLayout} label=' 输入用户名或工号'>
                        {getFieldDecorator('empName', {
                            initialValue:authStore?.user?.empNo,
                            rules: [{ required: true, message: '用户名或工号不能为空' }]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='密码'>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '密码不能为空' }]
                        })(<Input type="password" />)}
                    </Form.Item>
                </Form>
            </Wrapper>
        </Modal>
    )
}
const Wrapper = styled.div`
 .ant-form-item .ant-form-item-label {
    text-align: left !important;
  }
`
export default Form.create()(observer(TemplateSingModal)) as any
