import React, { useState, useEffect } from 'react'
import { Button, Steps, Icon, Spin, Modal } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import AuditModalNys from './components/AuditModal_nys'
import badEventsNewService from './api/badEventsNewService'
import service from 'src/services/api'
import { authStore, appStore } from 'src/stores'
import qs from 'qs'
import { message } from 'antd/es'
import { info } from 'console'

const api = new badEventsNewService()

const baseFormUrl = '/crNursing/formUrl'
const formUrl = baseFormUrl

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
    instance: {} as any,
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
  //下一步的审核状态
  let nextStep = timeLine.find((item: any) => item.id == null)
  if (nextStep) {
    if (nextStep.operatorStatus == 'save' || nextStep.operatorStatus == 'dept_submit')
      nextStep = null
  }
  //用于刷新iframe的时间戳
  const [timeSet, setTimeset] = useState(new Date().getTime())
  //转科信息
  const [zhuanKe, setZhuanKe] = useState(false)
  const [patientInfoLoading, setPatientInfoLoading] = useState(false)
  const [patientInfo, setPatientInfo] = useState({} as any)

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
      operation: nextStep && nextStep.operatorStatus == 'nurse_auditor' ? 'edit' : 'view',
      isIndependent: 1,
      timeset: timeSet
    }
    for (let x in query) {
      if (!query[x]) return ''
    }
    return `${formUrl}/不良事件病人安全通报单${appStore.isDev ? '.html' : ''}?${qs.stringify(query)}`
  }

  useEffect(() => {
    getDetail()
    getTypeList()
    initSetting()
    return () => {
      removeSetting()
    }
  }, [])

  const initSetting = () => {
    /**配置好与不良事件表单页面的api交互 */
    const $message = (config: any) => {
      let timeout = null as any

      let cancelCallback = () => {
        setIframeLoading(false)
        Modal.destroyAll()
        clearTimeout(timeout)
        getDetail()
      }

      Modal.info({
        content: config.message,
        onCancel: () => cancelCallback()
      })

      if (config.duration) setTimeout(() => {
        cancelCallback()
      }, config.duration)
    }

    $message.success = (text: string) => message.success(text)
    $message.close = (text: string) => Modal.destroyAll()

    window.app = {
      $message
    }
  }

  /**清除配置 */
  const removeSetting = () => {
    window.app = undefined
  }

  const getDetail = () => {
    let eventId = props.match.params.id
    if (eventId) {
      setIframeLoading(true)

      Promise.all([
        api.getDetail(eventId),
        api.getTimeline(eventId)
      ])
        .then((res) => {
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
            instance: { ...data },
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
              // thExpain = <span style={{ color: 'red' }}>退回原因：{paramMap[`${badEventCode}_th_explain`] || '无'}</span>
            }

            let line1Text = `${operatorName} ${operatorWardName}`
            if (!newItem.id) line1Text = '未完成'
            description = (
              <div>
                {timeData[i].auditMind && (
                  <div>
                    <span>{timeData[i].auditMind}</span>
                  </div>
                )}
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

          //南医三压力性损伤事件
          let patientId = paramMap[`${badEventCode}_patient_id`] || '1048880'
          let visitId = paramMap[`${badEventCode}_visit_id`] || '1'
          // if (badEventCode === 'badevent_nys_pressure' && patientId && visitId) 
          let recordWardcode = data.wardCode
          recordWardcode = '123456'
          getZhunKeInfo(patientId, visitId, recordWardcode)
        }, err => setIframeLoading(false))
    }
  }

  //判断是否转科，确定对应的流转科室流程
  const getZhunKeInfo = (patientId: string | number, visitId: string | number, reportWardCode: string | number) => {
    setPatientInfoLoading(true)
    api
      .getPatientInfo(patientId, visitId)
      .then(res => {
        setPatientInfoLoading(false)
        if (res.data) {
          setPatientInfo(res.data)

          //如果用户当前科室和报告科室不同，认为已转科
          if (res.data.wardCode != reportWardCode)
            setZhuanKe(true)
        }
      }, () => setPatientInfoLoading(false))
  }

  const handleOk = () => {
    setTimeout(() => appStore.history.goBack(), 1000)
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
    let btnDisable = iframeLoading
    if (!authStore.user) return ''
    if (!nextStep) return ''

    let btnText = nextStep.operatorName

    return (
      <Button
        className='audit'
        type='primary'
        onClick={(e) => {
          if (
            nextStep &&
            nextStep.operatorStatus === 'department_back'
          ) {

            if (patientInfoLoading) {
              message.warning('获取用户转科信息，请稍后再操作...')
              return
            }

            if (!patientInfoLoading && Object.keys(patientInfo).length <= 0) {
              message.error('用户转科信息获取失败')
              return
            }

            setAuditModalvisible(true)
          } else {
            setAuditModalvisible(true)
          }
        }}
        disabled={btnDisable}>
        {btnText}
      </Button>
    )
  }

  const iframeRef = React.createRef<any>()

  const handleSave = () => {
    let iframeEl = iframeRef.current
    if (iframeEl) {
      setIframeLoading(true)
      iframeEl.contentWindow.CRForm.controller.saveForm()
    }
  }

  const handlePrint = () => {
    let iframeEl = iframeRef.current
    if (iframeEl) {
      iframeEl.contentWindow.print()
    }
  }

  return (
    <Wrapper>
      <div className='topbar'>
        <div className='nav'>
          {appStore.onlyBadEvent ?
            (<span><Link to='/'>不良事件</Link> &gt; 事件详情</span>) :
            (<span> <Link to='/badEventsNewlist'>不良事件</Link> &gt; 事件详情</span>)
          }
        </div>
        <div className='title'>
          <span className='bad-event-order-no'>
            {props.match.params.orderNo || ''} {detailData.badEventName}
          </span>
          <Button
            className='audit'
            onClick={() => appStore.history.goBack()}>
            返回
          </Button>
          {AuditBtn()}
          {nextStep && nextStep.operatorStatus == 'nurse_auditor' && (
            <Button
              disabled={iframeLoading}
              className='audit'
              onClick={handleSave}>
              保存
            </Button>
          )}
          <Button
            disabled={iframeLoading}
            className='audit'
            onClick={handlePrint}>
            打印
          </Button>
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
              // console.log(item.title)
              return (
                <Step
                  title={item.title}
                  icon={icon}
                  description={item.description}
                  key={idx} />
              )
            })}
          </Steps>
        </div>
        <div className='event-detail'>
          <iframe
            src={iframeUrl()}
            ref={iframeRef}
            width='100%'
            height='100%'
            style={{ border: '0' }}
            onLoad={handleIframeLoad} />
          <Spin
            size='large'
            spinning={iframeLoading}
            className='iframe-loading' />
        </div>
      </div>
      <AuditModalNys
        visible={auditModalvisible}
        onOk={handleOk}
        eventCode={detailData.badEventCode}
        paramMap={detailData.paramMap}
        instanceOrign={detailData.instance}
        status={nextStep ? nextStep.operatorStatus : ''}
        title={nextStep ? nextStep.operatorName : ''}
        id={props.match.params.id}
        reportDept={reportDept}
        isZhuanke={zhuanKe}
        patientInfo={patientInfo}
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
        margin-left: 10px;
        &:last-of-type{
          margin-left: 0;
        }
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
    bottom: 0;
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
