import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Modal, Form, Input,  Radio, Select} from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import {appStore, authStore} from 'src/stores'
import { observer } from 'mobx-react-lite'
export interface Props extends FormComponentProps {
    visible: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
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
function SingModal(props: Props) {
    let {
        visible,
        handleOk,
        handleCancel,
        form: { getFieldDecorator, validateFields, setFieldsValue, resetFields }
    } = props
    const handleSubmit = (e: any) => {
        validateFields((err, value) => {
            if (err) {
                return
            }
        })
    }
    const onSave = (e: any) => {
    }

    useEffect(() => {
        // if (visible) {
        //     resetFields()
        // }
    }, [visible])

    return (
        <Modal title={'签名验证'} visible={visible} onOk={onSave} onCancel={handleCancel} okText='确定' centered>
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
export default Form.create()(observer(SingModal)) as any
