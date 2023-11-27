import {observer} from 'mobx-react'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import {appStore, authStore} from 'src/stores'
import AuditHeader from 'src/components/audit-page/AuditHeader'
import {jmfydModel as model} from './model'
import {Button, Spin} from 'antd'
import AuditProcess from "src/components/audit-page/AuditProcess";
import useAuditStatus from "src/hooks/useAuditStatus";
import CtxCon from './components/ctxCon'
export interface Props {
}
/** form29详情，by江门妇幼 */
const menuList = ['护理人员一览表', '质量监测指标', '年度护理工作计划', '月度工作计划', '季度工作计划', '半年工作总结', '年度工作总结']
export default observer(function (props: Props) {
    const ctxRef = useRef<any>(null)
    const [curIndex, setCurIndex] = useState(0)
    const {curNode} = useAuditStatus(model.detail)
    const btnList = useMemo(() => {
        const {canHandle, nodeCode, state} = curNode


        if (canHandle && (nodeCode === 'commit' || nodeCode == undefined)) {
            return (<>
                <Button type='primary' onClick={() => model.onCommit('0')}>暂存</Button>
                {/*提交*/}
                <Button type='primary' onClick={() => model.onCommit('1')}>保存</Button>
            </>)
        }
        if (model.detail?.audit) {
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
    const getElement = () => {
        switch (curIndex) {
            case 0 :
                return <div>0000</div>
            case 1 :
                return <div>1111</div>
            case 2 :
                return <div>2222</div>
        }

    }
    useEffect(() => {
        return () => {
            model.auditModal.unMount()
        }
    }, [appStore.location.pathname])

    useEffect(() => {
        model.init('')
        model.ctxRef = ctxRef
    }, [appStore.queryObj])
    useEffect(() => {
        return () => {
            model.reset()
        }
    }, [])
    return (
        <Wrapper>
            <Spin style={{height: '100%'}} spinning={model.loading}>
                <AuditHeader
                    breadData={[
                        {
                            name: model.detail?.record?.menuName,
                            link: `/nurseHandBookNew/form29/${model.detail?.record?.menuCode}`
                        },
                        {name: "记录详情"},
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
                    {model.detail?.audit && <AuditProcess process={model.detail?.nodeList || []}/>}
                    <div className='main-ctx'>
                        <CtxCon/>
                    </div>
                    {/*{model.configFn&& <model.configFn.Component/>}*/}
                        {/*<div className='main-ctx'>*/}
                    {/*    /!*<CtxCon />*!/*/}
                    {/*    <div className='main-left'>*/}
                    {/*        {*/}
                    {/*            menuList.map((item: string, index: number) => {*/}
                    {/*                return <div key={'a' + index} style={{*/}
                    {/*                    height: "50px",*/}
                    {/*                    width: '150px',*/}
                    {/*                    textAlign: "center",*/}
                    {/*                    color: index == curIndex ? 'green' : "#333",*/}
                    {/*                    borderBottom: "1px solid #999",*/}
                    {/*                    lineHeight:'50px'*/}
                    {/*                }} onClick={() => setCurIndex(index)}>{item}</div>*/}
                    {/*            })*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*    <div style={{flex:1}}>*/}
                    {/*        <CtxCon curIndex={curIndex} />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </MainWrapper>
                {model.auditModal && <model.auditModal.Component/>}
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
    display: flex;
    width: calc(100% - 250px);
    //height: 100%;
    padding: 15px 20px 15px;
    overflow-y: auto;
    .main-left{
      width: 150px;
      border: 1px solid #999;
      overflow-y: auto;
    }
  }
`