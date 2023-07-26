import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Modal, Form, Input,  Radio, Select} from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import {appStore, authStore} from 'src/stores'
import { observer } from 'mobx-react-lite'
import { LEVEL_LIST } from '../Index'
export interface Props extends FormComponentProps {
    visible: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
    title:string
}
const formItemLayout = {
    labelCol: {
        sm: { span: 20 }
    },
    wrapperCol: {
        sm: { span: 24 }
    }
}

/** 职务列表 */
function MaintenanceModal(props: Props) {
    let {
        visible,
        handleOk,
        handleCancel,
        title,
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
        // 手册表单维护 / 表单详情
        //
        // 规培护士轮转汇总
        //
        // 创建人： 肖佳薇
        appStore.history.push(`/FormMaintenanceDetail?id=20`);
        // validateFields((err, value) => {
        //     if (err) {
        //         return
        //     }
        //
        //     if (value.birthday) value.birthday = value.birthday.format('YYYY-MM-DD')
        //     if (value.deptCode) value.deptName = authStore.deptList.find((item) => item.code == value.deptCode)!.name
        //     nurseFilesService.saveOrUpdate(value).then((res) => {
        //         message.success('操作成功')
        //         nurseFilesListViewModel.loadNursingList()
        //         handleOk()
        //     })
        // })
    }

    useEffect(() => {
        if (visible) {
            resetFields()
        }
    }, [visible])

    return (
        <Modal title={title} visible={visible} onOk={onSave} onCancel={handleCancel} okText='确定' centered>
            <Wrapper>
                <Form>
                    <Form.Item {...formItemLayout} label='科室'>
                        {getFieldDecorator('deptCode', {
                            initialValue: authStore.selectedDeptCode == '全院' ? '' : authStore.selectedDeptCode,
                            rules: [{ required: true, message: '科室不能为空' }]
                        })(
                            <Select
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{ width: '100%' }}
                                placeholder='选择所属科室'>
                                {authStore.deptList.map((item: any) => {
                                    return (
                                        <Select.Option value={item.code} key={item}>
                                            {item.name}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='层级'>
                        {getFieldDecorator('nurseHierarchy',{
                            initialValue:'全部',
                            rules: [{ required: true, message: '层级不能为空' }]
                        })(
                            <Select
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{ width: '100%' }}
                                placeholder='选择层级'
                            >
                                {LEVEL_LIST.map((item: string) => (
                                    <Select.Option value={item} key={item}>
                                        {item}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='表名'>
                        {getFieldDecorator('empName', {
                            initialValue:'',
                            rules: [{ required: true, message: '表名不能为空' }]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='' >
                        {getFieldDecorator('type', )(<Radio.Group>
                            <Radio value={1}>仅护长或带教编辑</Radio>
                            <Radio value={2}>护长和护士共同编辑</Radio>
                            <Radio value={3}>仅护士编辑</Radio>
                        </Radio.Group>)}
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
export default Form.create()(observer(MaintenanceModal)) as any
