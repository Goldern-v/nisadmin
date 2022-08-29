
import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Input, message, Spin } from 'antd'
const { Search } = Input
import { observer } from 'mobx-react-lite'
import { qualityControlRecordApi } from '../../qualityControlRecord/api/QualityControlRecordApi'

export interface Props {
  visible: boolean,
  onOk?: Function,
  onCancel?: Function,
  actArr?: any
  level: string,
  title?: string
}

export default observer(function SelectFormModal(props: Props) {
  const { visible, onOk, onCancel, title, level, actArr = [] } = props
  const [formList, setFormList] = useState([] as any)
  const [formListLoading, setFormListLoading] = useState(false)

  const [filter, setFilter] = useState('')
  const [activeArr, setActiveArr] = useState<any[]>([])

  const filterList: any[] =
    formList.filter((item: any) => item.qcName.indexOf(filter) >= 0) || []

  useEffect(() => {
    if (visible) {
      setActiveArr(actArr)
      setFormListLoading(true)
      qualityControlRecordApi.formTemplateList({
        level: Number(level),
        templateName: ''
      }).then(res => {
        setFormListLoading(false)
        if (res.data) setFormList(res.data)
      }, () => setFormListLoading(false))
    }
  }, [visible, level])

  const handleOk = () => {
    if (activeArr.length == 0) {
      message.warning('未选择表单')
      return
    }
    onOk && onOk(activeArr)
  }
  const handleClick = (item: any) => {
    let arr: any[] = JSON.parse(JSON.stringify(activeArr))
    let index = arr.findIndex((v:any) => v.qcCode === item.qcCode)
    if (index > -1) {
      arr.splice(index, 1)
    } else {
      arr.push(item)
    }
    setActiveArr(arr)
  }

  return <Modal
    width={545}
    visible={visible}
    centered
    bodyStyle={{ padding: '0' }}
    onOk={() => {
      handleOk()
    }}
    okText="确定"
    onCancel={() => onCancel && onCancel()}
    title={title || '选择表单'}>
    <Wrapper>
      <div className="filter-area">
        <Search
          allowClear
          disabled={formListLoading}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="请输入质控表单名称" />
      </div>
      <ContentArea className="content-area">
        <Spin spinning={formListLoading} style={{ minHeight: 300 }}>
          {filterList.map((item: any, idx: number) =>
            <div
              key={item.qcCode}
              className={activeArr.find((v:any) => v.qcCode == item.qcCode) ? 'qc-item active' : 'qc-item'}
              onClick={() => handleClick(item)}
              title={item.qcName}>
              <div className="icon">
                <img src={require('../../qualityControlRecord/assets/报告单@3x.png')} alt="" />
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