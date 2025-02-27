import React, {useState, useEffect, useMemo} from 'react'
import styled from "styled-components";
import {Modal, Form, Input, Select, message} from 'antd'
import {FormComponentProps} from 'antd/lib/form/Form'
import {observer} from 'mobx-react-lite'
import {ModalComponentProps} from "src/libs/createModal";
import {appStore, authStore} from "src/stores";
import {QuarterlyZzwyData} from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/Data";
import moment from "moment";
import FormCreateModal from './CreateForm'
import {qcZzwyApi} from "src/modules/quality/views/qcZzwy/qcZzwyApi";
import YearPicker from 'src/components/YearPicker';
import {qcMonthCheckData} from "src/modules/quality/views/qcZzwy/qcMonthCheckReport/qcMonthCheckData";
import {DeptType} from "src/components/DeptSelect";
import {Obj} from "src/libs/types";

export interface Props extends FormComponentProps, ModalComponentProps {
    visible: boolean;
    handleOk?: () => void;
    onCancel: () => void;
    title: string;
    record?: any
    qcLevel?: any
}

const formItemLayout = {
    labelCol: {
        sm: {span: 20}
    },
    wrapperCol: {
        sm: {span: 24}
    }
}
const qcQuarter = ['全年', '上半年', '下半年', '第一季度', '第二季度', '第三季度', '第四季度']
const qcMonthList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
];
function QcQuarterlyModal(props: Props) {
    const [formCreateVisible, setFormCreateVisible] = useState(false);
    const deptList:Obj =[{name: '全院', code: '全院'}, ...authStore.deptList]
    /**表单可选内容*/
    const [summaryForm, setSummaryForm] = useState({} as any)
    let {
        visible,
        onCancel,
        title,
        record,
        qcLevel,
        form: {getFieldDecorator, validateFields, setFieldsValue, resetFields, getFieldValue}
    } = props

    const onSave = (e: any) => {
        validateFields((err, value) => {
            if (err) {
                return
            }
            let timeObj: any = {}
            timeObj = QuarterlyZzwyData.getDateRange(value.reportType, value.qcTime, moment(value.reportYear).format('YYYY'))
            /**需要根据选的报告类型来组装时间**/
            let params = {
                hospitalCode: 'zzwy',
                reportLevel: qcLevel,
                ...value,
                summaryFormCode: summaryForm.qcCode,
                templateName: '季度质量分析报告', //固定
                reportYear: moment(value.reportYear).format('YYYY'),
                ...timeObj
            }
            /**有id走编辑，无走新增**/
            if (record?.id) {
                qcZzwyApi.updateQcReport({
                    id: record?.id,
                    reportName: value.reportName
                }).then((res: any) => {
                    message.success('更新成功')
                    onCancel()
                    QuarterlyZzwyData.getTableList()
                })
            }else{
                /**数据清空**/
                QuarterlyZzwyData.resetPropertiesToDefault()
                qcZzwyApi.createQcReport({...params}).then((res: any) => {
                    QuarterlyZzwyData.updateReportMasterData(res.data)
                    onCancel()
                    appStore.history.push(`/QuarterlyAnalysisReportZzwyDetail?qcLevel=${qcLevel}`);
                })
            }
        })
    }
    useEffect(() => {
        if (visible) resetFields()
    }, [visible])
const reportNameMemo:string =useMemo(()=>{
    let obj:any =deptList.find((item:DeptType)=>item.code ===  getFieldValue('wardCode'))
    return moment(getFieldValue('reportYear')).format('YYYY') + getFieldValue('qcTime') +  obj?.name
    + getFieldValue('summaryFormName')
},[getFieldValue('reportYear'),getFieldValue('qcTime'),getFieldValue('wardCode'),getFieldValue('summaryFormName')])
    return (
        <Modal
            title={title} visible={visible} onOk={onSave} onCancel={onCancel} okText='确定' centered>
            <Wrapper>
                <Form>
                    <Form.Item label='报告类型' {...formItemLayout} >
                        {getFieldDecorator('reportType', {
                            initialValue: record?.reportType || "季度",
                            rules: [{required: true, message: '季度不能为空'}]
                        })(
                            <Select
                                disabled={record?.id}
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{width: '100%'}}
                                placeholder='选择报告类型'>
                                {[{code: '季度', name: '季度'}, {code: "月度", name: '月度'}].map((item: any) => {
                                    return (
                                        <Select.Option value={item.code} key={item}>
                                            {item.name}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='质控年度'>
                        {getFieldDecorator('reportYear', {
                            initialValue: record?.reportYear ? moment(record?.reportYear) : moment(),
                        })(<YearPicker disabled={record?.id} style={{width: '100%'}}/>)}
                    </Form.Item>
                    {getFieldValue('reportType') == '季度' && <Form.Item label='质控时间' {...formItemLayout} >
                        {getFieldDecorator('qcTime', {
                            initialValue: record?.qcTime || "全年",
                            rules: [{required: true, message: '质控时间不能为空'}]
                        })(
                            <Select
                                disabled={record?.id}
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{width: '100%'}}
                                placeholder='选择质控时间'>
                                {qcQuarter.map((item: any) => {
                                    return (
                                        <Select.Option value={item} key={item}>
                                            {item}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                        )}
                    </Form.Item>}
                    {getFieldValue('reportType') == '月度' && <Form.Item label='质控时间' {...formItemLayout} >
                        {getFieldDecorator('qcTime', {
                            initialValue: record?.qcTime || "1",
                            rules: [{required: true, message: '质控时间不能为空'}]
                        })(
                            <Select
                                disabled={record?.id}
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{width: '100%'}}
                                placeholder='选择质控时间'>
                                {qcMonthList.map((item: any) => {
                                    return (
                                        <Select.Option value={item} key={item}>
                                            {item}月
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                        )}
                    </Form.Item>}
                    <Form.Item label='质控科室' {...formItemLayout} >
                        {getFieldDecorator('wardCode', {
                            initialValue: record?.wardCode || '全院',
                            rules: [{required: true, message: '科室不能为空'}]
                        })(
                            <Select
                                disabled={record?.id}
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{width: '100%'}}
                                placeholder='选择所属科室'>
                                {deptList.map((item: any) => {
                                    return (
                                        <Select.Option value={item.code} key={item}>
                                            {item.name}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label='报告名称' {...formItemLayout} >
                        {getFieldDecorator('reportName', {
                            initialValue: record?.reportName || reportNameMemo,
                            rules: [{required: true, message: '报告名称不能为空'}]
                        })(<Input/>
                        )}
                    </Form.Item>
                    <Form.Item label='模板名称' {...formItemLayout} >
                        {getFieldDecorator('summaryFormName', {
                            initialValue: record?.summaryFormName || '',
                            rules: [{required: true, message: '模板名称不能为空'}]
                        })(<Input
                            disabled={record?.id}
                            suffix={
                                <div onClick={() => setFormCreateVisible(true)}>
                                    ...
                                </div>
                            }/>)}
                    </Form.Item>
                </Form>
                <FormCreateModal
                    onCancel={() => setFormCreateVisible(false)}
                    onOk={(qcCodeObj: any) => {
                        setFieldsValue({summaryFormName: qcCodeObj?.qcName})
                        setSummaryForm(qcCodeObj)
                        setFormCreateVisible(false)
                    }}
                    visible={formCreateVisible}
                    level={qcLevel}
                />
            </Wrapper>

        </Modal>
    )
}

const Wrapper = styled.div`
  .ant-form-item .ant-form-item-label {
    text-align: left !important;
  }

  .ant-form-item {
    margin-bottom: 0 !important;
  }

  .divStyle {
    position: relative;
    width: 100%;
  }
`

export default Form.create()(observer(QcQuarterlyModal)) as any
