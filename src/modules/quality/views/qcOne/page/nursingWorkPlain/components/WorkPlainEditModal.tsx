import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, Row, Col, Select, Drawer, message } from 'antd'
import { numToChinese } from 'src/utils/number/numToChinese'
import { ScrollBox } from 'src/components/common'
import { nursingWorkPlainService } from './../api/NursingWorkPlainService'

import { authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'

const Option = Select.Option

export interface Props {
  title?: string,
  onOk?: Function,
  onCancel?: Function,
  visible: boolean,
  query: any
}

export default observer(function WorkPlainEditModal(props: Props) {

  const { title, visible, query, onCancel, onOk } = props

  const [templateVisible, setTemplateVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const [templateList, setTemlateList] = useState([] as any)

  const [editQuery, setEditQuery] = useState({
    year: '',
    month: '',
    type: '1',
    indexInType: '',
    wardName: '',
    wardCode: '',
    content: '',
  } as any)

  const wardName = editQuery.wardName || authStore.selectedDeptName

  const wardCode = editQuery.wardCode || authStore.selectedDeptCode

  const monthList = (() => {
    let currentMonth = 12;
    let monthArr = []
    while (currentMonth--) {
      monthArr.push(currentMonth + 1)
    }
    return monthArr
  })()

  const weekList = (() => {
    let currentWeek = 5;
    let weekArr = []
    while (currentWeek--) {
      weekArr.push(5 - currentWeek)
    }
    return weekArr
  })()

  const addContent = (template: any) => {
    let content = [editQuery.content, `${template.name};`].join('')

    setEditQuery({ ...editQuery, content })
  }

  const handleSave = () => {
    let params = {
      ...editQuery,
      wardName,
      wardCode,
    }

    if (params.type == '2' && !params.indexInType) {
      message.error('周数未填写')
      return
    }

    if (!params.content) {
      message.error('内容未填写')
      return
    }

    setLoading(true)

    nursingWorkPlainService
      .saveOrUpdate(params)
      .then(res => {
        setLoading(false)
        message.success('保存成功')
        onOk && onOk()
      }, () => setLoading(false))
    // console.log(params)
  }

  useEffect(() => {
    if (visible) setEditQuery({ ...query })

  }, [visible])

  useEffect(() => {
    nursingWorkPlainService.getDict({
      groupCode: 'qc',
      dictCode: 'qc_work_schedule_content'
    }).then(res => {
      if (res.data) setTemlateList(res.data)
    })
  }, [])


  return <React.Fragment>
    <Modal
      confirmLoading={loading}
      visible={visible}
      centered
      onOk={handleSave}
      onCancel={() => onCancel && onCancel()}
      title={title || "添加计划"}>
      <Wrapper>
        <Row>
          <Col span={4}>科室:</Col>
          <Col span={18}>
            <Input disabled value={wardName} />
          </Col>
        </Row>
        <Row>
          <Col span={4}>月份:</Col>
          <Col span={18}>
            <Select
              value={editQuery.month}
              onChange={(month: string) => setEditQuery({ ...editQuery, month })}
              className="month-select">
              {monthList.map((month: number) => <Option value={`${month}`} key={month}>{month}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={4}>类型:</Col>
          <Col span={18}>
            <Select
              value={editQuery.type}
              onChange={(type: string) => {
                let newEditQuery = { ...editQuery, type }
                if (type == '1') newEditQuery.indexInType = ''
                setEditQuery(newEditQuery)
              }}>
              <Option value="1">月计划</Option>
              <Option value="2">周计划</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={4}>周数:</Col>
          <Col span={18}>
            <Select
              disabled={editQuery.type == '1'}
              value={editQuery.indexInType}
              onChange={(indexInType: string) => setEditQuery({ ...editQuery, indexInType })}>
              {weekList.map((idx: number) =>
                <Option
                  key={idx}
                  value={`${idx}`}>
                  {`第${numToChinese(idx)}周`}
                </Option>
              )}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={4}>内容:</Col>
          <Col span={18}>
            <Input.TextArea
              value={editQuery.content}
              onChange={(e: any) => setEditQuery({ ...editQuery, content: e.target.value })} rows={5} />
          </Col>
          <Col span={1}>
            <Button
              style={{ color: 'blue' }}
              onClick={() => setTemplateVisible(true)}>
              模板
            </Button>
          </Col>
        </Row>
      </Wrapper>
    </Modal>
    <Drawer
      onClose={() => setTemplateVisible(false)}
      visible={templateVisible}
      title="内容模板">
      <TemplateSelectCon>
        <ScrollBody className="body">
          {templateList.map((item: any, idx: number) =>
            <div
              className="template-item"
              key={idx}
              onClick={() => addContent(item)}>
              {item.name}
            </div>)}
        </ScrollBody>
        {/* <div className="footer">
          <Button>确定</Button>
        </div> */}
      </TemplateSelectCon>
    </Drawer>
  </React.Fragment >
})

const ScrollBody = styled(ScrollBox)`
  position: absolute;
  left: 0;
  top: 55px;
  /* bottom: 45px; */
  bottom: 0;
  width: 100%;
  padding: 20px;
`

const TemplateSelectCon = styled.div`
  .template-item{
    background: #fff;
    transition: all .3s;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all .3s;
    :hover{
      background: #ddd;
    }
  }
  /* .footer{
    position: absolute;
    height: 45px;
    border-top: 1px solid #ddd;
    left: 0;
    bottom: 0;
  } */
`

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  .ant-col {
    line-height: 32px;
    text-align: right;
    padding-right: 5px;
    margin-bottom: 10px;
    > span {
      width: 100%;
    }
    .ant-radio-group {
      float: left;
    }
    .ant-select {
      width: 100%;
    }
  }
`