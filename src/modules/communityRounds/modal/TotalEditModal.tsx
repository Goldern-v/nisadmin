import styled from "styled-components";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Input, Row, Col, Modal, message as Message, Select, DatePicker } from "antd";
import Form from "src/components/Form/Form";
import { Rules } from "src/components/Form/interfaces";
import YearPicker from "src/components/YearPicker";
import { checkWardService } from "../services/CheckWardService";
import Moment from 'moment'

export interface Props {
  visible: boolean;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

export default observer(function TotalEditModal(props: Props) {
  const { visible, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const formRef = React.createRef<Form>();
  const typeList: any = [
    { name: "月报告", code: 1 },
    { name: "年报告", code: 2 }
  ]; // 报表类型
  const monthList = [
    { code: 1, name: '1' },
    { code: 2, name: '2' },
    { code: 3, name: '3' },
    { code: 4, name: '4' },
    { code: 5, name: '5' },
    { code: 6, name: '6' },
    { code: 7, name: '7' },
    { code: 8, name: '8' },
    { code: 9, name: '9' },
    { code: 10, name: '10' },
    { code: 11, name: '11' },
    { code: 12, name: '12' }
  ]; //月份
  const [beginDate, setBeginDate] = useState(null as any | null)
  const [endDate, setEndDate] = useState(null as any | null)

  // 弹窗必填项
  const rules: Rules = {
    type: (val) => !!val || '请选择类型',
    year: (val) => !!val || '请选择年度',
    month: (val) => !!val || '请选择月份',
    beginDate: (val) => !!val || '请选择开始时间',
    endDate: (val) => !!val || '请选择结束时间',
    name: (val) => !!val || '请填写报告名称',
  };

  //保存
  const checkForm = () => {
    let current = formRef.current;
    if (current) {
      current
        .validateFields()
        .then(res => {
          current = formRef.current;
          if (current) {
            let newParams = current.getFields();
            let { type, month, year, beginDate, endDate, name } = newParams;
            let params: any = {
              name,
              type,
              month,
              year: year ? year.format('YYYY') : '',
              beginDate: beginDate ? beginDate.format('YYYY-MM-DD') : '',
              endDate: endDate ? endDate.format('YYYY-MM-DD') : ''
            }
            checkWardService.saveTotal(params).then(res => {
              setEditLoading(false);
              let msg = "社区查房报告新建成功！";
              Message.success(msg);
              onOk();
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  //控制时间可选范围
  const moreThanStart = (date: any) => {
    if (!beginDate) return false
    if (date.format('x') >= beginDate.format('x')) return false
    return true
  }
  const lessThanEnd = (date: any) => {
    if (!endDate) return false
    if (date.format('x') < endDate.format('x')) return false
    return true
  }

  const setBeginDateAndEndDate = (year: any) => {
    if (year) {
      let currentDate = Moment().set('year', year.year())
      let currentWeek = weekStartAndEnd(currentDate)

      setBeginDate(Moment(currentWeek.beginDate))
      setFormItem('beginDate', Moment(currentWeek.beginDate))
      setEndDate(Moment(currentWeek.endDate))
      setFormItem('endDate', Moment(currentWeek.endDate))
    }
  }
  const weekStartAndEnd = (currentDate: Moment.Moment) => {
    let currentWeekDay = Moment(currentDate).week(currentDate.weeks())
    return {
      beginDate: currentWeekDay.startOf('week').format('YYYY-MM-DD'),
      endDate: currentWeekDay.endOf('week').format('YYYY-MM-DD')
    }
  }

  // 封装表单赋值函数
  const setFormItem = (key: any, value: any) => {
    if (formRef.current) formRef.current.setField(key, value)
  }

  // 获取名称
  const setName = () => {
    let current = formRef.current
    if (current) {
      let { year, month } = current.getFields()
      if (!year || !month ) return
      let yearStr = year.format('YYYY')
      let monthStr = month
      let name = `${yearStr}年${monthStr}月社区管理汇总表`
      setFormItem('name', name)
    }
  }

  //表单变化函数
  const handleFormChange = (key: any, val: any) => {
    if (key == 'beginDate') setBeginDate(val)
    if (key == 'year') {
      if (formRef.current) {
        let year = formRef.current.getField('year');
        setBeginDateAndEndDate(year)
      }
    }
    if (key == 'endDate') setEndDate(val)
    if (key !== 'name') setName()
  }


  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      width={600}
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title='新建社区管理汇总表'
    >
      <Wrapper>
        <Form ref={formRef} rules={rules} onChange={handleFormChange}>
          <Row>
            <Col span={3} className="label">
              类型:
            </Col>
            <Col span={20}>
              <Form.Field name="type">
                <Select>
                  {typeList.map((item: any) => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              年份:
            </Col>
            <Col span={20}>
              <Form.Field name="year">
                <YearPicker />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              月份:
            </Col>
            <Col span={20}>
              <Form.Field name="month">
                <Select>
                  {monthList.map((item: any) => (
                    <Select.Option value={item.code} key={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              起止日期:
            </Col>
            <Col span={9}>
              <Form.Field name='beginDate'>
                <DatePicker placeholder='开始时间' allowClear={false} disabledDate={lessThanEnd} />
              </Form.Field>
            </Col>
            <Col span={1} style={{ margin: '5px 7px 0 12px' }}>至</Col>
            <Col span={9}>
              <Form.Field name='endDate'>
                <DatePicker placeholder='结束时间' allowClear={false} disabledDate={moreThanStart} />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              名称:
            </Col>
            <Col span={20}>
              <Form.Field name="name">
                <Input />
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  );
})
const Wrapper = styled.div`
  width: 85%;
  margin: 0 auto;
  .label {
    line-height: 32px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
  .title {
    font-size: 14px;
    font-weight: 900;
    margin: 15px 0;
  }
`;
const UploadWrapper = styled.div`
  &>div{
    float: left;
    margin-bottom: 15px;
  }
`