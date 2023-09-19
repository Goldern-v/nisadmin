import React, {memo, useEffect, useMemo, useState} from 'react'
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
import {FORM_CODE_VALUE} from "src/modules/nurseHandBookNew/views/list-jew/utils/enums";
const { Option } = Select
export interface Props {
}
/**表格类表单 */
export default observer(function (props: Props) {
   const config = useMemo(() => tableConConfig[model.detail?.record?.menuCode] || {}, [model.id])
    const [itemValue,setItemValue]=useState('')
    useEffect(()=>{
        setItemValue(FORM_CODE_VALUE[model.detail?.record?.menuCode])
    },[])
    return (
        <Wrapper className='con--a4' ref={model.ctxRef}>
            <div className='title'>
                {model.detail?.record?.[config?.titleType || 'menuName']}
            </div>
<table className='table-content'>
    <thead>
    <tr>
        <td>日/月</td>
        {
            Array.from(Array(31)).map((v: Obj, i: number) =>(
                <td key={i} >{ (i +1) <=9 ?`0${i+1}`:i+1 }</td>
            ))
        }
        {/*<td>合计</td>*/}
    </tr>
    </thead>
    <tbody>

    {
        ( model.yearPersonData?.list||[]).map((item:any,key:number)=>{
          return(
              <tr>
                  <td >{key + 1}月</td>
                  { item.map((val:any,valKey:number)=>{
                      let value : any = undefined
                      if(itemValue && val ){
                          value =val[itemValue]
                          console.log(val,itemValue,val[itemValue])
                      }
                      return(
                          <td style={{textAlign:'center'}}>{ value|| 0 }</td>
                      )
                  })}
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