import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Select, Input, message } from 'antd'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import YearPicker from 'src/components/YearPicker'
import { Obj } from 'src/libs/types'
import { quarterAndYear } from 'src/enums/date'
import { dateFormat3 } from 'src/modules/nurseHandBookNew/views/detail-lyrm/config'

const Option = Select.Option

export interface Props {
  visible: boolean,
  onOk: any,
  onCancel: any
}

export default observer(function AddModal(props: Props) {
  const { visible, onCancel, onOk } = props
  const defParams = () => {
    let nowMoment = moment()
    return {
      timeType: nowMoment.quarter(),
      year: nowMoment,
      name: `${nowMoment.format('YYYY')}年${quarterAndYear[nowMoment.quarter() - 1]}不良事件分析报告`,
    }
  }
  const [params, setParams] = useState<Obj>(defParams)

  useEffect(() => {
    if (!visible) setParams(defParams())
  }, [visible])

  const handleOk = () => {
    let { year, timeType, name } = params
    if (!name) return message.warning('报告名称不能为空！')
    year = year.year()
    let dateBegin = '', dateEnd = '', timeSection = ''
    if (timeType === 0) {
      dateBegin = `${year}-01-01`
      dateEnd = `${year}-12-31`
    } else {
      const quarterFist = `${year}-${(timeType - 1) * 3 + 1}-1`
      dateBegin = moment(quarterFist).startOf('quarter').format(dateFormat3) 
      dateEnd = moment(quarterFist).endOf('quarter').format(dateFormat3) 

    }
    timeSection = `${dateBegin}~${dateEnd}`
    let data = {
      year,
      name,
      timeType,
      dateBegin,
      dateEnd,
      timeSection,
    }
    onOk && onOk(data)
  }

  const handlePanelChange = (value: any) => {
    setParams({ ...params, year: value })
  }
  useEffect(() => {
    setParams((val) => ({ ...val, name: `${val.year.year()}年${quarterAndYear[val.timeType === 0 ? quarterAndYear.length - 1 : val.timeType - 1]}不良事件分析报告`, }))
  }, [params.year, params.timeType])

  return (
    <Modal
      title='创建报告'
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      centered
    >
      <Wrapper>
        <Row>
          <Col span={5} className='label'>
            报告年度:
          </Col>
          <Col span={18}>
            <YearPicker
              value={params.year}
              allowClear={false}
              onChange={handlePanelChange}
            />
          </Col>
        </Row>
        <Row>
          <Col span={5} className='label'>
            报告季度:
          </Col>
          <Col span={18}>
            <Select value={params.timeType} onChange={(e: any) => setParams({ ...params, timeType: e })} >
              {
                quarterAndYear.map((v, i) => (
                  <Option value={i === quarterAndYear.length - 1 ? 0 : i + 1} key={i}>{v}</Option>
                ))
              }
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={5} className='label'>
            报告名称：
          </Col>
          <Col span={18}>
            <Input
              value={params.name}
              onChange={(e: any) => setParams({ ...params, name: e.target.value })}
            />
          </Col>
        </Row>
      </Wrapper>
    </Modal >
  )
})

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .ant-col {
    line-height: 32px;
    text-align: right;
    padding-right: 5px;
    margin-bottom: 10px;
    > span {
      width: 100%;
    }
    .ant-radio-group {
      float: left;
    }
    .ant-select {
      width: 100%;
    }
  }
`
