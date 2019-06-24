import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { Modal, Input, Select, Button, message as Message, Row, Col, Radio } from 'antd'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import badEventsNewService from './../api/badEventsNewService'
import Moment from 'moment'

import UserCheckModal from './UserCheckModal'

const api = new badEventsNewService();

const { TextArea } = Input;

export interface Props {
  visible: boolean, //审核窗口显示
  onOk: any, //审核操作完成回调
  paramMap?: any, //不良事件表单数据
  status: string, //当前不良事件状态
  onCancel: any, //窗口关闭回调
  eventCode: string, //不良事件类型代码
  reportDept: any, //上报人科室名称代码
  id: any //不良事件id
}

export default observer(function AduitModal(props: Props) {
  // console.log(authStore.user)
  const { visible, onOk, onCancel, status, paramMap, id, eventCode, reportDept } = props;
  //用于操作和提交的不良事件表单数据
  let initFormMap: any = {};
  const [formMap, setFormMap] = useState(initFormMap);
  //审核时除表单以外其他的提交数据
  let initInstance: any = {};
  const [instance, setInstance] = useState(initInstance);
  //验证用户弹窗显示
  const [userCheckVisible, setUserCheckVisible] = useState(false);

  //转发科室列表
  const dealerDepts = [
    { name: '医务科', value: '医务科', include: ['badevent_operation', 'badevent_blood_transfusion'] },
    { name: '护理部', value: '护理部' },
    { name: '院感科', value: '院感科' },
    { name: '临床药学部或药剂科', value: '临床药学部或药剂科', include: ['badevent_drug_error'] },
    { name: '设备科', value: '设备科' },
    { name: '总务科', value: '总务科' },
    { name: '服务促进办及党办', value: '服务促进办及党办' },
    { name: '保卫办', value: '保卫办', include: ['badevent_public_security', 'badevent_hurt'] },
    { name: '信息科', value: '信息科' },
    { name: '相关部门', value: '相关部门', include: ['badevent_public_accident'] },
  ];

  useEffect(() => {
    if (visible) {
      let user = authStore.user;
      if (user)
        setInstance({
          instanceId: id,
          operatorWardCode: user.deptCode,
          operatorWardName: user.deptName,
          operatorStatus: status,
          operatorName: user.empName,
          operatorEmpNo: user.empNo,
          operateDate: Moment().format('YYYY-MM-DD'),
          operatorPW: '',
          isAllowNext: "1",
          departmentCode: '',
          departmentName: '',
          sac: ''
        });

      let newMap: any = {};
      switch (status) {
        case '1':
          newMap[`${eventCode}_department_code`] = ''
          newMap[`${eventCode}_department_name`] = ''
          newMap[`${eventCode}_shjg_option`] = '转发'
          newMap[`${eventCode}_th_explain`] = ''
          break
        case '2':
          newMap[`${eventCode}_shcdpd_option`] = '轻度'
          newMap[`${eventCode}_sac_option`] = '1级'
          newMap[`${eventCode}_rca_option`] = '不需要'
          newMap[`${eventCode}_tjzlanwyh_option`] = '不提交'
          newMap[`${eventCode}_shyj_explain`] = ''
          break
        case '3':
          newMap[`${eventCode}_zkk_zjyj_explain`] = ''
          break
        case '4':
          newMap[`${eventCode}_wyh_zjyj_explain`] = ''
          break
      }

      setFormMap({ ...paramMap, ...newMap });
    }
  }, [visible])

  const handleDeptChange = (code: any) => {
    let department_code = code;
    let department_name = '';

    if (department_code == reportDept.code) {
      department_name = reportDept.name;
    } else {
      for (let i = 0; i < dealerDepts.length; i++) {
        if (dealerDepts[i].value == department_code) {
          department_name = dealerDepts[i].name;
          break;
        }
      }
    }

    setFormMap({
      ...formMap,
      [`${eventCode}_department_code`]: department_code,
      [`${eventCode}_department_name`]: department_name
    })
  }

  const handleOkBtn = () => {
    // console.log(formMap);
    //check formMap
    setUserCheckVisible(true);
  }
  const handleUserCheckOk = (userAudit: any) => {
    auditFormSubmit(userAudit);
    setUserCheckVisible(false);
  }

  const auditFormSubmit = (userAudit: any) => {
    let params: any = {}
    params = {
      ...instance,
      paramMap: { ...formMap },
      operatorEmpNo: userAudit.empNo,
      operatorPW: userAudit.password
    }

    switch (params.operatorStatus) {
      case '1':
        if (formMap[`${eventCode}_shjg_option`] === '退回') {
          params.isAllowNext = "0";
          params.paramMap[`${eventCode}_department_code`] = '';
          params.paramMap[`${eventCode}_department_name`] = '';
        } else {
          params.departmentCode = formMap[`${eventCode}_department_code`]
          params.departmentName = formMap[`${eventCode}_department_name`]
          params.paramMap[`${eventCode}_th_explain`] = '';
        }
        break
      case '2':
        params.sac = formMap[`${eventCode}_sac_option`]
        break
    }

    // -------------- // 先默认转发科室为上报人科室
    params.departmentCode = reportDept.code
    params.departmentName = reportDept.name
    params.paramMap[`${eventCode}_department_code`] = reportDept.code;
    params.paramMap[`${eventCode}_department_name`] = reportDept.name;
    // -------------- //
    // console.log(params)

    api.aduit(params).then(res => {
      if (res.code == 200) {
        onOk();
        Message.success('操作成功')
      }
    })
  }
  const AduitPannelTitle = () => {
    switch (status) {
      case '1':
        return '质控科审核'
      case '2':
        return '科室审核'
      case '3':
        return '质控科总结'
      case '4':
        return '医院质量与安全委员会审核'
      default:
        return ''
    }
  }

  const ModalWidth = () => {
    switch (status) {
      case '2':
      case '3':
      case '4':
        return 900
      default:
        return 520
    }
  }

  const AduitPannelContent = () => {
    switch (status) {
      case '1':
        return <div className="form1">
          <Radio.Group
            className="radio-group"
            value={formMap[`${eventCode}_shjg_option`]}
            onChange={e => setFormMap({ ...formMap, [`${eventCode}_shjg_option`]: e.target.value })}>
            <Row>
              <Col span={6} className="item-label">审核结果：</Col>
              <Col span={4}>
                <Radio value={'退回'}></Radio>
                <span>退回</span>
              </Col>
              <Col span={14}>
                <Input
                  value={formMap[`${eventCode}_th_explain`]}
                  className="input-item"
                  disabled={formMap[`${eventCode}_shjg_option`] == '转发'}
                  onChange={e => setFormMap({ ...formMap, [`${eventCode}_th_explain`]: e.target.value })} />
              </Col>
            </Row>
            <Row>
              <Col span={6}></Col>
              <Col span={4}>
                <Radio value={'转发'}></Radio>
                <span>转发</span>
              </Col>
              <Col span={14}>
                {/* <span>{reportDept.name || ''}</span> */}
                <Select
                  className="input-item"
                  defaultValue={formMap[`${eventCode}_department_code`]}
                  value={formMap[`${eventCode}_department_code`]}
                  onChange={handleDeptChange}>
                  {dealerDepts.map((item: any, idx: number) => {
                    return <Select.Option value={item.value} key={idx}>{item.name}</Select.Option>
                  })}
                </Select>
              </Col>
            </Row>
          </Radio.Group>
        </div>
      case '2':
        return <div className="form2">
          <Row>
            <span className="select-item">
              <span className="item-label">伤害程度判定:</span>
              <span className="item-content">
                <Select
                  defaultValue="轻度"
                  value={formMap[`${eventCode}_shcdpd_option`]}
                  onChange={(val: any) => setFormMap({ ...formMap, [`${eventCode}_shcdpd_option`]: val })}>
                  <Select.Option value="轻度">轻度</Select.Option>
                  <Select.Option value="中度">中度</Select.Option>
                  <Select.Option value="高度">高度</Select.Option>
                </Select>
              </span>
            </span>
            <span className="select-item">
              <span className="item-label">SAC:</span>
              <span className="item-content">
                <Select
                  defaultValue="1"
                  value={formMap[`${eventCode}_sac_option`]}
                  onChange={(val: any) => setFormMap({ ...formMap, [`${eventCode}_sac_option`]: val })}>
                  <Select.Option value="1级">1级</Select.Option>
                  <Select.Option value="2级">2级</Select.Option>
                  <Select.Option value="3级">3级</Select.Option>
                  <Select.Option value="4级">4级</Select.Option>
                </Select>
              </span>
            </span>
            <span className="select-item">
              <span className="item-label">RCA需求分析:</span>
              <span className="item-content">
                <Select
                  defaultValue="0"
                  value={formMap[`${eventCode}_rca_option`]}
                  onChange={(val: any) => setFormMap({ ...formMap, [`${eventCode}_rca_option`]: val })}>
                  <Select.Option value="不需要">不需要</Select.Option>
                  <Select.Option value="需要">需要</Select.Option>
                </Select>
              </span>
            </span>
            <span className="select-item">
              <span className="item-label">提交质量安全管委会:</span>
              <span className="item-content">
                <Select
                  defaultValue="不提交"
                  value={formMap[`${eventCode}_tjzlanwyh_option`]}
                  onChange={(val: any) => setFormMap({ ...formMap, [`${eventCode}_tjzlanwyh_option`]: val })}>
                  <Select.Option value="不提交">不提交</Select.Option>
                  <Select.Option value="提交">提交</Select.Option>
                </Select>
              </span>
            </span>
          </Row>
          <Row>
            <Col span={2}>审核意见：</Col>
            <Col span={22}>
              <TextArea
                rows={8}
                value={formMap[`${eventCode}_shyj_explain`]}
                onChange={e => setFormMap({ ...formMap, [`${eventCode}_shyj_explain`]: e.target.value })} />
            </Col>
          </Row>
        </div>
      case '3':
        return <div>
          <Row>
            <Col span={2}>总结意见：</Col>
            <Col span={22}>
              <TextArea
                rows={8}
                value={formMap[`${eventCode}_zkk_zjyj_explain`]}
                onChange={e => setFormMap({ ...formMap, [`${eventCode}_zkk_zjyj_explain`]: e.target.value })} />
            </Col>
          </Row>
        </div>
      case '4':
        return <div>
          <Row>
            <Col span={2}>审核意见：</Col>
            <Col span={22}>
              <TextArea
                rows={8}
                value={formMap[`${eventCode}_wyh_zjyj_explain`]}
                onChange={e => setFormMap({ ...formMap, [`${eventCode}_wyh_zjyj_explain`]: e.target.value })} />
            </Col>
          </Row>
        </div>
      default:
        return <span>未知审核流程</span>
    }
  }

  return <Fragment>
    <Modal
      className="badevent-audit-modal"
      title={AduitPannelTitle()}
      width={ModalWidth()}
      onOk={handleOkBtn}
      onCancel={onCancel}
      visible={visible}>
      <Wrapper>{AduitPannelContent()}</Wrapper>
    </Modal>
    <UserCheckModal
      visible={userCheckVisible}
      onCancel={() => setUserCheckVisible(false)}
      onOk={handleUserCheckOk} />
  </Fragment>
})

const Wrapper = styled.div`
.ant-row{
  margin-bottom: 10px;
}
.form1{
  .item-label{
    text-align: right;
    line-height: 32px;
    vertical-align: middle;
  }
  .ant-radio-wrapper{
    margin-top: 5px;
  }
  .radio-group{
    width: 80%;
    margin：0 auto;
  }
}
.form2{
  .select-item{
    margin-right: 15px;
    .item-label{
      margin-right: 5px;
    }
    .ant-select{
      width: 100px;
    }
  }
}
`