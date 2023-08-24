import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import {Modal, Form, Input, Radio, Select, message} from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import {appStore, authStore} from 'src/stores'
import { observer } from 'mobx-react-lite'
import { LEVEL_LIST } from '../Index'
import {trainingSettingApi} from "src/modules/continuingEdu/views/gaugePearson/api/TrainingSettingApi";
export interface Props extends FormComponentProps {
    visible: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
    title:string;
    record?:any
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
        record,
        form: { getFieldDecorator, validateFields, setFieldsValue, resetFields }
    } = props

    const onSave = (e: any) => {
        // appStore.history.push(`/FormMaintenanceDetail?id=20`);
        validateFields((err, value) => {
            if (err) {
                return
            }
            if (value.deptCode !=='全院'){
                value.deptName = authStore.deptList.find((item) => item.code == value.deptCode)!.name
            }else{
                value.deptName ='全院'
            }
            trainingSettingApi.saveOrUpdate({
                ...title =='编辑'?record:null,
                ...value,
                templateType:2,
            }).then((res) => {
                message.success('操作成功')
                handleOk&&handleOk()
            })
        })
    }
    useEffect(() => {
        if (visible)resetFields()
    }, [visible])
    useEffect(()=>{
        if(Object.keys(record).length > 0 )setFieldsValue({
            authType:record.authType,
            deptCode:record.deptCode,
            hierarchy:record.hierarchy,
            tableName:record.tableName,
        })
    },[record])
    const modalStyle ={
        padding:'6px 24px'
    }
    return (
        <Modal
            bodyStyle={{ padding:'6px 24px'}}
            title={title} visible={visible} onOk={onSave} onCancel={handleCancel} okText='确定' centered>
            <Wrapper>
                <Form>
                    <Form.Item label='科室' {...formItemLayout} >
                        {getFieldDecorator('deptCode', {
                            initialValue:'全院',
                            rules: [{ required: true, message: '科室不能为空' }]
                        })(
                            <Select
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{ width: '100%' }}
                                placeholder='选择所属科室'>
                                {[{name:'全院',code:'全院'},...authStore.deptList].map((item: any) => {
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
                        {getFieldDecorator('hierarchy',{
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
                        {getFieldDecorator('tableName', {
                            initialValue:'',
                            rules: [{ required: true, message: '表名不能为空' }]
                        })(<Input />)}
                    </Form.Item>
                    {/*仅护长或带教编辑 1：护长和护士共同编辑 2：仅护士编辑*!/*/}
                    <Form.Item {...formItemLayout} label='' >
                        {getFieldDecorator('authType',{
                            initialValue: 0,
                        } )(<Radio.Group>
                            <Radio value={0}>仅护长或带教编辑</Radio>
                            <Radio value={1}>护长和护士共同编辑</Radio>
                            <Radio value={2}>仅护士编辑</Radio>
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
  .ant-form-item{
    margin-bottom: 0 !important;
  }
`

export default Form.create()(observer(MaintenanceModal)) as any
