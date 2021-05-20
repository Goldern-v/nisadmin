import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  Row,
  Col,
  Modal,
  message,
  Select,
} from "antd";
import YearPicker from "src/components/YearPicker";
import Form from "src/components/Form/Form";
import moment from "moment";
import { authStore } from 'src/stores'
import { workloadApi } from "../api/WorkloadApi";
import { workloadModal } from "../WorkloadModal";
import service from "src/services/api";
import { observer } from "src/vendors/mobx-react-lite";
import { Rules } from "src/components/Form/interfaces";

const Option = Select.Option

const commonApi = service.commonApiService
export interface Props {
  visible: boolean;
  params: any;
  onCancel: any;
  onOk: any;
  onOkCallBack?: any;
}

const rules: Rules = {
  title: (val) => !!val || '请填写标题',
  deptCode: (val) => !!val || '请选择科室',
  month: (val) => !!val || '请填写月份',
  year: (val) => !!val || '请填写月份',
  empNo: (val) => !!val || '请选择护士',
}

export default observer(function WorkloadEditModal(props: Props) {
  const { visible, params, onCancel, onOk } = props;
  const [editLoading, setEditLoading] = useState(false);
  const [nurseList, setNurseList] = useState([] as any[])
  const formRef = useRef<any>();

  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = []
    while (currentMonth--) {
      monthArr.push(currentMonth + 1)
    }
    return monthArr
  })(); //月份

  // 初始化
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        let current: any = formRef.current;
        if (!current) return;
        // 修改数据回显
        if (params.id) {
          let data: any = { ...params };
          const {
            title,
            deptCode,
            deptName,
            empNo,
            empName,
            year,
            month
          } = data;
          current.setFields({
            title,
            deptCode,
            deptName,
            empNo,
            empName,
            year: year ? moment(year) : undefined,
            month
          });
        } else {
          current.setFields({
            deptCode: authStore.selectedDeptCode,
            deptName: authStore.selectedDeptName,
            year: moment(),
            month: (moment().get('month') + 1).toString()
          });
        }
      }, 100);
    } else {
      let current: any = formRef.current;
      if (current) current.clear();
    }
  }, [visible]);

  // 保存
  const checkForm = () => {
    let current: any = formRef.current;
    if (current) {
      current
        .validateFields()
        .then((res: any) => {
          current = formRef.current;
          if (current) {
            let newParams = { ...current.getFields() };
            let msg = '添加成功！'
            //修改
            if (params.id) {
              newParams.id = params.id;
              msg = '修改成功！'
            };
            //处理时间类型
            console.log(newParams.year)
            newParams.year = newParams.year ? newParams.year.format('YYYY') : ''

            let req = ((indexKey) => {
              switch (indexKey) {
                case '2':
                  return workloadApi.saveOrUpdateJsns.bind(workloadApi)
                case '3':
                  return workloadApi.saveOrUpdateGzltj.bind(workloadApi)
                default:
                  return workloadApi.saveOrUpdateFwzx.bind(workloadApi)
              }
            })(workloadModal.indexKey)

            req(newParams)
              .then((res: any) => {
                onOk && onOk()
              }, () => setEditLoading(false))
          }
        }, () => setEditLoading(false))
    }
  };

  const getDeptNurseList = (deptCode: string) => {
    commonApi.userDictInfo(deptCode)
      .then(res => setNurseList(res.data))
  }

  const handleChange = (key: string, value: any, current: any) => {
    if (key === 'deptCode') {
      let target = authStore.deptList.find((dept) => dept.code === value)

      current.setFields({
        deptName: target?.name || '',
        empName: '',
        empNo: '',
      })

      if (value) getDeptNurseList(value)
    }
    if (key === 'empNo') {
      let target = nurseList.find((dept) => dept.code === value)
      if (target) current.setField('empName', target.empName)
    }
  }

  // 关闭取消
  const handleCancel = () => {
    if (editLoading) return;
    onCancel && onCancel();
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      onOk={checkForm}
      confirmLoading={editLoading}
      title={params.id ? "修改" : "添加"}
    >
      <Wrapper>
        <Form ref={formRef} onChange={handleChange} rules={rules}>
          <Row>
            <Col span={3} className="label">
              标题:
            </Col>
            <Col span={19}>
              <Form.Field name="title">
                <Input />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              科室:
            </Col>
            <Col span={19}>
              <Form.Field name="deptCode">
                <Select
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {authStore.deptList.map((dept) => <Option value={dept.code} key={dept.code}>{dept.name}</Option>)}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              年份:
            </Col>
            <Col span={19}>
              <Form.Field name="year">
                <YearPicker allowClear={false} />
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              月份:
            </Col>
            <Col span={19}>
              <Form.Field name="month">
                <Select>
                  {monthList.map((month: number) =>
                    <Select.Option value={`${month}`} key={month}>{month}月</Select.Option>
                  )}
                </Select>
              </Form.Field>
            </Col>
          </Row>
          <Row>
            <Col span={3} className="label">
              姓名:
            </Col>
            <Col span={19}>
              <Form.Field name="empNo">
                <Select
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  {nurseList.map((item: any) => <Option value={item.empNo} key={item.empNo}>{item.empName}</Option>)}
                </Select>
              </Form.Field>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  );
})

const Wrapper = styled.div`
  width: 95%;
  margin: 0 auto;
  .label {
    line-height: 32px;
    text-align: right !important;
    margin-right: 10px;
  }
  .ant-switch {
    margin-left: 10px;
    margin-top: 8px;
  }
  .mustWrite {
    color: red !important;
    margin-top: 2px;
  }
  .displayNone {
    display: none;
  }
`;
