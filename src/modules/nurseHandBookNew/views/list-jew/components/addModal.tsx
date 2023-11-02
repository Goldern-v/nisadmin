import Form from 'src/components/Form'
import styled from 'styled-components'
import React, {useLayoutEffect, useRef, useState} from 'react'
import {Col, DatePicker, message, Modal, Row, Select} from 'antd'
import {Rules} from 'src/components/Form/interfaces'
import {Obj} from 'src/libs/types'
import YearPicker from 'src/components/YearPicker'
import {ModalComponentProps} from 'src/libs/createModal'
import {authStore} from 'src/stores'
import SelectFilter from 'src/components/SelectFilter'
import {quarterList, quarterYear} from "src/enums/date";
import {CoverArr} from "src/modules/nurseHandBookNew/views/list-jew/utils/enums";

const {Option} = Select

export interface Props extends ModalComponentProps {
    onOkCb: Function
    addQuery: Obj
    formList: Obj[]
    menuCode?: string
}

const dateFormat = 'YYYY-MM-DD';

const ALL_RULE: Rules = {
    year: (val) => !!val || '请选择年份',
    deptCode: (val) => !!val || '请选择科室',
    date: (val) => val?.length == 2 || '请选择日期',
    type:(val) => !!val || '请选择护士长封面',
    // menuCode: (val) => !!val || '请选择记录表',
}
const Quarter = {'第一季度': 1, '第二季度': 2, '第三季度': 3, '第四季度': 4}
export default function (props: Props) {
    const refForm = useRef<any>()
    const [rules, setRules] = useState<Obj>({})
    const {visible, onCancel, onOkCb, addQuery = {}, formList, menuCode} = props
    /**封面url**/
        // const [pathUrl,setPathUrl] =useState({} as any)
    const {deptList} = authStore
    useLayoutEffect(() => {
        if (visible) {
            console.log(addQuery);
            if (addQuery) {
                setRules(Object.keys(addQuery).reduce((prev, cur) => {
                    if (ALL_RULE[cur]) {
                        prev[cur] = ALL_RULE[cur]
                    }
                    return prev
                }, {}))
            }
            setTimeout(() => {
                if (refForm.current) {
                    if (addQuery.startTime) {
                        const newObj = {
                            ...addQuery,
                        }
                        const {startTime, endTime} = newObj
                        delete newObj.startTime
                        delete newObj.endTime
                        newObj.date = [startTime, endTime]
                        refForm.current.setFields(newObj)
                        return
                    }
                    refForm.current.setFields(
                        addQuery
                    )
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
                    const menuName = formList.find(v => v.menuCode === menuCode)?.name || ''

                    let params: Obj = {
                        ...formData,
                        deptName
                    }
                    if (params.hasOwnProperty('year')) params.year = params.year ? params.year.format('YYYY') : ''
                    if (params.hasOwnProperty('quarter')) params.quarter = Quarter[params.quarter]
                    if (params.hasOwnProperty('date')) {
                        const [startTime = '', endTime = ''] = params.date
                        params.startTime = startTime ? startTime.format('YYYY-MM-DD') + ' 00:00:00' : ''
                        params.endTime = endTime ? endTime.format('YYYY-MM-DD') + ' 23:59:59' : ''
                    }
                    if (params.hasOwnProperty('time')) params.time = params.time ? params.time.format("YYYY-MM-DD HH:mm:ss") : ''

                    // if(pathUrl){
                    //   params['url']=pathUrl?.path
                    // }
                    if (menuName) params.menuName = menuName

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
    // const onChange=(e?:any)=>{
    //   if(e[0]){
    //     setPathUrl(e[0])
    //   }
    // }
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
                    {
                        addQuery?.menuCode !== undefined &&
                        <Row>
                            <Col span={8} className='label'>
                                记录表：
                            </Col>
                            <Col span={16}>
                                <Form.Field name='menuCode'>
                                    <SelectFilter list={formList} configKey={{
                                        value: 'menuCode', name:
                                            'name'
                                    }}/>
                                </Form.Field>
                            </Col>
                        </Row>}
                    {
                        addQuery?.startTime !== undefined &&
                        <Row>
                            <Col span={8} className='label'>
                                日期：
                            </Col>
                            <Col span={16}>
                                <Form.Field name='date'>
                                    <DatePicker.RangePicker format={dateFormat}/>
                                </Form.Field>
                            </Col>
                        </Row>}
                    {
                        addQuery?.year !== undefined &&
                        <Row>
                            <Col span={8} className='label'>
                                年份：
                            </Col>
                            <Col span={16}>
                                <Form.Field name='year'>
                                    <YearPicker/>
                                </Form.Field>
                            </Col>
                        </Row>}
                    {
                        addQuery?.quarter !== undefined &&
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
                        </Row>}
                    {
                        addQuery?.month !== undefined &&
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
                        </Row>}
                    {/* todo   护士长手册封面  */}
                    {
                        addQuery.coverCode == '925SCFM_1' &&
                        <Row>
                            <Col span={8} className='label'>
                                护士长封面：
                            </Col>
                            <Col span={16}>
                                <Form.Field name='type'>
                                    <Select>
                                        {CoverArr.map((item) => <Option value={item.type}
                                                                        key={item.type + 'a'}>{item.name}</Option>)}
                                    </Select>
                                </Form.Field>
                            </Col>
                        </Row>
                    }
                    {/*{*/}
                    {/*  addQuery.code =='no_validate_create_more' &&*/}
                    {/*    <Row>*/}
                    {/*      <Col span={8} className='label' >*/}
                    {/*        名称：*/}
                    {/*      </Col>*/}
                    {/*      <Col span={16}>*/}
                    {/*        <Form.Field  name='title' required>*/}
                    {/*          <Input  placeholder='请输入文件名称'/>*/}
                    {/*        </Form.Field>*/}
                    {/*      </Col>*/}
                    {/*    </Row>*/}
                    {/*}*/}
                    {/*{*/}
                    {/*    addQuery.code =='no_validate_create_more' &&*/}
                    {/*    <Row>*/}
                    {/*      <Col span={8} className='label'>*/}
                    {/*        <span style={{color:"red",marginRight:4}}>*</span>上传文件：*/}
                    {/*      </Col>*/}
                    {/*      <Col span={16}>*/}
                    {/*        {*/}
                    {/*          pathUrl && pathUrl.fileName ? <div className='fileContent'>*/}
                    {/*          <div className='fileName'>{pathUrl.fileName}</div>*/}
                    {/*            <Icon onClick={()=>setPathUrl(undefined)} className='delete-icon' type={'delete'}/>*/}
                    {/*          </div>: <MultiFileUploader*/}
                    {/*              isFormModel*/}
                    {/*              onChange={onChange}*/}
                    {/*              accept={'.pdf'} size={1} maxSize={8 * 1024 * 1024}*/}
                    {/*          />*/}
                    {/*        }*/}
                    {/*      </Col>*/}
                    {/*    </Row>*/}
                    {/*}*/}
                    {
                        addQuery.halfYear !== undefined &&
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
                    }
                    {
                        addQuery?.time !== undefined &&
                        <Row>
                            <Col span={8} className='label'>
                                日期：
                            </Col>
                            <Col span={16}>
                                <Form.Field name='time'>
                                    <DatePicker format={dateFormat}/>
                                </Form.Field>
                            </Col>
                        </Row>}
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
