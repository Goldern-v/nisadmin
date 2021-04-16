import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { Col, Input, Modal, Row } from "antd"
import styled from "styled-components"
import DeptSelect from "src/components/DeptSelect"
import { DatePicker, Select } from "src/vendors/antd"
import moment from 'moment'
import { ModalForm } from "../../modal"
import config from "../../config"
import api from '../../api'


interface Props {
  modalId?: string
  visible: boolean
  onOk?: Function
  onCancel?: Function
}

export default observer((props: Props) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(new ModalForm())
  const setFormItem = (item: {}) => {
    setForm({ ...form, ...item })
  }

  const { modalId, visible, onOk, onCancel } = props

  const handleCreate = () => {
    // api.updateItem(form)
    onOk && onOk()
  }

  const handleDateChange = (date: moment.Moment) => {
    const time3 = moment(moment(date).add(9, 'months')).add(7, 'days')
    setFormItem({ time: date, time3: time3 })
  }

  useEffect(() => {
    if (!visible) return
    if (modalId) {
      // api.getItem(modalId)
    } else {
      setForm(new ModalForm())
    }
  }, [visible])

  return (
    <React.Fragment>
      <Modal
        centered
        visible={visible}
        confirmLoading={loading}
        onOk={handleCreate}
        onCancel={() => onCancel && onCancel()}
        title={"添加"}
      >
        <Wrapper>
          <Row>
            <Col span={5}>姓名:</Col>
            <Col span={18}>
              <Input value={form.name} onChange={e => setFormItem({ 'name': e.target.value })}/>
            </Col>
          </Row>
          <Row>
            <Col span={5}>科室:</Col>
            <Col span={18}>
              <DeptSelect
                style={{ width: '100%' }}
                onChange={deptCode => {
                  setFormItem({ 'aaa': deptCode })
                }}/>
            </Col>
          </Row>
          <Row>
            <Col span={5}>末次月经:</Col>
            <Col span={18}>
              <DatePicker
                value={form.time}
                onChange={handleDateChange}
              />
            </Col>
          </Row>
          <Row>
            <Col span={5}>当前孕周:</Col>
            <Col span={18}>
              <Input value={form.time2} onChange={e => setFormItem({ 'time2': e.target.value })}/>
            </Col>
          </Row>
          <Row>
            <Col span={5}>分娩日期:</Col>
            <Col span={18}>
              <DatePicker
                value={form.time3}
                onChange={(date) => {
                  setFormItem({ 'time3': date })
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={5}>分娩方式:</Col>
            <Col span={18}>
              <Select
                value={form.type}
                onChange={(value: string) => {
                  setFormItem({ 'type': value })
                }}>
                {config.typeOption.map((item, index) => (
                  <Select.Option value={item.value} key={index}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Wrapper>
      </Modal>
    </React.Fragment>
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
  .ant-calendar-picker {
    text-align: left;
  }
`;