import qs from 'qs'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Button, Divider, Icon, Input, message, Modal, Spin, Steps } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { appStore, authStore } from 'src/stores'

import AuditModal_gzsrm from './components/AuditModal_gzsrm'
import UserCheckModal from './components/UserCheckModal'
import badEventsNewService, { revokeIn } from './api/badEventsNewService'

const api = new badEventsNewService()

const baseFormUrl = '/crNursing/formUrl'
const formUrl = baseFormUrl

const { Step } = Steps
export default withRouter(function BadEventsNewDetail(props: any) {
  const iframeRef = React.useRef<any>()

  const [auditModalVisible, setAuditModalVisible] = useState(false)
  const [opinionContent, setOpinionContent] = useState({ nodeName: "", handleContent: "", nodeCode: "" });
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

  const { master, handlenodeDto, itemDataMap } = detailData

  const [iframeLoading, setIframeLoading] = useState(true)
  
  const [userCheckVisible, setUserCheckVisible] = useState(false)

  let stepCurrent = [...handlenodeDto].reverse().find((step: any) => step.nodeCode === master.currentNodeCode)
  //下一步的审核状态

  let stepNext = (() => {
    let nextIdx = handlenodeDto.indexOf(stepCurrent) + 1
    // [...handlenodeDto].reverse().find((step: any) => step.nodeCode === master.nextNodeCode) || {} as any
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
      badEvent: eventType,
      badEventType: eventType,
      badEventCode: formCode,
      badEventName: formName,
      operation: AuditBtn() ? 'edit' :'view',

      // operation: stepNext && ['nurse_handle'].includes(stepNext.nodeCode) ? 'edit' : 'view',
      isIndependent: 0,
      timeset: timeSet
    }

    for (let x in query) {
      if (!query[x] && query[x] !== 0) return ''
    }
    let { hostname, protocol } = window.location
    let port = '8088'
    // let devFormUrl = 'http://localhost:8088'
    let devFormUrl = `${protocol}//${hostname}:${port}${formUrl}`
    let commonUrl = appStore.isDevelopment ? devFormUrl : formUrl
    console.log(appStore.isDevelopment, commonUrl)
    return `${commonUrl}/不良事件病人安全通报单.html?${qs.stringify(query)}`
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
  const handleRevoke = () => {
    Modal.confirm({
      title: '撤销',
      content: '是否继续撤销?',
      onOk() {
        setUserCheckVisible(true)
      } 
    })
    
  }
  const handleUserCheckOk = async(msg: any) => {
    let params: revokeIn = {
      empNo: msg.empNo,
      password: msg.password,
      id: master?.id,
      noPass: true,
      nodeCode: stepNext?.nodeCode || '',
      operateType: "withdraw"
    }
    try {
      const res = await api.handleRevoke(params)
      handleOk()
    } catch (e) {
    }
  }
  // 撤销按钮 需要护理部权限 可撤销到提交
  const revokeBtn = () => {
    if (!authStore.isDepartment) return ''
    if (!['nursing_minister_audit',
    'district_nurse_audit',
    'nursing_minister_comfirm'].includes(stepCurrent?.nodeCode)) return ''
    return (
      <Button className='audit' onClick={handleRevoke} type="primary">
        撤销
      </Button>
    )
  }

  const AuditBtn = () => {
    let btnDisable = iframeLoading
    if (!authStore.user) return ''
    if (Object.keys(stepNext).length <= 0) return ''
    if (['commit', 'save'].includes(stepNext?.nodeCode)) return ''
    if (itemDataMap.B0002061 && itemDataMap.B0002061 == '2') return ''//非护理不良事件不返回
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
  const opinion = () => {
    if (!authStore.isDepartment) return ''
    return (
      <Button
        className='audit'
        type='primary'
        onClick={() => setOpinion()}
      >
        提交修改
      </Button>
    )
  }
  const setOpinion = () => {
    // console.log(opinionContent)
    if (Object.keys(opinionContent).length == 3) return message.error('暂无修改内容');
    let code = {
      nurse_handle: "B0002060",
      nursing_minister_audit: "B0002054",
      dept_handle: "B0002057",
      nursing_minister_comfirm: "B0002059"
    };
    let data: any = {
      formId: master.id,
      nodeCode: opinionContent.nodeCode,
      handleContent: opinionContent.handleContent,
      itemCode: code[opinionContent.nodeCode]
    };
    Modal.confirm({
      title: `确定修改‘${opinionContent?.nodeName}’的意见吗?`,
      content: `修改为：${opinionContent?.handleContent}`,
      onOk() {
        api.updateOpinion(data).then(res => {
          if (res.code == 200) {
            message.success('修改成功')
            getDetail()
          }
        })
      },
      onCancel() {
      }
    })
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
  // 是否为撤销项
  const isRevoke = (item: any) => {
    return item && item.expand == 'withdraw'
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
            {master.eventType}
          </span>
          <Button
            className='audit'
            onClick={() => appStore.history.goBack()}>
            返回
          </Button>
          {AuditBtn()}
          {opinion()}
          {revokeBtn()}
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
          {/* <Button
            disabled={iframeLoading}
            className='audit'
            onClick={handlePrint}>
            打印
          </Button> */}
        </div>
        <div className='status'>状态：{stepCurrent?.nodeName}</div>
      </div>
      <div className='main-contain'>
        <div className='status-line'>
          <div className='right-pannel-title'>事件轨迹:</div>
          {/* 非不良事件去除 */}
          {(!itemDataMap.B0002061 || itemDataMap.B0002061 != '2') ? <Steps direction='vertical' size='small' current={handlenodeDto.indexOf(stepCurrent)} className='status-line-content'>
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
                      {handlenodeDto[idx + 1] && handlenodeDto[idx + 1].status == '0' && item.status == '1' && item.nodeCode != 'commit' && item.nodeCode != 'save'
                        ? <Input.TextArea
                          defaultValue={item.handleContent}
                          rows={2}
                          disabled={!authStore.isDepartment || isRevoke(item)}
                          onChange={(e) =>
                            // setFormItem({ 'SR0004024': e.target.value })
                            // console.log(e.target.value)
                            setOpinionContent({ ...item, handleContent: e.target.value })
                          }
                          className={isRevoke(item) ? 'revoke': ''}
                          style={{
                            background: 'rgb(238,238,238)',
                            borderRadius: '5px',
                            padding: '0 5px',
                          }}
                        /> : item.handleContent ? <div className={`handle-content ${isRevoke(item) ? ' revoke': ''}`}>
                          <span>{item.handleContent}</span>
                        </div> : ""
                      }
                      {/* {item.handleContent && (
                        <div className="handle-content">
                          <span>{item.handleContent}</span>

                        </div>
                      )} */}
                      {/* {item.expand} */}
                    </div>
                  </div>}
                  key={idx} />
              )
            })}
          </Steps> : <div style={{ textIndent: 15, color: "red" }}>非护理不良事件</div>}
        </div>
        <div className='event-detail'>
          <iframe
            src={iframeUrl()}
            ref={iframeRef}
            width='100%'
            height='100%'
            style={{ border: '0' }}
            className={'badEvent-iframe'}
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
        iframeRef={iframeRef}
        onOk={handleOk}
        dataOrigin={detailData}
        nodeInfo={stepNext}
        onCancel={handleCancel}
      />
      <UserCheckModal
        visible={userCheckVisible}
        onCancel={() => setUserCheckVisible(false)}
        onOk={handleUserCheckOk} />
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
  .revoke {
    color: #f00
  }
`
