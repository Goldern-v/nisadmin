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
  Modal as ModalMb
} from 'antd-mobile'
import zhCN from 'antd-mobile/lib/date-picker/locale/zh_CN'
import moment from 'moment'
export interface Props { }

export default function TraineeInfoSubmit() {
  const [params, setParams] = useState({
    name: '',
    sex: '女',
    phoneNumber: '',
    school: '',
    zhuanye: '',
    xueli: '',
    zhusu: '是',
    zhusuNum: '',
    startDate: '',
    endDate: '',
    zuzhang: '',
  })

  const [deptList, setDeptList] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const handleSubmit = () => {
    console.log('ok')
    // window.opener = null
    // window.open('about:blank', '_self', '')
    // window.close()
  }

  useEffect(() => {
    document.title = "实习生资料上报"
  }, [])

  return <Wrapper>
    <div className="content">
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
            { label: '男', value: '男', },
            { label: '女', value: '女', },
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
          value={params.phoneNumber}
          placeholder="请输入"
          onChange={(phoneNumber: string) => setParams({ ...params, phoneNumber })}>
          联系电话
        </InputItem>
      </ListMb>
      <ListMb>
        <InputItem
          value={params.school}
          placeholder="请输入"
          onChange={(school: string) => setParams({ ...params, school })}>
          院校
        </InputItem>
        <InputItem
          value={params.zhuanye}
          placeholder="请输入"
          onChange={(zhuanye: string) => setParams({ ...params, zhuanye })}>
          专业
        </InputItem>
        <Picker
          extra="请选择"
          data={[
            { label: '专科', value: '专科', },
            { label: '本科', value: '本科', },
          ]}
          style={{ textAlign: 'center' }}
          value={[params.xueli]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) setParams({ ...params, xueli: payload[0] })
          }}>
          <ListMb.Item className="xueli-row" arrow="horizontal">学历</ListMb.Item>
        </Picker>
      </ListMb>
      <ListMb>
        <Picker
          extra="请选择"
          data={[
            { label: '是', value: '是', },
            { label: '否', value: '否', },
          ]}
          style={{ textAlign: 'center' }}
          value={[params.zhusu]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) setParams({ ...params, zhusu: payload[0] })
          }}>
          <ListMb.Item className="zhusu-row" arrow="horizontal">是否住宿</ListMb.Item>
        </Picker>
        <InputItem
          value={params.zhusuNum}
          placeholder="请输入"
          onChange={(zhusuNum: string) => setParams({ ...params, zhusuNum })}>
          住宿编号
        </InputItem>
      </ListMb>
      <div className="sub-title">实习时间</div>
      <ListMb>
        <DatePickerMb
          value={params.startDate ? moment(params.startDate).toDate() : undefined}
          mode="date"
          locale={zhCN}
          onChange={(date) => setParams({
            ...params,
            startDate: moment(date).format('YYYY-MM-DD')
          })}>
          <ListMb.Item arrow="horizontal">开始时间</ListMb.Item>
        </DatePickerMb>
        <DatePickerMb
          value={params.endDate ? moment(params.endDate).toDate() : undefined}
          mode="date"
          locale={zhCN}
          onChange={(date) => setParams({
            ...params,
            endDate: moment(date).format('YYYY-MM-DD')
          })}>
          <ListMb.Item arrow="horizontal">结束时间</ListMb.Item>
        </DatePickerMb>
      </ListMb>
      <ListMb>
        <Picker
          extra="请选择"
          data={[
            { label: '是', value: '是', },
            { label: '否', value: '否', },
          ]}
          style={{ textAlign: 'center' }}
          value={[params.zuzhang]}
          cols={1}
          onChange={(payload: any) => {
            if (payload[0]) setParams({ ...params, zuzhang: payload[0] })
          }}>
          <ListMb.Item className="zuzhang-row" arrow="horizontal">是否组长</ListMb.Item>
        </Picker>
      </ListMb>
    </div>
    <div className="footer">
      <ButtonMb onClick={handleSubmit} type="primary">提&nbsp;交</ButtonMb>
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
  }
`