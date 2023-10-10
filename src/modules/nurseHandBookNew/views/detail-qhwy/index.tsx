import { observer } from 'mobx-react'
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { appStore, authStore } from 'src/stores'
import AuditHeader from 'src/components/audit-page/AuditHeader'
import { nurseHandbookRecordModel as model } from './model'
import CtxConQhwy from './components/CtxConQhwy'

import { Button, Spin } from 'antd'
import useAuditStatus from "src/hooks/useAuditStatus";
import AuditProcess from "src/components/audit-page/AuditProcess";
export interface Props {
}
/** form29详情，by青海五院 */
export default observer(function (props: Props) {
  const { curNode } = useAuditStatus(model.detail)
  const btnList = useMemo(() => {
    const { canHandle, nodeCode, state } = curNode
    if (canHandle && (nodeCode === 'commit' || nodeCode == undefined)) {
      return (<>
        <Button type='primary' onClick={() => model.onCommit('0')}>暂存</Button>
        {/*提交*/}
        <Button type='primary' onClick={() => model.onCommit('1')}>保存</Button>
      </>)
    }
    if(model.detail?.audit){
      // 已提交
      if (nodeCode === 'commit' && state === '1') {
        return (<>
          <Button type='primary' onClick={() => model.onCancel()}>撤回</Button>
          {authStore.isDepartment && <>
            <Button type='primary' onClick={() => model.onCommit('0')}>暂存</Button>
            <Button type='primary' onClick={() => model.openAudit()}>审核</Button>
          </>}
        </>)
      }
    }
    return ''
  }, [curNode])
  const ctxRef = useRef<any>(null)
  useEffect(() => {
    model.init()
    model.ctxRef = ctxRef
  }, [appStore.queryObj])
  useEffect(() => {
    return () => {
      model.reset()
    }
  }, [])
  useEffect(() => {
    return () => {
      model.auditModal.unMount()
    }
  }, [appStore.location.pathname])
  return (
    <Wrapper>
      <Spin style={{ height: '100%' }} spinning={model.loading}>
        <AuditHeader
          breadData={[
            { name: model.detail?.record?.menuName, link: `/nurseHandBookNew/form29/${model.detail?.record?.menuCode}` },
            { name: "记录详情" },
          ]}
          statusCon={<>
            <div>创建人：{model.detail?.record?.empName}</div>
            <div>创建时间：{model.detail?.record?.createdTime}</div>
          </>}
          btnCon={<>
            <Button onClick={() => appStore.history.goBack()}>返回</Button>
            <Button onClick={model.onPrint}>打印</Button>
            {btnList}
            {/*<Button type='primary' onClick={() => model.onCommit('1')}>保存</Button>*/}
          </>}
        />
        <MainWrapper>
          { model.detail?.audit && <AuditProcess process={model.detail?.nodeList || []} /> }
          <div className='main-ctx'>
            <CtxConQhwy />
          </div>
        </MainWrapper>
        {model.auditModal && <model.auditModal.Component />}
      </Spin>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  .ant-spin-container {
    height: inherit;
  }
`
const MainWrapper = styled.div`
  height: calc(100% - 76px);
  position: relative;
  .main-ctx {
    /* width: calc(100% - 250px); */
    height: 100%;
    padding: 15px 120px 15px;
    overflow-y: auto;
  }
  `