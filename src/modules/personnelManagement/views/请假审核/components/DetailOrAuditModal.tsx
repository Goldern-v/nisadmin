import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Divider, Icon, Input, message, Modal, Radio, Row, Spin } from 'antd'
import { fileDownload, getFilePrevImg, getFileSize, getFileType } from 'src/utils/file/file'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import Zimage from 'src/components/Zimage'
import service from 'src/services/api'
import createModal from 'src/libs/createModal'
import { leaveAuditService } from './../service/LeaveAuditService'

export interface Props {
  visible: boolean,
  onOk: Function,
  onCancel: Function,
  isAudit?: boolean,
  id: number,
  taskId?: string
}

export default function DetailOrAuditModal(props: Props) {
  const { visible, onOk, onCancel, isAudit, id, taskId } = props

  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState({} as any)
  const [flowTaskHisList, setFlowTaskHisList] = useState([] as any[])
  const [auditInfo, setAuditInfo] = useState({
    auditResult: 1,
    auditRemark: '',
  })

  const getInfo = () => {
    setLoading(true)

    Promise.all([
      leaveAuditService.getCompleteInfo(id),
      leaveAuditService.getFlowTaskHisById(id)
    ])
      .then(res => {
        setLoading(false)
        if (res[0].data) setDetail(res[0].data)
        if (res[1].data && res[1].data.flowTaskHisList)
          setFlowTaskHisList(res[1].data.flowTaskHisList)
      }, () => setLoading(false))
  }

  const previewModal = createModal(PreviewModal)

  const getDuration = () => {
    const { duration } = detail
    if (!duration) return ''

    return `${duration}小时`
    // return duration > 24 ? `${Math.ceil(duration / 24)}天${duration % 24}小时` : `${duration}小时`
  }

  const downFile = (path: string, name: string) => {
    service.commonApiService.getFileAndDown(path, name)
  }

  const onPreView = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, file: any) => {
    previewModal.show({
      title: file.name,
      path: file.path
    })
    e.stopPropagation()
  }

  const handleAudit = () => {

    setLoading(true)

    let params = {
      taskIdList: [taskId] as string[],
      ...auditInfo,
    }

    leaveAuditService
      .batchAuditLeaveApplicationInfo(params)
      .then(res => {
        message.success('操作成功', 2, () => {
          setLoading(false)
          onOk()
        })
      }, err => setLoading(false))
  }

  useEffect(() => {
    if (visible) {
      getInfo()
      setAuditInfo({
        auditResult: 1,
        auditRemark: ''
      })
    }
  }, [visible])

  return <React.Fragment>
    <Modal
      title={isAudit ? "请假审核" : "请假详情"}
      visible={visible}
      width={400}
      centered
      bodyStyle={{ padding: 0 }}
      onCancel={() => onCancel()}
      footer={<div>
        <Button disabled={loading} onClick={() => onCancel()}>取消</Button>
        {isAudit && <Button disabled={loading} type="primary" onClick={() => handleAudit()}>确定</Button>}
      </div>}
      confirmLoading={loading}>
      <Spin spinning={loading}>
        <Wrapper>
          <Row className="detail-item">
            <Col span={6}>请假人:</Col>
            <Col span={18}>{detail.empName}</Col>
          </Row>
          <Row className="detail-item">
            <Col span={6}>请假类型:</Col>
            <Col span={18}>{detail.typeName}</Col>
          </Row>
          <Row className="detail-item">
            <Col span={6}>开始时间:</Col>
            <Col span={18}>{detail.startTime}</Col>
          </Row>
          <Row className="detail-item">
            <Col span={6}>结束时间:</Col>
            <Col span={18}>{detail.endTime}</Col>
          </Row>
          <Row className="detail-item">
            <Col span={6}>请假时长:</Col>
            <Col span={18}>{getDuration()}</Col>
          </Row>
          <Row className="detail-item">
            <Col span={6}>请假事由:</Col>
            <Col span={18}>{detail.leaveReason}</Col>
          </Row>
          <Row className="detail-item">
            <Col span={6}>附件:</Col>
            <Col span={18}>
              <FileCon>
                {(detail.attachmentList || []).map((item: any, index: number) => (
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
                      <div className='file-name' title={item.name}>{item.name}</div>
                      <div className='file-size'>{getFileSize(item.size)}</div>
                    </div>
                  </div>
                ))}
              </FileCon>
            </Col>
          </Row>
          <Divider style={{ margin: '6px 0' }} />
          <AuditInfo>
            <div className="audit-title">审核过程</div>
            <div className="audit-list">
              {flowTaskHisList.map((item: any, idx: number) =>
                <div className="audit-item" key={idx}>
                  <div className="emp-img">
                    <img src={item.nearImageUrl} alt="" />
                    {!!item.flag && (item.handleResult == -1 ? <Icon type="close-circle" theme="filled" className="step-status error" /> : <Icon type="check-circle" theme="filled" className="step-status success" />)}
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
          </AuditInfo>
          {isAudit && <React.Fragment>
            <Divider style={{ margin: '6px 0' }} />
            <Row className="audit-item">
              <Col span={6}>审核结果:</Col>
              <Col span={18}>
                <Radio.Group
                  buttonStyle='solid'
                  value={auditInfo.auditResult}
                  onChange={(e: any) =>
                    setAuditInfo({ ...auditInfo, auditResult: e.target.value })}>
                  <Radio.Button value={1}>通过</Radio.Button>
                  <Radio.Button value={-1}>驳回</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
            <Row className="audit-item">
              <Col span={6}>审核意见:</Col>
              <Col span={18}>
                <Input.TextArea
                  value={auditInfo.auditRemark}
                  onChange={(e: any) =>
                    setAuditInfo({ ...auditInfo, auditRemark: e.target.value })}
                  autosize={{ minRows: 2 }} />
              </Col>
            </Row>
          </React.Fragment>}
        </Wrapper>
      </Spin>
    </Modal>
    <previewModal.Component />
  </React.Fragment>
}
const Wrapper = styled.div`
  .ant-row.detail-item {
    line-height: 24px;
    font-size: 14px;
    padding: 6px 10px;
    padding-bottom: 0;
    .ant-col:first-of-type{
      text-align: right;
      padding-right: 10px;
    }
  }
  .ant-row.audit-item {
    line-height: 30px;
    font-size: 14px;
    padding: 10px 10px;
    padding-bottom: 0;
    .ant-col:first-of-type{
      text-align: right;
      padding-right: 10px;
    }
    &:last-of-type{
      padding-bottom: 10px;
    }
  }
`

const FileCon = styled.div`
  overflow: hidden;
  .file-box {
    float: left;
    padding-left: 8px;
    padding-bottom: 8px;

    .file-inner {
      word-break: break-all;
      border-radius: 2px;
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
        height: 24px;
        width: 74px;
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

const AuditInfo = styled.div`
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