import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import {
  Button as ButtonMb,
  DatePicker as DatePickerMb,
  List as ListMb,
  InputItem,
  Picker,
  // NavBar,
  // Icon as IconMb,
  Modal as ModalMb,
  TextareaItem
} from 'antd-mobile'
import { Icon } from 'antd'
import zhCN from 'antd-mobile/lib/date-picker/locale/zh_CN'
import moment from 'moment'
import { educationList } from './data/education'
import { traineeInfoSubmitService } from './api/TraineeInfoSubmitService'
import { message } from 'antd'

export interface Props { }

export default function TraineeInfoSubmit() {
  const [params, setParams] = useState({
    name: '',
    sex: '1',
    idCardNo: '',
    phone: '',
    schoolName: '',
    major: '',
    education: '',
    isResident: '1',
    dormitoryNumber: '',
    internshipBegin: '',
    internshipEnd: '',
    isGroupLeader: '0',
    address: '',
    emergencyContactPerson: '',
    emergencyContactPhone: '',
    remark: '',
    studyDeptName: '',
    studyDeptCode: '',
  })

  const [deptList, setDeptList] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const getDeptList = () => {
    traineeInfoSubmitService
      .nursingUnitWithOutLogin()
      .then(res => {
        if (res.data)
          setDeptList(
            (res.data || [])
              .map((item: any) => ({ label: item.name, value: item.code }))
          )
      })
  }

  const handleSubmit = () => {
    // console.log('ok')
    let saveParams = { ...params }

    setLoading(true)
    console.log(saveParams)

    traineeInfoSubmitService
      .submitInfoToAudit(saveParams)
      .then(res => (
        setFinished(true)
      ), () => setLoading(false))
    // window.opener = null
    // window.open('about:blank', '_self', '')
    // window.close()
  }

  useEffect(() => {
    document.title = "实习生资料上报"
    getDeptList()
  }, [])

  return <Wrapper>
    <div className="content" style={{ display: finished ? 'none' : 'block' }}>
      <ListMb>
        <InputItem
          value={params.name}
          placeholder="请输入"
          onChange={(name: string) => setParams({ ...params, name })}>
          姓名
        </InputItem>
        <Picker
          extra="请选择"
          data={[
            { label: '男', value: '0', },
            { label: '女', value: '1', },
          ]}
          style={{ textAlign: 'center' }}
          value={[params.sex]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) setParams({ ...params, sex: payload[0] })
          }}>
          <ListMb.Item className="sex-row" arrow="horizontal">性别</ListMb.Item>
        </Picker>
        <InputItem
          value={params.idCardNo}
          placeholder="请输入"
          onChange={(idCardNo: string) => setParams({ ...params, idCardNo })}>
          身份证号
        </InputItem>
        <InputItem
          value={params.phone}
          placeholder="请输入"
          onChange={(phone: string) => setParams({ ...params, phone })}>
          联系电话
        </InputItem>
      </ListMb>
      <ListMb>
        <InputItem
          value={params.schoolName}
          placeholder="请输入"
          onChange={(schoolName: string) => setParams({ ...params, schoolName })}>
          院校
        </InputItem>
        <InputItem
          value={params.major}
          placeholder="请输入"
          onChange={(major: string) => setParams({ ...params, major })}>
          专业
        </InputItem>
        <Picker
          extra="请选择"
          data={educationList.map((item: any) => ({ label: item.name, value: item.code }))}
          style={{ textAlign: 'center' }}
          value={[params.education]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) setParams({ ...params, education: payload[0] })
          }}>
          <ListMb.Item className="education-row" arrow="horizontal">学历</ListMb.Item>
        </Picker>
      </ListMb>
      <ListMb>
        <Picker
          extra="请选择"
          data={[
            { label: '是', value: '1', },
            { label: '否', value: '0', },
          ]}
          style={{ textAlign: 'center' }}
          value={[params.isResident]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) setParams({ ...params, isResident: payload[0] })
          }}>
          <ListMb.Item className="isResident-row" arrow="horizontal">是否住宿</ListMb.Item>
        </Picker>
        <InputItem
          value={params.dormitoryNumber}
          placeholder="请输入"
          onChange={(dormitoryNumber: string) => setParams({ ...params, dormitoryNumber })}>
          住宿编号
        </InputItem>
      </ListMb>
      <div className="sub-title">实习时间</div>
      <ListMb>
        <DatePickerMb
          value={params.internshipBegin ? moment(params.internshipBegin).toDate() : undefined}
          mode="date"
          locale={zhCN}
          onChange={(date) => setParams({
            ...params,
            internshipBegin: moment(date).format('YYYY-MM-DD')
          })}>
          <ListMb.Item arrow="horizontal">开始时间</ListMb.Item>
        </DatePickerMb>
        <DatePickerMb
          value={params.internshipEnd ? moment(params.internshipEnd).toDate() : undefined}
          mode="date"
          locale={zhCN}
          onChange={(date) => setParams({
            ...params,
            internshipEnd: moment(date).format('YYYY-MM-DD')
          })}>
          <ListMb.Item arrow="horizontal">结束时间</ListMb.Item>
        </DatePickerMb>
      </ListMb>
      <ListMb>
        <Picker
          extra="请选择"
          data={deptList}
          value={[params.studyDeptCode]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) {
              let target = deptList.find((item: any) => item.value == payload[0])
              setParams({
                ...params,
                studyDeptCode: target.value,
                studyDeptName: target.label
              })
            }
          }}>
          <ListMb.Item className="studyDeptCode-row" arrow="horizontal">实习科室</ListMb.Item>
        </Picker>
        <Picker
          extra="请选择"
          data={[
            { label: '是', value: '1', },
            { label: '否', value: '0', },
          ]}
          style={{ textAlign: 'center' }}
          value={[params.isGroupLeader]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) setParams({ ...params, isGroupLeader: payload[0] })
          }}>
          <ListMb.Item className="isGroupLeader-row" arrow="horizontal">是否组长</ListMb.Item>
        </Picker>
      </ListMb>
      <ListMb>
        <InputItem
          value={params.address}
          placeholder="请输入"
          onChange={(address: string) => setParams({ ...params, address })}>
          家庭住址
        </InputItem>
        <InputItem
          value={params.emergencyContactPerson}
          placeholder="请输入"
          onChange={(emergencyContactPerson: string) => setParams({ ...params, emergencyContactPerson })}>
          紧急联系人
        </InputItem>
        <InputItem
          value={params.emergencyContactPhone}
          placeholder="请输入"
          onChange={(emergencyContactPhone: string) => setParams({ ...params, emergencyContactPhone })}>
          联系人电话
        </InputItem>
        <TextareaItem
          value={params.remark}
          placeholder="请输入"
          title="备注"
          onChange={(remark: any) => setParams({ ...params, remark: remark || '' })}>
        </TextareaItem>
      </ListMb>
    </div>
    <div className="footer" style={{ display: finished ? 'none' : 'block' }}>
      <ButtonMb
        loading={loading}
        onClick={handleSubmit}
        type="primary">
        提&nbsp;交
      </ButtonMb>
    </div>
    <div
      className="content finished"
      style={{ display: finished ? 'block' : 'none' }}>
      <div className="fix-item">
        <Icon type="check-circle" style={{ color: 'green' }} />
        <span>提交成功</span>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.div`
  background: #eee;
  min-height: 100vh;
  overflow: hidden;
  .content{
    background: #eee;
    margin-bottom: 15px;
    .am-list{
      margin-top: 10px;
    }
    .sub-title{
      color: #aaa;
      margin-top: 10px;
      padding: 0 15px;
    }
  }
  .footer{
    background: #fff;
    /* border-top: 1px solid #ddd; */
    padding: 5px 15px;
    padding-bottom: 20px;
  }
  .finished{
    .fix-item{
      color: #000;
      position: fixed;
      left: 50%;
      top: 40%;
      font-size: 28px;
      transform: translate(-50%,-50%);
      /* background: #fff; */
      border-radius: 5px;
      &>*{
        vertical-align: middle;
        margin: 0 5px;
      }
    }
  }
`