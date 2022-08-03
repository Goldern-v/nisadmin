import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseBreadcrumb from 'src/components/BaseBreadcrumb'
import { Button, message, Spin, Modal, Empty } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { ScrollBox } from 'src/components/common'
import {PromotionDetaitUtils} from './promotionDedait'
import printing from 'printing'
import { useRef } from 'src/types/react'
import { appStore, authStore } from 'src/stores'
import { badEventReportService } from './services/BadEventReportService'
import PromotionTable from './PromotionTable'
import NurseReviews from './view/NurseReviews'
import qs from 'qs'
export interface Props extends RouteComponentProps { }

export default observer(function NursingReportDetailView() {
  const printRef: any = useRef(null);
  const [currentPage, setCurrentPage]: any = useState({})
  const [spinning, setSpinning] = useState(false)
  const [userCheckVisible, setUserCheckVisible] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false);

  useEffect(() => {
    let search = appStore.location.search
    let query = qs.parse(search.replace('?', ''))
    setCurrentPage(query)
    PromotionDetaitUtils.master.id = query.othersMessage.id
    PromotionDetaitUtils.createOnload()
  }, [])

  const handleUserCheckOk = (userAudit: any, value: any) => {
    setUserCheckVisible(false);
    appStore.history.goBack()
  };

  const handleOpenModal = ()=>{
    setUserCheckVisible(true)
  }
 
  
  const AuditBtn = () => {
    let  stepCurrent:any = PromotionDetaitUtils.savdfege()

    if (Object.keys(stepCurrent).length <= 0) return ''
    let btnText = stepCurrent.nodeName
    return (
      <Button
        className='audit'
        type='primary'
        onClick= {handleOpenModal}>
        {btnText}
      </Button>
    )
  }

  return (
    <Wrapper>
      <HeadCon>
        <BaseBreadcrumb data={[{ name: '审核管理', link: '/auditsManagement' }, { name: currentPage?.message || '临床护理人员晋升申请表', link: '' }]} />
        <div className='title'>{currentPage.message}</div>
        <div className='aside'>
          <span>
          提交时间:{currentPage?.othersMessage?.lastCommitTime}
          </span>
        </div>
        <div className='tool-con'>
          {currentPage.needAudit == 'true' && AuditBtn()}
          <Button onClick={() => appStore.history.goBack()}>返回</Button>
        </div>
      </HeadCon>
      <ScrollCon>
        <Spin spinning={spinning} >
       { PromotionDetaitUtils.isEditList  ? <PromotionTable printRef={printRef}></PromotionTable>: <Empty style={{height:680,paddingTop: '152px'}}/>}
        </Spin>
      </ScrollCon>
      <NurseReviews
        visible={userCheckVisible}
        onCancel={() => setUserCheckVisible(false)}
        onOk={handleUserCheckOk}
      />
    </Wrapper>
  )
})
const Wrapper = styled.div`
 
`

const HeadCon = styled.div`
  height: 100px;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #dddddd;
  .title {
    font-size: 16px;
    margin: 0 0 5px 20px;
    font-weight: bold;
    min-height: 30px;
  }
  .aside {
    font-size: 14px;
    color: #8c8c8c;
    margin: 0 0 0 20px;
  }
  .tool-con {
    position: absolute;
    bottom: 20px;
    right: 100px;
    width: 300px;
    height: 45px;
    display: flex;
    align-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    button {
      margin-left: 15px;
      margin-bottom: 10px;
    }
  }
`
const Page = styled.div`
  width: 780px;
  margin: 20px auto 20px;
  padding-bottom: 10px;
  background: #fff;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  min-height:700px;
`

const ScrollCon = styled(ScrollBox)`
  height: calc(100vh - 150px);
`
