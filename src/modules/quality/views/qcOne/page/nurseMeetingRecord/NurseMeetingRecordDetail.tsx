import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Modal, message, Spin } from 'antd'
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
import moment from 'moment'
import { fileDownload } from 'src/utils/file/file'

import { nurseMeetingRecordService } from './api/NurseMeetingRecordService'
import YearPicker from 'src/components/YearPicker'

export interface Props { }

export default observer(function NurseMeetingRecordDetail() {
  let { location, history } = appStore
  const auth = authStore.isRoleManage
  let search = qs.parse(location.search.replace('?', ''))
  const wardCode = authStore.selectedDeptCode
  const [loading, setLoading] = useState(true)
  const previewModal = createModal(PreviewModal)


  const [isRead, setIsRead] = useState(true)
  const [nurseMeeting, setNurseMeeting] = useState({} as any)
  const [attendees, setAttendees] = useState([] as any[])
  const [comperes, setComperes] = useState([] as any[])
  const [recorders, setRecorders] = useState([] as any[])
  const [attachmentList, setAttachmentList] = useState([] as any[])
  const [receiverList, setReceiverList] = useState([] as any[])
  const [unreceiverList, setUnreceiverList] = useState([] as any[])

  useEffect(() => {
    if (search.id) getDetail()
  }, [])

  //是否有编辑权限
  const editable = () => {
    if (!nurseMeeting.creatorNo) return false
    if (!authStore.user) return false

    if (nurseMeeting.creatorNo.toLowerCase() !== authStore.user.empNo.toLowerCase()) return false

    return true
  }

  const getDetail = () => {
    setLoading(true)
    nurseMeetingRecordService
      .getDetail(search.id, wardCode)
      .then(res => {
        if (res.data) {
          setLoading(false)
          setNurseMeeting({
            ...res.data.nurseMeeting,
            readReceiverSize: res.data.readReceiverSize || 0,
            unreadReceiverSize: res.data.unreadReceiverSize || 0,
          })
          setAttendees(res.data.attendees)
          setComperes(res.data.comperes)
          setRecorders(res.data.recorders)
          setAttachmentList(res.data.attachmentList)
          setReceiverList(res.data.receiverList)
          setUnreceiverList(res.data.unreceiverList)
        }
      }, () => setLoading(false))
  }

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该记录?',
      onOk: () => {
        setLoading(true)
        nurseMeetingRecordService
          .delete(record.id)
          .then(res => {
            message.success('删除成功', 1, () => history.goBack())
          }, () => setLoading(false))
      }
    })
  }

  const handleRead = () => {
    setLoading(true)
    nurseMeetingRecordService
      .read(search.id)
      .then(res => {
        message.success('标记为已读', 1, () => getDetail())
      }, () => setLoading(false))
  }

  const ReadBtn = () => {
    let target = unreceiverList.find((item: any) => item.empNo.toLowerCase() == (authStore.user && authStore.user.empNo.toLowerCase()))

    if (!target)
      return <span></span>
    else
      return <Button disabled={loading} type="primary" ghost onClick={handleRead}>我已查看</Button>
  }

  const readingStatus = () => {
    let target = receiverList.find((item: any) => item.empNo.toLowerCase() == (authStore.user && authStore.user.empNo.toLowerCase()))
    if (target)
      return <span>已读</span>
    else
      return <span style={{ color: 'red' }}>未读</span>
  }

  const handleEdit = () => {
    if (search.id) history.push(`/nurseMeetingRecordEdit?id=${search.id}`)
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

  const handleExport = () => {
    setLoading(true)
    nurseMeetingRecordService.exportData({
      id: nurseMeeting.id
    })
      .then((res: any) => {
        setLoading(false)
        fileDownload(res)
      }, () => setLoading(false))
  }

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
              name: '一级质控记录',
              link: '/qcOne'
            },
            {
              name: '护士会议记录',
              link: '/qcOne/nurseMeetingRecord'
            },
            {
              name: '查看详情'
            },
          ]}
        />
        <div className="topHeaderTitle">
          <div className="title">
            {nurseMeeting.meetingDay} 会议记录详情
          </div>
          <div className='topHeaderButton'>
            {editable() && <React.Fragment>
              <Button disabled={loading} type="primary" ghost onClick={handleEdit}>编辑</Button>
              <Button disabled={loading} type="danger" ghost onClick={() => handleDelete(nurseMeeting)}>删除</Button>
            </React.Fragment>}
            {ReadBtn()}
            <Button onClick={handleExport}>导出</Button>
            <Button onClick={() => history.goBack()}>返回</Button>
          </div>
        </div>
      </TopHeader>
    </TopPannel>
    <MainPannel style={{ right: auth ? '300px' : '0' }}>
      <MainContent className="main-contain">
        <Spin spinning={loading}>
          <MessageBox>
            <div className="boxLeft">
              <div>会议日期：{nurseMeeting.meetingDay} {nurseMeeting.meetingTime}</div>
              <div>科室：{nurseMeeting.wardName}</div>
              <div>会议主持：{comperes.map((item: any) => item.empName).join('、')}</div>
            </div>
            <div className="boxRight">
              <div>会议种类：{nurseMeeting.meetingType == 'QCWMT001' ? '周会' : '月会'}</div>
              <div>会议地点：{nurseMeeting.meetingLocation}</div>
              <div>记录人：{recorders.map((item: any) => item.empName).join('、')}</div>
            </div>
            <div>到会人员：{attendees.map((item: any) => item.empName).join('、')}</div>
            <div className="boxLeft">
              <div>创建时间：{nurseMeeting.createTime}</div>
              <div>阅读状态：{readingStatus()}</div>
            </div>
            <div className="boxRight">
              <div>创建人：{nurseMeeting.creatorName}</div>
            </div>
          </MessageBox>
          <div className="default-pannel">
            <div className="title">一、会议传达</div>
            <div className="content">{nurseMeeting.meetingConveyed}</div>
          </div>
          <div className="default-pannel">
            <div className="title">二、工作中问题及整改</div>
            <div className="content">{nurseMeeting.problemRectification}</div>
          </div>
          <div className="default-pannel">
            <div className="title">三、护士发言</div>
            <div className="content">{nurseMeeting.nurseStatement}</div>
          </div>
          <div className="default-pannel">
            <div className="title">四、附件上传</div>
            <div className="content">
              <FileCon>
                {attachmentList.map((item: any, index: number) => (
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
                    {attachmentList.map((item: any) =>
                      <div className="img-view-item" key={item.id}>
                        <img
                          style={{ opacity: 1 }}
                          src={item.path} />
                      </div>) || <span></span>}
                  </React.Fragment>
                }
                list={attachmentList.map((item: any) => item.path)} /> */}
            </div>
          </div>
        </Spin>
      </MainContent>
    </MainPannel>
    <RightPannel style={{ right: auth ? '0' : '-300px' }}>
      <div className="tab">
        <div
          className={isRead ? 'tab-item active' : 'tab-item'}
          onClick={() => setIsRead(true)}>
          已读（{nurseMeeting.readReceiverSize || 0}）
        </div>
        <div
          className={isRead ? 'tab-item' : 'tab-item active'}
          onClick={() => setIsRead(false)}>
          未读（{nurseMeeting.unreadReceiverSize || 0}）
        </div>
      </div>
      <NurseList>
        <div className="row">
          {(isRead ? receiverList : unreceiverList).map((item: any) =>
            <span className="nurse-item" key={item.id}>
              <img
                className='head-img'
                src={item.nearImageUrl || ''}
                alt='' />
              <br />
              <span className="emp-name">{item.empName}</span>
            </span>
          )}
        </div>
      </NurseList>
    </RightPannel>
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
      margin-bottom: 30px;
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

const NurseList = styled(ScrollBox)`
  padding: 20px 13px;
  position: absolute;
  bottom: 0;
  top: 37px;
  width: 100%;
  left: 0;
  .nurse-item{
    margin: 5px 8px;
    width: 72px;
    display: inline-block;
    vertical-align: top;
    &>*{
      display: inline-block;
    }
    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: url('${require('src/assets/护士默认头像.png')}');
      background-size: 100%;
      object-fit: cover;
    }
    .emp-name{
      margin-top: 5px;
    }
    text-align: center;
  }
`

const MainPannel = styled(ScrollBox)`
  height: calc(100vh - 120px);
  position: fixed;
  left: 0;
  bottom: 0;
  right: 300px;
  padding: 20px 0;
`

const RightPannel = styled.div`
  height: calc(100vh - 120px);
  background: #fff;
  position: fixed;
  right: 0;
  width: 300px;
  height: calc(100vh - 120px);
  bottom: 0;
  border-left: 1px solid #ddd;
  .tab{
    border-bottom: 1px solid #ddd;
    .tab-item{
      width: 50%;
      display: inline-block;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
      &.active{
        color: #00A680;
        position: relative;
        &::after{
          content: '';
          position: absolute;
          height: 3px;
          width:100%;
          bottom: -3px;
          left:0;
          background: #00A680;
        }
      }
    }
  }
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
  min-height: 138px;
  overflow: hidden;
  line-height: 24px;
  padding: 10px 20px;
  background-color: #f2f2f2;
  font-size: 12px;
  &>div{
    float: left;
    word-break: break-all;
    width: 100%;
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
const ExportCon = styled.div`
  &>div{
    margin-top: 15px;
  }
`