import React, { useState, useEffect } from 'react'
import { Button, Steps, Icon, Spin } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import AuditModal from './components/AuditModal'
import badEventsNewService from './api/badEventsNewService'
import service from 'src/services/api'
import { authStore, appStore } from 'src/stores'
import qs from 'qs'

const api = new badEventsNewService()

const baseFormUrl = '/crNursing/formUrl'
const formUrl =
  process.env.NODE_ENV !== 'development' ? baseFormUrl : 'http://' + window.location.hostname + ':8088' + baseFormUrl

const { Step } = Steps

export default withRouter(function BadEventsNewDetail(props: any) {
  const [auditModalvisible, setAuditModalvisible] = useState(false)
  // const [status, setStatus] = useState(3);
  const [detailData, setDetailData] = useState({
    status: '',
    badEventCode: '',
    badEventName: '',
    eventType: '',
    deptCode: '',
    paramMap: {} as any
  })

  const [reportDept, setReportDept] = useState({
    code: '',
    name: ''
  })

  const [iframeLoading, setIframeLoading] = useState(true)
  //初始化时间戳
  const initTimeLine = [] as any[]
  //右侧时间轴
  const [timeLine, setTimeLine] = useState(initTimeLine.concat())
  //用于刷新iframe的时间戳
  const [timeSet, setTimeset] = useState(new Date().getTime())

  interface stringObj {
    [key: string]: string
  }

  //不良事件状态对应的文本显示
  const [eventStatusList, setEventStatusList] = useState([] as any[])
  const getTypeList = () => {
    service.commonApiService.dictInfo('badEvent_status').then((res: any) => {
      setEventStatusList(res.data)
    })
  }

  // console.log(eventStatusList)

  const iframeUrl = (): string => {
    let appToken = appStore.getAppToken()
    let authToken = authStore.getAuthToken()
    let { badEventName, badEventCode, eventType } = detailData

    let query: any = {
      id: props.match.params.id || '',
      token: `App-Token-Nursing=${appToken}&Auth-Token-Nursing=${authToken}`,
      badEventName,
      badEventType: eventType,
      badEventCode,
      operation: 'view',
      timeset: timeSet
    }
    for (let x in query) {
      if (!query[x]) return ''
    }
    return `${formUrl}/不良事件病人安全通报单.html?${qs.stringify(query)}`
  }

  useEffect(() => {
    getDetail()
    getTypeList()
  }, [])

  const getDetail = () => {
    let eventId = props.match.params.id
    if (eventId) {
      setIframeLoading(true)

      Promise.all([api.getDetail(eventId), api.getTimeline(eventId)]).then((res) => {
        let data = res[0].data.instance
        let paramMap = res[0].data.paramMap
        let timeData = res[1].data
        let { badEventCode, badEventName, eventType, deptCode } = data
        setDetailData({
          ...detailData,
          status: data.status || '',
          badEventCode,
          badEventName,
          eventType,
          deptCode,
          paramMap
        })

        let newTimeline = [] as any[]

        for (let i = 0; i < timeData.length; i++) {
          let newItem = timeData[i]
          let timeStatusAbs = Math.abs(timeData[i].operatorStatus)
          if (timeStatusAbs > Math.abs(data.status)) break

          let description
          let title = timeData[i].operateName || ''
          let operatorName = timeData[i].operatorName
          let operatorWardName = timeData[i].operatorWardName
          let operatorWardCode = timeData[i].operatorWardCode

          let dateString = timeData[i].operateDate || ''
          if (dateString) switch (new Date(dateString).getDay()) {
            case 1:
              dateString += ' (周一)'
              break
            case 2:
              dateString += ' (周二)'
              break
            case 3:
              dateString += ' (周三)'
              break
            case 4:
              dateString += ' (周四)'
              break
            case 5:
              dateString += ' (周五)'
              break
            case 6:
              dateString += ' (周六)'
              break
            case 0:
              dateString += ' (周日)'
              break
          }
          let deptName = paramMap[`${badEventCode}_department_name`] || ''

          let thExpain = '' as any

          if (timeData[i].operatorStatus == 'save') {
            operatorName = '***'
            title = `保存：${data.badEventName}事件`
          } else if (timeData[i].operatorStatus == 'nurse_submit') {
            operatorName = '***'
            setReportDept({
              code: operatorWardCode,
              name: operatorWardName
            })
          } else if (timeData[i].operatorStatus == 'quality_controller') {
            if (deptName) title = `质控科审核：转发${deptName}`
          } else if (timeData[i].allow == false) {
            thExpain = <span style={{ color: 'red' }}>退回原因：{paramMap[`${badEventCode}_th_explain`] || '无'}</span>
          }

          let line1Text = `${operatorName} ${operatorWardName}`
          if (!newItem.id) line1Text = '未完成'
          description = (
            <div>
              <span>{line1Text}</span>
              <br />
              <span>{dateString}</span>
              <br />
              {thExpain}
            </div>
          )

          if (title) {
            newItem.title = title
          } else {
            newItem.title = operatorName
          }

          newTimeline.push({
            ...newItem,
            description
          })
        }

        setTimeLine(newTimeline)
        setTimeset(new Date().getTime())
      })
    }
  }

  const handleOk = () => {
    setAuditModalvisible(false)
    getDetail()
  }

  const handleCancel = () => {
    setAuditModalvisible(false)
  }
  const statusText = () => {
    let target = eventStatusList.find((item: any) => item.code == detailData.status)
    let text = ''
    if (target) text = target.name || ''
    return text
  }

  const handleIframeLoad = () => {
    setIframeLoading(false)
  }

  const StepsCurrent = () => {
    let idx = -1
    for (let i = 0; i < timeLine.length; i++) {
      if (timeLine[i].operatorStatus == detailData.status) idx = i
    }
    return idx
  }

  const AuditBtn = () => {
    let status = detailData.status
    let btnDisable = iframeLoading
    let btnText = ''
    if (!authStore.user) return ''

    switch (status) {
      case 'nurse_submit':
        btnText = '审核'
        break
      case 'quality_controller':
        btnText = '科室审核'
        let deptCode = detailData.paramMap[`${detailData.badEventCode}_department_code`] || ''
        let userDeptCode = authStore.user && authStore.user.deptCode
        if (!userDeptCode || (deptCode !== userDeptCode)) btnDisable = true
        break
      case 'department_auditor':
        btnText = '总结'
        break
      case 'qc_summary':
        btnText = '质量委员会审核'

        if (detailData.paramMap[`${detailData.badEventCode}_tjzlanwyh_option`] == '不提交') return ''

        break
      default:
        btnText = '无可用操作'
        return ''
    }
    return (
      <Button className='audit' type='primary' onClick={(e) => setAuditModalvisible(true)} disabled={btnDisable}>
        {btnText}
      </Button>
    )
  }

  return (
    <Wrapper>
      <div className='topbar'>
        <div className='nav'>
          {appStore.onlyBadEvent ?
            (<span><Link to='/'>不良事件</Link> {">"} 事件详情</span>) :
            (<span> <Link to='/badEventsNewlist'>不良事件</Link> {">"} 事件详情</span>)
          }
        </div>
        <div className='title'>
          <span className='bad-event-order-no'>
            {props.match.params.orderNo || ''} {detailData.badEventName}
          </span>
          <Button
            className='audit'
            style={{ marginLeft: 10 }}
            onClick={() => appStore.history.goBack()}>
            返回
          </Button>
          {AuditBtn()}
        </div>
        <div className='status'>状态：{statusText()}</div>
      </div>
      <div className='main-contain'>
        <div className='status-line'>
          <div className='right-pannel-title'>事件轨迹:</div>
          <Steps direction='vertical' size='small' current={StepsCurrent()} className='status-line-content'>
            {timeLine.map((item, idx) => {
              // if (
              //   detailData.paramMap[`${detailData.badEventCode}_tjzlanwyh_option`] == '不提交' &&
              //   item.statuses.indexOf('5') >= 0
              // )
              //   return ''

              let icon: any

              if (item.allow) {
                icon = <Icon type='check-circle' className='icon-step success' />
              } else {
                icon = <Icon type='close-circle' className='icon-step error' />
              }
              if (!item.id)
                icon = <Icon type='minus-circle' className='icon-step default' />
              // icon = <Icon type='right-circle' className='icon-step default' />
              console.log(item.title)
              return <Step title={item.title} icon={icon} description={item.description} key={idx} />
            })}
          </Steps>
        </div>
        <div className='event-detail'>
          <iframe src={iframeUrl()} width='100%' height='100%' style={{ border: '0' }} onLoad={handleIframeLoad} />
          <Spin size='large' spinning={iframeLoading} className='iframe-loading' />
        </div>
      </div>
      <AuditModal
        visible={auditModalvisible}
        onOk={handleOk}
        eventCode={detailData.badEventCode}
        paramMap={detailData.paramMap}
        status={detailData.status}
        id={props.match.params.id}
        reportDept={reportDept}
        onCancel={handleCancel}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  .topbar{
    background: #fff;
    padding: 0 15px;
    border-bottom: 1px solid #ddd;
    height: 100px;
    .nav{
      padding: 8px 0;
    }
    .title{
      margin-bottom: 3px;
      overflow: hidden;
      .bad-event-order-no{
        font-size: 20px;
        color: #000;
      }
      .audit{
        float: right;
      }
    }
    .status{
      color: blue;
      margin-bottom: 2px;
    }
  }
  
  .main-contain{
    position: absolute;
    left: 0;
    top: 100px;
    right: 0;
    height: calc(100vh - 150px);
    .status-line{
      float: right;
      width: 250px;
      height: 100%;
      background: #f7fafa;
      border-left: 1px solid #ddd;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 18px;
      .right-pannel-title{
        margin-top: 20px;
        line-height: 24px;
        text-indent: 15px;
      }
      .ant-steps{
        margin-left: 25px;
      }
      .ant-steps-item-title{
        font-weight: bold;
      }
    }
    .event-detail{
      overflow: hidden;
      height: 100%;
      position: relative;
    }
  }
  .status-line-content{
    margin: 15px 10px;
  }
  
  .ant-steps-vertical.ant-steps-small .ant-steps-item-tail{
    left: 14px;
  }
  .ant-steps-item-description{
    font-size:12px!important;
  }
  
  .ant-steps-small .ant-steps-item-icon{
    width: 28px;
    height: 28px;
    font-size: 12px;
    line-height: 28px;
    text-align: center;
    border-radius: 28px;
  }
  .icon-step{
    color: #fff;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    overflow:hidden;
    &.success{
      background: #00A680;
    }
    &.default{
      background: #DDD;
    }
    &.error{
      background: red;
    }
    svg{
      position: relative;
      left: -3px;
      top: -3px;
      width: 34px;
      height: 34px;
    }
  }
  .iframe-loading{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
`
