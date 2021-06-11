import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Carousel, Icon, Input, message, Modal, Radio, Tag } from 'antd'
import { Place } from 'src/components/common'
import { appStore, authStore } from 'src/stores'
import moment from 'src/vendors/moment'
import { studyNoteManageService } from './../api/StudyNoteManageService'
import { Divider } from 'src/vendors/antd'

const TextArea = Input.TextArea

export interface Props {
  visible: boolean,
  toAudit?: boolean,
  onOk: Function
  onCancel: Function
  recordList: any[],
  noteType: string,
}

export default function StudyNoteAuditModal(props: Props) {
  const { visible, onOk, onCancel, recordList, toAudit, noteType } = props

  const carouselRef = React.createRef<any>()

  const [dataList, setDataList] = useState([] as any[])
  const [flowTaskHisList, setFlowTaskHisList] = useState([] as any[])
  const [activeIdx, setActiveIdx] = useState(0)

  const [loading, setLoading] = useState(false)

  const handleChange = (payload: any, idx: any) => {
    if (dataList.length <= 0) return
    if (loading) return

    let newList = dataList.concat()
    newList[idx] = payload

    setDataList(newList)
  }

  const getAuditedInfo = () => {
    if (!recordList[0]) return
    setLoading(true)

    let noteId = recordList[0].noteId
    studyNoteManageService.getAuditedStudyNoteDetailInfo(noteId, noteType)
      .then(res => {
        setLoading(false)
        setDataList([
          {
            ...recordList[0],
            ...res.data,
          }
        ])
      }, err => setLoading(false))
  }

  const getToAuditInfo = () => {
    setLoading(true)

    let taskIdList = recordList.map((record: any) => record.taskId)

    studyNoteManageService
      .getToAuditStudyNoteDetailInfoList(taskIdList, noteType)
      .then(res => {
        setLoading(false)

        let newDataList = (res.data || []).map((item: any, idx: number) => {
          return {
            ...item,
            ...recordList[idx] || {},
            auditResult: 1,
            auditRemark: '',
          }
        })

        setDataList(newDataList)
      }, err => setLoading(false))
  }

  const getFlowTaskHisList = () => {
    if (!recordList[0]) return

    let id = recordList[0].noteId

    setFlowTaskHisList([])

    studyNoteManageService.getFlowTaskHisById(id, noteType)
      .then(res => {
        if (res.data.flowTaskHisList) {
          setFlowTaskHisList(res.data.flowTaskHisList || [])
        }
      })
  }

  const handleAudit = () => {
    setLoading(true)
    Promise.all(dataList.map((item: any) => {
      return studyNoteManageService.auditStudyNote({
        taskId: item.taskId,
        auditResult: item.auditResult,
        auditRemark: item.auditRemark,
      }, noteType)
    }))
      .then(res => {
        setLoading(false)
        message.success('操作成功')
        onOk()
      }, () => setLoading(false))
  }

  const handleGroupAudit = (auditResult: number) => {
    let auditRemark = ''
    Modal.confirm({
      title: `确定批量审核${auditResult == 1 ? '通过' : '驳回'}`,
      centered: true,
      content: <TextArea
        autosize={{ minRows: 4 }}
        onChange={(e: any) => auditRemark = e.target.value}/>,
      onOk: () => {
        setLoading(true)
        studyNoteManageService.batchAuditStudyNotes({
          taskIdList: recordList.map((record: any) => record.taskId as string),
          auditResult,
          auditRemark,
        }, noteType)
          .then(res => {
            setLoading(false)
            message.success('操作成功')
            onOk()
          }, () => setLoading(false))
      }
    })
  }

  useEffect(() => {
    if (visible) {
      if (carouselRef.current)
        carouselRef.current.goTo(1, true)
      setActiveIdx(0)

      if (toAudit) {
        getToAuditInfo()
      } else {
        getAuditedInfo()
        getFlowTaskHisList()
      }

    }
  }, [visible])

  return <Modal
    title={`${dataList[activeIdx] && dataList[activeIdx].empName + '的' || ''}${noteType}`}
    visible={visible}
    centered
    bodyStyle={{ padding: 0, maxHeight: '550px' }}
    confirmLoading={loading}
    onCancel={() => onCancel()}
    footer={<FooterCon>
      {dataList.length > 1 &&
      <React.Fragment>
        <Button type="primary" onClick={() => handleGroupAudit(1)}>批量通过</Button>
        <Button type="danger" onClick={() => handleGroupAudit(-1)}>批量驳回</Button>
      </React.Fragment>}
      <Place/>
      <Button onClick={() => onCancel()}>取消</Button>
      {toAudit && <Button
        type="primary"
        disabled={loading}
        onClick={() => handleAudit()}>
        提交
      </Button>}
    </FooterCon>}>
    <Wrapper>
      <Carousel
        dots={false}
        ref={carouselRef}>
        {(dataList.length > 0 ? dataList : [{}] as any[])
          .map((item: any, idx: number) =>
            <div key={item} className="data-item">
              <div>
                {noteType == '学习笔记' ? <span>学习任务：</span> : <span>标题：</span>}
                <span>{item.title}</span>
              </div>
              {noteType == '学习笔记' && <div>学习类型：{item.firstLevelMenuName}</div>}
              <div>
                {noteType == '学习笔记' && <span>学习时间：{item.startTime || '...'} ~ {item.endTime || '...'}</span>}
                {noteType == '工作反思' && <span>提交时间：{item.submitTime}</span>}
              </div>
              {
                (noteType === '工作反思' && appStore.HOSPITAL_ID === 'hj') ?
                  <React.Fragment>
                    <div>标题：</div>
                    <div>
                      <Input value={item.title || ''} readOnly/>
                    </div>
                    <div>描述：</div>
                    <div>
                      <TextArea value={item.describe || ''} readOnly/>
                    </div>
                    <div>感知：</div>
                    <div>
                      <TextArea value={item.perception || ''} readOnly/>
                    </div>
                    <div>评价：</div>
                    <div>
                      <TextArea value={item.evaluate || ''} readOnly/>
                    </div>
                    <div>分析：</div>
                    <div>
                      <TextArea value={item.analysis || ''} readOnly/>
                    </div>
                    <div>结论：</div>
                    <div>
                      <TextArea value={item.conclusion || ''} readOnly/>
                    </div>
                    <div>行动：</div>
                    <div>
                      <TextArea value={item.action || ''} readOnly/>
                    </div>
                  </React.Fragment> :
                  <React.Fragment>
                    <div>{noteType}：</div>
                    <div>
                      <TextArea
                        value={item.noteContent || item.workReviewContent || ''}
                        autosize={{ minRows: 5 }}
                        readOnly/>
                    </div>
                  </React.Fragment>
              }
              {toAudit && <React.Fragment>
                <div>
                  <span>审核结果：</span>
                  <Radio.Group
                    value={item.auditResult}
                    onChange={(e: any) => handleChange({
                      ...item,
                      auditResult: e.target.value
                    }, idx)}>
                    <Radio value={1}>通过</Radio>
                    <Radio value={-1}>驳回</Radio>
                  </Radio.Group>
                </div>
                <div>批阅意见：</div>
                <div>
                  <TextArea
                    value={item.auditRemark}
                    onChange={(e: any) =>
                      handleChange({ ...item, auditRemark: e.target.value }, idx)}/>
                </div>
              </React.Fragment>}
            </div>)}
      </Carousel>
      {dataList.length > 1 && toAudit && <div className="emp-list">
        {dataList.map((item: any, idx: number) => <Tag
          onClick={() => {
            setActiveIdx(idx)
            if (carouselRef.current) {
              console.log(carouselRef.current)
              carouselRef.current.goTo(idx + 1, false)
            }
          }}
          color={activeIdx == idx ? '#00A680' : '#bbb'}
          key={idx}>
          {item.empName}
        </Tag>)}
      </div>}
      {toAudit && <div className="auditer-info">
        <span>审核人：</span>
        <Input
          style={{ width: 100, marginRight: 10 }}
          readOnly
          value={authStore.user?.empName}/>
        <span>审核时间：</span>
        <Input
          style={{ width: 150 }}
          readOnly
          value={moment().format('YYYY-MM-DD HH:mm')}/>
      </div>}
      {!toAudit && <React.Fragment>
        <Divider style={{ margin: '6px 0' }}/>
        <AuditInfoCon>
          <div className="audit-title">审核过程</div>
          <div className="audit-list">
            {flowTaskHisList.map((item: any, idx: number) =>
              <div className="audit-item" key={idx}>
                <div className="emp-img">
                  <img src={item.nearImageUrl} alt=""/>
                  {!!item.flag && (item.handleResult == -1 ?
                    <Icon type="close-circle" theme="filled" className="step-status error"/> :
                    <Icon type="check-circle" theme="filled" className="step-status success"/>)}
                </div>
                <div className="info">
                  <div className="step-title">
                    <span>{item.stepName}</span>
                  </div>
                  <div className="emp-name">{item.handlerEmpName}</div>
                  {item.flag == 1 && <div className="emp-name">{item.handleTime}({item.handleDayOfWeek})</div>}
                  {item.flag !== 1 && <div className="emp-name">审核中 耗时{item.takeTimeDesc}</div>}
                  {item.handleRemark && <div className="desc">{item.handleRemark}</div>}
                </div>
              </div>)}
          </div>
        </AuditInfoCon>
      </React.Fragment>}
    </Wrapper>
  </Modal>
}

