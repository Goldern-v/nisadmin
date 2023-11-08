import React, {memo, useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../model'
import {Button, DatePicker, Input, message, Select, Spin} from 'antd'
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
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import {appStore, authStore} from "src/stores";

const {Option} = Select
const {TextArea} = Input

export interface Props {
}

const ChildCon = memo((props: any) => {
    const {value, component, ...other} = props
    switch (component) {
        case 'Dead':
            return (
                <Select
                    style={{width: 80}}
                    value={value || ''}  {...other}>
                    {(model?.nurseList || []).map((nurse: any) => <Option key={nurse.empNo}>{nurse.empName}</Option>)}
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
const [loading,setLoading]=useState<boolean>(false)
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
        // newData[index][key] = value
        model.handleEditorChange(newData)
    }
    const handleCopyItem = (type: string) => {
        const newData = cloneDeep(model.editorData)
        const conData = createArr(1, (j, k) => createObjV(4));
        newData[type] = [...newData[type], ...conData]
        model.handleEditorChange(newData)
    }
    const handleDeleteItem = (type: string) => {
        const newData = cloneDeep(model.editorData)
        let startIndex = newData[type].length - 1;
        if (startIndex >= 12) {
            newData[type].splice(startIndex, 1);
            model.handleEditorChange(newData)
        } else {
            return message.info('不能再删除了~')
        }

    }
    /**获取指定日期所在月的第一天和最后一天**/
    const getFirstDateAndLastDate = () => {
        let year = new Date().getFullYear();
        let month = model.detail?.record?.month
        let monthLastDay = new Date(year, month, 0).getDate();
        let firstDate = year + '-' + month + '-' + '01';
        let lastDate = year + '-' + month + '-' + monthLastDay;
        return {
            startTime: firstDate,
            endTime: lastDate
        }
    }

    useEffect(() => {
        setLoading(true)
        const timeObj = getFirstDateAndLastDate()
        nurseHandBookService.getManpowerData({...timeObj}).then((res) => {
            const arr = createArr(res.data.itemList.length, (j, k) => createObjV(10));
            // model.handleEditorChange(arr);
            let list:any =arr.map((i:any,index:number)=>{
                // deptName,practicingNurses执业护士总人数,trainee培训生
                res.data.itemList.map((item:any,key:number)=>{
                    if(index == key){
                        i['practicingNurses'] = item.practicingNurses
                        i['deptName'] = item.deptName
                        i['trainee'] = item.trainee
                    }
                })
                return   i
            })
          model.handleEditorChange(list)
            setLoading(false)
        })
    }, [appStore.location.pathname])
    return (
        <Wrapper className='con--a4' ref={model.ctxRef}>
            <div className='title'>
                {model.detail?.record?.year}年{model.detail?.record?.month}月{model.detail?.record?.[config?.titleType || 'menuName']}
            </div>
            <Spin spinning={loading}>
                <table>
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
                    {
                        ((model.editorData) || []).map((v: Obj, i: number, all: any) => {
                            return (
                                <tr key={i}>
                                    {
                                        columns.map((v1: Obj, i1: number, c1: any) => {
                                            if(i1 == 0){
                                                return  <td>{i + 1}</td>
                                            }
                                            if(!v1.isEdit && v1.keyType ){
                                                return  <td>{v[v1.keyType]}</td>
                                            }
                                            return (
                                                <td key={`${i}-${i1}`} >
                                                    <ChildCon {...{
                                                        component: v1.component,
                                                        value: v[v1.keyType],
                                                        onChange: (e: any) => onChange( e, {index: i, key: `${v1.keyType}`})
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
                <div className='date'>
                    <div style={{marginLeft:"50px"}}>填表人:{authStore.user?.empName}</div>
                    <div style={{marginLeft:"50px"}}>填表日期:{moment().format("YYYY-MM-DD")}</div>
                </div>
            </Spin>

        </Wrapper>
    )
})

const Wrapper = styled(DetailCtxCon)`
  .titleName {
    line-height: 40px;
    border: 1px solid #333;
    border-bottom: none;
    text-align: center;
  }

  .addButton {
    position: absolute;
    right: -90px;
    height: 35px
  }

  .deleteButton {
    position: absolute;
    right: -200px;
    height: 35px
  }
  .date{
    display: flex;
    justify-content: flex-end;
    height: 50px;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
  }
`