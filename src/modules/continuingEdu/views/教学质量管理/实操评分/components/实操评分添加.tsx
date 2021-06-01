import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, Row, Select, } from 'antd'
import { Modal } from 'src/vendors/antd'
import createModal, { ModalComponentProps } from 'src/libs/createModal'
import moment from 'src/vendors/moment'
import { evalTypeGroup } from './../data/evalType'
import SelectPeopleModal from "src/modules/notice/page/modal/SelectPeopleModal";
import SelectPeopleModal_wh from "src/modules/notice/page/modal-wh/SelectPeopleModal";
import { appStore } from 'src/stores'

const Option = Select.Option

export interface Props extends ModalComponentProps {

}

const rules = {
  title: {
    require: true,
    rule: [
      (val: string) => !!val || '标题不能为空'
    ]
  },
}

export default function 实操评分添加(props: Props) {
  const { onOk, onCancel, visible } = props

  const defaultParams = () => {
    return {
      title: '',
      beginTime: moment().format('YYYY-MM-DD HH:mm'),
      endTime: moment().set('D', moment().get('D') + 1).format('YYYY-MM-DD HH:mm'),
      evalType: '1',
      pingfenren: [] as any[],
      canyvrenyuan: [] as any[],
      formCode: 'czjspfb',
      remark: '',
    }
  }

  const [editParams, setEditParams] = useState(defaultParams())

  const selectPeopleModal = createModal(appStore.HOSPITAL_ID == "wh" ? SelectPeopleModal_wh : SelectPeopleModal);

  const formatSelectPeople = (payload: any) => {
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

    return newPersonList
  }

  const handleSave = () => {
    onOk && onOk(null)
  }

  return <React.Fragment>
    <Modal
      title="添加"
      width={600}
      centered
      onCancel={() => onCancel()}
      onOk={() => handleSave()}
      visible={visible}>
      <Wrapper>
        <Row>
          <Col span={5} className="title">实操名称</Col>
          <Col span={16} className="content">
            <Input
              value={editParams.title}
              onChange={(e) =>
                setEditParams({ ...editParams, title: e.target.value })} />
          </Col>
        </Row>
        <Row>
          <Col span={5} className="title">开始时间</Col>
          <Col span={16} className="content">
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD HH:mm"
              value={moment(editParams.beginTime)}
              allowClear={false}
              onChange={(_moment: any) => setEditParams({ ...editParams, beginTime: _moment.format('YYYY-MM-DD HH:mm') })} />
          </Col>
        </Row>
        <Row>
          <Col span={5} className="title">结束时间</Col>
          <Col span={16} className="content">
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD HH:mm"
              value={moment(editParams.endTime)}
              allowClear={false}
              onChange={(_moment: any) => setEditParams({ ...editParams, endTime: _moment.format('YYYY-MM-DD HH:mm') })} />
          </Col>
        </Row>
        <Row>
          <Col span={5} className="title">评分类型</Col>
          <Col span={16} className="content">
            <Select
              style={{ width: '100%' }}
              value={editParams.evalType}
              onChange={(evalType: string) => {

                let target = evalTypeGroup[evalType]
                let formCode = target.formList[0].code

                setEditParams({
                  ...editParams,
                  evalType,
                  formCode
                })
              }}>
              {Object.keys(evalTypeGroup)
                .map((key: any) => (
                  <Option value={key} key={key}>{evalTypeGroup[key].name}</Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={5} className="title">评 分 表</Col>
          <Col span={16} className="content">
            <Select
              style={{ width: '100%' }}
              value={editParams.formCode}
              onChange={(formCode: string) => {
                setEditParams({
                  ...editParams,
                  formCode
                })
              }}>
              {evalTypeGroup[editParams.evalType].formList
                .map((item: any) => (
                  <Option value={item.code} key={item.code}>{item.name}</Option>
                ))}
            </Select>
          </Col>
          <Col span={2} className="extra">
            <Button size="small" type="primary" style={{ marginTop: '4px' }}>预览</Button>
          </Col>
        </Row>
        <Row>
          <Col span={5} className="title">评分负责人</Col>
          <Col span={16} className="content">
            <Input.TextArea
              value={editParams.pingfenren
                .map((item) => item.empName).join(',')}
              autosize={{ minRows: 1 }}
              readOnly />
          </Col>
          <Col span={2} className="extra">
            <Button onClick={() => {
              selectPeopleModal.show({
                checkedUserList: editParams.pingfenren.map((person: any) => {
                  return {
                    label: person.empName,
                    key: person.empNo
                  }
                }) as any[],
                onOkCallBack: (payload: any) => {
                  let peopleList = formatSelectPeople(payload)
                  setEditParams({
                    ...editParams,
                    pingfenren: peopleList
                  })
                }
              })
            }}>
              ...
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={5} className="title">参与人员</Col>
          <Col span={16} className="content">
            <Input.TextArea
              value={editParams.canyvrenyuan
                .map((item) => item.empName).join(',')}
              autosize={{ minRows: 2 }}
              readOnly />
          </Col>
          <Col span={2} className="extra">
            <Button onClick={() => {
              selectPeopleModal.show({
                checkedUserList: editParams.canyvrenyuan
                  .map((person: any) => {
                    return {
                      label: person.empName,
                      key: person.empNo
                    }
                  }) as any[],
                onOkCallBack: (payload: any) => {
                  let peopleList = formatSelectPeople(payload)
                  setEditParams({
                    ...editParams,
                    canyvrenyuan: peopleList
                  })
                }
              })
            }}>
              ...
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={5} className="title">通知信息</Col>
          <Col span={16} className="content">
            <Input.TextArea
              value={editParams.remark}
              onChange={(e) => setEditParams({
                ...editParams,
                remark: e.target.value
              })}
              placeholder="请输入通知详细或考试内容，在【完成】页面勾选通知设置，通知会自动发送" />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
    <selectPeopleModal.Component />
  </React.Fragment>
}

const Wrapper = styled.div`
  .ant-row{
    margin-bottom: 15px;
    padding-right: 15px;
    .ant-col{
      &.title{
        line-height: 32px;
        font-size: 14px;
        text-align: right;
        padding-right: 15px;
      }
      &.extra{
        padding-left: 15px;
      }
    }
  }
`