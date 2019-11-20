import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, Row, Col, Select, Drawer, message, Icon } from 'antd'
import { numToChinese } from 'src/utils/number/numToChinese'
import { ScrollBox } from 'src/components/common'
import { authStore } from 'src/stores'
import { nursingWorkPlainService } from './../api/NursingWorkPlainService'

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

  const [createText, setCreateText] = useState('')

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
    let content = [editQuery.content, `${template.itemName};`].join('')

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

  const getDict = () => {
    nursingWorkPlainService.getDict({
      wardCode: authStore.selectedDeptCode,
      dictCode: 'ward_qc_ward_schedule_content'
    }).then(res => {
      if (res.data) setTemlateList(res.data)
    })
  }

  const handleAdd = () => {
    if (!createText.trim()) {
      message.warning('新增内容不能为空')
      return
    }

    setLoading(true)
    nursingWorkPlainService
      .saveOrUpdateDict({
        "dictCode": "ward_qc_ward_schedule_content",
        "wardCode": authStore.selectedDeptCode,
        "itemCode": "",
        "groupCode": "qc",
        "itemName": createText.trim(),
        "expand1": "",
        "expand2": "",
        "indexNo": templateList.length + 1,
        // "oldItemCode": "",
      })
      .then(res => {
        setLoading(false)
        message.success('添加成功')
        setCreateText('')
        getDict()
      }, () => setLoading(false))
  }

  const handleEdit = (item: any) => {
    let editText = item.itemName || ''

    let content = <div>
      <Input defaultValue={editText} onChange={(e) => editText = e.target.value} />
    </div>

    Modal.confirm({
      title: '修改内容模板',
      content,
      onOk: () => {
        if (editText.trim() == '') {
          message.warning('修改内容不能为空')
          return
        }
        setLoading(true)
        nursingWorkPlainService.saveOrUpdateDict({
          ...item,
          "itemName": editText.trim(),
          "oldItemCode": item.itemCode,
        })
          .then(res => {
            setLoading(false)
            message.success('修改成功')
            getDict()
          }, () => setLoading(false))
      }
    })
  }

  const handleDelete = (item: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该内容模板?',
      onOk: () => {
        setLoading(true)
        nursingWorkPlainService.deleteDict(item)
          .then(res => {
            setLoading(false)
            message.success('删除成功')
            getDict()
          }, () => setLoading(false))
      }
    })
  }

  useEffect(() => {
    if (visible) setEditQuery({ ...query })
  }, [visible])

  useEffect(() => {
    getDict()
  }, [])


  return <React.Fragment>
    <Modal
      width={720}
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
              <span className="name">{item.itemName}</span>
              <span className="operate">
                <Icon type="edit" className="edit" onClick={(e) => {
                  e.stopPropagation()
                  handleEdit(item)
                }} />
                <Icon type="close" className="delete" onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(item)
                }} />
              </span>
            </div>)}
        </ScrollBody>
        <CreateCon>
          <Input
            className="create-ipt"
            value={createText}
            disabled={loading}
            onChange={(e: any) => setCreateText(e.target.value)} />
          <Button type="primary" onClick={handleAdd} disabled={loading}>添加</Button>
        </CreateCon>
      </TemplateSelectCon>
    </Drawer>
  </React.Fragment >
})

const ScrollBody = styled(ScrollBox)`
  position: absolute;
  left: 0;
  top: 55px;
  bottom: 45px;
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
    display: flex;
    .name{
      flex: 1;
      margin-right: 5px;
    }
    .operate{
      .edit{
        display: none;
        margin-right: 5px;
        font-size: 14px;
        cursor: pointer;
        :hover{
          color:#1db38b;
        }
      }
      .delete{
        display: none;
        font-size: 14px;
        cursor: pointer;
        :hover{
          color: red;
        }
      }
    }
    :hover{
      background: #ddd;
      .edit,.delete{
        display: inline;
      }
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

const CreateCon = styled.div`
  position: absolute;
  left: 0;
  height: 45px;
  border-top: 1px solid #ddd;
  bottom: 0;
  width: 100%;
  padding: 5px 8px;
  &>*{
    vertical-align: middle;
  }
  .create-ipt{
    width: 170px;
    margin-right: 5px;
  }
`

const Wrapper = styled.div`
  width: 90%;
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