import React, {memo} from 'react'
import styled from 'styled-components'
import {jmfydModel as model } from "src/modules/nurseHandBookNew/views/detail-jmfy/model";
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from '../../../style'
import moment, {isMoment} from "moment/moment";
import {isOfType} from "src/utils/ts.utils";
import {ChangeOrFocus} from "src/libs/types";
const { TextArea } = Input
export interface Props {
}
const ChildCon = memo((props: any) => {
    const {value, component, ...other} = props
    return <TextArea className='cell-ipt'
                     style={{height:"150px"}}
                     value={value} {...other} />
}, (prev: any, next: any) => {
    return prev?.value == next?.value
})
const dateFormat = 'YYYY-MM-DD HH:mm'
/**业务学习项目 */
export default observer(function (props: Props) {

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
        <Wrapper className='con--a4' ref={model.ctxRef} style={{ pointerEvents: model.allowEdit ? 'auto' : 'none' }}>
            <table>
                <colgroup>
                    <col width='20%' />
                    <col width='80%' />
                </colgroup>
                <thead>
                <tr>
                    <th className='title' colSpan={2}>{model.detail?.record?.menuName}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td >月工作总结</td>
                    <td colSpan={3}>
                        <ChildCon value={model.editorData.v1} onChange={(e:any) => onChange(e, 'v1')}/>
                    </td>
                   </tr>
                <tr>
                    <td >本月工作亮点</td>
                    <td  colSpan={3}>
                        <ChildCon value={model.editorData.v2} onChange={(e:any) => onChange(e, 'v2')}/>
                    </td>
                </tr>
                <tr>
                    <td >下月改进重点</td>
                    <td colSpan={3}>
                        <ChildCon value={model.editorData.v3} onChange={(e:any) => onChange(e, 'v3')}/>

                    </td>
                </tr>
                </tbody>
            </table>
            <div className='empBox'>
                <div  className='dateBox'>
                    <div  className='left'>记录人:</div>
                    <Input className='cell-ipt' value={model.editorData?.v4} onChange={(e) => onChange(e, 'v4')}></Input>
                </div>
                <div className='dateBox'>
                    <div className='left'>记录时间:</div>
                    <DatePicker
                        className='cell-ipt'
                        showTime={{ format: 'HH:mm' }}
                        format={dateFormat}
                        value={model.editorData?.v5 ? moment(model.editorData?.v5) : undefined} onChange={(e) => onChange(e, 'v5')} />
                </div>
            </div>
        </Wrapper >
    )
})

const Wrapper = styled(DetailCtxCon)`
  th {
    line-height: 32px;
  }
  td {
    text-align: left !important;
  }
  .empBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin-top: 10px;
  }
  .dateBox{
    display: flex;
    align-items: center;
    .left{
      width: 90px;
    }
  }
`