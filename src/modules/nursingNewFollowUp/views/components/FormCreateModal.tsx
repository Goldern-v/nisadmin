import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Input, message, Spin } from 'antd'
const { Search } = Input
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import DiseaseManageServices from '../diseaseManage/services/DiseaseManageServices'
const api = new DiseaseManageServices();
export interface Props {
  visible: boolean,
  onOk?: Function,
  onCancel?: Function,
  title?: string,
  formListNow?: any,
}
export default observer(function FormCreateModal(props: Props) {
  const { visible, onOk, onCancel, title, formListNow } = props
  const [formList, setFormList] = useState([] as any)
  const [formListLoading, setFormListLoaindg] = useState(false)
  const [filter, setFilter] = useState('')
  const [activeIdx, setActiveIdx] = useState([] as any)
  const [changeFormList, setChangeFormList] = useState([] as any)
  const filterList: any[] =
    formList.filter((item: any) => item.formName.indexOf(filter) >= 0) || []
  useEffect(() => {
    if (visible) {
      setActiveIdx([])
      setChangeFormList([])
      setFormListLoaindg(true)
      api.getAllList({
        diseaseTypeId: ''
      }).then(res => {
        setFormListLoaindg(false)
        if (res.data) setFormList(res.data)
      }, () => setFormListLoaindg(false))
    }
  }, [visible])
  const onChange = (item: any, idx: number) => {
    let index = activeIdx.indexOf(idx)
    let formIndex = changeFormList.indexOf(item)
    if(index != -1) {
      activeIdx.splice(index,1)
      setActiveIdx([...activeIdx])
    }else {
      setActiveIdx([...activeIdx,idx])
    }
    if(formIndex != -1) {
      changeFormList.splice(formIndex,1)
      setChangeFormList([...changeFormList])
    }else {
      setChangeFormList([...changeFormList,item])
    }
  }
  const handleOk = (activeIdx: number) => {
  }

  return <Modal
    width={545}
    visible={visible}
    mask={false}
    centered
    bodyStyle={{ padding: '0' }}
    onOk={() => {
      handleOk(activeIdx)
      onOk && onOk(changeFormList)
    }}
    okText="确认"
    onCancel={() => onCancel && onCancel()}
    afterClose={() => setChangeFormList([])}
    title={'添加随访问卷'}>
    <Wrapper>
      <div className="filter-area">
        <Search
          allowClear
          disabled={formListLoading}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="请输入随访问卷名称" />
      </div>
      <ContentArea className="content-area">
        <Spin spinning={formListLoading} style={{ minHeight: 300 }}>
          {filterList.map((item: any, idx: number) =>
            <div
              key={item.formCode}
              className={activeIdx.indexOf(idx) != -1  ? 'qc-item active' : 'qc-item'}
              onClick={() => onChange(item,idx)}
              title={item.formName}
              >
              <div className="icon">
                <img src={require('../../assets/报告单@3x.png')} alt="" />
              </div>
              <div className="qc-name">{item.formName}</div>
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