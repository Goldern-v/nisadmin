import styled from 'styled-components'
import React, {useState, useEffect} from 'react'
import {Button, message} from 'antd'
import {Link} from 'react-router-dom'
import {appStore} from 'src/stores'
import createModal from "src/libs/createModal"
import {observer} from 'mobx-react-lite'
import printing from 'printing'
import {scheduleStore} from 'src/stores'

// import { trainingInfoReviewService } from './api/TrainingInfoReviewService'
import {trainingInfoReviewModel} from './model/TrainingInfoReviewModel'

import {
    Wrapper,
    TopPannel,
    NavCon,
    MainTitle,
    SubContent,
    ButtonGroups,
    MainPannel,
} from './components/common'
import BaseInfoPannel from './components/BaseInfoPannel'
import AuditInfoPannel from './components/AuditInfoPannel'
import AuditModal from './../auditEduPlant/components/AuditModal'

export interface Props {
}

export default observer(function TrainingInfoReview() {
    const {history, queryObj} = appStore
    let printRef: any = React.createRef<HTMLDivElement>();
    const auditModal = createModal(AuditModal)
    const {baseInfo, auditInfo, taskTypeName} = trainingInfoReviewModel
    const lastAuditItem = auditInfo[auditInfo.length - 1] || null

    const handleAuditOpen = () => {
        auditModal.show({
            taskIdList: [appStore.queryObj.taskId],
            onOkCallBack: () => setTimeout(() => history.goBack(), 500)
        })
    }
    const printDetail = () => {
        printing(scheduleStore.printELement, {
            injectGlobalCss: true,
            scanStyles: false,
            css: `
           @page {
            margin: 0mm 0mm 0mm 0mm;
           }
           #print-detail-container{
           padding:0mm 5mm;
           overflow: hidden;
           }
          .main-title{
              display:flex;
              justify-content: center;
              align-items: center;
              font-weight: 800;
              font-size:20px;
              margin-top:10mm;
              margin-bottom:10mm
           }
           .content-item-title{
              font-weight: 800;
              font-size:16px;
           }
            .content-item-title::before{
             content:'';
             display: inline-block;
             height: 18px;
             width: 5px;
             background: rgba(112, 182, 3, 1);
             vertical-align: sub;
             margin-right: 10px;
            }
        `
        });
    }
    useEffect(() => {
        trainingInfoReviewModel.init()
    }, [])

    return <Wrapper>
        <TopPannel>
            <NavCon>
                <Link to="/home">主页</Link>
                <span> &gt; </span>
                <Link to="/continuingEdu">学习培训</Link>
                <span> &gt; 信息查看</span>
                {/* <Link to="/home">二级目录</Link> */}
                {baseInfo && <span> &gt; {baseInfo.title}</span>}
            </NavCon>
            <MainTitle>{baseInfo.title || ' '}</MainTitle>
            <SubContent>
                <span className="label"> 状态:</span>
                <span
                    className="content"
                    style={{
                        color:
                            lastAuditItem &&
                            (lastAuditItem.taskType == 4) ?
                                'red' : 'blue'
                    }}>
          {lastAuditItem &&
              <React.Fragment>
                  <span>{lastAuditItem.taskDesc}</span>
                  <span>{lastAuditItem.taskType == 4 && `(${taskTypeName(lastAuditItem.taskType)})`}</span>
              </React.Fragment>}
        </span>
            </SubContent>
            <ButtonGroups>
                {queryObj.audit &&
                    appStore.hisMatch({
                        map: {
                            hj: (
                                <Button
                                    type="primary"
                                    onClick={handleAuditOpen}>
                                    {queryObj.statusDesc ? '审核' : '未知审核流程'}
                                </Button>
                            ),
                            default: (
                                <Button
                                    type="primary"
                                    onClick={handleAuditOpen}>
                                    {queryObj.statusDesc || '未知审核流程'}
                                </Button>
                            )
                        }
                    })}
                {appStore.HOSPITAL_ID === 'hj' && <Button onClick={() => printDetail()}>打印
                </Button>}
                <Button
                    onClick={() => history.goBack()}>
                    返回
                </Button>
            </ButtonGroups>
        </TopPannel>
        <MainPannel>
            <AuditInfoPannel/>
            <BaseInfoPannel/>
            <auditModal.Component/>
        </MainPannel>
    </Wrapper>
})
