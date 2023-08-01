import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Modal, Form,  Radio, Select, message} from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { authStore} from 'src/stores'
import { observer } from 'mobx-react-lite'
import { LEVEL_LIST } from '../Index'
import {trainingSettingApi} from "src/modules/continuingEdu/views/gaugePearson/api/TrainingSettingApi";
import MultiFileUploader from "src/components/MultiFileUploader";
export interface Props extends FormComponentProps {
    visible: boolean;
    handleOk?: () => void;
    handleCancel?: () => void;
    title:string;
    record?:any
    temList?:any
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
function TemplateModal(props: Props) {
    let {
        visible,
        handleOk,
        handleCancel,
        title,
        record,
        temList,
        form: { getFieldDecorator, validateFields, setFieldsValue, resetFields }
    } = props
    const isDisable:boolean = title =='编辑'
    const [fileObj,setFileObj]=useState(null)
    const onSave = (e: any) => {
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
                ...isDisable ? record:null,
                ...value,
                templateType:1,
                attachmentName:value.list[0]?.name,
                attachmentId:value.list[0]?.id,
                ...title =='添加' ? { file:fileObj }:null
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
            list: [{
                id: record.attachmentId,
                fileName: record.attachmentName,
                name: record.attachmentName,
            }]
        })
    },[record])
    const onChange=(e?:any,b?:any,c?:any)=>{
       setFileObj(c)
    }
    return (
        <Modal title={title} visible={visible} onOk={onSave} onCancel={handleCancel} okText='确定' centered>
            <Wrapper>
                <Form>
                    <Form.Item {...formItemLayout} label='表名'>
                        {getFieldDecorator('tableName', {
                            initialValue:'',
                            rules: [{ required: true, message: '表名不能为空' }]
                        })(
                            <Select
                                disabled={isDisable}
                                allowClear
                                showSearch
                                style={{ width: '100%' }}
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                placeholder='选择表名'>
                                {temList.map((item: any) => (
                                    <Select.Option value={item.tableName} key={item.id}>
                                        {item.tableName}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='科室'>
                        {getFieldDecorator('deptCode', {
                            initialValue:'全院',
                            rules: [{ required: true, message: '科室不能为空' }]
                        })(
                            <Select
                                disabled={isDisable}
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
                                disabled={isDisable}
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
                    {
                        !isDisable &&   <Form.Item {...formItemLayout} label='' >
                            {getFieldDecorator('authType',{
                                initialValue:record.authType|| 0,
                            } )(<Radio.Group  >
                                <Radio value={0}>仅护长或带教编辑</Radio>
                                <Radio value={1}>护长和护士共同编辑</Radio>
                                <Radio value={2}>仅护士编辑</Radio>
                            </Radio.Group>)}
                        </Form.Item>
                    }
                    <Form.Item label="附件">
                        {getFieldDecorator('list', {
                                initialValue: [],
                                rules: [
                                    { required: true, message: '附件不能为空' }
                                ],
                                valuePropName: 'data'
                            })(
                                <MultiFileUploader onChange={onChange} type={'handbookTemplate'} isFormModel accept={'.xlsx,.xls'} size={1} maxSize={5 * 1024 * 1024} />)}
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
export default Form.create()(observer(TemplateModal)) as any
