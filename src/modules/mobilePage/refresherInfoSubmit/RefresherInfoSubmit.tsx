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
import { Icon, message } from 'antd'
import zhCN from 'antd-mobile/lib/date-picker/locale/zh_CN'
import moment from 'moment'
import { educationList } from './data/education'
import { titleList } from './data/title'
import { refresherInfoSubmitService } from './api/RefresherInfoSubmitService'
import { appStore } from 'src/stores'

export interface Props { }

export default function TraineeInfoSubmit() {
  const [params, setParams] = useState({
    name: '',
    sex: '1',
    age: '',
    originalWorkUnit: '',
    originalDepartment: '',
    idCardNo: '',
    phone: '',
    title: '',
    education: '',
    isResident: '1',
    dormitoryNumber: '',
    studyTimeBegin: '',
    studyTimeEnd: '',
    studyDeptCode01: '',
    studyDeptName01: '',
    studyDeptCode02: '',
    studyDeptName02: '',
    address: '',
    emergencyContactPerson: '',
    emergencyContactPhone: '',
    remark: '',
  })

  /**表单校验 */
  const [rules, setRules] = useState({
    name: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '姓名不能为空'
      ]
    },
    age: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '年龄不能为空'
      ]
    },
    title: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '职称不能为空'
      ]
    },
    education: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '学历不能为空'
      ]
    },
    originalWorkUnit: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '原单位名称不能为空'
      ]
    },
    originalDepartment: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '原科室不能为空'
      ]
    },
    idCardNo: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '身份证号不能为空'
      ]
    },
    phone: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '联系电话不能为空'
      ]
    },
    studyTimeBegin: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '进修开始时间不能为空'
      ]
    },
    studyTimeEnd: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '进修结束时间不能为空'
      ]
    },
    studyDeptCode01: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '进修科室一不能为空'
      ]
    },
    address: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '家庭住址不能为空'
      ]
    },
    emergencyContactPerson: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '紧急联系人不能为空'
      ]
    },
    emergencyContactPhone: {
      error: false,
      errorText: '',
      scrollId: '',
      rules: [
        (val: string) => !!val || '联系人电话不能为空'
      ]
    },
  })

  const [deptList, setDeptList] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const getDeptList = () => {
    refresherInfoSubmitService
      .nursingUnitWithOutLogin()
      .then(res => {
        if (res.data)
          setDeptList(
            (res.data || [])
              .map((item: any) => ({ label: item.name, value: item.code }))
          )
      })
  }

  const checkForm = () => {
    let errMsg = ''
    let rulesTotal = { ...rules } as any
    let formData = { ...params } as any
    for (let key in rulesTotal) {
      if (rulesTotal[key].rules && rulesTotal[key].rules.length > 0) {

        let result = rulesTotal[key].rules
          .reduce((prev: any, current: Function, idx: number) => {
            if (prev === true || idx === 0)
              return current(formData[key])
            else
              return prev
          })

        if (result instanceof Function) {
          result = result(formData[key])
        }

        if (typeof result !== 'boolean') {
          message.error(result)
          rulesTotal[key].error = true
          setRules(rulesTotal)
          return false
        }
        rulesTotal[key].error = false
      }
    }
    setRules(rulesTotal)

    return true
  }

  const handleSubmit = () => {
    if (!checkForm()) return

    // console.log('ok')
    let saveParams = { ...params }

    setLoading(true)
    console.log(saveParams)

    refresherInfoSubmitService
      .submitInfoToAudit(saveParams)
      .then(res => (
        setFinished(true)
      ), () => setLoading(false))
    // window.opener = null
    // window.open('about:blank', '_self', '')
    // window.close()
  }

  useEffect(() => {
    document.title = "进修生资料上报"
    getDeptList()
  }, [])

  return <Wrapper>
    <div className="content" style={{ display: finished ? 'none' : 'block' }}>
      <ListMb>
        <InputItem
          error={rules['name'].error}
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
          error={rules['age'].error}
          value={params.age}
          placeholder="请输入"
          onChange={(age: string) => setParams({ ...params, age })}>
          年龄
        </InputItem>
        <Picker
        className='error'
          extra="请选择"
          data={titleList}
          style={{ textAlign: 'center' }}
          value={[params.title]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) setParams({ ...params, title: payload[0] })
          }}>
          <ListMb.Item className="title-row" arrow="horizontal" error={rules['title'].error}>职称</ListMb.Item>
        </Picker>
        <Picker
          extra="请选择"
          data={educationList.map((item: any) => ({ label: item.name, value: item.code }))}
          style={{ textAlign: 'center' }}
          value={[params.education]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) setParams({ ...params, education: payload[0] })
          }}>
          <ListMb.Item className="education-row" arrow="horizontal" error={rules['education'].error}>学历</ListMb.Item>
        </Picker>
      </ListMb>
      <ListMb>
        <InputItem
          error={rules['originalWorkUnit'].error}
          value={params.originalWorkUnit}
          placeholder="请输入"
          onChange={(originalWorkUnit: string) => setParams({ ...params, originalWorkUnit })}>
          原单位名称
        </InputItem>
        <InputItem
          error={rules['originalDepartment'].error}
          value={params.originalDepartment}
          placeholder="请输入"
          onChange={(originalDepartment: string) => setParams({ ...params, originalDepartment })}>
          原科室
        </InputItem>
      </ListMb>
      <ListMb>
        <InputItem
          error={rules['idCardNo'].error}
          value={params.idCardNo}
          placeholder="请输入"
          onChange={(idCardNo: string) => setParams({ ...params, idCardNo })}>
          身份证号
        </InputItem>
        <InputItem
          error={rules['phone'].error}
          value={params.phone}
          placeholder="请输入"
          onChange={(phone: string) => setParams({ ...params, phone })}>
          联系电话
        </InputItem>
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
      <div className="sub-title">进修时间</div>
      <ListMb>
        <DatePickerMb
          value={params.studyTimeBegin ? moment(params.studyTimeBegin).toDate() : undefined}
          mode="date"
          locale={zhCN}
          onChange={(date) => setParams({
            ...params,
            studyTimeBegin: moment(date).format('YYYY-MM-DD')
          })}>
          <ListMb.Item arrow="horizontal" error={rules['studyTimeBegin'].error}>开始时间</ListMb.Item>
        </DatePickerMb>
        <DatePickerMb
          value={params.studyTimeEnd ? moment(params.studyTimeEnd).toDate() : undefined}
          mode="date"
          locale={zhCN}
          onChange={(date) => setParams({
            ...params,
            studyTimeEnd: moment(date).format('YYYY-MM-DD')
          })}>
          <ListMb.Item arrow="horizontal" error={rules['studyTimeEnd'].error}>结束时间</ListMb.Item>
        </DatePickerMb>
      </ListMb>
      <ListMb>
        <Picker
          extra="请选择"
          data={deptList}
          value={[params.studyDeptCode01]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) {
              let target = deptList.find((item: any) => item.value == payload[0])
              setParams({
                ...params,
                studyDeptCode01: target.value,
                studyDeptName01: target.label
              })
            }
          }}>
          <ListMb.Item className="studyDeptCode-row" arrow="horizontal" error={rules['studyDeptCode01'].error}>进修科室1</ListMb.Item>
        </Picker>
        {
          !['qhwy', 'whhk', 'dglb'].includes(appStore.HOSPITAL_ID) &&
            <Picker
              extra="请选择"
              data={[
                { label: '无', value: '' },
                ...deptList
              ]}
              value={[params.studyDeptCode02]}
              cols={1}
              onChange={(payload: any) => {
                if (payload[0]) {
                  let target = deptList.find((item: any) => item.value == payload[0])
                  setParams({
                    ...params,
                    studyDeptCode02: target.value || '',
                    studyDeptName02: target.label || ''
                  })
                } else {
                  setParams({
                    ...params,
                    studyDeptCode02: '',
                    studyDeptName02: ''
                  })
                }
              }}>
              <ListMb.Item className="studyDeptCode-row" arrow="horizontal">进修科室2</ListMb.Item>
            </Picker>
        }
      </ListMb>
      <ListMb>
        <InputItem
          error={rules['address'].error}
          value={params.address}
          placeholder="请输入"
          onChange={(address: string) => setParams({ ...params, address })}>
          家庭住址
        </InputItem>
        <InputItem
          error={rules['emergencyContactPerson'].error}
          value={params.emergencyContactPerson}
          placeholder="请输入"
          onChange={(emergencyContactPerson: string) => setParams({ ...params, emergencyContactPerson })}>
          紧急联系人
        </InputItem>
        <InputItem
          error={rules['emergencyContactPhone'].error}
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