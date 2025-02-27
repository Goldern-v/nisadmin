import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, AutoComplete } from 'antd'
import Form from 'src/components/Form'
import { Row, Col, DatePicker, Input, Select } from 'src/vendors/antd'
import { PageObj, filterItem } from '../config/getPageObj'
import YearRangePicker from 'src/components/YearRangePicker'
import { to } from 'src/libs/fns'
import moment from 'moment'
import YearPicker from 'src/components/YearPicker'
import YearMonthRangePicker from 'src/components/YearMonthRangePicker'
import { statisticsViewModal } from '../StatisticsViewModal'
import { useLayoutEffect } from 'src/types/react'
import SelectOrAutoInput from '../../nurseFiles-whyx/views/nurseFileDetail/components/SelectOrAutoInput'
import NumberUntilSelect from './numberUntilSelect'
const { RangePicker } = DatePicker
export interface Props {
  pageObj: PageObj
  filterRef: any
  onload: any
}

export default function FilterCon(props: Props) {
  let { pageObj, filterRef, onload } = props
  let refForm = React.createRef<Form>()
  // 授权类别
  let [grantType, setGrantType] = useState('')
  // 授权名称 -- 授权名称下拉框受授权类别控制
  let [authorizationName, setAuthorizationName]: any[] = useState([])


  useLayoutEffect(() => {
    if (refForm.current) {
      refForm.current.clean()
      let form = refForm.current
      form.setFields({
        deptCode: statisticsViewModal.selectedDeptCode,
        // ageStart: '全部',
        // ageEnd: '全部',
        // insideOutsideState: '',
        // postState: '',
        // winningType: '',
        // winningLevel: '',
        // learnLevel: '',
        // declarantDeptName: '全部',
        // innovationType: '',
        // innovationGrade: '',
        // promotionArea: '',
        // unitLocal: '',
        // unitLocal1: '全部',
      })
    }
  }, [pageObj.title])

  useLayoutEffect(() => {
    if (refForm.current) {
      let form = refForm.current
      statisticsViewModal.getChildCodeList(form.state.values.grantType).then(res => {
        setAuthorizationName([...res])
      })
    }
  }, [grantType])

  const onFieldChange = async (name: string, text: any, form: Form<any>) => {
    let [err, value] = await to(form.validateFields())
    if (value?.grantType) setGrantType(value?.grantType)

    if (err) return

    let result: any = {}
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

    for (let item of pageObj.filterList) {
      if (item.name && (item.type == 'input' || item.type == 'select' || item.type == 'multiplesSelect' || item.type == 'numberUntilSelect' || item.type == 'multiplesSelecteSpecially')) {
        result[item.name] = value[item.name] === 0 ? (isNumber(value[item.name]) ? value[item.name] + '' : value[item.name]) : ((isNumber(value[item.name]) ? value[item.name] + '' : value[item.name]) || '')
        // (item.name === 'declarantDeptName' && (result['declarantDeptName'] = value['declarantDeptName'] === '全部'? '': value['declarantDeptName']))
        item.name1 && (result[item.name1] = value[item.name1] === 0 ? (isNumber(value[item.name1]) ? value[item.name1] + '' : value[item.name1]) : ((isNumber(value[item.name1]) ? value[item.name1] + '' : value[item.name1]) || ''))
      } else if (item.name && item.type == 'yearRangePicker' && item.nameList) {
        if (value[item.name]) {
          for (let i = 0; i < item.nameList.length; i++) {
            result[item.nameList[i]] = value[item.name][i] ? moment(value[item.name][i]).format('YYYY') : ''
          }
        }
      } else if (item.name && item.type == 'yearMonthRangePicker' && item.nameList) {
        if (value[item.name]) {
          for (let i = 0; i < item.nameList.length; i++) {
            result[item.nameList[i]] = value[item.name][i] ? moment(value[item.name][i]).format('YYYY-MM') : ''
          }
        }
      } else if (item.name && item.type == 'dateRangePicker' && item.nameList) {
        if (value[item.name]) {
          for (let i = 0; i < item.nameList.length; i++) {
            result[item.nameList[i]] = value[item.name][i] ? moment(value[item.name][i]).format('YYYY-MM-DD') : ''
          }
        }
      }
    }

    statisticsViewModal.selectedDeptCode = value.deptCode
    if (result.deptCode?.length == 1 && result.deptCode[0] == '全部') {
      result.deptCodes = statisticsViewModal
        .getDict('全部科室')
        .map((item: any) => item.code)
        .filter((item: any) => item != '全部')
    } else {
      result.deptCodes = result.deptCode
    }
    delete result.deptCode
    // 科室创新-申报科室
    result.declarantDeptName = result.declarantDeptName === '全部' ? '' : result.declarantDeptName
    // 资质院内
    let newGrantType = statisticsViewModal.sortList.filter((item: any) => item.code === result.grantType)
    result.grantType = newGrantType[0]?.name

    if (value.empNo) result.empNo = value.empNo
    filterRef.current = result
    onload()
  }

  const isNumber = (value: any) => {
    return typeof value === 'number' && isFinite(value);
  }

  const getComponent = (item: filterItem) => {
    switch (item.type) {
      case 'select': {
        return (
          <SelectOrAutoInput dictList={item.dataSource || []} />
          // <Select>
          //   {item.dataSource &&
          //     item.dataSource.map((item, index) => (
          //       <Select.Option value={item.code} key={index}>
          //         {item.name}
          //       </Select.Option>
          //     ))}
          // </Select>
        )
      }
      // case 'autoCompletSelect': {
      //   return (

      //   )
      // }
      case 'multiplesSelect': {
        return (
          <Select
            mode={item.multiple ? 'multiple' : ''}
            showSearch
            allowClear
            placeholder='请选择'
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            defaultValue={['']}
          >
            {item.dataSource &&
              item.dataSource.map((items, index) => (
                <Select.Option value={item.label === '申报科室' ? items.name : items.code} key={index}>
                  {items.name}
                </Select.Option>
              ))}
          </Select>
        )
      }
      case 'multiplesSelecteSpecially': {
        return (
          <Select
            showSearch
            allowClear
            placeholder='请选择'
            filterOption={(input: any, option: any) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {authorizationName &&
              authorizationName.map((item: any, index: any) => (
                <Select.Option value={item.name} key={index}>
                  {item.name}
                </Select.Option>
              ))}
          </Select>
        )
      }
      case 'input': {
        return <Input maxLength={item.limit} placeholder={item.placeholder || '请输入'} />
      }
      case 'yearRangePicker': {
        return <YearRangePicker />
      }
      case 'dateRangePicker': {
        return <RangePicker />
      }
      case 'yearPicker': {
        return <YearPicker />
      }
      case 'yearMonthRangePicker': {
        return <YearMonthRangePicker />
      }
      // case 'numberUntilSelect': {
      //   return ''
      // }
    }
  }
  // useEffect(() => {
  //   refForm.current && refForm.current.clean()
  // }, [pageObj.title])
  return (
    <Wrapper id={'filterCon'}>
      <Form ref={refForm} labelWidth={80} onChange={onFieldChange}>
        <Row>
          {pageObj.filterList.map((item, index) => (
            <Col span={6} key={index} style={item.name == 'deptCode' ? { marginBottom: -6 } : {}}>
              {item?.numberUntilSelect ?
                <NumberUntilSelect step={item.step || 0.1} dictList={item.dataSource || []} numberUntilInput={item.numberUntilInput} label={item.label} unit={item.unit} name={{ name: item.name, name1: item.name1 }} /> :
                <Form.Field label={item.label} name={item.name}>
                  {getComponent(item)}
                </Form.Field>
              }
            </Col>
          ))}
          {/* <Col span={6}>
            <Form.Field label={'工号或姓名'} name={'empNo'}>
              <Input />
            </Form.Field>
          </Col> */}
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type='primary' style={{ marginLeft: 40, marginBottom: 20 }} onClick={() => onload()}>
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  min-height: 100px;
  margin-top: 10px;
  padding: 25px 30px 0 0;
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
