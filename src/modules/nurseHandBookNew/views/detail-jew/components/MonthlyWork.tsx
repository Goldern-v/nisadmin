import React, {memo, useMemo} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../model'
import {DatePicker, Input, Select} from 'antd'
import {observer} from 'mobx-react'
import {DetailCtxCon} from 'src/modules/nurseHandBookNew/style'
import {ChangeOrFocus, Obj} from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import {dateFormat, dateFormat3, tableConConfig} from '../config'

import moment, {isMoment} from 'moment'
import {isOfType} from 'src/utils/ts.utils'
const { Option } = Select
export interface Props {
}

const ChildCon = memo((props: any) => {
    const {value, component, ...other} = props
    switch (component) {
        case 'Dead':
            return (
                <Select
                    className='cell-ipt'
                    style={{width:80}}
                    value={value||''}  {...other}>
                    {(model?.nurseList||[]).map((nurse: any) => <Option key={nurse.empNo}>{nurse.empName}</Option>)}
                </Select>
            )
        case 'DataPicker':
            return (
                <DatePicker className='cell-ipt'
                            format={dateFormat3} value={value ? moment(value) : undefined} {...other} />)
        default:
            return <Input className='cell-ipt ta-c' value={value} {...other} />
    }
}, (prev: any, next: any) => {
    return prev?.value == next?.value
})
/**表格类表单 */
export default observer(function (props: Props) {

    const columns = useMemo(() => tableConConfig[model.detail?.record?.menuCode]?.columns || [], [model.id])
    const columnsMonth = useMemo(() => tableConConfig[model.detail?.record?.menuCode]?.columnsMonth || [], [model.id])
    const columnsRemark = useMemo(() => tableConConfig[model.detail?.record?.menuCode]?.columnsRemark || [], [model.id])
    const config = useMemo(() => tableConConfig[model.detail?.record?.menuCode] || {}, [model.id])
    const onChange = (e: any, config: Obj) => {
        const {index, key} = config
        let value: any = e
        if (isMoment(e)) {
            value = e.format(dateFormat)
        } else if (isOfType<ChangeOrFocus>(e, 'target')) {
            value = e.target.value || e.currentTarget.innerText
        } else if (e instanceof Array) {
            value = e.join(',')
        }
        const newData = cloneDeep(model.editorData)
        newData[index][key] = value
        model.handleEditorChange(newData)
    }

    return (
        <Wrapper className='con--a4' ref={model.ctxRef}>
            <div className='title'>
                {model.detail?.record?.[config?.titleType || 'menuName']}
            </div>
            <table style={{marginBottom: '-1px'}}>
                <colgroup>
                    {
                        columnsMonth.map((v: Obj, i: number) => (
                            <col key={i} {...(v.width ? {width: v.width} : {})} />
                        ))
                    }
                </colgroup>
                {/* 头部为数据的前五项 */}
                <tbody>
                {
                    (( model.editorData && model.editorData.slice(0,5 ) )|| []).map((v: Obj, i: number) => {
                        return (
                            <tr key={i}>
                                {i == 0 && <td rowSpan={5}>月度报告计划</td>}
                                {
                                    columnsMonth.map((v1: Obj, i1: number) => {
                                        return (
                                            i1 !== (columnsMonth.length - 1) && <td key={`${i}-${i1}`}>
                                                <ChildCon {...{
                                                    component: v1.component,
                                                    value: v[`v${i1}`],
                                                    onChange: (e: any) => onChange(e, {index: i, key: `v${i1}`})
                                                }} />
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <table style={{marginBottom: '-1px'}}>
                <colgroup>
                    {
                        columns.map((v: Obj, i: number) => (
                            <col key={i} {...(v.width ? {width: v.width} : {})} />
                        ))
                    }
                </colgroup>
                <thead>
                <tr>
                    {
                        columns.map((v: Obj, i: number) => (
                            <td key={i}>{v.title}</td>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {/* 内容为>5 */}
                {
                    (( model.editorData && model.editorData.slice(5,25 ) )|| []).map((v: Obj, i: number) => {
                        return (
                            <tr key={i}>
                                {
                                    [0, 5, 10, 15].includes(i) &&
                                    <td rowSpan={5}>{`第${{0: '一', 5: '二', 10: '三', 15: '四'}[i]}周`}</td>
                                }
                                {
                                    columns.map((v1: Obj, i1: number) => {
                                        return (
                                            i1 !== (columns.length - 1) && <td key={`${i}-${i1}`}>
                                                <ChildCon {...{
                                                    component: v1.component,
                                                    value: v[`v${i1}`],
                                                    onChange: (e: any) => onChange(e, {index: i+5, key: `v${i1}`})
                                                }} />
                                            </td>
                                        )
                                    })
                                }
                            </tr>

                        )
                    })
                }
                </tbody>
            </table>
            <table>
                <colgroup>
                    {
                        columnsRemark.map((v: Obj, i: number) => (
                            <col key={i} {...(v.width ? {width: v.width} : {})} />
                        ))
                    }
                </colgroup>
                <tbody>
                {(( model.editorData && model.editorData.slice(25,27) )|| []).map((v: Obj, i: number) => {
                        return (
                           i == 0 && <tr key={i}>
                               {i == 0 && <td rowSpan={2}>备注</td>}
                               {
                                   columnsRemark.map((v1: Obj, i1: number) => {
                                       return (
                                           i1 !== (columnsRemark.length - 1) && <td key={`${i}-${i1}`}  rowSpan={2}>
                                               <ChildCon {...{
                                                   component: v1.component,
                                                   value: v[`v${i1}`],
                                                   onChange: (e: any) => onChange(e, {index: i+25, key: `v${i1}`})
                                               }} />
                                           </td>
                                       )
                                   })
                               }
                           </tr>
                        )
                    })
                }
                </tbody>
            </table>
            {config?.tip && <div className='fs-s'>{config?.tip}</div>}
        </Wrapper>
    )
})

const Wrapper = styled(DetailCtxCon)`

`