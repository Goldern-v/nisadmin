import {observer} from 'mobx-react'
import React, {useEffect, useMemo, useRef} from 'react'
import styled from 'styled-components'
import {appStore, authStore} from 'src/stores'
import AuditProcess from 'src/components/audit-page/AuditProcess'
import {nurseHandbookRecordModel as model} from './newModel'
import {Button, Spin} from 'antd'
import useAuditStatus from 'src/hooks/useAuditStatus'
import {tableConConfig} from './config'
import CKEditor from "ckeditor4-react";

export interface Props {
    id?: any
}

/** form29详情，by临邑 */
export default observer(function (props: Props) {
    const {curNode} = useAuditStatus(model.detail)
    const editorRef = useRef<any>(null)

    const ctxRef = useRef<any>(null)
    const isAdd = useMemo(() => tableConConfig[model.detail?.record?.menuCode]?.isAdd || false, [model.id])

    const btnList = useMemo(() => {
        const {canHandle, nodeCode, state} = curNode
        if (canHandle && (nodeCode === 'commit' || nodeCode == undefined)) {
            return (<>
                <Button type='primary' onClick={() => {
                    if (model.detail?.record?.menuCode === 'LYHZSC_4_1') {
                        model.onLinYiSave()
                    } else {
                        model.onCommit('0')
                    }
                }}>暂存</Button>
                <Button type='primary' onClick={() => {
                    if (model.detail?.record?.menuCode === 'LYHZSC_4_1') {
                        model.onLinYiSave()
                    } else {
                        model.onCommit('1')
                    }
                }}>提交</Button>
                {isAdd && <Button type='primary' onClick={() => model.addItem()}>添加一页</Button>}
            </>)
        }
        // 已提交
        if (nodeCode === 'commit' && state === '1') {
            return (<>
                <Button type='primary' onClick={() => model.onCancel()}>撤回</Button>
                {authStore.isDepartment && <>
                    <Button type='primary' onClick={() => {
                        if (model.detail?.record?.menuCode === 'LYHZSC_4_1') {
                            model.onLinYiSave()
                        } else {
                            model.onCommit('0')
                        }
                    }}>暂存</Button>
                    <Button type='primary' onClick={() => model.openAudit()}>审核</Button>
                    <Button type='danger' onClick={() => model.onDelete(props.id)}>删除</Button>
                </>}
            </>)
        }

        return ''
    }, [curNode])
    // const LYHZSCBtn = useMemo(() => {
    //   const { canHandle, nodeCode, state } = curNode
    //   // 已提交
    //   if (canHandle && (nodeCode === 'commit' || nodeCode == undefined)){
    //     return <>
    //       <Button type='primary' onClick={() => model.onLinYiSave()}>暂存</Button>
    //       <Button type='primary' onClick={() => model.onLinYiSave()}>提交</Button>
    //       <Button type='danger' onClick={() => model.onDelete(props.id)}>删除</Button>
    //       <Button>导出</Button>
    //     </>
    //   }
    //   if (nodeCode === 'commit' && state === '1') {
    //     return  <Button type='primary' onClick={() => model.openAudit()}>审核</Button>
    //   }
    //   return ''
    // }, [curNode])
    useEffect(() => {
        return () => {
            model.auditModal.unMount()
        }
    }, [appStore.location.pathname])

    useEffect(() => {
        if (props.id) {
            model.init(props.id)
            model.ctxRef = ctxRef
        }
    }, [props.id])
    useEffect(() => {
        return () => {
            model.reset()
        }
    }, [])
    const onChange = (e: any) => {
        model.handleEditorChange({v1: e.editor.getData()})
    }
    return (
        <Wrapper>
            <Spin style={{height: '100%'}} spinning={model.loading}>
                <div style={{margin: '20px 0 0 10px'}}>
                    <Button onClick={model.onPrint}>打印</Button>
                    {btnList}
                    {/*{ model.detail?.record?.menuCode == 'LYHZSC_4_1'?LYHZSCBtn: btnList}*/}
                </div>
                <MainWrapper>
                    <AuditProcess process={model.detail?.nodeList || []}/>
                    <div className={(model.allowEdit ? '' : 'con--disabled ') + 'main-ctx'}>
                        {/* 如果是编辑器内容*/}
                        {model.configFn && !model.configFn.isEditor ? <model.configFn.Component/> : <CKEditor
                            ref={editorRef}
                            name={`editor${Math.random().toFixed(2)}`}
                            data={model.editorData.v1}
                            onChange={onChange}
                            config={{
                                extraPlugins: 'stylesheetparser,colorbutton,colordialog,html5video',
                                removePlugins: 'easyimage,cloudservices',
                                filebrowserUploadUrl: appStore.uploadCKEUrl,
                                filebrowserHtml5videoUploadUrl: appStore.uploadCKEUrl,
                                height: 400,
                                title: '',
                                font_names: '黑体/黑体;楷体/楷体;宋体/宋体;仿宋/仿宋;Arial/Arial;Tahoma/Tahoma;Verdana/Verdana;',
                                font_defaultLabel: '黑体',
                            }}
                        />
                        }
                    </div>
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
  flex: 1;
  position: relative;

  .main-ctx {
    width: calc(100% - 250px);
    height: 100%;
    padding: 15px 15px 0;
    overflow-y: auto;
  }

  .con--disabled {
    .cell-input {
      pointer-events: none;
    }
  }
`