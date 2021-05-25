import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Divider, Input, message, Modal, Row, Select, Tag } from 'antd'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
import moment from 'moment'
import YearPicker from 'src/components/YearPicker'
import { satisfiedPatInvestigationServices } from './../services/SatisfiedPatInvestigationServices'

const Option = Select.Option

export interface Props {
  visible: boolean,
  editId?: string | number,
  onCancel: Function,
  onOk: Function
}

export default observer(function SatisfiedPatInvestigationEditModal(props: Props) {
  const { editId, visible, onCancel, onOk } = props
  const [satisfiedPat, setSatisfiedPat] = useState({} as any)
  const [satisfiedPatDetail, setSatisfiedPatDetail] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  const getSatisfiedPatDetail = () => {
    setLoading(true)
    satisfiedPatInvestigationServices
      .satisfiedPatDetail(editId || '')
      .then(res => {
        setLoading(false)

        if (res.data) {
          setSatisfiedPatDetail(res.data.satisfiedPatDetail)
          setSatisfiedPat(res.data.satisfiedPat)
        }

      }, () => setLoading(false))
  }

  const handleSave = () => {
    setLoading(true)

    satisfiedPatInvestigationServices
      .satisfiedPatSaveOrUpdate({
        satisfiedPat,
        satisfiedPatDetail
      })
      .then(res => {
        setLoading(false)

        message.success('保存成功')
        onOk && onOk()
      }, () => setLoading(false))
  }

  useEffect(() => {
    if (visible) {
      if (editId) {
        getSatisfiedPatDetail()
      } else {
        let year = moment().format('YYYY')
        let month = (moment().get('month') + 1).toString()
        let wardName = authStore.selectedDeptName

        setSatisfiedPat({
          title: `${year}年${month}月${wardName}患者满意度调查表`,
          year,
          month,
          wardCode: authStore.selectedDeptCode,
          wardName: authStore.selectedDeptName,
          creatorName: authStore.user?.empName,
          creatorNo: authStore.user?.empNo,
        })
      }
    } else {
      setSatisfiedPatDetail([])
    }
  }, [visible])

  return (
    <React.Fragment>
      <Modal
        title={`满意度调查表${editId ? '编辑' : '新建'}`}
        centered
        confirmLoading={loading}
        visible={visible}
        onCancel={() => onCancel()}
        onOk={() => handleSave()}
      >
        <Wrapper>
          <Row>
            <Col span={6}>标&nbsp;&nbsp;题</Col>
            <Col span={18}>
              <Input
                value={satisfiedPat.title}
                onChange={(e: any) =>
                  setSatisfiedPat({ ...satisfiedPat, title: e.target.value })} />
            </Col>
          </Row>
          <Row>
            <Col span={6}>科&nbsp;&nbsp;室</Col>
            <Col span={18}>
              <Select
                style={{ width: '100%' }}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                value={satisfiedPat.wardCode}
                onChange={(val: string) => {
                  let target = authStore.deptList.find((dept: any) => dept.code === val)

                  setSatisfiedPat({
                    ...satisfiedPat,
                    wardCode: val,
                    wardName: target?.name || ''
                  })
                }}>
                {authStore.deptList.map((dept: any) => <Option value={dept.code} key={dept.code}>{dept.name}</Option>)}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={6}>月&nbsp;&nbsp;份</Col>
            <Col span={9}>
              <YearPicker
                value={satisfiedPat.year ? moment(satisfiedPat.year) : undefined}
                allowClear={false}
                onChange={(payload: any) => setSatisfiedPat({
                  ...satisfiedPat,
                  year: payload ? payload.format('YYYY-MM-DD') : ''
                })}
              />
            </Col>
            <Col span={9}>
              <Select
                value={satisfiedPat.month}
                style={{ width: '100%' }}
                onChange={(month: string) => setSatisfiedPat({ ...satisfiedPat, month })}>
                {monthList.map((month: string) => (
                  <Option
                    value={month}
                    key={month}>
                    {month}月
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={6}>创 建 人</Col>
            <Col span={18}>
              <Input value={authStore.user?.empName} readOnly />
            </Col>
          </Row>
          <Row>
            <Col span={6}>调查对象</Col>
            <Col span={18} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Input value={`${satisfiedPat.wardName || ''}患者`} readOnly />
            </Col>
          </Row>
        </Wrapper>
      </Modal>
    </React.Fragment>
  )
})

const Wrapper = styled.div`
  .ant-row{
    margin-bottom: 10px;
    .ant-col:first-of-type{
      text-align: right;
      padding-right: 30px;
      font-size: 14px;
      line-height: 30px;
    }
  }
  .person-empty{
    text-align: center;
    color: #999;
    line-height: 50px;
  }
`