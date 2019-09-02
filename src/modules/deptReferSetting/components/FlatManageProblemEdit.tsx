import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message, DatePicker } from 'antd';
import Form from 'src/components/Form'
import { Rules } from 'src/components/Form/interfaces'
import { authStore, appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import moment from 'moment'

import { flatManageProblemService } from './../api/FlatManageProblemService'

const Option = Select.Option

export interface Props {
  visible: boolean,
  onOk: any,
  onCancel: any,
  params?: any
}

export default observer(function NewNursingRulesAddModal(props: Props) {
  const refForm = React.createRef<Form>();
  const { visible, onOk, onCancel, params } = props;
  const [uploadLoading, setUploadLoading] = useState(false);
  const [acceptingNewParams, setAcceptingNewParams] = useState(false);
  const [nurseList, setNurseList] = useState([] as any)
  const rules: Rules = {
    checkDate: (val) => !!val || '检查日期不能为空',
    problem: (val) => !!val || '存在问题不能为空',
    causeAnalysis: (val) => !!val || '原因分析不能为空',
    measures: (val) => !!val || '整改措施不能为空',
    responsibleEmpNo: (val) => !!val || '责任人不能为空',
    deduction: (val) => {
      if (!val) return '扣分不能为空'
      if (val && isNaN(Number(val))) return '扣分必须为数字'

      return true
    }
  }

  useEffect(() => {
    flatManageProblemService.getNurses({
      deptCode: authStore.selectedDeptCode,
      pageSize: 100,
      pageIndex: 1,
    }).then(res => {
      if (res.data) setNurseList(res.data.list)
    })
  }, [])

  useEffect(() => {
    if (visible) {

      let nameEL = document.querySelector('.new-nursing-rules-add-modal .file-name') as HTMLInputElement;
      if (nameEL && nameEL.value) nameEL.value = "";

      setTimeout(() => {
        if (refForm && refForm.current) refForm.current.clear(() => {
          if (refForm && refForm.current && params instanceof Object) {
            if (params.id) setAcceptingNewParams(true);

            let keys = Object.keys(params);
            if (keys.length > 0) {

              refForm.current.setFields({
                checkDate: moment(params.checkDate),
                problem: params.problem,
                causeAnalysis: params.causeAnalysis,
                measures: params.measures,
                responsibleEmpNo: params.responsibleEmpNo,
                deduction: params.deduction
              });

              //防止在handleFormChange中把目录字段替换为空字符
              new Promise((resolve) => setTimeout(() => resolve('ok'), 100))
                .then(() => {
                  setAcceptingNewParams(false)
                })
            }
          }
        })
      })
    }
  }, [visible])

  const handleOkBtn = () => {
    if (refForm && refForm.current) {
      let current = refForm.current;
      let formData = current.getFields();

      current.validateFields().then(() => {
        let data = {
          ...formData,
          checkDate: formData.checkDate.format('YYYY-MM-DD'),
          wardCode: params.wardCode,
          typeId: params.typeId,
          id: params.id || ''
        }
        setUploadLoading(true)
        flatManageProblemService.saveOrUpdate(data).then(res => {
          setUploadLoading(false)
          Message.success('问题更新成功')
          onOk && onOk();
        }, err => {
          setUploadLoading(false)
        })
      }, err => { })
    }

  }

  const handleCancel = () => {
    if (uploadLoading) return

    onCancel && onCancel()
  }

  const handleCFormChange = (key: any, value: any) => {
    if (key == 'deduction') {
      if (value.replace('-').length !== value.length) {
        refForm.current && refForm.current.setField(key, value.replace(/-/, ''));
      }
    }
  }

  return <Modal
    className="new-nursing-rules-add-modal"
    title={params.id ? '修改问题' : '新建问题'}
    onOk={handleOkBtn}
    centered
    confirmLoading={uploadLoading}
    onCancel={handleCancel}
    visible={visible}>
    <ModalContent>
      <Form ref={refForm} rules={rules} onChange={handleCFormChange}>
        <div className="row">
          <span className="label">检查日期:</span>
          <span className="content">
            <span className="ipt">
              <Form.Field name="checkDate">
                <DatePicker className="ipt" />
              </Form.Field>
            </span>
            <span className="required relative">*</span>
          </span>
        </div>
        <div className="row disabled">
          <span className="label">检查者:</span>
          <span className="content">
            <Input className="ipt" value={params.inspectorName || authStore.getUser().empName} disabled={true} />
            <span className="required">*</span>
          </span>
        </div>
        <div className="row">
          <span className="label">存在问题:</span>
          <span className="content">
            <span className="ipt">
              <Form.Field name="problem">
                <Input className="ipt" />
              </Form.Field>
            </span>
            <span className="required relative">*</span>
          </span>
        </div>
        <div className="row">
          <span className="label">原因分析:</span>
          <span className="content">
            <span className="ipt">
              <Form.Field name="causeAnalysis">
                <Input className="ipt" />
              </Form.Field>
            </span>
            <span className="required relative">*</span>
          </span>
        </div>
        <div className="row">
          <span className="label">整改措施:</span>
          <span className="content">
            <span className="ipt">
              <Form.Field name="measures">
                <Input className="ipt" />
              </Form.Field>
            </span>
            <span className="required relative">*</span>
          </span>
        </div>
        <div className="row">
          <span className="label">责任人:</span>
          <span className="content">
            <span className="ipt">
              <Form.Field name="responsibleEmpNo">
                <Select className="ipt" >
                  {nurseList.map((item: any) => <Option value={item.empNo} key={item.empNo}>{item.empName}</Option>)}
                </Select>
              </Form.Field>
            </span>
            <span className="required relative">*</span>
          </span>
        </div>
        <div className="row">
          <span className="label">扣分:</span>
          <span className="content">
            <span className="ipt">
              <Form.Field name="deduction">
                <Input className="ipt" />
              </Form.Field>
            </span>
            <span className="required relative">*</span>
          </span>
        </div>
      </Form>
    </ModalContent>
  </Modal>
})

const ModalContent = styled.div`
  .row{ 
    display: flex; 
    &.disabled{
      margin-bottom: 20px;
    }
    .label{
      width: 90px;
      text-align: right;
      line-height: 32px;
    }
    .content{
      .ipt{
        width:260px!important;
        display: inline-block;
        .ant-calendar-picker-icon,.ant-calendar-picker-clear{
          right: -5px;
        }
        .has-error{
          &>div{
            left: 22px;
          }
        }
      }
      input,button,.ant-select{
        vertical-align: middle;
        margin-left:20px;
      }
      .more{
        width: 50px;
      }
      .required{
        color: red;
        position: relative;
        left: 10px;
        &.relative{
          left:30px;
        }
      }
      &>div{
        display:inline-block;
      }
    }
  }
`