import Form from 'src/components/Form'
import styled from 'styled-components'
import React, {useLayoutEffect, useRef, useState} from 'react'
import {Col, DatePicker, message, Modal, Row, Select} from 'antd'
import {Rules} from 'src/components/Form/interfaces'
import {Obj} from 'src/libs/types'
import YearPicker from 'src/components/YearPicker'
import {ModalComponentProps} from 'src/libs/createModal'
import { authStore} from 'src/stores'
import {quarterList, quarterYear} from "src/enums/date";

const {Option} = Select

export interface Props extends ModalComponentProps {
    onOkCb: Function
    menuCode?: string
}

const dateFormat = 'YYYY-MM-DD';

const ALL_RULE: Rules = {
    deptCode: (val) => !!val || '请选择科室',
}
export default function (props: Props) {
    const refForm = useRef<any>()
    const [rules, setRules] = useState<Obj>({})
    const {visible, onCancel, onOkCb, menuCode} = props

    const {deptList} = authStore
    useLayoutEffect(() => {
        if (visible) {

            setTimeout(() => {
                if (refForm.current) {
                    // refForm.current.setFields(newObj)
                }
            }, 300)
        }
    }, [visible])
    const handleOk = () => {
        let current = refForm.current

        if (current) {
            let formData = current.getFields()
            if (menuCode === '925NDBRDJ_7' && !formData.menuCode) {
                return message.info('记录表不能为空')
            }
            current
                .validateFields()
                .then((res: any) => {
                    // if( addQuery.code =='no_validate_create_more' && Object.keys(pathUrl).length === 0){
                    //   return message.info('封面未上传')
                    // }
                    let {deptCode, menuCode} = formData
                    const deptName = deptList.find(v => v.code === deptCode)?.name || ''
                    let params: Obj = {
                        ...formData,
                        deptName
                    }
                    if (params.hasOwnProperty('year')) params.year = params.year ? params.year.format('YYYY') : ''
                    if (params.hasOwnProperty('date')) {
                        const [startTime = '', endTime = ''] = params.date
                        params.startTime = startTime ? startTime.format('YYYY-MM-DD') + ' 00:00:00' : ''
                        params.endTime = endTime ? endTime.format('YYYY-MM-DD') + ' 23:59:59' : ''
                    }
                    if (params.hasOwnProperty('time')) params.time = params.time ? params.time.format("YYYY-MM-DD HH:mm:ss") : ''



                    onOkCb && onOkCb(params)
                })
                .catch((e: any) => {
                    console.log(e);
                })
        }
    }

    const handleFormChange = (key: any, val: any) => {

    }
    const monthList = (() => {
        let currentMonth = 12;
        let monthArr = []
        while (currentMonth--) {
            monthArr.push(currentMonth + 1)
        }
        return monthArr
    })()

    return (
        <Modal
            title='创建'
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
            centered>
            <Wrapper>
                <Form ref={refForm} onChange={handleFormChange} rules={rules}>
                    <Row>
                        <Col span={8} className='label'>
                            科室：
                        </Col>
                        <Col span={16}>
                            <Form.Field name='deptCode'>
                                <Select>
                                    {
                                        deptList.map(v => (
                                            <Option key={v.code} value={v.code}>{v.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Field>
                        </Col>
                    </Row>


                    <Row>
                        <Col span={8} className='label'>
                            日期：
                        </Col>
                        <Col span={16}>
                            <Form.Field name='date'>
                                <DatePicker.RangePicker format={dateFormat}/>
                            </Form.Field>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={8} className='label'>
                            年份：
                        </Col>
                        <Col span={16}>
                            <Form.Field name='year'>
                                <YearPicker/>
                            </Form.Field>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={8} className='label'>
                            季度：
                        </Col>
                        <Col span={16}>
                            <Form.Field name='quarter'>
                                <Select>
                                    {quarterList.map((quarter: string) => <Option value={`${quarter}`}
                                                                                  key={quarter}>{quarter}</Option>)}
                                </Select>
                            </Form.Field>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={8} className='label'>
                            月份：
                        </Col>
                        <Col span={16}>
                            <Form.Field name='month'>
                                <Select>
                                    {monthList.map((month: number) => <Option value={`${month}`}
                                                                              key={month}>{month}</Option>)}
                                </Select>
                            </Form.Field>
                        </Col>
                    </Row>


                    <Row>
                        <Col span={8} className='label'>
                            年度：
                        </Col>
                        <Col span={16}>
                            <Form.Field name='halfYear'>
                                <Select>
                                    {quarterYear.map((quarter: string) => <Option value={`${quarter}`}
                                                                                  key={quarter}>{quarter}</Option>)}
                                </Select>
                            </Form.Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8} className='label'>
                            日期：
                        </Col>
                        <Col span={16}>
                            <Form.Field name='time'>
                                <DatePicker format={dateFormat}/>
                            </Form.Field>
                        </Col>
                    </Row>
                </Form>
            </Wrapper>
        </Modal>
    )
}

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;

  .ant-col {
    line-height: 32px;
    text-align: right;
    padding-right: 5px;
    margin-bottom: 10px;

    > span {
      width: 100%;
    }

    .ant-select {
      width: 100%;
    }
  }

  .form-model .add-btn {
    top: 0;
  }

  .fileContent {
    position: relative;

    .fileName {
      text-align: left;
    }
  }

  .delete-icon {
    position: absolute;
    right: 0;
    top: 4px;
    visibility: hidden;
  }

  .fileContent:hover .delete-icon {
    visibility: visible;
  }

`