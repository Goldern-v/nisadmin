import React, {memo} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../model'
import {DatePicker, Input} from 'antd'
import {observer} from 'mobx-react'
import {DetailCtxCon} from '../../../style'
import {ChangeOrFocus, Obj} from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import {dateFormat, dateFormat3} from "src/modules/nurseHandBookNew/views/detail-jew/config";
import moment, {isMoment} from "moment";
import {isOfType} from "src/utils/ts.utils";

const {TextArea} = Input

const ChildRon = memo((props: any) => {
    const {value, component, ...other} = props
    switch (component) {
        case 'DataPicker':
            return (
                <DatePicker className='cell-ipt'
                            format={dateFormat3} value={value ? moment(value) : undefined} {...other} />)
        case 'TextArea':
            return (
                <TextArea className='cell-ipt'
                          style={{height:100}}
                          value={value} {...other} />)
        default:
            return <Input className='cell-ipt ta-c' value={value} {...other} />
    }
}, (prev: any, next: any) => {
    return prev?.value == next?.value
})
export default observer(function () {
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
        <Wrapper ref={model.ctxRef} style={{pointerEvents: model.allowEdit ? 'auto' : 'none'}}>
            <div className='title'>青海省第五人民医院{model.detail?.record?.['menuName']}</div>
            <table>
                <colgroup>
                    <col width={'30%'}/>
                    <col width={'70%'}/>
                </colgroup>
                <tbody>
                {
                    (model.editorData || []).map((v: Obj, i: number) => {
                        switch (i) {
                            case 0 :
                                return <tr>
                                    <td>
                                        <div className='dis-flex'>
                                            <span className='span-text'>全院性夜查房</span>
                                            <ChildRon {...{
                                                component: '',
                                                value: v[`v${1}`],
                                                onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                            }} />
                                            <span>次</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='dis-flex'>
                                            <span>分别为</span>
                                            { Array.from(new Array(3)).map((item:any,aKey:number)=>{
                                                return <>
                                                    <ChildRon {...{
                                                        component: 'DataPicker',
                                                        value: v[`v${aKey + 2}`],
                                                        style:{width:'100'},
                                                        onChange: (e: any) => onChange(e, {index: i, key: `v${aKey+2}`})
                                                    }} />日
                                                </>
                                            }) }
                                        </div>
                                    </td>
                                </tr>
                            case 1 :
                                return <tr>
                                    <td>
                                        <div className='dis-flex'>
                                            <span className='span-text'>节假日值班</span>
                                            <ChildRon {...{
                                                component: '',
                                                value: v[`v${1}`],
                                                onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                            }} />
                                            <span>次</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='dis-flex'>
                                            <span>分别为</span>
                                            { Array.from(new Array(3)).map((item:any,aKey:number)=>{
                                                return <>
                                                    <ChildRon {...{
                                                        component: 'DataPicker',
                                                        value: v[`v${aKey + 2}`],
                                                        onChange: (e: any) => onChange(e, {index: i, key: `v${aKey+2}`})
                                                    }} />日
                                                </>
                                            }) }
                                        </div>
                                    </td>
                                </tr>
                            case 2 :
                                return <tr>
                                    <td>
                                        <div className='dis-flex'>
                                           <span className='span-text'>抽查性查房</span>
                                            <ChildRon {...{
                                                component: '',
                                                value: v[`v${1}`],
                                                onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                            }} />
                                            <span>次</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='dis-flex'>
                                            <span>分别为</span>
                                            { Array.from(new Array(4)).map((item:any,aKey:number)=>{
                                                return <>
                                                    <ChildRon {...{
                                                        component: 'DataPicker',
                                                        value: v[`v${aKey + 2}`],
                                                        onChange: (e: any) => onChange(e, {index: i, key: `v${aKey+2}`})
                                                    }} />日
                                                </>
                                            }) }
                                        </div>
                                    </td>
                                </tr>
                            case 3 :
                                return <tr key={i}>
                                    <td colSpan={2}>
                                        <div className='row-box'><span>1、夜查房科室存在问题:</span>
                                            <ChildRon {...{
                                                component: 'TextArea',
                                                value: v[`v${1}`],
                                                onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                            }} />
                                        </div>
                                    </td>
                                </tr>;
                            case 4 :
                                return <tr key={i}>
                                    <td colSpan={2}>
                                        <div className='row-box'>
                                            <span>改进措施:</span>
                                            <ChildRon {...{
                                                component: 'TextArea',
                                                value: v[`v${1}`],
                                                onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                            }} />
                                        </div>
                                    </td>
                                </tr>;
                            case 5 :
                                return <tr key={i}>
                                    <td colSpan={2}>
                                        <div className='row-box'>
                                            <span>2、节假日查房科室存在问题:</span>
                                            <ChildRon {...{
                                                component: 'TextArea',
                                                value: v[`v${1}`],
                                                onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                            }} />
                                        </div>
                                    </td>
                                </tr>;
                            case 6 :
                                return <tr key={i}>
                                    <td colSpan={2}>
                                        <div className='row-box'>
                                            <span> 改进措施:</span>
                                            <ChildRon {...{
                                                component: 'TextArea',
                                                value: v[`v${1}`],
                                                onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                            }} />
                                        </div>
                                    </td>
                                </tr>;
                            case 7 :
                                return <tr key={i}>
                                    <td colSpan={2}>
                                        <div className='row-box'>
                                            <span>3、行政查房科室存在问题:</span>
                                            <ChildRon {...{
                                                component: 'TextArea',
                                                value: v[`v${1}`],
                                                onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                            }} />
                                        </div>
                                    </td>
                                </tr>;
                            case 8 :
                                return <tr key={i}>
                                    <td colSpan={2}>
                                        <div className='row-box'>
                                            <span>改进措施:</span>
                                            <ChildRon {...{
                                                component: 'TextArea',
                                                value: v[`v${1}`],
                                                onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                            }} />
                                        </div>
                                    </td>
                                </tr>;
                            case 9 :
                                return <tr key={i}>
                                    <td colSpan={2}>
                                        <div className='row-box'>
                                            <span>4、抽查科室存在问题:</span>
                                            <ChildRon {...{
                                                component: 'TextArea',
                                                value: v[`v${1}`],
                                                onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                            }} />
                                        </div>
                                    </td>
                                </tr>;
                            case 10 :
                                return <tr key={i}>
                                    <td colSpan={2}>
                                        <div className='row-box'>
                                            <span>改进措施:</span>
                                            <ChildRon {...{
                                                component: 'TextArea',
                                                value: v[`v${1}`],
                                                onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                            }} />
                                        </div>
                                    </td>
                                </tr>;
                        }
                    })
                }
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
  .dis-flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3px;
    .span-text{
      width: 120px;
      font-size: 16px;
      font-weight: 600;
    }
  }
  table td .cell-ipt.ant-calendar-picker{
    min-width: 10% !important;
    width: 100px !important;
  }
  .row-box {
    display: flex;
    height: 100px;

    span {
      width: 100px;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .input-w {
    width: 80px;
  }

`