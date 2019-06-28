import React, { useState, useEffect } from 'react'
import { Button, Steps, Icon, Spin } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import AuditModal from './components/AuditModal'
import badEventsNewService from './api/badEventsNewService'
import { authStore, appStore } from 'src/stores'
import qs from 'qs'


const api = new badEventsNewService();

const baseFormUrl = '/crNursing/formUrl';
const formUrl = process.env.NODE_ENV !== "development" ? baseFormUrl : "http://" + window.location.hostname + ":8088" + baseFormUrl;

const { Step } = Steps;

export default withRouter(function BadEventsNewDetail(props: any) {
  const [auditModalvisible, setAuditModalvisible] = useState(false);
  // const [status, setStatus] = useState(3);
  const [detailData, setDetailData] = useState({
    status: '',
    badEventCode: '',
    badEventName: '',
    eventType: '',
    departmentCode: '',
    paramMap: {} as any
  });

  const [reportDept, setReportDept] = useState({
    code: '',
    name: ''
  })

  const [iframeLoading, setIframeLoading] = useState(true);
  //初始化时间戳
  const initTimeLine = [
    {
      title: '保存',
      statuses: ['0'],
      description: <span>未完成</span>
    },
    {
      title: '上报',
      statuses: ['1'],
      description: <span>未完成</span>
    },
    {
      title: '质控科审核',
      statuses: ['2', '-2'],
      description: <span>未完成</span>
    },
    {
      title: '主管科室处理',
      statuses: ['3'],
      description: <span>未完成</span>
    },
    {
      title: '质控科总结',
      statuses: ['4'],
      description: <span>未完成</span>
    },
    {
      title: '医院质量与安全管理委员会处理',
      statuses: ['5'],
      description: <span>未完成</span>
    },
  ];
  //右侧时间轴
  const [timeLine, setTimeLine] = useState(initTimeLine.concat())
  //用于刷新iframe的时间戳
  const [timeSet, setTimeset] = useState(new Date().getTime());

  interface stringObj {
    [key: string]: string
  }
  const statusObj: stringObj = {
    '-1': '禁用',
    '0': '保存',
    '1': '护士上报',
    '2': '质管科审核通过',
    '-2': '质管科审核不通过',
    '3': '责任科室已处理',
    '4': '质控科已总结',
    '5': '质量委员会已处理',
  }

  const iframeUrl = (): string => {

    let appToken = appStore.getAppToken();
    let authToken = authStore.getAuthToken();
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
    return `${formUrl}/不良事件病人安全通报单.html?${qs.stringify(query)}`;
  }


  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = () => {
    let eventId = props.match.params.id;
    if (eventId) {
      setIframeLoading(true);

      Promise
        .all([api.getDetail(eventId), api.getTimeline(eventId)])
        .then(res => {
          let data = res[0].data.instance;
          let paramMap = res[0].data.paramMap;
          let timeData = res[1].data;
          let { badEventCode, badEventName, eventType, departmentCode } = data;
          setDetailData({
            ...detailData,
            status: data.status || '',
            badEventCode,
            badEventName,
            eventType,
            departmentCode,
            paramMap
          });

          let newTimeline = timeLine.concat();
          newTimeline = newTimeline.map((item, idx) => {
            let newItem = { ...initTimeLine[idx] };
            for (let i = 0; i < timeData.length; i++) {
              if (item.statuses.indexOf(timeData[i].operatorStatus) >= 0) {
                let description;
                let title = '';
                let operatorName = timeData[i].operatorName;
                let operatorWardName = timeData[i].operatorWardName;
                let operatorWardCode = timeData[i].operatorWardCode;

                let dateString = timeData[i].operateDate;
                switch (new Date(dateString).getDay()) {
                  case 1: dateString += ' (周一)'; break;
                  case 2: dateString += ' (周二)'; break;
                  case 3: dateString += ' (周三)'; break;
                  case 4: dateString += ' (周四)'; break;
                  case 5: dateString += ' (周五)'; break;
                  case 6: dateString += ' (周六)'; break;
                  case 0: dateString += ' (周日)'; break;
                }
                let deptName = paramMap[`${badEventCode}_department_name`] || '';

                let thExpain = '' as any;

                switch (timeData[i].operatorStatus) {
                  case '0':
                    operatorName = '***'
                    title = `保存：${data.badEventName}事件`
                    break
                  case '1':
                    operatorName = '***'
                    //设置审核时上报人的科室
                    setReportDept({
                      code: operatorWardCode,
                      name: operatorWardName,
                    });
                    break
                  case '2':
                    if (deptName) title = `质控科审核：转发${deptName}`
                    break
                  case '-2':
                    thExpain = <span style={{ color: 'red' }}>退回原因：{paramMap[`${badEventCode}_th_explain`] || '无'}</span>
                    break
                  case '3':
                    if (deptName) title = `${deptName}处理`
                    break
                  case '4':
                    break
                  case '5':
                    break
                }

                description = <div>
                  <span>{`${operatorName} ${operatorWardName}`}</span><br />
                  <span>{dateString}</span><br />
                  {thExpain}
                </div>;

                if (title) newItem.title = title;

                return {
                  ...newItem,
                  description
                }
              }
            }

            return newItem
          })

          setTimeLine(newTimeline);
          setTimeset(new Date().getTime());
        });
    }
  }

  const handleOk = () => {
    setAuditModalvisible(false);
    getDetail();
  }

  const handleCancel = () => {
    setAuditModalvisible(false);
  }
  const statusText = () => {
    let text = statusObj[detailData.status];
    if (!text) text = '';
    return text
  }

  const handleIframeLoad = () => {
    setIframeLoading(false);
  }

  const StepsCurrent = () => {
    for (let i = 0; i < timeLine.length; i++) {
      if (timeLine[i].statuses.indexOf(detailData.status) >= 0) return i
    }
    return -1
  }

  const AuditBtn = () => {
    let status = detailData.status;
    let btnDisable = iframeLoading;
    let btnText = '';
    if (!authStore.user) return '';

    switch (status) {
      case '1':
        btnText = '审核';
        break;
      case '2':
        btnText = '科室审核';
        console.log(authStore.user,detailData.departmentCode)
        if (authStore.user.deptCode !== detailData.departmentCode) btnDisable = true;
        break;
      case '3':
        btnText = '总结';
        break;
      case '4':
        btnText = '质量委员会审核';

        if (detailData.paramMap[`${detailData.badEventCode}_tjzlanwyh_option`] == '不提交') return '';

        break;
      default:
        btnText = '无可用操作';
        return '';
    }
    return <Button className="audit" type="primary" onClick={e => setAuditModalvisible(true)} disabled={btnDisable}>{btnText}</Button>
  }

  return <Wrapper>
    <div className="topbar">
      <div className="nav">
        <Link to="/badEventsNewlist">不良事件</Link> > 事件详情
      </div>
      <div className="title">
        <span className="bad-event-order-no">
          {props.match.params.orderNo || ''}  {detailData.badEventName}
        </span>
        {AuditBtn()}
      </div>
      <div className="status">状态：{statusText()}</div>
    </div>
    <div className="main-contain">
      <div className="status-line">
        <Steps direction="vertical" size="small" current={StepsCurrent()} className="status-line-content">
          {timeLine.map((item, idx) => {
            if (detailData.paramMap[`${detailData.badEventCode}_tjzlanwyh_option`] == '不提交' && item.statuses.indexOf('5') >= 0) return '';

            let icon: any;
            if (idx <= StepsCurrent()) {
              icon = <Icon type="check-circle" className="icon-step" />
              if (idx == StepsCurrent() && detailData.status == '-2')
                icon = <Icon type="close-circle" className="icon-step" style={{ color: 'red' }} />
            } else {
              icon = '';
            }
            return <Step title={item.title} icon={icon} description={item.description} key={idx} />
          })}
        </Steps>
      </div>
      <div className="event-detail">
        <iframe src={iframeUrl()} width="100%" height="100%" style={{ border: '0' }} onLoad={handleIframeLoad}></iframe>
        <Spin size="large" spinning={iframeLoading} className="iframe-loading" />
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
      onCancel={handleCancel} />
  </Wrapper>
})

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  .topbar{
    background #fff;
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
    bottom: 0;
    .status-line{
      float: right;
      width: 300px;
      height: 100%;
      background: #fff;
      border-left: 1px solid #ddd;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 18px;
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
  .icon-step svg{
    width: 24px;
    height: 24px;
  }
  .iframe-loading{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
`