import { observer } from 'mobx-react'
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { appStore, authStore } from 'src/stores'
import AuditHeader from 'src/components/audit-page/AuditHeader'
import { nurseHandbookRecordModel as model } from './model'
import { Button, Spin } from 'antd'
import CtxCon from './components/ctxCon'

export interface Props {
}
/** form29详情，by贵州 */
export default observer(function (props: Props) {
  const ctxRef = useRef<any>(null)

  const btnList = useMemo(() => {
    const { status = '' } = model.detail?.record || {}
    // 待提交，已撤回
    if (status === 0 || status === -1) {
      return (<>
        {<Button type='primary' onClick={() => model.onCommit('0')}>{status === 0 ? '暂存' : '编辑'}</Button>}
        <Button type='primary' onClick={() => model.onCommit('2')}>提交</Button>
      </>)
    }
    // 已提交
    else if (status === 2) {
      return (
        // temporary ok
        authStore.isDepartment ?
          <>
            <Button type='primary' onClick={() => model.onCommit('2')}>保存</Button>
          </>
          :
          <Button type='primary' onClick={() => model.onCancel()}>撤回</Button>
      )
    }
    // 撤回中
    else if (status === 1 && authStore.isDepartment) {
      return (<>
        <Button type='primary' onClick={() => model.onCommit('1')}>编辑</Button>
        <Button type='primary' onClick={() => model.openAudit()}>处理</Button>
      </>)
    }

    return ''
  }, [model.detail])

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
    /* width: calc(100% - 250px); */
    height: 100%;
    padding: 15px 120px 15px;
    overflow-y: auto;
  }
  `