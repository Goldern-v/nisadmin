import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { nurseFilesListViewModel } from '../NurseFilesListViewModel'
import { observer } from 'mobx-react-lite'
import { Button, Tag } from 'antd'
import { theme } from 'src/styles/theme'
import { to } from 'src/libs/fns'
import Form from 'src/components/Form'
import { Row, Col, Input, Select } from 'src/vendors/antd'
import { statisticsViewModal } from 'src/modules/nurseFiles/view/statistics/StatisticsViewModal'
import AgeRangePicker from 'src/components/AgeRangePicker'
import YearTimeRangePicker from 'src/components/YearTimeRangePicker'
import MonthTimeRangePicker from 'src/components/MonthTimeRangePicker'
import { authStore } from 'src/stores'

export default observer(function FilterCon() {
  let refForm = React.createRef<Form>()
  useLayoutEffect(() => {
    if (refForm.current) {
      refForm.current.clean()
      let form = refForm.current
      nurseFilesListViewModel.init().then((res) => {
        form &&
          form.setFields({
            deptCode: statisticsViewModal.selectedDeptCode
          })

        // nurseFilesListViewModel.loadNursingList()
      })
    }
  }, [])
  const onFieldChange = async (name: string, text: any, form: Form<any>) => {
    let [err, value] = await to(form.validateFields())
    if (err) return
    if (value.deptCode.length > 1) {
      if (value.deptCode[value.deptCode.length - 1] == '全院') {
        value.deptCode = ['全院']
        form.setField('deptCode', value.deptCode)
        return
      } else if (value.deptCode.includes('全院')) {
        value.deptCode = value.deptCode.filter((item: any) => item != '全院')
        form.setField('deptCode', value.deptCode)
        return
      } else if (value.deptCode[value.deptCode.length - 1] == '全部') {
        value.deptCode = ['全部']
        form.setField('deptCode', value.deptCode)
        return
      } else if (value.deptCode.includes('全部')) {
        value.deptCode = value.deptCode.filter((item: any) => item != '全部')
        form.setField('deptCode', value.deptCode)
        return
      }
    }
    let deptCodes
    if (value.deptCode.length == 1 && value.deptCode[0] == '全部') {
      deptCodes = statisticsViewModal
        .getDict('全部科室')
        .map((item: any) => item.code)
        .filter((item: any) => item != '全部')
    } else {
      deptCodes = value.deptCode
    }
    let postObj = {
      deptCodes: deptCodes,
      name: value.name,
      newTitle: value.newTitle,
      nurseHierarchy: value.nurseHierarchy,
      job: value.job,
      highestEducation: value.highestEducation,
      politicsLook: value.politicsLook,
      shoeSize: value.shoeSize,
      workConversion: value.workConversion,
      ageStart: value.age ? value.age[0] : '',
      ageEnd: value.age ? value.age[1] : '',
      goHospitalWorkStartYear: value.goHospitalWork ? value.goHospitalWork[0] : '',
      goHospitalWorkEndYear: value.goHospitalWork ? value.goHospitalWork[1] : '',
      zyzsEffectiveUpStartDate: value.zyzsEffectiveUp ? value.zyzsEffectiveUp[0] : '',
      zyzsEffectiveUpEndDate: value.zyzsEffectiveUp ? value.zyzsEffectiveUp[1] : ''
    }
    statisticsViewModal.selectedDeptCode = value.deptCode
    nurseFilesListViewModel.postObj = postObj
    nurseFilesListViewModel.loadNursingList()
  }

  return (
    <Wrapper>
      <Inner>
        <Form ref={refForm} labelWidth={80} onChange={onFieldChange}>
          <Row gutter={0}>
            <Col span={6} style={{ marginBottom: -6 }}>
              <Form.Field label={'科室'} name={'deptCode'}>
                <Select
                  mode='multiple'
                  allowClear={true}
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {statisticsViewModal.getDict('全部科室').map((item, index) => (
                    <Select.Option value={item.code} key={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={6}>
              <Form.Field label={'工号或姓名'} name={'name'}>
                <Input />
              </Form.Field>
            </Col>
            <Col span={6}>
              <Form.Field label={'最高学历'} name={'highestEducation'}>
                <Select allowClear={true}>
                  {statisticsViewModal.getDict('学历').map((item, index) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={6}>
              <Form.Field label={'职称'} name={'newTitle'}>
                <Select allowClear={true}>
                  {statisticsViewModal.getDict('技术职称').map((item, index) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={6}>
              <Form.Field label={'层级'} name={'nurseHierarchy'}>
                <Select allowClear={true}>
                  {statisticsViewModal.getDict('层级').map((item, index) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={6}>
              <Form.Field label={'职务'} name={'job'}>
                <Select allowClear={true}>
                  {statisticsViewModal.getDict('职务').map((item, index) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={6}>
              <Form.Field label={'政治面貌'} name={'politicsLook'}>
                <Select allowClear={true}>
                  {statisticsViewModal.getDict('政治面貌').map((item, index) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>

            <Col span={6}>
              <Form.Field label={'年龄'} name={'age'}>
                <AgeRangePicker />
              </Form.Field>
            </Col>
            <Col span={6}>
              <Form.Field label={'来院工作时间'} name={'goHospitalWork'}>
                <YearTimeRangePicker />
              </Form.Field>
            </Col>
            <Col span={6}>
              <Form.Field label={'编制'} name={'workConversion'}>
                <Select allowClear={true}>
                  {statisticsViewModal.getDict('工作编制').map((item, index) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
            <Col span={6}>
              <Form.Field label={'鞋码大小'} name={'shoeSize'}>
                <Select allowClear={true}>
                  {statisticsViewModal.getDict('鞋码大小').map((item, index) => (
                    <Select.Option value={item.code} key={index}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>

            <Col span={6}>
              <Form.Field label={'护士执业证书有效期'} name={'zyzsEffectiveUp'}>
                <MonthTimeRangePicker />
              </Form.Field>
            </Col>

            {/* <Col span={18} />
            <Col span={6}>
              <Button
                type='primary'
                style={{ marginLeft: 40, marginBottom: 20 }}
                onClick={() => nurseFilesListViewModel.loadNursingList()}
              >
                查询
              </Button> */}
            {/* </Col> */}
          </Row>
        </Form>
      </Inner>
    </Wrapper>
  )
})

const Wrapper = styled.div``
const Inner = styled.div`
  min-height: 100px;
  margin-top: 10px;
  padding: 25px 20px 0 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: ${(p) => p.theme.$shadow};
  .label {
    margin-right: 6px;
  }
  .ant-select {
    height: 26px;
  }
  .ant-select-selection--multiple {
    padding-bottom: 1px;
    height: 26px;
    overflow: hidden;
  }
`
