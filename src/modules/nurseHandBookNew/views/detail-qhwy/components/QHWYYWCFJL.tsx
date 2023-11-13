import React from 'react'
import styled from 'styled-components'
import {nurseHandbookRecordModel as model} from '../model'
import { Radio} from 'antd'
import {observer} from 'mobx-react'
import {DetailCtxCon} from '../../../style'
import {ChangeOrFocus, Obj} from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import {dateFormat} from "src/modules/nurseHandBookNew/views/detail-jew/config";
import {isMoment} from "moment";
import {isOfType} from "src/utils/ts.utils";
import ChildCon from "src/modules/nurseHandBookNew/views/components/ChildCon";

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

    const onChangeRadio = (e: any) => {
        const newData = cloneDeep(model.editorData)
        newData[0]['v1'] = e.target.value
        model.handleEditorChange(newData)
    };
    return (
        <Wrapper ref={model.ctxRef} style={{pointerEvents: model.allowEdit ? 'auto' : 'none'}}>
            <div className='title'>青海省第五人民医院{model.detail?.record?.['menuName']}</div>
            <table>
                <colgroup>
                    {Array.from(new Array(10)).map((item: any, i: number) => {
                        return <col key={`${i}+i1`} width={'10%'}/>
                    })}
                </colgroup>
                <thead>
                </thead>
                <tbody>
                {
                    (model.editorData || []).map((v: Obj, i: number) => {
                        switch (i) {
                            case 0 :
                                return <tr key={'a1'+i}>
                                    <td colSpan={4}>查房内容</td>
                                    <td colSpan={6}>
                                        <Radio.Group onChange={onChangeRadio} value={v['v1']}>
                                            {['1、个案护理查房', '2、危重病例讨论', '3、死亡病例讨论', '4、教学查房',
                                                '5、综合质量查房', '6、疑难护理病例讨论'].map((item: string, i: number) => {
                                                return <Radio value={item}>{item}</Radio>
                                            })}
                                        </Radio.Group>
                                    </td>
                                </tr>
                            case 1 :
                                return <tr key={'b1'+i}>
                                    <td colSpan={1}>查房主持人</td>
                                    <td colSpan={1}>
                                        <ChildCon {...{
                                            component: '',
                                            value: v['v1'],
                                            onChange: (e: any) => onChange(e, {index: i, key:'v1'})
                                        }} />
                                    </td>
                                    <td colSpan={1}>参与人员</td>
                                    <td colSpan={7}>
                                        <ChildCon {...{
                                            component: '',
                                            value: v['v2'],
                                            onChange: (e: any) => onChange(e, {index: i, key: 'v2'})
                                        }} />
                                    </td>
                                </tr>
                            case 2:
                                return <tr key={'c1'+i}>
                                    {[{title: '患者姓名'}, {com: "",key:'v1'}, {title: "年龄"}, {com: "",key:'v2'}, {title: '性别'}, {com: "",key:'v3'}, {title: "民族"}, {com: '',key:'v4'}, {title: "查房日期"}, {com: "DataPicker",key:'v5'}].map((item: any, i1: number) => {
                                        if (item.title) {
                                            return <td key={'a'+i1}>{item.title}</td>
                                        }
                                        return <td key={'a'+i1}>
                                            <ChildCon {...{
                                                component: item.com,
                                                value: v[item.key],
                                                onChange: (e: any) => onChange(e, {index: i, key: item.key})
                                            }} />
                                        </td>
                                    })}
                                </tr>
                            case 3:
                                return  <tr key={'d1'+i}>
                                    <td colSpan={2}>诊断</td>
                                    <td colSpan={8}>
                                        <ChildCon {...{
                                            component:'',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 4:
                                return <tr key={'e1'+i}>
                                    <td colSpan={5}>评价项目</td>
                                    <td colSpan={5}>存在的问题</td>
                                </tr>
                            case 5:
                                return <tr key={'f1'+i}>
                                    <td colSpan={1} rowSpan={3}>病历</td>
                                    <td colSpan={4}  className='left-text'>1.一般资料收集完整，包括家庭、社会、心理等方面。</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 6:
                                return <tr key={'g1'+i}>
                                    <td colSpan={4}  className='left-text'>2.对患者的健康状态客观准确，包括检查、化验。</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 7:
                                return <tr key={'h1'+i}>
                                    <td colSpan={4}  className='left-text'>3.对患者的治疗及护理清楚。</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 8:
                                return <tr key={'j1'+i}>
                                    <td rowSpan={8} colSpan={1}>护理程序</td>
                                    <td rowSpan={3} colSpan={1}>护理问题</td>
                                    <td colSpan={3}  className='left-text'>1.与疾病有关的护理问题全面准确</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 9:
                                return <tr key={'k1'+i}>
                                    <td colSpan={3}  className='left-text'>2.存在的心理问题</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 10:
                                return <tr key={'l1'+i}>
                                    <td colSpan={3}  className='left-text'>3.合作性问题</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 11:
                                return <tr key={'z1'+i}>
                             <td colSpan={1} rowSpan={2}>护理措施</td>
                                    <td colSpan={3}  className='left-text'>1.护理措施详细具体可有可行性，体现专科特点</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 12:
                                return <tr key={'x1'+i}>
                                    <td colSpan={3}  className='left-text'>2.记事准确实施于患者</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 13:
                                return <tr key={'v1'+i}>
                                    <td colSpan={1} rowSpan={3}>效果评价</td>
                                    <td colSpan={3}  className='left-text'>1.护理效果达到预期目标</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 14:
                                return <tr key={'t1'+i}>
                                    <td colSpan={3}  className='left-text'>2.患者及家属满意</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 15:
                                return <tr key={'y1'+i}>
                                    <td colSpan={3}  className='left-text'>能提出预见性护理问题，指定预防措施</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 16:
                                return <tr key={'u1'+i}>
                                    <td rowSpan={2} colSpan={1}>健康教育</td>
                                    <td colSpan={4}  className='left-text'>1.指定健康教育计划，评估患者对教育内容了解情况</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
                            case 17:
                                return <tr key={'o1'+i}>
                                    <td colSpan={4} className='left-text'>2.患者能复述、回示所接受的教育内容。</td>
                                    <td colSpan={5}>
                                        <ChildCon {...{
                                            height:'60px',
                                            component:'TextArea',
                                            value: v[`v${1}`],
                                            onChange: (e: any) => onChange(e, {index: i, key: `v${1}`})
                                        }} />
                                    </td>
                                </tr>
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
  .left-text{
    text-align: left;
  }

`