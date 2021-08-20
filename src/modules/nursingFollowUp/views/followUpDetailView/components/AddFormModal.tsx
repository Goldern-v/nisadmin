import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, message, Modal, Select, Input, Spin } from 'antd'
const { Search } = Input
import { followUpDetailService } from '../services/FollowUpDetailService'

const Option = Select.Option

export interface Props {
  visible?: boolean,
  onOk?: Function,
  onCancel?: Function,
  patientId?: string
}

export default function AddFormModal(props: Props) {
  const { visible, onOk, onCancel, patientId } = props

  const [formListLoading, setFormListLoaindg] = useState(false)
  const [activeGroupCode, setActiveGroupCode] = useState('')

  const [filter, setFilter] = useState('')
  const [activeFormCode, setActiveFormCode] = useState('')

  const [formListOrgin, setFormListOrgin] = useState([] as any[])
  const [formGroup, setFormGroup] = useState({} as any)

  const filterList = (() => {
    let formList = activeGroupCode ? (formGroup[activeGroupCode]?.list || []) : formListOrgin

    return formList.filter((item: any) => item.formName.indexOf(filter) >= 0) || []
  })()

  const showFilterList = !!(activeGroupCode || filter)

  const initSelections = () => {
    setActiveFormCode('')
    setActiveGroupCode('')
    setFormListLoaindg(true)
    followUpDetailService
      .getByDiseaseTypeListByPatientId(patientId || '')
      .then(res => {
        setFormListLoaindg(false)

        let newFormGroup = {} as any
        let newFormOrigin = [] as any[]

        (res.data || []).forEach((item: any) => {
          let groupCode = item.diseaseTypeId

          let itemFormList = [...item.visitTemplateList || []]
            .map((template: any) => ({
              ...template,
              diseaseTypeId: groupCode
            }))

          newFormGroup[groupCode] = {
            groupName: item.diseaseTypeName,
            list: itemFormList
          }
          newFormOrigin = newFormOrigin.concat(itemFormList)
        })

        console.log(newFormGroup)
        console.log(newFormOrigin)

        setFormListOrgin(newFormOrigin)
        setFormGroup(newFormGroup)

      }, () => setFormListLoaindg(false))
  }

  const handleOk = (activeFormCode: string) => {
    if (!activeFormCode) {
      message.warning('未选择表单')
      return
    }

    let target = filterList.find((item: any) => activeFormCode === item.formCode)

    onOk && onOk(target)
  }

  const RenderFormItem = (item: any) => {
    return (<div
      key={item.formCode}
      className={activeFormCode == item.formCode ? 'form-item active' : 'form-item'}
      onClick={() => setActiveFormCode(item.formCode)}
      title={item.formName}
      onDoubleClick={() => handleOk(item.formCode)}>
      <div className="icon">
        <img src={require('./../assets/报告单@3x.png')} alt="" />
      </div>
      <div className="form-name">{item.formName}</div>
    </div>)
  }

  useEffect(() => {
    if (visible) {
      initSelections()
    }
  }, [visible])

  return <Modal
    width={545}
    bodyStyle={{ padding: '0' }}
    centered
    title="添加随访表"
    visible={visible}
    okText="添加"
    onOk={() => handleOk(activeFormCode)}
    onCancel={() => onCancel && onCancel()}>
    <Wrapper>
      <div className="filter-area">
        <Select
          style={{ width: 180, marginRight: 15 }}
          filterOption={(input: any, option: any) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          value={activeGroupCode}
          onChange={(groupCode: string) =>
            setActiveGroupCode(groupCode)}>
          <Option value="">全部</Option>
          {Object.keys(formGroup).map((key: string) => (
            <Option value={key} key={key}>{formGroup[key].groupName}</Option>
          ))}
        </Select>
        <Search
          allowClear
          disabled={formListLoading}
          value={filter}
          onChange={(e: any) => setFilter(e.target.value)}
          placeholder="请输入随访表单名称" />
      </div>
      <ContentArea className="content-area">
        <Spin spinning={formListLoading} style={{ minHeight: 300 }}>
          {showFilterList && filterList.map((item: any) => RenderFormItem(item))}
          {!showFilterList && Object.keys(formGroup).map((groupCode: string) => {
            let groupItem = formGroup[groupCode]
            let groupList = groupItem.list || []
            return (<React.Fragment key={groupCode}>
              <div className="tab-name">{groupItem.groupName}</div>
              {groupList.map((item: any) => RenderFormItem(item))}
            </React.Fragment>)
          })}
        </Spin>
      </ContentArea>
    </Wrapper>
  </Modal>
}

const ContentArea = styled.div`
  padding: 10px;
  min-height: 300px;
  overflow: hidden;
  .form-item{
    width: 238px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #fff;
    cursor: pointer;
    display: flex;
    float: left;
    padding: 5px;
    transition: all .3s;

    .icon{
      width: 40px;
      margin-right: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .form-name{
      flex: 1;
      line-height: 40px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    &.active,:hover{
      background: rgba(0,166,128,0.05);
      border-color: #1db38b;
      box-shadow: 0 0 0 2px rgba(0, 166, 128, 0.2);
    }
  }
`

const Wrapper = styled.div`
  padding-top: 54px;
  .filter-area{
    padding: 10px;
    border-bottom: 1px solid #ddd;
    position: absolute;
    top: 55px;
    left: 0;
    width: 100%;
    background: #fff;
    z-index:1;
    &>*{
      width: 200px;
      margin-left: 10px;
    }
  }
  .tab-name{
    width: 100%;
    height: 20px;
    float: left;
    color: #000;
    border-left: 5px solid #00A680;
    line-height: 20px;
    padding: 0 15px;
    font-size: 14px;
    margin: 5px 10px;
  }
`