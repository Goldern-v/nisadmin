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
import {QuarterV} from "src/modules/nurseHandBookNew/views/list-jew/utils/enums";
const {Option} = Select
const {TextArea} =Input
export interface Props {
}

const ChildCon = memo((props: any) => {
    const {value, component, ...other} = props
    switch (component) {
        case 'Dead':
            return (
                <Select
                    style={{width:80}}
                    value={value||''}  {...other}>
                    {(model?.nurseList||[]).map((nurse: any) => <Option key={nurse.empNo}>{nurse.empName}</Option>)}
                </Select>
            )
        case 'TextArea':
            return (
                <TextArea className='cell-ipt'
                          value={value} {...other} />)
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
     const conData = createArr(1, (j, k) => createObjV(4));
     newData[type] = [...newData[type],...conData]
     model.handleEditorChange(newData)
 }
 const handleDeleteItem =(type:string)=>{
     const newData = cloneDeep(model.editorData)
     let startIndex = newData[type].length - 1;
     if (startIndex >= 12) {
         newData[type].splice(startIndex, 1);
         model.handleEditorChange(newData)
     }else{
         return message.info('不能再删除了~')
     }

 }

    return (
        <Wrapper className='con--a4' ref={model.ctxRef}>
            <div className='title'>
                {model.detail?.record?.year}年{QuarterV[model.detail?.record?.quarter]}{model.detail?.record?.[config?.titleType || 'menuName']}
            </div>
            <table >
                <colgroup>
                    {
                        columns.map((v: Obj, i: number) => (
                            <col key={i} {...(v.width ? {width: v.width} : {})} />
                        ))
                    }
                </colgroup>
                <thead>
                <tr>
                    <td colSpan={2} rowSpan={2}>内容</td>
                    <td  colSpan={2}>完成情况</td>
                </tr>
                <tr>

                    {
                        columns.map((v: Obj, i: number) =>(
                          [2,3].includes(i) &&  <td  key={i}>{v.title}</td>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {/*季度工作计划*/}
                {
                    ((model.editorData?.arr1)|| []).map((v: Obj, i: number,all:any) => {
                        return (
                             <tr key={i}>
                                 {[0,all.length].includes(i) && <td rowSpan={all.length}>季度工作计划</td>}
                                 {
                                     columns.map((v1: Obj, i1: number,c1:any) => {
                                         return (
                                             i1 !==columns.length -1 && <td key={`${i}-${i1}`} style={{position:"relative"}}>
                                                 <ChildCon {...{
                                                     component: v1.component,
                                                     value: v[`v${i1}`],
                                                     onChange: (e: any) => onChange('arr1',e, {index: i, key: `v${i1}`})
                                                 }} />
                                                 {  (i === all.length -1) &&( i1 === c1.length - 2 ) &&
                                                     <>
                                                         <Button className='addButton' type='primary' onClick={()=>handleCopyItem('arr1')}>添加一行</Button>
                                                         <Button className='deleteButton' type='danger' onClick={()=>handleDeleteItem('arr1')}>删除一行</Button>
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
                {
                    ((model.editorData?.arr2)|| []).map((v: Obj, i: number,all:any) => {
                        return (
                               <tr key={i}>
                                   { [0,all.length].includes(i) && <td rowSpan={all.length}>存在或待解决的问题</td> }
                                   {
                                       columns.map((v1: Obj, i1: number,c1:any) => {
                                           return (
                                               i1 !==columns.length -1 && <td key={`${i}-${i1}`} style={{position:"relative"}}>
                                                   <ChildCon {...{
                                                       component: v1.component,
                                                       value: v[`v${i1}`],
                                                       onChange: (e: any) => onChange('arr2',e, {index: i, key: `v${i1}`})
                                                   }} />
                                                   {  (i === all.length -1) &&( i1 === c1.length - 2 ) &&
                                                       <>
                                                           <Button className='addButton' type='primary' onClick={()=>handleCopyItem('arr2')}>添加一行</Button>
                                                           <Button className='deleteButton' type='danger' onClick={()=>handleDeleteItem('arr2')}>删除一行</Button>
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
                {/*存在或待解决的问题*/}
                </tbody>
            </table>
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
    right:-90px;
    height:35px
  }
  .deleteButton{
    position:absolute;
    right:-200px;
    height:35px
  }
`