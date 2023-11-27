import Form from 'src/components/Form'
import styled from 'styled-components'
import React, {useLayoutEffect, useRef} from 'react'
import {Col, Input, Modal, Row, Select, InputNumber} from 'antd'
import {Rules} from 'src/components/Form/interfaces'
import {Obj} from 'src/libs/types'
import {ModalComponentProps} from 'src/libs/createModal'
import {authStore} from 'src/stores'
import { jmfydModel as model} from "src/modules/nurseHandBookNew/views/detail-jmfy/model";
import {observer} from "mobx-react-lite";
import {Switch} from "src/vendors/antd";

const {TextArea} = Input
const {Option} = Select

export interface Props extends ModalComponentProps {
    onOkCb: Function
    menuCode?: string
    wideIndicators?: number
    record?: any
}


const ALL_RULE: Rules = {
    deptCode: (val) => !!val || '请选择科室',
    fieldName: (val) => !!val || '请输入字段名称',
    assortName: (val) => !!val || '请选择分类',
    sort: (val) => !!val || '请输入排序',
    qualified: (val) => !!val || '请输入目标值',
    dataInterface: (val) => !!val || '请输入数字接口',
    description: (val) => !!val || '请输入数字接口描述',
}
export default observer(function (props: Props) {
    const refForm = useRef<any>()
    const {visible, onCancel, onOkCb, menuCode, wideIndicators, record} = props
    const {deptList} = authStore
    useLayoutEffect(() => {
        if (visible) {
            setTimeout(() => {
                if (refForm.current) {
                    if (record && Object.keys(record).length >= 1) {
                        for (let i in record) {
                            refForm.current.setFields({
                                [i]: record[i],
                                status: record['status'] == 1
                            })
                        }
                    }
                    refForm.current.setFields({
                        wideIndicators: wideIndicators == 1 ? '全院共性指标' : "专科指标"
                    })
                }
            }, 300)
        }
    }, [visible])
    const handleOk = () => {
        let current = refForm.current
        if (current) {
            let formData = current.getFields()
            current.validateFields().then((res: any) => {
                const {deptCode, assortName} = formData
                const deptName = deptList.find(v => v.code === deptCode)?.name || ''
                const assortCode = model.menuList.find((v: any) => v.name === assortName)?.menuCode || ''
                let params: Obj = {
                    ...formData,
                    deptName,
                    assortCode
                }
                console.log("formData===",formData);
                onOkCb && onOkCb(params)
                onCancel()
            })
                .catch((e: any) => {
                    console.log(e);
                })
        }
    }

    const handleFormChange = (key: any, val: any) => {

    }
    return (
        <Modal
            forceRender
            destroyOnClose
            title={record?.id ? '编辑指标' : '添加指标'}
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
            centered>
            <Wrapper>
                <Form ref={refForm} onChange={handleFormChange} rules={ALL_RULE}>
                    <Row>
                        {/*是否为全院指标：1为是、0为否*/}
                        <Col span={6} className='label'>
                            性质：
                        </Col>
                        <Col span={18}>
                            <Form.Field name='wideIndicators'>
                                <Input disabled/>
                            </Form.Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className='label'>
                            科室：
                        </Col>
                        <Col span={18}>
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
                        <Col span={6} className='label'>
                            字段名称：
                        </Col>
                        <Col span={18}>
                            <Form.Field name='fieldName'>
                                <Input/>
                            </Form.Field>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6} className='label'>
                            分类：
                        </Col>
                        <Col span={18}>
                            <Form.Field name='assortName'>
                                <Select>
                                    {
                                        model.menuList.map((v: any) => (
                                            <Option key={v.menuCode} value={v.name}>{v.name}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Field>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6} className='label'>
                            排序：
                        </Col>
                        <Col span={18}>
                            <Form.Field name='sort'>
                                <InputNumber/>
                            </Form.Field>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6} className='label'>
                            目标值：
                        </Col>
                        <Col span={18}>
                            <Form.Field name='qualified'>
                                <InputNumber/>
                            </Form.Field>
                        </Col>
                    </Row>


                    <Row>
                        <Col span={6} className='label'>
                            数字接口：
                        </Col>
                        <Col span={18}>
                            <Form.Field name='dataInterface'>
                                <Input/>
                            </Form.Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className='label'>
                            编码：
                        </Col>
                        <Col span={18}>
                            <Form.Field name='itemCode'>
                                <Input/>
                            </Form.Field>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6} className='label'>
                            状态：
                        </Col>
                        <Col span={4}>
                            <Form.Field name='status'>
                                <Switch/>
                            </Form.Field>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className='label'>
                            描述(用于字段描述)：
                        </Col>
                        <Col span={16}>
                            <Form.Field name='description'>
                                <TextArea/>
                            </Form.Field>
                        </Col>
                    </Row>
                </Form>
            </Wrapper>
        </Modal>
    )
})

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