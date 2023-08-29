import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import {Modal, Form, Input, Radio, Select, message, DatePicker} from 'antd'
import {FormComponentProps} from 'antd/lib/form/Form'
import {observer} from 'mobx-react-lite'
import {ModalComponentProps} from "src/libs/createModal";
import {appStore, authStore} from "src/stores";
import {QuarterlyZzwyData} from "src/modules/quality/views/qcZzwy/qcQuarterlyAnalysisReport/Data";
import moment from "moment";
import {monthList} from "src/enums/date";
import FormCreateModal from "src/modules/quality/views/qualityControlRecord/components/common/FormCreateModal";
import {qualityControlRecordVM} from "src/modules/quality/views/qualityControlRecord/QualityControlRecordVM";
import app from "src/App";
import {qcZzwyApi} from "src/modules/quality/views/qcZzwy/qcZzwyApi";
import YearPicker from 'src/components/YearPicker';

export interface Props extends FormComponentProps, ModalComponentProps {
    visible: boolean;
    handleOk?: () => void;
    onCancel: () => void;
    title: string;
    record?: any
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
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
];

function QcQuarterlyModal(props: Props) {
    // console.log(appStore.match.params);
    const [formCreateVisible, setFormCreateVisible] = useState(false);
    let {
        visible,
        handleOk,
        onCancel,
        title,
        record,
        form: {getFieldDecorator, validateFields, setFieldsValue, resetFields, getFieldValue}
    } = props

    const onSave = (e: any) => {
        validateFields((err, value) => {
            if (err) {
                return
            }
            let params = {
                hospitalCode: 'zzwy',
                reportLevel: 1, //暂时写死
                ...value,
                templateName: '季度质量分析报告',
                reportYear: moment(value.reportYear).format('YYYY')
            }
            qcZzwyApi.createQcReport({...params}).then((res: any) => {
                console.log(res);
                QuarterlyZzwyData.reportMasterData = res.data.reportMasterData
                QuarterlyZzwyData.qcReportItemDtoList =res.data.qcReportItemDtoList
                QuarterlyZzwyData.saveQcReport()
                onCancel()
                appStore.history.push(`/QuarterlyAnalysisReportZzwyDetail`);
                // message.success('操作成功')
            })
        })
    }
    useEffect(() => {
        if (visible) resetFields()
    }, [visible])

    return (
        <Modal
            title={title} visible={visible} onOk={onSave} onCancel={onCancel} okText='确定' centered>
            <Wrapper>
                <Form>
                    <Form.Item label='报告类型' {...formItemLayout} >
                        {getFieldDecorator('reportQuarter', {
                            initialValue: "季度",
                            rules: [{required: true, message: '季度不能为空'}]
                        })(
                            <Select
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
                        {getFieldDecorator('reportYear',{
                            initialValue:moment(),
                        })(<YearPicker style={{width: '100%'}}/>)}
                    </Form.Item>
                    {getFieldValue('reportQuarter') == '季度' && <Form.Item label='质控时间' {...formItemLayout} >
                        {getFieldDecorator('reportMonth', {
                            initialValue: "全年",
                            rules: [{required: true, message: '质控时间不能为空'}]
                        })(
                            <Select
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
                    {getFieldValue('reportQuarter') == '月度' && <Form.Item label='质控时间' {...formItemLayout} >
                        {getFieldDecorator('reportMonth', {
                            initialValue: "1月",
                            rules: [{required: true, message: '质控时间不能为空'}]
                        })(
                            <Select
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{width: '100%'}}
                                placeholder='选择质控时间'>
                                {qcMonthList.map((item: any) => {
                                    return (
                                        <Select.Option value={item} key={item}>
                                            {item}
                                        </Select.Option>
                                    )
                                })}
                            </Select>
                        )}
                    </Form.Item>}
                    <Form.Item label='质控科室' {...formItemLayout} >
                        {getFieldDecorator('wardCode', {
                            initialValue: '全院',
                            rules: [{required: true, message: '科室不能为空'}]
                        })(
                            <Select
                                showSearch
                                filterOption={(input: any, option: any) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{width: '100%'}}
                                placeholder='选择所属科室'>
                                {[{name: '全院', code: '全院'}, ...authStore.deptList].map((item: any) => {
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
                            initialValue: '',
                            rules: [{required: true, message: '报告名称不能为空'}]
                        })(<Input/>
                        )}
                    </Form.Item>
                    <Form.Item label='模板名称' {...formItemLayout} >
                        {getFieldDecorator('summaryFormName', {
                            initialValue: '',
                            rules: [{required: true, message: '模板名称不能为空'}]
                        })(<Input suffix={
                            <div onClick={() => setFormCreateVisible(true)}>
                                ...
                            </div>
                        }/>)}
                    </Form.Item>
                </Form>
                <FormCreateModal
                    onCancel={() => setFormCreateVisible(false)}
                    onOk={(qcCodeObj: any) => {
                        console.log(qcCodeObj);
                        setFieldsValue({summaryFormName: qcCodeObj?.qcName,summaryFormCode:qcCodeObj?.qcCode})
                        setFormCreateVisible(false)
                    }}
                    visible={formCreateVisible}
                    zzwyCreat={true}
                    level={'1'}
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
const ClickBtn = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  border-left: none;
  width: 50px;
  height: 100%;
  line-height: 28px;
  cursor: pointer;
  text-align: center;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`
export default Form.create()(observer(QcQuarterlyModal)) as any
