import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, message } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
import { ScrollBox } from 'src/components/common'
import Zimage from 'src/components/Zimage'

import { badEventRecordService } from './api/BadEventRecordService'

export interface Props { }

export default observer(function BadEventRecordDetail() {
  let { location, history } = appStore
  const auth = authStore.isRoleManage
  let wardCode = authStore.selectedDeptCode
  let search = qs.parse(location.search.replace('?', ''))
  const [loading, setLoading] = useState(false)

  const [badEvent, setBadEvent] = useState({} as any)
  const [parties, setParties] = useState([] as any[])
  const [attachs, setAttachs] = useState([] as any[])
  const [typeList, setTypeList] = useState([] as any[])

  const getDetail = () => {
    setLoading(true)
    badEventRecordService
      .getDetail(search.id, wardCode)
      .then(res => {
        setLoading(false)
        if (res.data) {
          if (res.data.badEvent) setBadEvent(res.data.badEvent)

          if (res.data.parties) setParties(res.data.parties.map((item: any) => item.empName))

          if (res.data.attachs) setAttachs(res.data.attachs)
        }
      }, () => setLoading(false))
  }

  const getTypeList = () => {
    badEventRecordService.getDict({
      groupCode: 'qc',
      dictCode: 'qc_bad_event_type'
    })
      .then(res => {
        if (res.data) setTypeList(res.data)
      })
  }

  const eventType = () => {
    if (typeList.length > 0) {
      let target = typeList.find((item: any) => item.code == badEvent.eventType)

      if (target) return target.name
    }
    return ''
  }

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该记录?',
      onOk: () => {
        setLoading(true)
        badEventRecordService
          .delete(record.id)
          .then(res => {
            message.success('删除成功', 1, () => history.goBack())
          }, () => setLoading(false))
      }
    })
  }

  const handleEdit = () => {
    history.push(`/badEventRecordEdit?id=${search.id}`)
  }

  useEffect(() => {
    getDetail()
    getTypeList()
  }, [])

  return <Wrapper>
    <TopPannel>
      <TopHeader>
        <BreadcrumbBox
          style={{
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 2
          }}
          data={[
            {
              name: '一级质控报告',
              link: '/qcOne'
            },
            {
              name: '不良事件记录',
              link: '/qcOne/badEventRecord'
            },
            {
              name: '查看详情'
            },
          ]}
        />
        <div className="topHeaderTitle">
          <div className="title">
            {badEvent.eventDay} 不良事件详情
          </div>
          <div className='topHeaderButton'>
            {auth && <React.Fragment>
              <Button disabled={loading} type="primary" ghost onClick={handleEdit}>编辑</Button>
              <Button disabled={loading} type="danger" ghost onClick={() => handleDelete(badEvent)}>删除</Button>
            </React.Fragment>}
            <Button onClick={() => history.goBack()}>返回</Button>
          </div>
        </div>
      </TopHeader>
    </TopPannel>
    <MainPannel>
      <MainContent className="main-contain">
        <MessageBox>
          <div className="boxLeft">
            <div>发生时间：{badEvent.eventDay} {badEvent.eventTime}</div>
            <div>事件各类：{eventType()}</div>
            <div>创建时间：{badEvent.createTime}</div>
          </div>
          <div className="boxRight">
            <div>发生科室：{badEvent.wardName}</div>
            <div>当事人：{parties.join('、')}</div>
            <div>创建人：{badEvent.creatorName}</div>
          </div>
        </MessageBox>
        <div className="default-pannel">
          <div className="title">一、事件简要经过</div>
          <div className="content">{badEvent.briefCourseEvent}</div>
        </div>
        <div className="default-pannel">
          <div className="title">二、后果</div>
          <div className="content">{badEvent.result}</div>
        </div>
        <div className="default-pannel">
          <div className="title">三、附件</div>
          <div className="content">
            <Zimage
              text={
                <React.Fragment>
                  {attachs.map((item: any) =>
                    <div className="img-view-item" key={item.id}>
                      <img
                        src={item.path} />
                    </div>) || <span></span>}
                </React.Fragment>
              }
              list={attachs.map((item: any) => item.path)} />
          </div>
        </div>
      </MainContent>
    </MainPannel>
  </Wrapper>
})


const Wrapper = styled.div`
  .main-contain{
    margin: 0 auto;
    width: 760px;
    padding: 15px 20px;
    padding-bottom: 30px;
    color: #000000;
    background: #fff;
    border: 1px solid #ddd;
    min-height: 100%;
  }
  .main-content{
    min-height: 400px;
  }
  .default-pannel{
    .title{
      margin-top: 15px;
      margin-bottom: 10px;
    }
    .content{
      overflow: auto;
      .img-view-item{
        cursor: pointer;
        width: 100px;
        height: 100px;
        position: relative;
        float: left;
        margin-right: 15px;
        margin-bottom: 15px;
        border-radius: 5px;
        border: 1px dashed #ddd;
        overflow: hidden;
        transition: all .3s;
        :hover{
          border-color: #aaa;
        }
        img{
          width: 100%;
          min-height: 50px;
          background: #ddd;
          height: 50px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
`

const MainContent = styled.div`
`

const MainPannel = styled(ScrollBox)`
  height: calc(100vh - 120px);
  padding: 20px 0;
`
const TopPannel = styled.div` 
  box-sizing:border-box;
  height: 100%;
  width: 100%;
  padding-left: 20px;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #ddd;
`

const TopHeader = styled.div`
  .topHeaderClass {
    font-size: 14px;
    margin-top: 13px;
    color: #999;
    .topHeaderSpan1 {
      cursor: pointer;
    }
    .topHeaderSpan1:hover {
      color: #00a680;
    }
    .topHeaderSpan2 {
      cursor: pointer;
    }
    .topHeaderSpan2:hover {
      color: #00a680;
    }
  }
  .topHeaderTitle {
    margin-top: 2px;
    font-size: 20px;
    font-weight: 500;
    color: #000;
    margin-bottom: 5px;
    /* font-weight: bold; */
    .topHeaderButton {
      position: absolute;
      bottom: 10px;
      right: 20px;
      button {
        margin-left: 10px;
      }
    }
    .title {
      font-weight: bold;
      min-height: 30px;
    }
    .sub-title{
      color: #999;
      min-height: 29px;
      min-width: 10px;
      font-size: 12px;
      padding-bottom: 10px;
    }
  }
  .topHeaderStatus {
    height: 25px;
    line-height: 25px;
    color: #999;
  }
`

const MessageBox = styled.div`
  margin-top: 10px;
  /* min-height: 138px; */
  overflow: hidden;
  line-height: 24px;
  padding: 10px 20px;
  background-color: #f2f2f2;
  font-size: 12px;
  &>div{
    float: left;
    word-break: break-all;
    max-width: 100%;
    padding: 3px 0;
  }
  .boxLeft {
    width: 50%;
    padding: 0;
    &>div{
      padding: 3px 0;

    }
  }
  .boxRight {
    width: 50%;
    padding: 0;
    &>div{
      padding: 3px 0;

    }
  }
  `