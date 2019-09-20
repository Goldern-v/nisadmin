import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Tabs, Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import IndexPannel from './../components/IndexPannel'
import FavorPannel from './../components/FavorPannel'
import RepairPannel from './../components/RepairPannel'
import AuditPannel from './../components/AuditPannel'

const { TabPane } = Tabs;

export interface Props { }

export default observer(function NursingRulesNewDetail() {
  let ruleName = '书籍名称'

  let tabsCfg = [
    {
      name: '目录',
      component: <IndexPannel />
    },
    {
      name: '我的收藏',
      component: <FavorPannel />
    },
    {
      name: '修订记录',
      component: <RepairPannel />
    },
    {
      name: '待审核章节',
      component: <AuditPannel />
    }
  ]

  const TabPannels = () => {
    return tabsCfg.map((item: any, idx: number) => {
      return <TabPane tab={item.name} key={idx.toString()}>{<div className="tab-content">{item.component}</div>}</TabPane>
    })
  }

  const handleTabChange = (info: any) => {
    console.log(info)
  }

  const handleEnable = (enable: boolean) => {
    let content = "确定把该书籍设为无效吗？设为无效后将不能再查看该书籍内容"

    if (enable) content = "确定启用该书籍吗"
    Modal.confirm({
      title: "提示",
      content,
      centered: true,
      onOk: () => {
        console.log('enable')
      }
    })
  }

  const handleDelete = () => {
    Modal.confirm({
      title: "提示",
      content: "确定删除该书籍吗？删除后数据无法恢复",
      centered: true,
      onOk: () => {
        console.log('delete')
      }
    })
  }

  return <Wrapper>
    <div className="topbar">
      <NavCon>
        <Link to="/nursingRulesNew">护理制度</Link>
        <span> > </span>
        <span>{ruleName}</span>
      </NavCon>
    </div>
    <div className="main-contain">
      <div className="top-pannel">
        <div className="btn-group">
          <Button>编辑</Button>
          <Button>修订</Button>
          <Button type="danger" ghost onClick={() => handleEnable(false)}>设为无效</Button>
          <Button type="danger" ghost onClick={() => handleEnable(true)} style={{ display: 'none' }}>设为无效</Button>
          <Button type="danger" ghost onClick={handleDelete}>删除</Button>
          <Button>返回</Button>
        </div>
        <div className="base-info">
          <div className="left">
            <img src="" alt="" className="book-img" />
          </div>
          <div className="right">
            <div className="main-title">书籍名称</div>
            <div className="update-info">
              <span className="icon"></span>
              <span>上传:</span>
              <span>2019-08-14</span>
              <span>王大锤</span>
            </div>
            <div className="audit-info">
              <span className="icon"></span>
              <span>审核:</span>
              <span>2019-08-14</span>
              <span>王大锤</span>
            </div>
            <div className="desc">
              这是此书简介;这是此书简介;这是此书简介;这是此书简介;这是此书简介;这是此书简介;这是此书简介;
              这是此书简介;这是此书简介;这是此书简介;这是此书简介;这是此书简介;这是此书简介;这是此书简介;
              这是此书简介;这是此书简介;这是此书简介;这是此书简介;这是此书简介;这是此书简介;这是此书简介;
            </div>
          </div>
        </div>
      </div>
      <div className="tab-pannels">
        <Tabs defaultActiveKey="3" onChange={handleTabChange}>{TabPannels()}</Tabs>
      </div>
    </div>
  </Wrapper>
})

const scrollBarStyle = `
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.2);
  background: rgba(0,0,0,0.1);
}
::-webkit-scrollbar-track {
  background-color: #ddd;
}
`
const Wrapper = styled.div`
  background:#fff;
  width: 100%;
  height:100%;
  overflow: hidden;
  .topbar{
    padding: 10px;
  }
  .main-contain{
    position: relative;
    .btn-group{
      position: absolute;
      top:0;
      right:10px;

      .ant-btn{
        margin-left: 8px;
      }
    }

    .base-info{
      padding: 0 10px;
      display: flex;
      height: 180px;
      .left{
        width: 140px;
        height: 180px;
        background: #ddd;
        margin-right: 10px;
      }
      .right{
        flex:1;
        &>div{
          margin-bottom: 5px;
        }
        .main-title{
          font-size: 24px;
          color: #000;
          font-weight: bold;
        }
        .update-info,.audit-info{
          color: #999;
        }
        .desc{
          height: 90px;
          margin: 0;
          overflow-y: auto;
          ${scrollBarStyle}
        }
      }
    }
    .tab-pannels{
      .ant-tabs-nav-scroll{
        margin-left: 10px;
      }
      .tab-content{
        overflow-y: auto;
        ${scrollBarStyle}
        position: fixed;
        background: #fff;
        top: 317px;
        bottom: 0;
        right:0;
        left: 0;
      }
    }
  }
`

const NavCon = styled.div`
  a{
    color: #666;
    :hover{
      color: #333;
    }
  }
  span{
    color: #888
  }
  margin-bottom: 5px;
`