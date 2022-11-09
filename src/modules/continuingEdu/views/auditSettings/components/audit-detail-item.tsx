import { Button, Icon } from 'antd'
import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import { auditSettingsModel as model } from '../model'

export interface Props {
  data: any
  index: number
}
export default observer(function AuditDetailItem(props: Props) {
  const { data, index } = props

  const openSelectRoleModal = (index: number) => {
    model.handleVisible(true, index, 'selectRoleVisible') 
  }
  const openNodeModal = (index: number) => {
    model.handleVisible(true, index)
  }

  return (
    <Wrapper>
      <p className={`item-title${index > 0 ? ' has-line' : ''}`}>
        <span>{data.nodeName}</span>
      </p>
      <div className='item-content'>
        {model.isEdit && data.settingList.length == 0 &&
          <div className='item-content-btn-0'>
            <Button type='primary' onClick={() => openSelectRoleModal(index)}>添加审核人员</Button>
            <Button type='primary' onClick={() => openNodeModal(index)}>配置驳回节点</Button>
          </div>}
        {model.isEdit && data.settingList.length > 0 &&
          <div className='item-content-btn'>
            <div onClick={() => openSelectRoleModal(index)}>人员编辑</div>
            <div onClick={() => openNodeModal(index)}>驳回配置</div>
          </div>}

        <div className='item-content-detail'>
          {
            data.settingList.map((v1: any) => (
              <div className='item-content-role' key={v1.settingValue}>
                <div>{v1.settingValueName}</div>
                <div>工号: {v1.settingValue}</div>
                {model.isEdit && <Icon onClick={() => model.delRole(v1, index)} type='minus-circle' />}
              </div>
            ))
          }
        </div>
      </div>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  .item-title {
    position: relative;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: center;
    &.has-line {
      height: 80px;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
        z-index: 2;
      }
      ::after {
        content: '';
        position: absolute;
        left: 50%;
        height: 100%;
        border-left: 1px solid #000;
        z-index: 1;
      }
    }
  }
  .item-content {
    margin: 0 auto;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 5px;
    width: 80%;
    height: 160px;
    overflow-y: auto;

    .item-content-btn-0 {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      .ant-btn + .ant-btn {
        margin-left: 5px;
      }
    }
    .item-content-btn {
      display: flex;
      justify-content: flex-end;
      color: ${(p) => p.theme.$mtc};
      div {
        cursor: pointer;
      }
      div + div {
        margin-left: 5px;
      }
    }
    .item-content-detail {
      display: flex;
      flex-wrap: wrap;
    }
    .item-content-role {
      padding: 8px;
      position: relative;
      align-items: flex-start;
      i.anticon {
        position: absolute;
        right: -2px;
        top: 0;
        font-size: 14px;
        color: #f00;
      }
    }
  }
`