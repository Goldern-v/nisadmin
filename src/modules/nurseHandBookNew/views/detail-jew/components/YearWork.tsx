import React, {memo, useMemo} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../model'
import {Button, DatePicker, Input, message, Select} from 'antd'
import {observer} from 'mobx-react'
import {DetailCtxCon} from 'src/modules/nurseHandBookNew/style'
import {ChangeOrFocus, Obj} from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import {dateFormat, dateFormat3, tableConConfig} from '../config'
import moment, {isMoment} from 'moment'
import {isOfType} from 'src/utils/ts.utils'
import {createArr} from "src/utils/array/array";
import {createObjV} from "src/utils/object/object";
const { Option } = Select
export interface Props {
}

const ChildCon = memo((props: any) => {
    const {value, component, ...other} = props
    switch (component) {
        case 'Dead':
            return (
                <Select
                    style={{width:'100%'}}
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
    const otherColumns = useMemo(() => tableConConfig[model.detail?.record?.menuCode]?.otherColumns || [], [model.id])
    const operationColumns = useMemo(() => tableConConfig[model.detail?.record?.menuCode]?.operationColumns || [], [model.id])
   const config = useMemo(() => tableConConfig[model.detail?.record?.menuCode] || {}, [model.id])
    const onChange = (type:string,e: any, config: Obj) => {
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
        newData[type][index][key]=value
        // newData[index][key] = value
        model.handleEditorChange(newData)
    }
    const handleCopyItem =(type:string)=>{
        const newData = cloneDeep(model.editorData)
        const conData = createArr(5, (j, k) => createObjV(4));
        newData[type] = [...newData[type],...conData]
        model.handleEditorChange(newData)
    }
    const handleDeleteItem =(type:string)=>{
        const newData = cloneDeep(model.editorData)
        let startIndex = newData[type].length - 5;
        if (startIndex >= 5) {
            newData[type].splice(startIndex, 5);
            model.handleEditorChange(newData)
        }else{
            return message.info('不能再删除了~')
        }

    }
    return (
        <Wrapper className='con--a4' ref={model.ctxRef}>
            <div className='title'>
                {model.detail?.record?.[config?.titleType || 'menuName']}
            </div>
            <table style={{marginBottom: '-1px'}}>
                <colgroup>
                    <col width='8%'/>
                    {
                        columns.map((v: Obj, i: number) => (
                            <col key={i} {...(v.width ? {width: v.width} : {})} />
                        ))
                    }
                </colgroup>
                <thead>
                <tr>
                    <td rowSpan={2}>时间</td>
                    <td  colSpan={6}>理论学习</td>
                </tr>
                <tr>
                    {
                        columns.map((v: Obj, i: number) =>(
                            <td key={i}>{v.title}</td>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    (( model.editorData?.arr1)|| []).map((v: Obj, i: number) => {
                        return (
                            <tr key={i}>
                                <td>{i +1 }月</td>
                                {
                                    columns.map((v1: Obj, i1: number) => {
                                        return (
                                          <td key={`${i}-${i1}`}>
                                                <ChildCon {...{
                                                    component: v1.component,
                                                    value: v[`v${i1}`],
                                                    onChange: (e: any) => onChange('arr1',e, {index: i, key: `v${i1}`})
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
            {/* 操作训练计划 */}
            <div className='titleName'>操作训练计划</div>
            <table style={{marginBottom: '-1px'}}>
                <colgroup>
                    {
                        operationColumns.map((v: Obj, i: number) => (
                            <col key={i} {...(v.width ? {width: v.width} : {})} />
                        ))
                    }
                </colgroup>
                <thead>
                <tr>
                    <td rowSpan={2}>时间</td>
                    <td  colSpan={2}>公共项目</td>
                    <td rowSpan={2}>时间</td>
                    <td  colSpan={2}>专科操作项目</td>
                </tr>
                <tr>
                    <td  colSpan={1}>操作项目</td>
                    <td  colSpan={1}>负责人</td>
                    <td colSpan={1}>操作项目</td>
                    <td  colSpan={1}>负责人</td>
                </tr>
                </thead>
                <tbody>
                {
                    (( model.editorData?.arr2 )|| []).map((v: Obj, i: number,all:any) => {
                        return (
                            <tr key={i}>
                                {
                                    operationColumns.map((v1: Obj, i1: number,c1:any) => {
                                        return (
                                            <td key={`${i}-${i1}`} style={{position:"relative"}}>
                                                <ChildCon {...{
                                                    component: v1.component,
                                                    value: v[`v${i1}`],
                                                    onChange: (e: any) => onChange('arr2',e, {index: i, key: `v${i1}`})
                                                }} />
                                                {  (i === all.length -1) &&( i1 === c1.length - 2 ) &&
                                                    <>
                                                        <Button className='addButton' type='primary' onClick={()=>handleCopyItem('arr2')}>添加一页</Button>
                                                        <Button className='deleteButton' type='danger' onClick={()=>handleDeleteItem('arr2')}>删除一页</Button>
                                                    </>
                                                }
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
            <div className='titleName'>其他训练计划</div>
            <table>
                <colgroup>
                    {
                        otherColumns.map((v: Obj, i: number) => (
                            <col key={i} {...(v.width ? {width: v.width} : {})} />
                        ))
                    }
                </colgroup>
                <thead>
                <tr>
                    {
                        otherColumns.map((v: Obj, i: number) =>(
                            <td key={i}>{v.title}</td>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    (( model.editorData?.arr3)|| []).map((v: Obj, i: number) => {
                        return (
                            <tr key={i}>
                                {
                                    otherColumns.map((v1: Obj, i1: number) => {
                                        return (
                                            <td key={`${i}-${i1}`}>
                                                <ChildCon {...{
                                                    component: v1.component,
                                                    value: v[`v${i1}`],
                                                    onChange: (e: any) => onChange('arr3',e, {index: i, key: `v${i1}`})
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
            {/*其他训练计划*/}
            {config?.tip && <div className='fs-s'>{config?.tip}</div>}
        </Wrapper>
    )
})

const Wrapper = styled(DetailCtxCon)`
    .titleName{
      line-height: 40px;
      border: 1px solid #333;
      border-bottom: none;
      text-align: center;
    }
  .addButton{
    position:absolute;
    right:-220px;
    height:35px
  }
  .deleteButton{
    position:absolute;
    right:-320px;
    height:35px
  }
`