import React, {useState, useEffect, useLayoutEffect, useMemo} from 'react'
import {Modal, Input, Button, Radio, DatePicker, Select, Row, Col, message, InputNumber} from 'antd'
import {ModalComponentProps} from 'src/libs/createModal'
import Form from 'src/components/Form'
import {to} from 'src/libs/fns'
import {Rules} from 'src/components/Form/interfaces'
import moment from 'moment'
// 加附件
import emitter from 'src/libs/ev'
import {dictInfo} from "src/modules/statistic/views/professional-tec/enums";
import {appStore, authStore} from "src/stores";
import { nurseFilesService } from 'src/modules/nurseFiles/view/nurseFiles-wh/services/NurseFilesService'
import AuditEducationProcess from "src/components/audit-page/AuditEducationProcess";

const Option = Select.Option
const {TextArea} = Input

export interface Props extends ModalComponentProps {
    id?: number
    data?: any
    signShow?: string
    getTableData?: any;
}

const rules: Rules = {
    // admittedItem: (val) => !!val || '请选择准入项目',
    // reason: (val) => !!val || '请输入申请理由',
    // content: (val) => !!val || '请选择完成内容',
    // nightShifts: (val) => !!val || '请输入完成次数',
    theoreticalScore:(val) => !!val || '请输入内容',
    operational:(val) => !!val || '请输入内容',
    errorAccident:(val) => !!val || '请输入内容',
    deptEvaluation:(val) => !!val || '请输入内容',
    auditedStatus:(val) => !!val || '请选择',
}
export default function SpecialistModal(props: Props) {
    let {visible, onCancel, onOk, data, signShow} = props
    const [title, setTitle] = useState('')
    const [admittedItem, setAdmittedItem] = useState([] as any)
    const [content, setContent] = useState([] as any)
    let refForm = React.createRef<Form>()

    const onFieldChange = () => {
    }

    const onSave = async (sign: boolean) => {

        if (!refForm.current) return

        let [err, value] = await to(refForm.current.validateFields())
        if (err) return
        if (signShow === '修改') {
            Object.assign(value, {id: data.id})
        }
        value.year && (value.year = value.year.format('YYYY'))
        nurseFilesService.saveLyrmOrUpdate({...value,
            sign,
            content:value.content.join(','),
            admittedItem:value.admittedItem.join(',')
        }).then((res: any) => {
            message.success('保存成功')
            props.getTableData && props.getTableData()
            onCancel()
        })
    }

    useLayoutEffect(() => {
        if (refForm.current && visible) refForm!.current!.clean()
        /** 如果是修改 */
        if (data && refForm.current && visible) {
            refForm!.current!.setFields({
                ...data,
                content:data.content.split(','),
                admittedItem:data.admittedItem.split(',')
            })
        }
        setTitle(signShow || '审核')
        /**其他用状态代替**/
    }, [visible])

    useEffect(() => {
        if (visible) {
            nurseFilesService.getLyrmDict('准入项目').then((res: any) => {
                setAdmittedItem(res.data || [])
            })
            nurseFilesService.getLyrmDict('完成内容').then((res: any) => {
                setContent(res.data || [])
            })
        }

    }, [visible])
    const footer = () => {
        return <>
            <Button key='back' onClick={onCancel}>
                关闭
            </Button>
            <Button key='submit' type='primary' onClick={() => onSave(true)}>
                提交审核
            </Button>
        </>
    }

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            forceRender
            centered
            footer={footer()}
        >
            <Form ref={refForm} labelWidth={100} onChange={onFieldChange} rules={rules}>
                <Row>
                    <Col span={24}>
                        <Form.Field label={`准入项目`} name='admittedItem' required>
                            <Select
                                disabled={true}
                                showSearch
                                mode='multiple'
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{width: '100%'}}
                                placeholder='选择准入项目'>
                                {admittedItem.map((item: any) => {
                                    return (
                                        <Select.Option value={item.code} key={item}>
                                            {item.name}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Field>
                    </Col>
                    <Col span={24}>
                        <Form.Field label={`申请理由`} name='reason' required>
                            <TextArea disabled={true} maxLength={30}/>
                        </Form.Field>
                    </Col>
                    <Col span={24}>
                        <Form.Field label={`完成内容`} name='content' required>
                            <Select
                                disabled={true}
                                mode='multiple'
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{width: '100%'}}
                                placeholder='选择完成内容'>
                                {content.map((item: any) => {
                                    return (
                                        <Select.Option value={item.code} key={item}>
                                            {item.name}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Field>
                    </Col>
                    <Col span={24}>
                        <Form.Field label='完成次数' name='nightShifts' required>
                            <InputNumber disabled={true}/>
                        </Form.Field>
                    </Col>
                    {/* 审核流程  */}
                    <AuditEducationProcess  process={data}/>
                    {/* 护士长才能填写 */}
                    {
                        authStore.isHeadNurse && <>

                            <Col span={24}>
                                <Form.Field label='理论考核(分数)' name='theoreticalScore' required>
                                    <Input/>
                                </Form.Field>
                            </Col>
                            <Col span={24}>
                                <Form.Field label='操作考核(考核项目及分数)' name='operational' required>
                                    <Input/>
                                </Form.Field>
                            </Col>
                            <Col span={24}>
                                <Form.Field label='科室评议' name='deptEvaluation' required>
                                    <Input/>
                                </Form.Field>
                            </Col>
                            <Col span={24}>
                                <Form.Field label='有无护理差错事故' name='errorAccident' required>
                                    <Input/>
                                </Form.Field>
                            </Col>
                        </>
                    }
                    {/* 审核信息 */}
                    <Col span={24}>
                        <Form.Field label={`审核结果`} name="auditedStatus">
                            <Radio.Group buttonStyle="solid">
                                <Radio.Button value={'success'}>通过</Radio.Button>
                                <Radio.Button value={'fail'}>退回</Radio.Button>
                            </Radio.Group>
                        </Form.Field>
                    </Col>

                    <Col span={24}>
                        <Form.Field label={`审核意见`} name="reviewOpinions">
                            <Input.TextArea />
                        </Form.Field>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