const Wrapper = styled.div`
  padding: 16px 0;
  .ant-carousel .slick-slide {
    text-align: left;
    overflow: hidden;
  }
  .data-item{
    &>div{
      padding: 0 24px;
      margin-bottom: 10px;
    }
  }

  .auditer-info{
    padding: 0 24px;
    line-height:30px;
    font-size: 14px;
    margin-top: 10px;
  }
`

const FooterCon = styled.div`
  display: flex;
`

const AuditInfoCon = styled.div`
  background: #fff;
  border-left: 1px solid #ddd;
  padding: 10px 15px;
  height: 100%;
  .audit-title{
    font-size: 14px;
    margin: 10px 0;
    ::before{
      content:'';
      display: inline-block;
      height: 18px;
      width: 5px;
      background: rgba(112, 182, 3, 1);
      vertical-align: sub;
      margin-right: 10px;
    }
  }
  .audit-item{
    color: #666;
    padding-top: 10px;
    position: relative;
    &::before{
      position: absolute;
      content: '';
      width:1px;
      height: 100%;
      background: #ddd;
      top: 0;
      left: 20px;
    }
    &:first-of-type{
      padding-top:0;
    }
    &:last-of-type{
      &::before{
        height:40px;
      }
    }
    .emp-img{
      width: 40px;
      position: relative;
      float: left;
      img{
        height: 40px;
        width: 40px;
        background: #ddd;
        border-radius: 50%;
        object-fit: cover;
        display:inline-block;
        background: url('${require('src/assets/护士默认头像.png')}');
        background-size: 100%;
      }
      .step-status{
        position:absolute;
        right: 0;
        bottom: 0;
        background: #fff;
        border-radius: 50%;
        &.error{
          color: red;
        }
        &.success{
          color: rgb(2, 159, 123);
        }
      }
    }
    .info{
      font-size: 13px;
      padding-left: 45px;
      .desc{
        padding: 5px;
        border-radius: 3px;
        background: #eee;
      }
    }
  }
`