import React, {useMemo} from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../model'
import {Input} from 'antd'
import {observer} from 'mobx-react'
import {DetailCtxCon} from 'src/modules/nurseHandBookNew/style'
import {ChangeOrFocus, Obj} from "src/libs/types";
import {dateFormat, tableConConfig} from "src/modules/nurseHandBookNew/views/detail-qhwy/config";
import ChildCon from "src/modules/nurseHandBookNew/views/components/ChildCon";
import {isMoment} from "moment/moment";
import {isOfType} from "src/utils/ts.utils";
import cloneDeep from "lodash/cloneDeep";



/**各类活动等级 */
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
        <Wrapper className='con--a4' ref={model.ctxRef}>
            {/*<div className='title-box'>*/}
            {/*    <Input className={classNames(['title', 'title-box-input'])} value={model.editorData?.vYear}*/}
            {/*           onChange={(e: any) => onChange(e, 'vYear')}/>年*/}
            {/*    <Input*/}
            {/*        className={classNames(['title', 'title-box-input'])}*/}
            {/*        value={model.editorData?.vMonth} onChange={(e: any) => onChange(e, 'vMonth')}/>月第*/}
            {/*    <Input*/}
            {/*        className={classNames(['title', 'title-box-input'])}*/}
            {/*        value={model.editorData?.vWeek}*/}
            {/*        onChange={(e: any) => onChange(e, 'vWeek')}/>周{model.editorTitle}*/}
            {/*</div>*/}
            <Input className='title' value={model.editorTitle} onChange={(e) => model.onChangeTitle(e)} />
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
                    ((model.editorData) || []).map((v: Obj, i: number) => {
                        return (
                            <tr key={i}>
                                {
                                    columns.map((v1: Obj, i1: number) => {
                                        return (
                                            <td key={`${i}-${i1}`} >
                                                <ChildCon {...{
                                                    height:'60px',
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
  //.title-box {
  //  display: flex;
  //  align-items: center;
  //  justify-content: center;
  //  margin-bottom: 20px;
  //}
  //
  //.title-box-input {
  //  width: 70px !important;
  //  margin-bottom: 0 !important;
  //}

  .label {
    text-align: left;
  }

  .flex {
    display: flex;
  }

  .ant-select-arrow {
    display: none;
  }

  .ant-input {
    border: none
  }
`