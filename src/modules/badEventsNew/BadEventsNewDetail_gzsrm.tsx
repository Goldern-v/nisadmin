import React, { useState, useEffect } from 'react'
import { Button, Steps, Icon, Spin, Modal, Divider } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import AuditModal_gzsrm from './components/AuditModal_gzsrm'
import badEventsNewService from './api/badEventsNewService'
import { authStore, appStore } from 'src/stores'
import qs from 'qs'
import { message } from 'antd/es'

const api = new badEventsNewService()

const baseFormUrl = '/crNursing/formUrl'
const formUrl = baseFormUrl

const { Step } = Steps
export default withRouter(function BadEventsNewDetail(props: any) {

  const iframeRef = React.useRef<any>()

  const [auditModalVisible, setAuditModalVisible] = useState(false)

  const [detailData, setDetailData] = useState({
    master: {},
    itemDataMap: {},
    handlenodeDto: [],
    commit: false
  } as {
    master: {
      [p: string]: any
    },
    itemDataMap: {
      [p: string]: any
    },
    handlenodeDto: any[],
    commit: boolean,
    [p: string]: any
  })

  const { master, handlenodeDto } = detailData

  const [iframeLoading, setIframeLoading] = useState(true)

  let stepCurrent = [...handlenodeDto].reverse().find((step: any) => step.nodeCode === master.currentNodeCode)
  //下一步的审核状态

  let stepNext = (() => {

    let nextIdx = handlenodeDto.indexOf(stepCurrent) + 1

    return handlenodeDto[nextIdx] || {} as any
  })()
  //用于刷新iframe的时间戳
  const [timeSet, setTimeset] = useState(new Date().getTime())

  const iframeUrl = (): string => {
    let appToken = appStore.getAppToken()
    let authToken = authStore.getAuthToken()
    let { formName, formCode, eventType } = master

    let query: any = {
      id: props.match.params.id || '',
      token: `App-Token-Nursing=${appToken}&Auth-Token-Nursing=${authToken}`,
      badEvent: formName,
      // badEventType: eventType,
      badEventCode: formCode,
      operation: 'view',
      // operation: stepNext && stepNext.canUpdate? 'edit' : 'view',
      isIndependent: 1,
      timeset: timeSet
    }

    for (let x in query) {
      if (!query[x]) return ''
    }

    return `${formUrl}/不良事件病人安全通报单.html?${qs.stringify(query)}`
  }

  useEffect(() => {
    getDetail()
    // getTypeList()
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

      api.getBadEventMaster(eventId)
        .then((res) => {
          if (res.data) {
            let { master, itemDataMap, handlenodeDto, commit } = res.data
            setDetailData({
              master,
              itemDataMap,
              handlenodeDto,
              commit
            })
          }

          setTimeset(new Date().getTime())
        }, err => setIframeLoading(false))
    }
  }

  const handleOk = () => {
    setTimeout(() => appStore.history.goBack(), 1000)
  }

  const handleCancel = () => {
    setAuditModalVisible(false)
  }

  const handleIframeLoad = () => {
    setIframeLoading(false)
  }

  const AuditBtn = () => {
    let btnDisable = iframeLoading
    if (!authStore.user) return ''
    if (Object.keys(stepNext).length <= 0) return ''
    if (['commit', 'save'].includes(stepNext?.nodeCode)) return ''

    let btnText = stepNext.nodeName

    if (stepNext?.canHandle) btnDisable = false

    return (
      <Button
        className='audit'
        type='primary'
        onClick={(e) => setAuditModalVisible(true)}
        disabled={btnDisable}>
        {btnText}
      </Button>
    )
  }

  // const handleSave = () => {
  //   let iframeEl = iframeRef.current
  //   if (iframeEl) {
  //     setIframeLoading(true)
  //     iframeEl.contentWindow.CRForm.controller.saveForm()
  //   }
  // }

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
            {master.formName}
          </span>
          <Button
            className='audit'
            onClick={() => appStore.history.goBack()}>
            返回
          </Button>
          {AuditBtn()}
          {/* {stepNext && stepNext.operatorStatus == 'nurse_auditor' && (
            <Button
              disabled={iframeLoading}
              className='audit'
              onClick={handleSave}>
              保存
            </Button>
          )} */}
          {/* <Button
            disabled={iframeLoading}
            className='audit'
            onClick={() => timelinePrint({
              hideName: master.anonymous || false,
              title: `${master.badEventOrderNo} ${master.formName}`,
              timeline: timeLine
            })}>
            事件轨迹打印
          </Button> */}
          <Button
            disabled={iframeLoading}
            className='audit'
            onClick={handlePrint}>
            打印
          </Button>
        </div>
        <div className='status'>状态：{stepCurrent?.nodeName}</div>
      </div>
      <div className='main-contain'>
        <div className='status-line'>
          <div className='right-pannel-title'>事件轨迹:</div>
          <Steps direction='vertical' size='small' current={handlenodeDto.indexOf(stepCurrent)} className='status-line-content'>
            {handlenodeDto.map((item, idx: number) => {
              let icon: any

              if (!item.noPass) {
                icon = <Icon type='check-circle' className='icon-step success' />
              } else {
                icon = <Icon type='close-circle' className='icon-step error' />
              }
              if (item.status === "0")
                icon = <Icon type='minus-circle' className='icon-step default' />
              // icon = <Icon type='right-circle' className='icon-step default' />
              // console.log(item.title)
              return (
                <Step
                  title={item.title}
                  icon={icon}
                  description={<div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 'bold' }}>{item.nodeName}</div>
                      <span>{item.handlerName}</span>
                      <br />
                      <span>{item.handleTime}</span>
                      <br />
                      {item.handleContent && (
                        <div className="handle-content">
                          <span>{item.handleContent}</span>
                        </div>
                      )}
                      {/* {item.expand} */}
                    </div>
                  </div>}
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
            onError={handleIframeLoad}
            onLoad={handleIframeLoad} />
          <Spin
            size='large'
            spinning={iframeLoading}
            className='iframe-loading' />
        </div>
      </div>
      <AuditModal_gzsrm
        visible={auditModalVisible}
        onOk={handleOk}
        dataOrigin={detailData}
        nodeInfo={stepNext}
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
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #eaeaea;
      }
      &::-webkit-scrollbar-track {
        border-radius: 50px;
        background-color: #eaeaea;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 50px;
        background-color: #c2c2c2;
      }
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
  .handle-content{
    background: #eee;
    padding: 5px 10px;
    margin-right: 20px;
    border-radius: 3px;
  }
`
