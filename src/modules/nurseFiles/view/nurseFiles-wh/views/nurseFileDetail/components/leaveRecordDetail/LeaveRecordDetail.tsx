import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Spin,message,Timeline } from 'antd'
import { ScrollBox } from 'src/components/common'
import { appStore } from 'src/stores'
import qs from 'qs'
import DetailHeader from './DetailHeader'
import EmployeeLeaveApplyForm from './EmployeeLeaveApplyForm'
import { nurseFilesService } from 'src/modules/nurseFiles/view/nurseFiles-wh/services/NurseFilesService'
import { leaveRecordModal } from './modal';
import MilitaryLeaveApplyForm from './MilitaryLeaveApplyForm'

export default function LeaveRecordDetailLayout() {
  let [loading, setLoading] = useState(false)
  const whichFormPage = () => {
    const { employeePager } = leaveRecordModal
    console.log(employeePager,'whichFormPage');
    
    const formMap = {
      "0": <EmployeeLeaveApplyForm/>,
      "1": <MilitaryLeaveApplyForm/>,
    }
    return String(employeePager.recordType) ? formMap[employeePager.recordType] : formMap["1"];
  }

  useEffect(() => {
    initDetail()
  }, [])

  const initDetail = ()=>{
    setLoading(true)
    const search = qs.parse(appStore.location.search.replace("?", ""));
    if(!search.id && search.recordType){
      nurseFilesService.leaveApplicationCreate({recordType:search.recordType}).then((res:any)=>{
        if(res.data){
          leaveRecordModal.employeePager = res.data
          message.success('创建成功')
        }
        setLoading(false)
      })
    }else if(search.id){
      nurseFilesService.leaveApplicationDetail(search.id).then((res:any)=>{
        if(res.data){
          let leaveDetail = JSON.parse(res.data.leaveDetail)
          let travelRoute = res.data?.travelRoute ? JSON.parse(res.data.travelRoute) : null
          leaveRecordModal.employeePager = {...res.data,...leaveDetail,...travelRoute}
        }
        setLoading(false)
      })
    }
  }

  return (
    <Con>
      <HeaderCon>
        <DetailHeader initDetail={initDetail}></DetailHeader>
      </HeaderCon>
      <MidCon>
        <MidConScrollCon>
          <SpinCon>
            {loading 
              ? (
                <div className='LoadingCon'>
                  <Spin spinning={loading} className='SpinLoadingClass' />
                </div>
              ) 
              : ('')
            }
          </SpinCon>
          <MidLeftCon>
            { whichFormPage() }
          </MidLeftCon>
          <MidRightCon>
            { leaveRecordModal?.employeePager?.nodeList?.length>0 &&
              <>
                <div className='audit-title'>审核流程</div>
                <div>
                  <Timeline>
                    {
                      leaveRecordModal.employeePager.nodeList.map((item: any, index: number) => {
                        console.log(item,'item');
                        
                        return <Timeline.Item key={index} color={item.state === '1' ? 'green' : 'rgba(0,0,0,.25)'}>
                          <div className='timeline-item'>{item.nodeName}</div>
                          { item.empName && <div className='timeline-item'>{`${item.empName}${item.nodeCode==="commit" ? "" : item.pass?'通过':'驳回'}`}</div>}
                          <div className='timeline-item'>{item.handleTime}</div>
                          {item.content && 
                            <div className='timeline-item'
                              style={{
                                background: 'rgb(238,238,238)',
                                borderRadius: '5px',
                                padding: '0 5px'
                              }}>
                                原因分析：<span>{item.content}</span>
                            </div>
                          }
                          {item.expand && 
                            <div className='timeline-item'
                              style={{
                                background: 'rgb(238,238,238)',
                                borderRadius: '5px',
                                padding: '0 5px'
                              }}>
                                整改措施：<span>{item.expand}</span>
                            </div>
                          }
                        </Timeline.Item>
                      })
                    }
                  </Timeline>
                </div>
              </>
            }
          </MidRightCon>
        </MidConScrollCon>
      </MidCon>
    </Con>
  )
}

const Con = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`
const HeaderCon = styled.div`
  height: 95px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`
const MidCon = styled.div`
  flex: 1;
  height: calc(100vh - 145px);
`
const MidConScrollCon = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  position: relative;
`

// @ts-ignore
const MidLeftCon = styled(ScrollBox)`
  box-sizing: border-box;
  padding: 20px 0;
  flex: 1;
  width: 0;
  height: 100%;
  background-color: #eeeeee;
  align-items: stretch;
  
`
const MidRightCon = styled.div`
  width: 317px; 
  padding: 20px;
  height: 100%;
  /* background-color: gray; */
  align-items: stretch;
  background: rgba(247, 250, 250, 1);
  overflow-y: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
  .audit-title{
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .timeline-item{
    line-height:22px;
  }
`
const SpinCon = styled.div`
  .LoadingCon {
    z-index: 99;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .SpinLoadingClass {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
