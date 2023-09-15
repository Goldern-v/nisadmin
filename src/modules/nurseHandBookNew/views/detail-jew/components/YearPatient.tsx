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
                    style={{width:'100%'}}
                    value={value||''}  {...other}>
                    {(model?.nurseList||[]).map((nurse: any) => <Option key={nurse.empNo}>{nurse.empName}</Option>)}
                </Select>
            )
        case 'DataPicker':
            return (
                <DatePicker className='cell-ipt'
                            format={dateFormat3} value={value ? moment(value) : undefined}  />)
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
   const isLeapYear =(year:number)=> {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
    const monthDays = [
        // 1月到12月的天数，注意2月可能是28或29天
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];
    // const tableHeader = (
    //     <thead>
    //     <tr>
    //         {monthDays.map((days, index) => (
    //             <th key={index}>月{index + 1}</th>
    //         ))}
    //     </tr>
    //     </thead>
    // );
    // const tableBody = (
    //     <tbody>
    //     {Array.from({ length: 31 }, (_, dayIndex) => (
    //         <tr key={dayIndex}>
    //             {monthDays.map((days, monthIndex) => (
    //                 <td key={monthIndex}>
    //                     {dayIndex < days && model.yearPersonData?.list[monthIndex]?.day === dayIndex + 1 ? model.yearPersonData?.list[monthIndex]?.day : ''}
    //                 </td>
    //             ))}
    //         </tr>
    //     ))}
    //     </tbody>
    // );
    return (
        <Wrapper className='con--a4' ref={model.ctxRef}>
            <div className='title'>
                {model.detail?.record?.[config?.titleType || 'menuName']}
            </div>
<table className='table-content'>
    <thead>
    <tr>
        <td>日/月</td>
        {/*    <td colSpan={3}  className="svg-td">*/}
        {/*    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">*/}
        {/*        <line x1="0" y1="0" x2="100%" y2="100%" />*/}
        {/*    </svg>*/}
        {/*    <span style={{left: '5px', bottom: 0}}>月</span>*/}
        {/*    <span style={{top: 0, right: '5px'}}>日</span>*/}
        {/*</td>*/}
        {
            Array.from(Array(31)).map((v: Obj, i: number) =>(
                <td key={i} >{ (i +1) <=9 ?`0${i+1}`:i+1 }</td>
            ))
        }
    </tr>
    </thead>
    <tbody>

    {
        ( model.yearPersonData?.list||[]).map((item:any,key:number)=>{
          return(
              <tr>
                  <td >{key + 1}月</td>
                  { item.map((val:any,valKey:number)=>{
                      return(
                          <td style={{textAlign:'center'}}>{val?.day|| Number(0) }</td>
                      )
                  })}
              </tr>
          )
        })
    }
    </tbody>
</table>
            {/*<table style={{marginBottom: '-1px'}}>*/}
            {/*    /!*<colgroup>*!/*/}
            {/*    /!*    <col width='8%'/>*!/*/}
            {/*    /!*    {*!/*/}
            {/*    /!*        columns.map((v: Obj, i: number) => (*!/*/}
            {/*    /!*            <col key={i} {...(v.width ? {width: v.width} : {})} />*!/*/}
            {/*    /!*        ))*!/*/}
            {/*    /!*    }*!/*/}
            {/*    /!*</colgroup>*!/*/}
            {/*    <thead>*/}
            {/*    /!*<tr>*!/*/}
            {/*    /!*    <td rowSpan={2}>时间</td>*!/*/}
            {/*    /!*    <td  colSpan={6}>理论学习</td>*!/*/}
            {/*    /!*</tr>*!/*/}
            {/*    /!*((model.yearPersonData?.list||[]))*!/*/}
            {/*    <tr>*/}
            {/*        <td><div>日/月</div></td>*/}
            {/*        {*/}
            {/*            Array.from(Array(31)).map((v: Obj, i: number) =>(*/}
            {/*                // ((model.yearPersonData?.list||[])).map((item:any,k:number)=>{*/}
            {/*                //     return(*/}
            {/*                //         <td key={i}>{ i +1 }</td>*/}
            {/*                //     )*/}
            {/*                // })*/}
            {/*                    <td key={i}>{ i +1 }</td>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}

            {/*    {*/}
            {/*        Array.from(Array(12)).map((v:Obj,i:number)=>{*/}
            {/*            return(*/}
            {/*                <tr>*/}
            {/*                    { i + 1}月*/}
            {/*                </tr>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*    {*/}
            {/*        Array.from(Array(12)).map((v: Obj, i: number) => {*/}
            {/*            return (*/}
            {/*                <tr key={i}>*/}
            {/*                    <td>{i +1 }月</td>*/}
            {/*                    {*/}
            {/*                        (model.yearPersonData?.list||[]).map((v1: Obj, i1: number) => {*/}
            {/*                            return (*/}
            {/*                              <td key={`${i}-${i1}`}>*/}
            {/*                                  { v1?.day ||0   }*/}
            {/*                                </td>*/}
            {/*                            )*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                </tr>*/}

            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*    </tbody>*/}
            {/*</table>*/}


            {/*<table>*/}
            {/*    {tableHeader}*/}
            {/*    {tableBody}*/}
            {/*</table>*/}


          {config?.tip && <div className='fs-s'>{config?.tip}</div>}
        </Wrapper>
    )
})

const Wrapper = styled(DetailCtxCon)`
  width: 800px;
    .titleName{
      line-height: 40px;
      border: 1px solid #333;
      border-bottom: none;
      text-align: center;
    }

  .svg-td{
    position: relative;
    span{
      position: absolute;
    }
    svg{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      line {
        stroke: #000;
        stroke-width: 1;
      }
    }
  }
  .table-content tr td{
    white-space:nowrap
  }
`