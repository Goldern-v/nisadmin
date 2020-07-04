import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Input, message, Spin } from 'antd'
const { Search } = Input
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import { qualityControlRecordApi } from './../../api/QualityControlRecordApi'

export interface Props {
  visible: boolean,
  onOk?: Function,
  onCancel?: Function,
  level: string,
  title?: string
}

export default observer(function FormCreateModal(props: Props) {
  const { visible, onOk, onCancel, title, level } = props
  const [formList, setFormList] = useState([] as any)
  const [formListLoading, setFormListLoaindg] = useState(false)

  const [filter, setFilter] = useState('')
  const [activeIdx, setActiveIdx] = useState(-1)

  const filterList: any[] =
    formList.filter((item: any) => item.qcName.indexOf(filter) >= 0) || []

  useEffect(() => {
    setFormListLoaindg(true)
    qualityControlRecordApi.formTemplateList({
      level: Number(level),
      templateName: ''
    }).then(res => {
      setFormListLoaindg(false)
      if (res.data) setFormList(res.data)
    }, () => setFormListLoaindg(false))
  }, [level])

  useEffect(() => {
    if (visible) setActiveIdx(-1)
  }, [visible])

  const handleOk = (activeIdx: number) => {
    if (activeIdx < 0) {
      message.warning('未选择表单')
      return
    }

    let qcCode = '';

    if (formList[activeIdx]) qcCode = formList[activeIdx].qcCode

    setTimeout(() => appStore
      .history
      .push(`/qualityControlRecordEdit?qcCode=${qcCode}`), 300)
  }

  return <Modal
    width={545}
    visible={visible}
    centered
    bodyStyle={{ padding: '0' }}
    onOk={() => {
      handleOk(activeIdx)
      onOk && onOk()
    }}
    okText="创建"
    onCancel={() => onCancel && onCancel()}
    title={title || '新建评价表'}>
    <Wrapper>
      <div className="filter-area">
        <Search
          allowClear
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="请输入质控表单名称" />
      </div>
      <ContentArea className="content-area">
        <Spin spinning={formListLoading} style={{ minHeight: 300 }}>
          {filterList.map((item: any, idx: number) =>
            <div
              key={idx}
              className={activeIdx == idx ? 'qc-item active' : 'qc-item'}
              onClick={() => setActiveIdx(idx)}
              title={item.qcName}
              onDoubleClick={() => {
                onOk && onOk()
                handleOk(idx)
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