import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Input, message, Spin, Select } from 'antd'
const { Search } = Input
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { qualityControlRecordApi } from './../../api/QualityControlRecordApi'

const Option = Select.Option

export interface Props {
  visible: boolean,
  onOk?: Function,
  onCancel?: Function,
  level: string,
  title?: string
}

export default observer(function FormCreateByTagModal(props: Props) {
  const { visible, onOk, onCancel, title, level } = props

  const [formListLoading, setFormListLoaindg] = useState(false)
  const [activeGroupCode, setActiveGroupCode] = useState('')

  const [filter, setFilter] = useState('')
  const [activeQcCode, setActiveQcCode] = useState('')

  const [formListOrgin, setFormListOrgin] = useState([] as any[])
  const [formGroup, setFormGroup] = useState({} as any)

  const filterList = (() => {
    let formList = activeGroupCode ? (formGroup[activeGroupCode]?.list || []) : formListOrgin

    return formList.filter((item: any) => item.qcName.indexOf(filter) >= 0) || []
  })()

  useEffect(() => {
    if (visible) {
      setActiveQcCode('')
      setActiveGroupCode('')
      setFormListLoaindg(true)
      qualityControlRecordApi.formTemplateList({
        level: Number(level),
        templateName: ''
      }).then(res => {
        setFormListLoaindg(false)

        let newFormGroup = {} as any

        (res.data || []).forEach((item: any) => {
          let groupCode = item.groupCode

          if (newFormGroup[groupCode]) {
            newFormGroup[groupCode].list.push(item)
          } else {
            newFormGroup[groupCode] = {
              groupName: item.groupName,
              list: [item]
            }
          }
        })

        setFormListOrgin(res.data || [])
        setFormGroup(newFormGroup)

      }, () => setFormListLoaindg(false))
    }
  }, [visible, level])

  const handleOk = (activeQcCode: string) => {
    if (!activeQcCode) {
      message.warning('未选择表单')
      return
    }

    let target = filterList.find((item: any) => activeQcCode === item.qcCode)

    if (target) setTimeout(() => appStore
      .history
      .push(`/qualityControlRecordEdit?qcCode=${target.qcCode}`), 300)
  }

  return <Modal
    width={545}
    visible={visible}
    centered
    bodyStyle={{ padding: '0' }}
    onOk={() => {
      handleOk(activeQcCode)
      onOk && onOk()
    }}
    okText="创建"
    onCancel={() => onCancel && onCancel()}
    title={title || '新建评价表'}>
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
          onChange={(e) => setFilter(e.target.value)}
          placeholder="请输入质控表单名称" />
      </div>
      <ContentArea className="content-area">
        <Spin spinning={formListLoading} style={{ minHeight: 300 }}>
          {filterList.map((item: any) =>
            <div
              key={item.qcCode}
              className={activeQcCode == item.qcCode ? 'qc-item active' : 'qc-item'}
              onClick={() => setActiveQcCode(item.qcCode)}
              title={item.qcName}
              onDoubleClick={() => {
                onOk && onOk()
                handleOk(item.qcCode)
              }}>
              <div className="icon">
                <img src={require('./../../assets/报告单@3x.png')} alt="" />
              </div>
              <div className="qc-name">{item.qcName}</div>
            </div>
          )}
        </Spin>
      </ContentArea>
    </Wrapper>
  </Modal>
})

const ContentArea = styled.div`
  padding: 10px;
  min-height: 300px;
  overflow: hidden;
  .qc-item{
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
    .qc-name{
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
`