import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, message, Row, Select, } from 'antd'
import { Modal } from 'src/vendors/antd'
import createModal, { ModalComponentProps } from 'src/libs/createModal'
import moment from 'src/vendors/moment'
import { practicalTypeGroup } from '../data/practicalType'
import SelectPeopleModal from "src/modules/notice/page/modal/SelectPeopleModal";
import SelectPeopleModal_wh from "src/modules/notice/page/modal-wh/SelectPeopleModal";
import { appStore } from 'src/stores'
import { practicalScoreEvalService } from './../services/PracticalScoreEvalService'
import PracticalScoreEvalForm from './PracticalScoreEvalForm'

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
  participantsList: {
    require: true,
    rule: [
      (arr: any[]) => arr.length > 0 || '参与人员不能为空'
    ]
  },
  practicalList: {
    require: true,
    rule: [
      (arr: any[]) => arr.length > 0 || '评分人员不能为空'
    ]
  },
} as { [p: string]: any }

export default function 实操评分添加(props: Props) {
  const { onOk, onCancel, visible } = props
  const [loading, setLoading] = useState(false)

  const defaultParams = () => {
    return {
      id: '',
      title: '',
      startDate: moment().format('YYYY-MM-DD HH:mm'),
      endDate: moment().set('D', moment().get('D') + 1).format('YYYY-MM-DD HH:mm'),
      practicalType: '1',
      practicalList: [] as any[],
      participantsList: [] as any[],
      practicalTableId: '',
      noticeContent: '',
    } as any
  }

  const [editParams, setEditParams] = useState(defaultParams())
  const [practicalTableList, setPracticalTableList] = useState({
    '1': [],
    '2': [
      { id: 2, tableName: '个案护理发表评分表' },
      { id: 3, tableName: '护士床边综合能力考核表' },
      { id: 4, tableName: '临床护理小讲课比赛评分表' },
    ],
    '3': [
      { id: 5, tableName: '规范化培训护士工作情况调查表' },
      { id: 6, tableName: '新毕业生护士工作情况调查表' },
    ],
  } as any)

  const [templateVisible, setTemplateVisible] = useState(false)

  const selectPeopleModal = createModal(appStore.HOSPITAL_ID == "wh" || appStore.HOSPITAL_ID === 'gxjb' ? SelectPeopleModal_wh : SelectPeopleModal);

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

  const getPracticalTableList = (newEditParams?: any) => {
    practicalScoreEvalService.getAllPracticalTableList()
      .then(res => {
        let newPracticalTableList = { ...practicalTableList }
        newPracticalTableList['1'] = res.data || []

        setPracticalTableList(newPracticalTableList)

        if (newEditParams) {
          let practicalTableId = newPracticalTableList[newEditParams.practicalType][0]?.id || ''

          setEditParams({
            ...newEditParams,
            practicalTableId
          })
        }
      })
  }

  useEffect(() => {
    if (visible) {
      let newEditParams = defaultParams()
      setEditParams(newEditParams)
      getPracticalTableList(newEditParams)
    }
  }, [visible])

  const handleSave = () => {
    let errMsgList = [] as string[]

    Object.keys(rules).forEach((key: string) => {
      if (Object.keys(editParams).includes(key)) {
        let val = editParams[key]

        let currentItem = rules[key]

        let currentErrMsgList = currentItem.rule
          .map((checkFun: Function) => checkFun(val))
          .filter((payload: any) => payload !== true)

        if (currentErrMsgList.length > 0) errMsgList = errMsgList.concat(currentErrMsgList)
      }
    })

    if (errMsgList.length > 0) {
      errMsgList.length > 1 ? Modal.error({
        title: '提示',
        content: (
          <div>
            {errMsgList.map((errMsg: string, idx: number) => <div key={idx}>{errMsg}</div>)}
          </div>
        )
      }) : message.error(errMsgList[0])

      return
    }

    setLoading(true)

    let saveParams = {
      ...editParams,
      practicalList: editParams.practicalList.map((emp: any) => emp.empNo),
      participantsList: editParams.participantsList.map((emp: any) => emp.empNo),
    }

    practicalScoreEvalService.saveOrUpdatePracticalScore(saveParams)
      .then(res => {
        setLoading(false)

        message.success('保存成功')

        onOk && onOk(null)
      }, () => setLoading(false))
    // onOk && onOk(null)
  }

  return <React.Fragment>
    <Modal
      title="添加"
      width={600}
      centered
      confirmLoading={loading}
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
              value={moment(editParams.startDate)}
              allowClear={false}
              onChange={(_moment: any) => setEditParams({ ...editParams, startDate: _moment.format('YYYY-MM-DD HH:mm') })} />
          </Col>
        </Row>
        <Row>
          <Col span={5} className="title">结束时间</Col>
          <Col span={16} className="content">
            <DatePicker
              style={{ width: '100%' }}
              format="YYYY-MM-DD HH:mm"
              value={moment(editParams.endDate)}
              allowClear={false}
              onChange={(_moment: any) => setEditParams({ ...editParams, endDate: _moment.format('YYYY-MM-DD HH:mm') })} />
          </Col>
        </Row>
        <Row>
          <Col span={5} className="title">评分类型</Col>
          <Col span={16} className="content">
            <Select
              style={{ width: '100%' }}
              value={editParams.practicalType}
              onChange={(practicalType: string) => {
                let practicalTableId = practicalTableList[practicalType][0]?.id || ''
                setEditParams({
                  ...editParams,
                  practicalType,
                  practicalTableId
                })
              }}>
              {Object.keys(practicalTypeGroup)
                .map((key: any) => (
                  <Option value={key} key={key}>{practicalTypeGroup[key].name}</Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={5} className="title">评 分 表</Col>
          <Col span={16} className="content">
            <Select
              style={{ width: '100%' }}
              value={editParams.practicalTableId.toString()}
              onChange={(practicalTableId: string) => {
                setEditParams({
                  ...editParams,
                  practicalTableId
                })
              }}>
              {practicalTableList
              [editParams.practicalType].map((item: any) => (
                <Option
                  value={item.id.toString()}
                  key={item.id}>
                  {item.tableName}{editParams.practicalType === '1' ? '操作技术评分标准' : ''}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={2} className="extra">
            <Button
              size="small"
              disabled={loading}
              type="primary"
              style={{ marginTop: '4px' }}
              onClick={() => setTemplateVisible(true)}>
              预览
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={5} className="title">评分负责人</Col>
          <Col span={16} className="content">
            <Input.TextArea
              value={editParams.practicalList
                .map((item: any) => item.empName).join(',')}
              autosize={{ minRows: 1 }}
              readOnly />
          </Col>
          <Col span={2} className="extra">
            <Button
              size="small"
              disabled={loading}
              style={{ marginTop: '4px' }}
              onClick={() => {
                selectPeopleModal.show({
                  checkedUserList: editParams.practicalList.map((person: any) => {
                    return {
                      label: person.empName,
                      key: person.empNo
                    }
                  }) as any[],
                  onOkCallBack: (payload: any) => {
                    let peopleList = formatSelectPeople(payload)
                    setEditParams({
                      ...editParams,
                      practicalList: peopleList
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
              value={editParams.participantsList
                .map((item: any) => item.empName).join(',')}
              autosize={{ minRows: 2 }}
              readOnly />
          </Col>
          <Col span={2} className="extra">
            <Button
              size="small"
              disabled={loading}
              style={{ marginTop: '4px' }}
              onClick={() => {
                selectPeopleModal.show({
                  checkedUserList: editParams.participantsList
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
                      participantsList: peopleList
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
              value={editParams.noticeContent}
              onChange={(e) => setEditParams({
                ...editParams,
                noticeContent: e.target.value
              })}
              placeholder="请输入通知详细或考试内容，通知会自动发送" />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
    <selectPeopleModal.Component />
    <PracticalScoreEvalForm
      visible={templateVisible}
      templateOnly
      onCancel={() => setTemplateVisible(false)}
      params={{
        practicalTableId: editParams.practicalTableId
      }} />
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