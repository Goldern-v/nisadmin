import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { Col, Form, message, Modal, Row } from "antd"
import styled from "styled-components"
import DeptSelect from "src/components/DeptSelect"
import { DatePicker, Select } from "src/vendors/antd"
import moment from 'moment'
import { ModalForm } from "../../modal"
import config from "../../config"
import api from '../../api'
import { appStore } from "src/stores"

interface Props {
  modalId?: string
  visible: boolean
  onOk: Function
  onCancel: Function
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
    if (!form.empName) {
      return message.warning('请选择人员');
    }
    await api.updateItem(form)
    onOk()
  }

  const handleDateChange = (date: moment.Moment) => {
    if (!date) {
      setFormItem({ lastMenstrualPeriod: date })
      return
    }
    const expectedDate = moment(date).add(9, 'months').add(7, 'days')
    const blockDeliveryDate = ['jmfy']
    if (blockDeliveryDate.includes(appStore.HOSPITAL_ID)) {
      setFormItem({ lastMenstrualPeriod: date, expectedDate, deliveryDate: '' })
      return;
    }
    setFormItem({ lastMenstrualPeriod: date, expectedDate, deliveryDate: expectedDate })
  }

  const disLastMenstrualPeriod = (startValue: any) => {
    if (appStore.HOSPITAL_ID !== 'jmfy') return false
    if (!startValue || !form.expectedDate || !form.deliveryDate) {
      return false;
    }
    return startValue > moment(form.expectedDate) || startValue > moment(form.deliveryDate);
  }

  const disableExpectedDate = (endValue: any) => {
    if (appStore.HOSPITAL_ID !== 'jmfy') return false
    if (!endValue || !form.lastMenstrualPeriod) {
      return false;
    }
    return endValue < moment(form.lastMenstrualPeriod).add(1, 'days')
  }

  useEffect(() => {
    if (modalId) {
      setLoading(true)
      api.getItem(modalId).then(res => {
        const data = {
          id: res.data.id,
          empNo: res.data.empNo,
          empName: res.data.empName,
          deptCode: res.data.deptCode,
          lastMenstrualPeriod: res.data.lastMenstrualPeriod,
          expectedDate: res.data.expectedDate,
          deliveryDate: res.data.deliveryDate,
          babyBreakStartDate: res.data.babyBreakStartDate,
          deliveryMode: res.data.deliveryMode,
        }
        setForm(new ModalForm(data))
        setLoading(false)
      })
    } else {
      setForm(new ModalForm())
    }
  }, [])

  useEffect(() => {
    if (!form.deptCode) return
    api.getNursingList(form.deptCode).then(res => {
      setNursingList(res.data)
    })
  }, [form.deptCode])

  return (
    <React.Fragment>
      <Modal
        centered
        visible={visible}
        confirmLoading={loading}
        onOk={handleCreate}
        onCancel={() => onCancel()}
        title={modalId ? '修改' : '新增'}
      >
        <Wrapper>
          <Row>
            <Col span={6}>科室:</Col>
            <Col span={18}>
              <DeptSelect
                style={{ width: '100%' }}
                onChange={deptCode => {
                  setFormItem({ 'deptCode': deptCode })
                }} />
            </Col>
          </Row>
          <Row>
            <Col span={6}>姓名:</Col>
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
            <Col span={6}>末次月经:</Col>
            <Col span={18}>
              <DatePicker
                disabledDate={disLastMenstrualPeriod}
                value={form.lastMenstrualPeriod}
                onChange={handleDateChange}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>预产期:</Col>
            <Col span={18}>
              <DatePicker
                disabledDate={disableExpectedDate}
                value={form.expectedDate}
                onChange={(date) => {
                  setFormItem({ 'expectedDate': date })
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>分娩日期:</Col>
            <Col span={18}>
              <DatePicker
                disabledDate={disableExpectedDate}
                value={form.deliveryDate}
                onChange={(date) => {
                  setFormItem({ 'deliveryDate': date })
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>产假开始日期:</Col>
            <Col span={18}>
              <DatePicker
                value={form.babyBreakStartDate}
                onChange={(date) => {
                  setFormItem({ 'babyBreakStartDate': date })
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>分娩方式:</Col>
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