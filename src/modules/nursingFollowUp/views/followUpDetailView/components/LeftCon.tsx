import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Tag, Menu, Icon, Modal } from 'antd'
import { ScrollBox } from 'src/components/common'
import moment from 'src/vendors/moment'
import StopModal from '../../components/StopModal'


const maleImg = require('./../assets/male.png')
const femaleImg = require('./../assets/female.png')

const { SubMenu } = Menu


export interface Props {
  baseInfo: any,
  loading?: boolean,
  followUpList?: any[],
  selectedKey: string,
  onSelectedKeyChange: Function,
  onCloseFollowUp?: Function,
  onAddOpen?: Function,
}

export default function LeftCon(props: Props) {
  const {
    followUpList,
    selectedKey,
    onSelectedKeyChange,
    baseInfo,
    loading,
    onCloseFollowUp,
    onAddOpen
  } = props
  const [formCreateVisible, setFormCreateVisible] = useState(false)

  const [openKeys, setOpenKeys] = useState([] as string[])

  const statusCon = () => {

    return (
      <div className="status">
        {baseInfo.visitStatus === 0 && (<Tag color="green">已结束</Tag>)}
        {baseInfo.visitStatus === 1 && (<Tag color="green">进行中</Tag>)}
      </div>
    )
  }

  const handleOpenChange = (newOpenKeys: string[]) => {
    console.log(newOpenKeys)
    setOpenKeys(newOpenKeys)
  }

  const handleSelect = (payload: any) => {
    const { item, key, keyPath, selectedKeys, domEvent } = payload
    onSelectedKeyChange(key, keyPath)
  }

  const handleCloseConfirm = () => {
    setFormCreateVisible(true)
  }

  useEffect(() => {
    let defaultOpenKey = selectedKey.split('-')[0]

    if (defaultOpenKey && !openKeys.includes(defaultOpenKey))
      setOpenKeys([...openKeys, defaultOpenKey])
  }, [selectedKey])


  return <Wrapper>
    <div className="patient-info">
      <div className="img-container">
        <img src={maleImg} alt="" />
      </div>
      <div className="base-info">
        <div className="base-info-row-1">
          <div className="name">{baseInfo.patientName || '患者姓名'}</div>
          {!loading && (statusCon())}
        </div>
        <div>{baseInfo.sex === 1 ? '女' : '男'}|{baseInfo.age || '_'}岁</div>
      </div>
    </div>
    <div className="time-info">
      <div>随访周期：{baseInfo.visitPeriods || '_'}个月</div>
      <div>开始时间：{baseInfo.visitStartDate ? moment(baseInfo.visitStartDate).format('YYYY-MM-DD') : '...'}</div>
      <div>结束时间：{baseInfo.visitEndDate ? moment(baseInfo.visitEndDate).format('YYYY-MM-DD') : '...'}</div>
    </div>
    {baseInfo.visitStatus === 1 && (
      <div className="close-button">
        <Button
          type="danger"
          size="small"
          loading={loading}
          onClick={() => handleCloseConfirm()}>
          结束随访
        </Button>
      </div>
    )}
    <div className="sub-title">
      随访记录：
    </div>
    <FollowUpListCon>
      <Menu
        style={{ display: loading ? 'none' : 'block' }}
        openKeys={openKeys}
        selectedKeys={[selectedKey]}
        onSelect={handleSelect}
        onOpenChange={handleOpenChange}
        mode="inline">
        {(followUpList || []).map((followUpItem: any) => (
          <SubMenu
            key={followUpItem.formCode}
            title={
              <span className="form-title">
                {openKeys.includes(followUpItem.formCode) ? (
                  <Icon type="folder-open" theme="filled" />
                ) : (
                  <Icon type="folder" theme="filled" />
                )}
                <span title={followUpItem.formName}>
                  {followUpItem.formName}
                </span>
              </span>
            }>
            {(followUpItem.formList || []).map((formItem: any) => (
              <Menu.Item
                key={`${followUpItem.formCode}-${formItem.masterId}`}>
                <Icon type="file" />
                <span title={formItem.title}>{formItem.title}</span>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
      {(followUpList || []).length <= 0 && (
        <div className="no-result">
          <span>暂无随访表</span>
          <span style={{ position: 'relative', top: 5 }}>~</span>
        </div>
      )}
    </FollowUpListCon>
    <div className="add-button">
      <Button
        type="primary"
        onClick={() => onAddOpen && onAddOpen()}>
        添加随访表
      </Button>
    </div>
    <StopModal
      onCancel={() => setFormCreateVisible(false)}
      onOk={(reson: any) => {
        onCloseFollowUp && onCloseFollowUp(reson)
        setFormCreateVisible(false)
      }}
      visible={formCreateVisible}
    />
  </Wrapper>
}

const Wrapper = styled.div`
  width: 205px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0,0,0,0.105);
  .no-result{
    padding: 15px 12px;
    color: #888;
  }
  .patient-info{
    padding: 15px;
    display: flex;
    div.img-container{
      width: 50px;
      height: 50px;
      margin-right: 15px;
      background: #ddd;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .base-info{
      .base-info-row-1{
        margin: 5px 0;
        &>*{
          display: inline-block;
          vertical-align: middle;
        }
        .name{
          font-size: 16px;
          color: #000;
          margin-right: 10px;
        }
      }
    }
  }
  .time-info{
    padding: 15px;
    padding-top: 0;
  }
  .close-button{
    padding: 15px;
    padding-top: 0;
  }
  .sub-title{
    line-height: 36px;
    font-size: 14px;
    background-color: rgba(0,0,0,0.015);
    color: #000;
    padding: 0 15px;
    border-bottom: 1px solid rgba(0,0,0,0.045);
    border-top: 1px solid rgba(0,0,0,0.045);
  }
  .add-button{
    .ant-btn{
      width: 100%;
      border-radius: 0;
    }
  }
`

// @ts-ignore
const FollowUpListCon = styled(ScrollBox)`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  .ant-menu-inline{
    border-right: 0;
  }
  .ant-menu-submenu{
    .ant-menu-submenu-title{
      border: 1px solid #eee;
      border-right: 0;
      border-left: 0;
      border-bottom:0;
      margin:0;
      height: 30px;
      line-height: 30px;
      .form-title{
        font-size: 12px;
        .anticon{
          font-size: 16px;
        }
      }
    }
    
    &:first-of-type{
      .ant-menu-submenu-title{
        border-top:0;
      }
    }
    &:last-of-type,&.ant-menu-submenu-open{
      .ant-menu-submenu-title{
        border-bottom: 1px solid #eee;
      }
    }

    .ant-menu-item{
      font-size: 12px;
      height: 24px;
      line-height: 24px;
      .anticon{
        font-size: 14px;
      }
    }
  }

  
  
  .ant-menu-submenu-open{
    color: #00A680;
    .form-title{
      font-weight: bold;
    }
  }
`