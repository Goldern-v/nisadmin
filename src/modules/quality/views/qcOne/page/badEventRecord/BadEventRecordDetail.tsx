import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, message } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
import { ScrollBox } from 'src/components/common'
import Zimage from 'src/components/Zimage'
import createModal from 'src/libs/createModal'
import { getFileSize, getFileType, getFilePrevImg } from 'src/utils/file/file'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import service from 'src/services/api'

import { badEventRecordService } from './api/BadEventRecordService'

export interface Props { }

export default observer(function BadEventRecordDetail() {
  let { location, history } = appStore
  const auth = authStore.isRoleManage

  let wardCode = authStore.selectedDeptCode
  let search = qs.parse(location.search.replace('?', ''))
  const [loading, setLoading] = useState(false)
  const previewModal = createModal(PreviewModal)

  const [badEvent, setBadEvent] = useState({} as any)
  const [parties, setParties] = useState([] as any[])
  const [attachs, setAttachs] = useState([] as any[])
  const [typeList, setTypeList] = useState([] as any[])

  //是否有编辑权限
  const editable = () => {
    if (!badEvent.creatorNo) return false
    if (!authStore.user) return false
    if (auth) return true
    if (badEvent.creatorNo.toLowerCase() === authStore.user.empNo.toLowerCase()) return true

    return false
  }

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
        if (res.data) setTypeList((res.data?.list || []).map((item: any) => {
          return {
            code: item.itemCode,
            name: item.itemName
          }
        }))
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

  const onPreView = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, file: any) => {
    previewModal.show({
      title: file.name,
      path: file.path
    })
    e.stopPropagation()
  }

  const downFile = (path: string, name: string) => {
    service.commonApiService.getFileAndDown(path, name)
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
            {editable() && <Button disabled={loading} type="primary" ghost onClick={handleEdit}>编辑</Button>}
            {editable() && <Button disabled={loading} type="danger" ghost onClick={() => handleDelete(badEvent)}>删除</Button>}
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
          <div className="content">
            <pre>{badEvent.briefCourseEvent}</pre>
          </div>
        </div>
        <div className="default-pannel">
          <div className="title">二、后果</div>
          <div className="content">
            <pre>{badEvent.result}</pre>
          </div>
        </div>
        <div className="default-pannel">
          <div className="title">三、附件</div>
          <div className="content">
            <FileCon>
              {attachs.map((item: any, index: number) => (
                <div className='file-box' key={index}>
                  <div className='file-inner' onClick={() => downFile(item.path, item.name)}>
                    {getFileType(item.path) == 'img' ? (
                      <Zimage src={item.path} className='type-img' alt='' />
                    ) : (
                        <img
                          src={getFilePrevImg(item.path)}
                          className='type-img'
                          alt=''
                          onClick={(e) => onPreView(e, item)}
                        />
                      )}
                    <div className='file-name'>{item.name}</div>
                    <div className='file-size'>{getFileSize(item.size)}</div>
                  </div>
                </div>
              ))}
            </FileCon>
            <previewModal.Component />
            {/* <Zimage
              text={
                <React.Fragment>
                  {attachs.map((item: any) =>
                    <div className="img-view-item" key={item.id}>
                      <img
                        style={{ opacity: 1 }}
                        src={item.path} />
                    </div>) || <span></span>}
                </React.Fragment>
              }
              list={attachs.map((item: any) => item.path)} /> */}
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
      word-break:break-all;
      pre{
        word-break: break-all;
        white-space: pre-wrap;
        margin: 0;
      }
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
  height: calc(100vh - 122px);
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
      padding-right: 10px;
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

const FileCon = styled.div`
overflow: hidden;
.file-box {
  width: 25%;
  float: left;
  padding-left: 8px;
  padding-bottom: 8px;

  .file-inner {
    word-break: break-all;
    height: 125px;
    background: rgba(246, 246, 246, 1);
    border-radius: 2px;
    border: 1px dotted rgba(0, 166, 128, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 5px 10px;
    cursor: pointer;
    .type-img {
      height: 44px;
      min-height: 44px;
      width: 44px;
    }
    .file-name {
      font-size: 13px;
      color: #333333;
      margin: 5px 0 3px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .file-size {
      font-size: 13px;
      color: #999;
    }
  }
}
`