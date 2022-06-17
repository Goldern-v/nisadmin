import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, Input, Row, Col, Select, Drawer, message, Icon } from 'antd'
import { numToChinese } from 'src/utils/number/numToChinese'
import { ScrollBox } from 'src/components/common'
import { authStore } from 'src/stores'
import { nursingWorkPlainService } from './../api/NursingWorkPlainService'
import MultiFileUploader, { FileItem } from 'src/components/MultiFileUploader'
import YearPicker from 'src/components/YearPicker'

import { observer } from 'mobx-react-lite'
import moment from 'moment'

const Option = Select.Option

export interface Props {
  canEdit?: boolean,
  title?: string,
  onOk?: Function,
  onCancel?: Function,
  visible: boolean,
  query: any
}

export default observer(function WorkPlainEditModal(props: Props) {

  const { title, visible, query, onCancel, onOk, canEdit } = props

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
    attachList: [] as FileItem[]
  } as any)

  const wardName = editQuery.wardName || authStore.selectedDeptName

  const wardCode = editQuery.wardCode || authStore.selectedDeptCode

  const exGruop =['重点专科护理安全管理组','护理管理评价体系考核组','护理文书质量考评小组','预防管路脱出/感染质控组','预防VTE护理质控组','安全管理质控组','病房管理质控','关键环节质控组','护士素质质控组']
  const exForm =['糖尿病知识掌握率查检表','普通病房评价表','介入科评价表','护士素质检查表','儿保科护理质量考核标准','护理零容忍检查表','护理人员分级护理制度检查表','护理查对制度检查表','护理人员服务规范考核标准' ,'优质护理服务质量评价标准','药品管理检查表','门诊护理核心指标检查表','培训管理核心指标检查表']

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
      attachList: editQuery.attachList.map((item: FileItem) => {
        return { attachId: item.id }
      }),
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

    if (params.type == '3') {
      params.indexInType = '1'
      params.month = '1'
    }

    if (!query.content) params.onlySave = true

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
      if (res.data) setTemlateList(res.data.list)
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
    if (visible) {
      setEditQuery({
        ...query, attachList: (query.attachList || []).map((item: any) => {
          return {
            ...item,
            id: item.attachId
          } as FileItem
        })
      })
      getDict()
    }
  }, [visible])

  useEffect(() => {

  }, [])


  return <React.Fragment>
    <Modal
      width={1000}
      confirmLoading={loading}
      visible={visible}
      footer={canEdit ? <React.Fragment>
        <Button onClick={() => onCancel && onCancel()}>取消</Button>
        <Button type="primary" icon={loading ? 'loading' : ''} onClick={handleSave}>确认</Button>
      </React.Fragment> : null}
      centered
      onOk={handleSave}
      onCancel={() => onCancel && onCancel()}
      title={title || "添加计划"}>
      <Wrapper>
        <Row>
          <Col span={2}>科室:</Col>
          <Col span={20}>
            <Input readOnly={true} disabled={canEdit} value={wardName} />
          </Col>
        </Row>
        <Row>
          <Col span={2}>类型:</Col>
          <Col span={20}>
            <Select
              value={editQuery.type}
              className={canEdit ? '' : 'read-only'}
              disabled={!canEdit}
              onChange={(type: string) => {
                let newEditQuery = { ...editQuery, type }
                if (type == '1') newEditQuery.indexInType = ''
                if (type == '3') {
                  newEditQuery.indexInType = ''
                  newEditQuery.month = ''
                } else {
                  if (!newEditQuery.month) newEditQuery.month = moment().format('M')
                }
                setEditQuery(newEditQuery)
              }}>
              <Option value="3">年计划</Option>
              <Option value="1">月计划</Option>
              <Option value="2">周计划</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={2}>年份:</Col>
          <Col span={20}>
            <YearPicker
              allowClear={false}
              className={canEdit ? '' : 'read-only'}
              disabled={!canEdit}
              value={editQuery.year ? moment(`${editQuery.year}-01-01`) : null}
              onChange={(_moment: any) =>
                setEditQuery({ ...editQuery, year: _moment.format('YYYY') })}
            />
          </Col>
        </Row>
        <Row>
          <Col span={2}>月份:</Col>
          <Col span={20}>
            <Select
              value={editQuery.month}
              className={canEdit ? 'month-select' : ' month-select read-only'}
              disabled={editQuery.type == '3' || !canEdit}
              onChange={(month: string) => setEditQuery({ ...editQuery, month })}>
              {monthList.map((month: number) => <Option value={`${month}`} key={month}>{month}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={2}>周数:</Col>
          <Col span={20}>
            <Select
              className={canEdit ? '' : 'read-only'}
              disabled={editQuery.type != '2' || !canEdit}
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
        {/* 测试使用 */}
        {/* <Row>
          <Col span={2}>检查小组:</Col>
          <Col span={20}>
          <Select>
            {exGruop.map(item=>{
              return <Option value={item}>{item}</Option>
            })}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={2}>检查表单:</Col>
          <Col span={20}>
          <Select>
            {exForm.map(item=>{
              return <Option value={item}>{item}</Option>
            })}
            </Select>
          </Col>
        </Row> */}
        {/* 测试使用 */}
        <Row>
          <Col span={2}>内容:</Col>
          <Col span={20}>
            <Input.TextArea
              readOnly={!canEdit}
              value={editQuery.content}
              onChange={(e: any) => setEditQuery({ ...editQuery, content: e.target.value })} rows={10} />
          </Col>
          <Col span={1}>
            {canEdit && <Button
              style={{ color: 'blue' }}
              onClick={() => setTemplateVisible(true)}>
              模板
            </Button>}
          </Col>
        </Row>
        <Row>
          <Col span={2}>附件:</Col>
          <Col span={20}>
            <UploadWrapper>
              <MultiFileUploader
                readOnly={!canEdit}
                type='qc_pvqqc_wks'
                data={editQuery.attachList}
                onChange={(attachList: FileItem[]) => setEditQuery({ ...editQuery, attachList })} />
            </UploadWrapper>
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
  .ant-select-disabled.read-only .ant-select-selection{
    background: #fff!important;
  }
  .read-only.ant-calendar-picker{
    input{
      background:#fff!important;
    }
  }
`

const UploadWrapper = styled.div`
  &>div{
    float: left;
  }
`