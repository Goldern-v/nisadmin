import React, {memo, useState} from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import { isMoment } from 'moment'
import { dateFormat } from '../config'
import { isOfType } from 'src/utils/ts.utils'
import {ChangeOrFocus, Obj} from 'src/libs/types'
import {jmfydModel as model} from "src/modules/nurseHandBookNew/views/detail-jmfy/model";
import cloneDeep from "lodash/cloneDeep";
import MultiFileUploader, {FileItem} from "src/components/MultiFileUploader";

const { TextArea } = Input

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
    const [files, setFiles] = useState(model.editorData.fileData as FileItem[])

    const onChange = (e: any,config: Obj) => {
        const { index, key } = config
        let value: any = e
        if (isMoment(e)) {
            value = e.format(dateFormat)
        } else if (isOfType<ChangeOrFocus>(e, 'target')) {
            value = e.target.value || e.currentTarget.innerText
        }
        const newData = cloneDeep(model.editorData)
        newData[index][key] = value
        model.handleEditorChange(newData)
    }
    const handleFileChange = (newList: FileItem[]) => {
        let list =newList.map((item:FileItem)=>{
            return {
                path:item.path,
                name:item.name,
                id:item.id
            }
        })
        setFiles(list)
        console.log("newList===",list);
    }
    return (
        <Wrapper className='con--a4' ref={model.ctxRef}>
                <div className='title'>{title||model.detail?.record?.menuName || ''}</div>
            <table>
                <colgroup>
                    <col width='10%' />
                    <col width='15%' />
                    <col width='15%' />
                    <col width='15%' />
                    <col width='15%' />
                    <col width='15%' />
                    <col width='15%' />
                </colgroup>
                <tbody>
                <tr>
                    <td>序号</td>
                    <td>what</td>
                    <td>why</td>
                    <td>where</td>
                    <td>when</td>
                    <td>hov</td>
                </tr>
                {
                    (model.editorData.arr|| []).map((item: any, key: number) => {
                        return (
                            <tr key={key+'a'}>
                                <td>{key + 1}</td>
                                {
                                    Array.from(new Array(5)).map((i:any,is:number)=>{
                                        return  <td>
                                            <ChildCon {...{
                                                value: item[`v${is+1}`],
                                                onChange: (e: any) => onChange(e, { index: key, key:`v${is + 1}` })
                                            }} />
                                        </td>
                                    })
                                }

                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <MultiFileUploader type='qcNurseMeeting' data={files} onChange={handleFileChange}/>
        </Wrapper>
    )
})

const Wrapper = styled(DetailCtxCon)`
.date-con {
  .cell-ipt {
    width: 120px;
  }
}
`