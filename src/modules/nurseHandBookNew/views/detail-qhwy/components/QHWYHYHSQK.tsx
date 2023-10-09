import React, {useMemo} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../model'
import {observer} from 'mobx-react'
import {DetailCtxCon} from '../../../style'
import {ChangeOrFocus, Obj} from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import {tableConConfig} from "src/modules/nurseHandBookNew/views/detail-qhwy/config";
import {dateFormat} from "src/modules/nurseHandBookNew/views/detail-jew/config";
import  {isMoment} from "moment";
import {isOfType} from "src/utils/ts.utils";
import ChildCon from "src/modules/nurseHandBookNew/views/components/ChildCon";
export default observer(function () {
    const columns = useMemo(() => tableConConfig[model.detail?.record?.menuCode]?.columns || [], [model.id])

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
                    {
                        columns.map((v: Obj, i: number) => (
                            <col key={i} {...(v.width ? {width: v.width} : {})} />
                        ))
                    }
                </colgroup>
                <thead>
                <tr>
                    <th className='ta-l' style={{textAlign:'center',fontWeight:800}} colSpan={4}>怀孕护士</th>
                </tr>
                <tr>
                    {
                        columns.map((v: Obj, i: number) =>(
                          <td  key={i}>{v.title}</td>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    (model.editorData || []).map((v: Obj, i: number) => {
                        return (
                            <tr key={i}>
                                {
                                    columns.map((v1: Obj, i1: number) => {
                                        return (
                                            <td key={`${i}-${i1}`}>
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

`