import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Input, Button, DatePicker } from 'antd'
import moment from 'moment'
import SelectPeopleModal from 'src/modules/notice/page/modal/SelectPeopleModal'
import { advancedManageServices } from './../services/AdvancedManageServices'
import { message } from 'src/vendors/antd'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  orginData?: any
}

const getDefualtParams = () => {
  return {
    id: '',
    empNo: '',
    empName: '',
    startDate: '',
    endDate: '',
    juniorCollege: '',
    organizer: '',
  }
}

export default function AdvancedManageEditModal(props: Props) {
  const { visible, onOk, onCancel, orginData } = props
  const [peopleSelectVisible, setPeopleSelectVisible] = useState(false)
  const [params, setParams] = useState(getDefualtParams())

  const handleSave = () => {
    advancedManageServices
      .saveOrUpdateAdvanced({
        ...params,
        startDate: `${params.startDate} 00:00`,
        endDate: `${params.endDate} 23:59`,
      })
      .then(res => {
        message.success('保存成功')
        onOk && onOk()
      })
  }

  useEffect(() => {
    if (visible) {
      if (Object.keys(orginData).length > 0) {
        const { id, empNo, empName, startDate, endDate, juniorCollege, organizer } = orginData
        setParams({ id, empNo, empName, startDate, endDate, juniorCollege, organizer })
      } else {
        setParams(getDefualtParams())
      }
    }
  }, [visible])

  return (
    <React.Fragment>
      <Modal
        forceRender
        title={`${params.id ? '' : ''}进修临床实践`}
        visible={visible}
        onCancel={() => onCancel()}
        onOk={() => handleSave()}>
        <Wrapper>
          <Row gutter={15}>
            <Col span={5}>
              姓名：
            </Col>
            <Col span={5}>
              <Input readOnly value={params.empName || ''} />
            </Col>
            <Col span={2}>
              <Button
                size="small"
                style={{ marginTop: 4 }}
                onClick={() =>
                  setPeopleSelectVisible(true)}>
                添加
              </Button>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={5}>
              开始时间：
            </Col>
            <Col span={16}>
              <DatePicker
                allowClear={false}
                value={params.startDate ? moment(params.startDate) : undefined}
                onChange={(_moment?) =>
                  setParams({ ...params, startDate: _moment.format('YYYY-MM-DD') })} />
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={5}>
              结束时间：
            </Col>
            <Col span={16}>
              <DatePicker
                allowClear={false}
                value={params.endDate ? moment(params.endDate) : undefined}
                onChange={(_moment?) =>
                  setParams({ ...params, endDate: _moment.format('YYYY-MM-DD') })} />
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={5}>进修专科：</Col>
            <Col span={16}>
              <Input
                value={params.juniorCollege}
                onChange={(e: any) =>
                  setParams({ ...params, juniorCollege: e.target.value })} />
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={5}>进修单位：</Col>
            <Col span={16}>
              <Input
                value={params.organizer}
                onChange={(e: any) =>
                  setParams({ ...params, organizer: e.target.value })} />
            </Col>
          </Row>
        </Wrapper>
      </Modal>
      <SelectPeopleModal
        checkedUserList={[]}
        visible={peopleSelectVisible}
        onOkCallBack={(payload: any[]) => {
          let selectedEmpList = payload.reduce((prev: any[], current: any) => {
            if (current.empNo) {
              return [...prev, { ...current }]
            } else if (current.userList) {
              return [...prev, ...current.userList.map((item: any) => ({ ...item }))]
            } else {
              return prev
            }
          }, [])

          if (selectedEmpList.length > 0) {
            let targetItem = selectedEmpList[0]
            setParams({
              ...params,
              empName: targetItem.empName,
              empNo: targetItem.empNo,
            })
          }
          setPeopleSelectVisible(false)
        }}
        onOk={() => setPeopleSelectVisible(false)}
        onCancel={() => setPeopleSelectVisible(false)}
        onClose={() => setPeopleSelectVisible(false)} />
    </React.Fragment>
  )
}

const Wrapper = styled.div`
  .ant-row{
    margin-bottom: 15px;
    &:last-of-type{
      margin-bottom: 0;
    }
    .ant-col{
      &:first-of-type{
        text-align: right;
        line-height: 30px;
        font-size: 14px;
      }
    }
  }
`