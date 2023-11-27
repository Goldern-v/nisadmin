import React, {memo} from 'react'
import styled from 'styled-components'
import {jmfydModel as model} from '../model'
import { Input,} from 'antd'
import {observer} from 'mobx-react'
import {DetailCtxCon} from '../../../style'
import {isMoment} from "moment/moment";
import {dateFormat} from "src/modules/nurseHandBookNew/views/detail-lyrm/config";
import {isOfType} from "src/utils/ts.utils";
import {ChangeOrFocus} from "src/libs/types";

const {TextArea} = Input

export interface Props {
    title?:string
}

const ChildCon = memo((props: any) => {
    const {value, component, ...other} = props
    return <TextArea className='cell-ipt'
                     value={value} {...other} />
}, (prev: any, next: any) => {
    return prev?.value == next?.value
})
export default observer(function (props: Props) {
    const {title}=props
    const onChange = (e: any, key: string) => {
        let value: any = e
        if (isMoment(e)) {
            value = e.format(dateFormat)
        } else if (isOfType<ChangeOrFocus>(e, 'target')) {
            value = e.target.value || e.currentTarget.innerText
        }
        const data = {
            ...model.editorData,
            [key]: value
        }
        model.handleEditorChange(data)
    }


    return (
        <Wrapper ref={model.ctxRef} style={{pointerEvents: model.allowEdit ? 'auto' : 'none'}}>
            <div className='title'>{title||model.detail?.record?.menuName || ''}</div>
            <table>
                <colgroup>
                    <col width='15%'/>
                    <col width='25%'/>
                    <col width='15%'/>
                    <col width='15%'/>
                    <col width='15%'/>
                    <col width='15%'/>
                </colgroup>
                <tbody>
                <tr>
                    <td>月工作重点</td>
                    <td colSpan={5}>
                        <ChildCon
                            style={{height:"150px"}}
                            value={model.editorData.v1} onChange={(e:any) => onChange(e, 'v1')}/>
                    </td>
                </tr>
                <tr>
                    <td>时间</td>
                    <td>内容</td>
                    <td>责任人</td>
                    <td>完成</td>
                    <td>基本完成</td>
                    <td>未完成</td>
                </tr>
                <tr>
                    <td>第一周</td>
                    <td>
                        <ChildCon value={model.editorData.v2} onChange={(e:any) => onChange(e, 'v2')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v3} onChange={(e:any) => onChange(e, 'v3')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v4} onChange={(e:any) => onChange(e, 'v4')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v5} onChange={(e:any) => onChange(e, 'v5')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v6} onChange={(e:any) => onChange(e, 'v6')}/>
                    </td>
                </tr>
                <tr>
                    <td>第二周</td>
                    <td>
                        <ChildCon value={model.editorData.v7} onChange={(e:any) => onChange(e, 'v7')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v8} onChange={(e:any) => onChange(e, 'v8')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v9} onChange={(e:any) => onChange(e, 'v9')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v10} onChange={(e:any) => onChange(e, 'v10')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v11} onChange={(e:any) => onChange(e, 'v11')}/>
                    </td>
                </tr>
                <tr>
                    <td>第三周</td>
                    <td>
                        <ChildCon value={model.editorData.v12} onChange={(e:any) => onChange(e, 'v12')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v13} onChange={(e:any) => onChange(e, 'v13')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v14} onChange={(e:any) => onChange(e, 'v14')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v15} onChange={(e:any) => onChange(e, 'v15')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v16} onChange={(e:any) => onChange(e, 'v16')}/>
                    </td>
                </tr>
                <tr>
                    <td>第四周</td>
                    <td>
                        <ChildCon value={model.editorData.v17} onChange={(e:any) => onChange(e, 'v17')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v18} onChange={(e:any) => onChange(e, 'v18')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v19} onChange={(e:any) => onChange(e, 'v19')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v20} onChange={(e:any) => onChange(e, 'v20')}/>
                    </td>
                    <td>
                        <ChildCon value={model.editorData.v21} onChange={(e:any) => onChange(e, 'v21')}/>
                    </td>
                </tr>
                <tr>
                    <td>存在问题</td>
                    <td colSpan={5}>
                        <ChildCon   style={{height:"150px"}} value={model.editorData.v22} onChange={(e:any) => onChange(e, 'v22')}/>
                    </td>
                </tr>
                <tr>
                    <td>特殊事件记录</td>
                    <td colSpan={5}>
                        <ChildCon   style={{height:"150px"}} value={model.editorData.v23} onChange={(e:any) => onChange(e, 'v23')}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </Wrapper>
    )
})

const Wrapper = styled(DetailCtxCon)`
  th {
    line-height: 32px;
  }

  .delete-btn {
    position: absolute;
    right: -5px;
    top: -10px;
    z-index: 2;
  }

`