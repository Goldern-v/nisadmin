import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import { appStore } from 'src/stores'
import qs from 'qs'

import SorceAppendModal from './../../components/SorceAppendModal'
import BaseInfo from './BaseInfo'
import TableView from './TableView'

export interface Props extends RouteComponentProps { }

const Routes_Config = [
  {
    name: '基本信息',
    title: '基本信息',
    component: BaseInfo
  },
  {
    name: '学分记录',
    title: '学分记录',
    component: TableView
  },
  {
    name: '积分记录',
    title: '积分记录',
    component: TableView
  },
  {
    name: '培训记录',
    title: '培训记录',
    component: TableView
  },
  {
    name: '练习记录',
    title: '练习记录',
    component: TableView
  },
  {
    name: '考试记录',
    title: '考试记录',
    component: TableView
  },
  {
    name: '视频学习',
    title: '视频学习',
    component: TableView
  }
]

export default observer(function Main(props: any) {
  const [sorceAppendVisible, setSorceAppendVisible] = useState(false);
  const [data, setData] = useState({
    empCode: 12312,
    empName: '王大锤',
    nurseHierarchy: 'N3',
    newTitle: '主管护师',
    deptCode: '',
    deptName: '神经内科单元',
    status: '在职'
  })
  // console.log(appStore.match.params.pannelName);

  const targetComponent = () => {
    for (let i = 0; i < Routes_Config.length; i++) {
      if (appStore.match.params.pannelName == Routes_Config[i].name) return Routes_Config[i]
    }
    return Routes_Config[0];
  }
  const handleRouteChange = (name: string) => {
    let search: any = appStore.location.search;
    appStore.history.replace(`/continuingEduEmpDetail/${name}${search}`)
  }

  const handleSourceAppend = () => {
    setSorceAppendVisible(false);
    let url = appStore.match.url;
    let search: any = appStore.location.search;
    let query = {} as any;

    if (search) query = qs.parse(search.replace('?', ''));

    if (query.sourceChange >= 0)
      query.sourceChange = Number(query.sourceChange) + 1;
    else
      query.sourceChange = 1

    appStore.history.replace(`${url}?${qs.stringify(query)}`);
  }

  const TargetRoute = targetComponent();

  return <Wrapper>
    <div className="topbar">
      <div className="nav">
        <Link to="/continuingEdu">继续教育</Link>
        <span> / </span>
        <Link to="/continuingEdu/人员管理">人员管理</Link>
        <span> / {data.empName}</span>
      </div>
      <div className="emp-info">
        <span className="emp-img">
          <img src="" alt="" />
        </span>
        <span>
          <span className="emp-name">{data.empName}</span>
          <br />
          <span className="emp-sub">{data.newTitle} | {data.nurseHierarchy} | {data.deptName} | {data.status}</span>
        </span>
      </div>
      <div className="btn-group">
        <Button onClick={() => setSorceAppendVisible(true)}>添加学分</Button>
        <Button>返回</Button>
      </div>
    </div>
    <div className="main-contain">
      <div className="left-menu">
        {Routes_Config.map((item: any) => {
          return <div
            key={item.name}
            className={TargetRoute.name == item.name ? 'active menu-item' : 'menu-item'}
            onClick={() => handleRouteChange(item.name)}>
            {item.title}
          </div>
        })}
      </div>
      <div className="route-view">
        <TargetRoute.component />
      </div>
    </div>
    <SorceAppendModal
      visible={sorceAppendVisible}
      onOk={handleSourceAppend}
      onCancel={() => setSorceAppendVisible(false)} />
  </Wrapper>
})
const defaultImg = require('./../../assets/护士默认头像.png');
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 135px;
  .topbar{
    padding: 10px 15px;
    margin-top: -135px;
    height: 135px;
    background: url(/static/media/顶部背景.7f60fe00.png);
    background-size: cover;
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.1);
    border-bottom: 1px solid #dbe0e4;
    .nav{
      margin-bottom: 15px;
      a{
        color: #666;
      }
    }
    .emp-info{
      display: inline-block;
      >span{
        vertical-align: middle;
        display: inline-block;
      }
      .emp-img{
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: #ddd;
        margin-right: 10px;
        background: url(${defaultImg});
        overflow: hidden;
        img{
          width: 74px;
          height: 74px;
          position: relative;
          top: -1px;
          left: -1px;
        }
      }
      .emp-name{
        font-size: 16px;
        margin-bottom: 4px;
        font-weight: bold;
        display: inline-block;
      }
      .emp-sub{
        font-size:12px;
      }
    }
    .btn-group{
      float: right;
      margin-top: 20px;
      .ant-btn{
        margin-left: 10px;
        :first-of-type{
          margin-left: 0;
        }
      }
    }
  }

  .main-contain{
    width: 100%;
    height: 100%;
    height: calc(100vh - 185px);
    .left-menu{
      float: left;
      box-shadow: 3px 7px 7px 0px rgba(0,0,0,0.1);
      border-right: 1px solid rgba(228,228,228,1);
      width: 160px;
      height: 100%;
      overflow-y: auto;
      background: url(/static/media/侧边背景.5cb403af.png);
      background-color: rgba(0,0,0,0);
      background-size: 120% auto;
      background-repeat: no-repeat;
      height: calc(100vh - 185px);
      ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 10px;
      }
      ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.1);
      }
      /*定义滚动条轨道 内阴影+圆角*/
      ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // box-shadow: inset 0 0 5px #ffffff;
        // border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.1);
      }
      .menu-item{
        height: 32px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 30px;
        padding: 0 16px;
        font-size: 13px;
        color: #333;
        cursor: pointer;
        position: relative;
        :hover{
          color: #fff;
          background: #00A680;
        }
        &.active{
          color: #fff;
          background: #00A680;
        }
      }
    }

    .route-view{
      overflow: hidden;
      height: 100%;
    }
  }
`