import { observer } from 'mobx-react'
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { appStore, authStore } from 'src/stores'
import AuditHeader from 'src/components/audit-page/AuditHeader'
import { nurseHandbookRecordModel as model } from './model'
import { Button, Spin } from 'antd'
import CtxCon from './components/ctxCon'
import AuditProcess from "src/components/audit-page/AuditProcess";
import useAuditStatus from "src/hooks/useAuditStatus";

export interface Props {
}
/** form29详情，by贵州 */
export default observer(function (props: Props) {
  const ctxRef = useRef<any>(null)
  const { curNode } = useAuditStatus(model.detail)
  const btnList = useMemo(() => {
    const { canHandle, nodeCode, state } = curNode
    if(model.detail?.isAudit){
      if (canHandle && (nodeCode === 'commit' || nodeCode == undefined)) {
        return (<>
          <Button type='primary' onClick={() => model.onCommit('0')}>暂存</Button>
          <Button type='primary' onClick={() => model.onCommit('1')}>提交</Button>
        </>)
      }
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
  useEffect(() => {
    return () => {
      model.auditModal.unMount()
    }
  }, [appStore.location.pathname])

  useEffect(() => {
    model.init()
    model.ctxRef = ctxRef
  }, [appStore.queryObj])
  useEffect(() => {
    return () => {
      model.reset()
    }
  }, [])
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
          </>}
        />
        <MainWrapper>
          { model.detail?.isAudit && <AuditProcess process={model.detail?.nodeList || []} /> }
          <div className='main-ctx'>
            <CtxCon />
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
   width: calc(100% - 200px); 
    height: 100%;
    padding: 15px 120px 15px;
    overflow-y: auto;
  }
  `