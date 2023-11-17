import React, { useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../model'
import { Spin} from 'antd'
import {observer} from 'mobx-react'
import {DetailCtxCon} from 'src/modules/nurseHandBookNew/style'
import {ChangeOrFocus, Obj} from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import {dateFormat, tableConConfig} from '../config'
import moment, {isMoment} from 'moment'
import {isOfType} from 'src/utils/ts.utils'
import {nurseHandBookService} from "src/modules/nurseHandBookNew/services/NurseHandBookService";
import {appStore, authStore} from "src/stores";
import ChildCon from "src/modules/nurseHandBookNew/views/components/ChildCon";


export interface Props {
}

/**表格类表单 */
export default observer(function (props: Props) {
    const [loading, setLoading] = useState<boolean>(false)
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
        /**有些特定值需要动态计算**/
        const newData = cloneDeep(model.editorData)
        let list = newData.map((item: any, i: number) => {
            if (i == index) {
                item[key] = value
                // 应配护士
                if (item['openBeds'] && item['standards']) {
                    item['assignedNumber'] = item['openBeds'] * item['standards']
                }
                // 实际床护比
                if (item['employees'] && item['rateBed'] && item['openBeds']) {
                    item['actualBed'] =( (item['employees'] / item['rateBed']) * item['openBeds']).toFixed(2)
                }
                // 实际应配护士
                if (item['rateBed'] && item['openBeds'] && item['standards']) {
                    item['assignedNurse'] = item['rateBed'] * item['openBeds'] * item['standards']
                }
            //     人力实际情况 实际在岗人次大于实际应配护士，人力富余；相反就是人力负荷大。
                if(item['employees'] && item['assignedNurse']){
                    item['percentage'] =item['employees'] > item['assignedNurse'] ?'人力富余':'人力负荷大'
                }
            }
            return item
        })
        model.handleEditorChange(list)
    }
    // const handleCopyItem = (type: string) => {
    //     const newData = cloneDeep(model.editorData)
    //     const conData = createArr(1, (j, k) => createObjV(4));
    //     newData[type] = [...newData[type], ...conData]
    //     model.handleEditorChange(newData)
    // }
    // const handleDeleteItem = (type: string) => {
    //     const newData = cloneDeep(model.editorData)
    //     let startIndex = newData[type].length - 1;
    //     if (startIndex >= 12) {
    //         newData[type].splice(startIndex, 1);
    //         model.handleEditorChange(newData)
    //     } else {
    //         return message.info('不能再删除了~')
    //     }
    //
    // }
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
            model.handleEditorChange(model.editorData||res.data.itemList)
            setLoading(false)
        })
    }, [appStore.location.pathname])
    return (
        <Wrapper className='con--a4' ref={model.ctxRef} style={{width:'1000px'}}>
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
                                            if (i1 == 0) {
                                                return <td>{i + 1}</td>
                                            }
                                            if (!v1.isEdit && v1.keyType) {
                                                return <td>{v[v1.keyType]}</td>
                                            }
                                            return (
                                                <td key={`${i}-${i1}`}>
                                                    <ChildCon {...{
                                                        component: v1.component,
                                                        value: v[v1.keyType],
                                                        onChange: (e: any) => onChange(e, {
                                                            index: i,
                                                            key: `${v1.keyType}`
                                                        })
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
                    <div style={{marginLeft: "50px"}}>填表人:{authStore.user?.empName}</div>
                    <div style={{marginLeft: "50px"}}>填表日期:{moment().format("YYYY-MM-DD")}</div>
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

  .date {
    display: flex;
    justify-content: flex-end;
    height: 50px;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
  }
`