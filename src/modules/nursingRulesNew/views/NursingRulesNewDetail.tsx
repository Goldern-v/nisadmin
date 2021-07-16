import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Tabs, Modal, message as Message, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { appStore, authStore } from 'src/stores'
import { detailPageModel } from './../models/detailPageModel'
import { nursingRulesApiService } from './../api/nursingRulesNewService'
import qs from 'qs'

import IndexPannel from './../components/detailPage/IndexPannel'
import FavorPannel from './../components/detailPage/FavorPannel'
import RepairPannel from './../components/detailPage/RepairPannel'
import AuditPannel from './../components/detailPage/AuditPannel'

import BookCover from './../components/BookCover'

const { TabPane } = Tabs;

export interface Props { }

export default observer(function NursingRulesNewDetail() {
  const { history, location, queryObj } = appStore
  const {
    baseInfo,
    indexList,
    baseLoading,
    auditList,
    currentVersionFavorList,
    indexLoading,
    auditLoading,
    favorLoading,
    repairLoading
  } = detailPageModel

  //启用和删除权限 上传者和护理部
  let uploaderAuth = !!(baseInfo.upLoaderEmpNo == (authStore.getUser() && authStore.getUser().empNo)) as boolean
  let absoluteAuth = !!authStore.isDepartment as boolean
  let auth = !!(uploaderAuth || absoluteAuth) as boolean

  const indexSize = () => {
    let size = 0;
    for (let i = 0; i < indexList.length; i++)
      if (indexList[i].childrenList && indexList[i].childrenList.length > 0)
        size += indexList[i].childrenList.length

    return size
  }

  let tabsCfg = [
    {
      name: `目录(共${indexSize()}章)`,
      component: <Spin spinning={indexLoading}><IndexPannel /></Spin>
    },
    {
      name: `我的收藏(共${currentVersionFavorList.length}章)`,
      component: <Spin spinning={favorLoading}><FavorPannel /></Spin>
    },
    {
      name: '修订记录',
      component: <Spin spinning={repairLoading}><RepairPannel /></Spin>
    }
  ]

  if (auth) tabsCfg.push({
    name: `待审核章节(共${auditList.length}章)`,
    component: <Spin spinning={auditLoading}><AuditPannel /></Spin>
  })

  const TabPannels = () => {
    return tabsCfg.map((item: any, idx: number) => {
      return <TabPane tab={item.name} key={idx.toString()}>{<div className="tab-content">{item.component}</div>}</TabPane>
    })
  }

  const handleTabChange = (tab: any) => {
    history.replace(`${location.pathname}?${qs.stringify({ ...queryObj, tab })}`)
  }

  const handleEnable = (enabled: number) => {
    let content = "确定把该书籍设为无效吗？设为无效后将不能再查看该书籍内容"

    if (enabled == -1) content = "确定启用该书籍吗"

    let newEabled = baseInfo.enabled == 1 ? -1 : 1
    Modal.confirm({
      title: "提示",
      content,
      centered: true,
      onOk: () => {
        nursingRulesApiService
          .changeBookAvailability({
            bookId: baseInfo.bookId,
            enabled: newEabled
          })
          .then(res => {
            Message.success('设置成功')
            detailPageModel.setEnabled(newEabled)
          })
      }
    })
  }

  const handleDelete = () => {
    Modal.confirm({
      title: "提示",
      content: "确定删除该书籍吗？删除后数据无法恢复",
      centered: true,
      onOk: () => {
        nursingRulesApiService.deleteBook(baseInfo.bookId).then(res => {
          Message.success('删除成功', 2, () => {
            history.replace('nursingRulesNew')
          })
        })
      }
    })
  }

  const handleEdit = () => {
    nursingRulesApiService.getTaskCode({
      taskType: 2,
      bookId: baseInfo.bookId
    }).then(res => {
      if (res.data) history.push(`nursingRulesNewEdit?${qs.stringify({
        taskCode: res.data.taskCode,
        bookId: baseInfo.bookId,
        taskType: 2
      })}`)
    })
  }

  const handleRepair = () => {
    nursingRulesApiService.getTaskCode({
      taskType: 3,
      bookId: baseInfo.bookId
    }).then(res => {
      if (res.data) history.push(`nursingRulesNewEdit?${qs.stringify({
        taskCode: res.data.taskCode,
        bookId: baseInfo.bookId,
        taskType: 3
      })}`)
    })
  }

  useEffect(() => {
    detailPageModel.inited({
      ...queryObj,
      bookId: queryObj.bookId || ''
    })
  }, [])

  const SettingBtn = () => {

    let btnText = '设为无效'

    if (baseInfo.enabled == -1) btnText = '启用'

    return <Button
      type={btnText == '设为无效' ? 'danger' : 'primary'}
      disabled={!auth || baseLoading}
      onClick={() => handleEnable(baseInfo.enabled)}>
      {btnText}
    </Button>
  }

  return <Wrapper>
    <div className="topbar">
      <NavCon>
        <Link to="/nursingRulesNew">护理制度</Link>
        <span> {'>'} </span>
        <span>{baseInfo.bookName || '书籍详情'}</span>
      </NavCon>
    </div>
    <div className="main-contain">
      <div className="top-pannel">
        <Spin spinning={baseLoading}>

          <div className="base-info">
            <div className="left">
              <BookCover src={baseInfo.coverPath ? `/crNursing/asset${baseInfo.coverPath}` : ''} name={baseInfo.coverPath ? '' : baseInfo.bookName} />
            </div>
            <div className="right">
              <div className="main-title">
                <span>{baseInfo.bookName}</span>
              </div>
              <div className="update-info">
                <span className="icon">
                  <img src={require('./../assets/上传@2x.png')} alt="" />
                </span>
                <span>上传:</span>
                <span className="sc-content">{baseInfo.upLoadTime && baseInfo.upLoadTime.split(' ')[0]}</span>
                <span className="sc-content">{baseInfo.upLoaderEmpName}</span>
              </div>
              <div className="audit-info">
                <span className="icon">
                  <img src={require('./../assets/审核@2x.png')} alt="" />
                </span>
                <span>审核:</span>
                <span className="sc-content">{baseInfo.auditTime && baseInfo.auditTime.split(' ')[0]}</span>
                <span className="sc-content">{baseInfo.auditorEmpName}</span>
              </div>
              <div className="desc">
                <span className="icon">
                  <img src={require('./../assets/简介@2x.png')} alt="" />
                </span>
                <span>简介:</span>
                <span className="desc-content">{baseInfo.bookBrief}</span>
              </div>
              <div className="btn-group">
                <Button onClick={handleEdit} disabled={!auth}>编辑</Button>
                <Button onClick={handleRepair} disabled={!auth}>修订</Button>
                {SettingBtn()}
                <Button type="danger" disabled={!auth || baseLoading} onClick={handleDelete}>删除</Button>
                <Button onClick={() => history.goBack()}>返回</Button>
              </div>
            </div>
          </div>

        </Spin>
      </div>
      <div className="tab-pannels">
        <Tabs defaultActiveKey={queryObj.tab || '0'} onChange={handleTabChange}>{TabPannels()}</Tabs>
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
      /* position: absolute;
      top:0;
      right:10px;
      z-index: 2; */
      position: absolute;
      left: 155px;
      z-index: 2;
      bottom: 0;
      .ant-btn{
        margin-left: 8px;
      }
    }

    .base-info{
      padding: 0 10px;
      display: flex;
      height: 178px;
      position: relative;
      z-index: 1;
      .left{
        width: 125px;
        height: 178px;
        margin-right: 30px;
      }
      .right{
        flex:1;
        &>div{
          margin-bottom: 5px;
        }
        .main-title{
          font-size: 24px;
          color: #000;
          min-height: 36px;
          font-weight: bold;
          .version{
            color: #999;
            font-size: 12px;
            font-weight: normal;
          }
        }
        .update-info,.audit-info{
          color: #333;
          display: inline-block;
          margin-right: 10px;
          min-width: 180px;
          &>span{
            vertical-align: middle;
            margin-right:5px;
            &.sc-content{
              color: #999;
            }
            img{
              width: 12px;
              height: 12px;
              position: relative;
              top: -2px;
            }
          }
        }
        .desc{
          height: 66px;
          margin: 0;
          position: relative;
          &>span{
            vertical-align: top;
            margin-right:5px;
            img{
              width: 12px;
              height: 12px;
              position: relative;
              top: -2px;
            }
          }
          .desc-content{
            overflow-y: auto;
            position: absolute;
            color: #999;
            ${scrollBarStyle}
            top: 0;
            left: 58px;
            right: 0;
            bottom: 0;
          }
        }
      }
    }
    .tab-pannels{
      position: relative;
      z-index: 1;
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