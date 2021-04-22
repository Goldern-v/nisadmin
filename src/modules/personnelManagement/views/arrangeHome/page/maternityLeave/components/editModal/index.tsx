import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { Col, Modal, Row } from "antd"
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
  const [nursingList, setNursingList] = useState([])
  const [form, setForm] = useState(new ModalForm())
  const setFormItem = (item: {}) => {
    setForm({ ...form, ...item })
  }

  const { modalId, visible, onOk, onCancel } = props

  const handleCreate = async () => {
    await api.updateItem(form)
    onOk && onOk()
  }

  const handleDateChange = (date: moment.Moment) => {
    const expectedDate = moment(date).add(9, 'months').add(7, 'days')
    setFormItem({ lastMenstrualPeriod: date, expectedDate })
  }

  useEffect(() => {
    if (!visible) return
    if (modalId) {
      setLoading(true)
      // api.getItem(modalId)
      setLoading(false)
    } else {
      setForm(new ModalForm())
    }
  }, [visible])

  useEffect(() => {
    if (!visible || !form.deptCode) return
    api.getNursingList(form.deptCode).then(res => {
      setNursingList(res.data)
      setFormItem({ empName: '' })
    })
  }, [form.deptCode])

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
            <Col span={5}>科室:</Col>
            <Col span={18}>
              <DeptSelect
                style={{ width: '100%' }}
                onChange={deptCode => {
                  setFormItem({ 'deptCode': deptCode })
                }}/>
            </Col>
          </Row>
          <Row>
            <Col span={5}>姓名:</Col>
            <Col span={18}>
              <Select
                value={form.empName}
                onChange={(empName: string) => {
                  setFormItem({ 'empName': empName })
                }}>
                {nursingList.map((item: { empName: string, empNo: string }, index) => (
                  <Select.Option value={item.empName} key={item.empNo + index}>
                    {item.empName}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={5}>末次月经:</Col>
            <Col span={18}>
              <DatePicker
                value={form.lastMenstrualPeriod}
                onChange={handleDateChange}
              />
            </Col>
          </Row>
          <Row>
            <Col span={5}>预产期:</Col>
            <Col span={18}>
              <DatePicker
                value={form.expectedDate}
                onChange={(date) => {
                  setFormItem({ 'expectedDate': date })
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={5}>分娩日期:</Col>
            <Col span={18}>
              <DatePicker
                value={form.deliveryDate}
                onChange={(date) => {
                  setFormItem({ 'deliveryDate': date })
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={5}>分娩方式:</Col>
            <Col span={18}>
              <Select
                value={form.deliveryMode}
                onChange={(value: string) => {
                  setFormItem({ 'deliveryMode': value })
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