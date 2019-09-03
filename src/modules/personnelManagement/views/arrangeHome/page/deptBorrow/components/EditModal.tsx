import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Modal, Row, Col, Input, message as Message } from 'antd'
import styled from 'styled-components'
import Form from 'src/components/Form/Form'
import { Rules } from 'src/components/Form/interfaces'
import Moment from 'moment'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import DeptBorrowService from './../api/DeptBorrowService'

const Option = Select.Option;

const api = new DeptBorrowService();

export interface Props {
  visible: boolean,
  editParams: any,
  onCancel: any,
  onOk: any
}

export default observer(function DeptBorrow(props: Props) {
  const { visible, editParams, onCancel, onOk } = props
  const formRef = React.createRef<Form>()
  const [startDate, setStartDate] = useState(null as any | null)
  const [endDate, setEndDate] = useState(null as any | null)
  const [deptList, setDeptlist] = useState([] as any)
  const [editLoading, setEditLoading] = useState(false);

  const rules: Rules = {
    deptNameTransferTo: (val) => !!val || '请选择借出科室',
    numTransferFrom: (val) => {
      let num = parseInt(val, 10);
      if (isNaN(num) || num != val || num <= 0) return '请输入正整数'
      return true;
    },
    startDate: (val) => !!val || '请选择开始日期',
    endDate: (val) => !!val || '请选择结束日期',
    detailTransferFrom: (val) => !!val || '请填写借用说明'
  };

  useEffect(() => {
    api.getDeptList().then(res => {
      let data = res.data;
      if (data.deptList instanceof Array) {
        setDeptlist(data.deptList.filter((item: any) => item.code !== data.defaultDept));
      }
    })
  }, []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current = formRef.current;

        if (!current) return

        if (Object.keys(editParams).length > 0) {
          let { deptNameTransferTo, numTransferFrom, detailTransferFrom, daysTransferFrom, endDate, startDate } = editParams;
          current.setFields({
            deptNameTransferTo,
            numTransferFrom,
            detailTransferFrom,
            daysTransferFrom,
            startDate: Moment(startDate),
            endDate: Moment(endDate)
          });
          setStartDate(Moment(startDate));
          setEndDate(Moment(startDate));
        } else {
          current.clear();
          setStartDate(null);
          setEndDate(null);
        }
      })
    }
  }, [visible]);

  const checkForm = () => {
    let current = formRef.current;
    if (current) {
      current.validateFields().then(res => {
        // console.log(res);
        if (current) {
          let { startDate, endDate, deptNameTransferTo, detailTransferFrom, daysTransferFrom, numTransferFrom } = current.getFields();
          setEditLoading(true);

          let deptCodeTransferTo = '';
          for (let i = 0; i < deptList.length; i++) {
            if (deptNameTransferTo == deptList[i].name) {
              deptCodeTransferTo = deptList[i].code;
              break;
            }
          }
          let empNoTransferFrom = '';
          let empNameTransferFrom = '';
          let nearImageUrlTransferFrom = ''
          if (authStore.user) {
            empNoTransferFrom = authStore.user.empNo;
            empNameTransferFrom = authStore.user.empName;
            nearImageUrlTransferFrom = authStore.user.nearImageUrl;
          }

          let params: any = {
            deptCodeTransferTo,
            deptNameTransferTo,
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            detailTransferFrom,
            daysTransferFrom,
            statusTransferFrom: '0', //状态：申请-0，借用中-1，结束-2，拒绝-3
            empNoTransferFrom,
            nearImageUrlTransferFrom,
            numTransferFrom
          }

          if (Object.keys(editParams).length > 0) params.empNameTransferFrom = empNameTransferFrom;

          if (editParams.id) params = Object.assign({}, editParams, params)

          if (Object.keys(editParams).length > 0)
            params.empNoTransferFrom = editParams.empNoTransferFrom

          api.setBorrow(params).then(res => {
            if (res.code == 200) {
              if (editParams.id)
                Message.success('修改成功');
              else
                Message.success('创建成功');
              setEditLoading(false);
              onOk && onOk();
            }
          })
        }
      }).catch(e => {
        console.log(e)
      })
    }

  }

  const handleFormChange = (name: any, val: any) => {
    if (name == 'startDate') setStartDate(val);
    if (name == 'endDate') setEndDate(val);

    if (name == 'startDate' || name == 'endDate') setdaysTransferFrom();
  }

  const setdaysTransferFrom = () => {
    let current = formRef.current;
    if (current) {
      let endDate = current.getField('endDate');
      let startDate = current.getField('startDate');
      if (!startDate || !endDate) {
        current.setField('daysTransferFrom', '')
      } else {
        let daysTransferFrom: any = endDate.format('x') - startDate.format('x');
        daysTransferFrom = daysTransferFrom / 86400000;
        daysTransferFrom = parseInt(daysTransferFrom) + 1;
        current.setField('daysTransferFrom', daysTransferFrom);
      }
    }
  }

  const moreThanStart = (date: any) => {
    if (!startDate) return false

    if (date.format('x') >= startDate.format('x')) return false
    return true
  }

  const lessThanEnd = (date: any) => {
    if (!endDate) return false

    if (date.format('x') < endDate.format('x')) return false
    return true
  }

  const handleCancel = () => {
    if (!editLoading) onCancel && onCancel();
  }

  return <Modal
    title={Object.keys(editParams).length <= 0 ? "添加借用" : "修改借用"}
    onCancel={handleCancel}
    onOk={checkForm}
    confirmLoading={editLoading}
    visible={visible}>
    <Wrapper>
      <Form
        ref={formRef}
        rules={rules}
        onChange={handleFormChange}>
        <Row>
          <Col span={5} className="label">借出科室：</Col>
          <Col span={19}>
            <Form.Field name="deptNameTransferTo">
              <Select placeholder="请选择科室" showSearch filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
                {deptList.map((item: any) => <Option value={item.name} key={item.code}>{item.name}</Option>)}
              </Select>
            </Form.Field>
          </Col>
        </Row>
        <Row>
          <Col span={5} className="label">借用人数：</Col>
          <Col span={19}>
            <Form.Field name="numTransferFrom">
              <Input placeholder="请输入人数" />
            </Form.Field>
          </Col>
        </Row>
        <Row>
          <Col span={5} className="label">开始日期：</Col>
          <Col span={19}>
            <Form.Field name="startDate">
              <DatePicker placeholder="请选择日期" disabledDate={lessThanEnd} />
            </Form.Field>
          </Col>
        </Row>
        <Row>
          <Col span={5} className="label">结束日期：</Col>
          <Col span={19}>
            <Form.Field name="endDate">
              <DatePicker placeholder="请选择日期" disabledDate={moreThanStart} />
            </Form.Field>
          </Col>
        </Row>
        <Row>
          <Col span={5} className="label">借用天数：</Col>
          <Col span={19}>
            <Form.Field name="daysTransferFrom">
              <Input disabled />
            </Form.Field>
          </Col>
        </Row>
        <Row>
          <Col span={5} className="label">借用说明：</Col>
          <Col span={19}>
            <Form.Field name="detailTransferFrom">
              <Input placeholder="请填写借用说明" />
            </Form.Field>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .label{
    line-height:32px;
    text-align: right;
  }
`