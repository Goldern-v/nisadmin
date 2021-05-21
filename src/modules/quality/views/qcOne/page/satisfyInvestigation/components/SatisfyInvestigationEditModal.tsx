import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Divider, Input, message, Modal, Row, Select, Tag } from 'antd'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
import moment from 'moment'
import YearPicker from 'src/components/YearPicker'
import { satisfyInvestigationServices } from './../services/SatisfyInvestigationServices'
import createModal from 'src/libs/createModal'
import SelectPeopleModal from "src/modules/notice/page/modal/SelectPeopleModal";
import SelectPeopleModal_wh from "src/modules/notice/page/modal-wh/SelectPeopleModal";

const Option = Select.Option

export interface Props {
  visible: boolean,
  editId?: string | number,
  onCancel: Function,
  onOk: Function
}

export default observer(function SatisfyInvestigationEditModal(props: Props) {
  const { editId, visible, onCancel, onOk } = props
  const [satisfiedInstance, setSatisfiedInstance] = useState({} as any)
  const [satisfiedDetail, setSatisfiedDetail] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const monthList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

  const selectPeopleModal = createModal(appStore.HOSPITAL_ID == "wh" ? SelectPeopleModal_wh : SelectPeopleModal);

  const getSatisfiedDetail = () => {
    setLoading(true)
    satisfyInvestigationServices
      .satisfiedInstanceDetail(editId || '')
      .then(res => {
        setLoading(false)

        if (res.data) {
          setSatisfiedDetail(res.data.satisfiedDetail)
          setSatisfiedInstance(res.data.satisfiedInstance)
        }

      }, () => setLoading(false))
  }

  const handleSave = () => {
    if (satisfiedDetail.length <= 0) {
      message.warn('未选择调查对象')
      return
    }

    setLoading(true)

    satisfyInvestigationServices
      .satisfiedInstanceSaveOrUpdate({
        satisfiedInstance,
        satisfiedDetail
      })
      .then(res => {
        setLoading(false)

        message.success('保存成功')
        onOk && onOk()
      }, () => setLoading(false))
  }

  const handlePersonAdd = () => {
    selectPeopleModal.show({
      checkedUserList: satisfiedDetail.map((person: any) => {
        return {
          label: person.empName,
          key: person.empNo
        }
      }) as any[],
      onOkCallBack: (payload: any) => {
        let newPersonList = [] as any[]

        for (let i = 0; i < payload.length; i++) {
          let current = payload[i]

          if (current.userList) {
            for (let j = 0; j < current.userList.length; j++) {
              let userItem = current.userList[j]

              newPersonList.push(userItem)
            }
          } else {
            newPersonList.push({
              empName: current.label,
              empNo: current.key
            })
          }
        }

        setSatisfiedDetail([...newPersonList])
      }
    })
  }

  useEffect(() => {
    if (visible) {
      if (editId) {
        getSatisfiedDetail()
      } else {
        let year = moment().format('YYYY')
        let month = (moment().get('month') + 1).toString()
        let wardName = authStore.selectedDeptName

        setSatisfiedInstance({
          title: `${year}年${month}月${wardName}护士满意度调查表`,
          year,
          month,
          wardCode: authStore.selectedDeptCode,
          wardName: authStore.selectedDeptName,
          createName: authStore.user?.empName,
          createNo: authStore.user?.empNo,
        })
      }
    } else {
      setSatisfiedDetail([])
    }
  }, [visible])

  return (
    <React.Fragment>
      <Modal
        title={`满意度调查表编辑${editId ? '编辑' : '新建'}`}
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
                value={satisfiedInstance.title}
                onChange={(e: any) =>
                  setSatisfiedInstance({ ...satisfiedInstance, title: e.target.value })} />
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
                value={satisfiedInstance.wardCode}
                onChange={(val: string) => {
                  let target = authStore.deptList.find((dept: any) => dept.code === val)

                  setSatisfiedInstance({
                    ...satisfiedInstance,
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
                value={satisfiedInstance.year ? moment(satisfiedInstance.year) : undefined}
                allowClear={false}
                onChange={(payload: any) => setSatisfiedInstance({
                  ...satisfiedInstance,
                  year: payload ? payload.format('YYYY-MM-DD') : ''
                })}
              />
            </Col>
            <Col span={9}>
              <Select
                value={satisfiedInstance.month}
                style={{ width: '100%' }}
                onChange={(month: string) => setSatisfiedInstance({ ...satisfiedInstance, month })}>
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
              <Button size="small" onClick={() => handlePersonAdd()}>添加</Button>
            </Col>
          </Row>
          <Row>
            <Col span={4}></Col>
            <Col span={20}>
              {satisfiedDetail.map((person: any, idx: number) => (
                <Tag
                  key={person.empNo}
                  onClose={() => {
                    let newSatisfiedDetail = satisfiedDetail.concat()
                    newSatisfiedDetail.splice(idx, 1)

                    setSatisfiedDetail(newSatisfiedDetail)
                  }}
                  closable>
                  {person.empName}
                </Tag>
              ))}
            </Col>
          </Row>
          {satisfiedDetail.length <= 0 && (
            <div className="person-empty">未添加人员</div>
          )}
        </Wrapper>
      </Modal>
      <selectPeopleModal.Component />
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