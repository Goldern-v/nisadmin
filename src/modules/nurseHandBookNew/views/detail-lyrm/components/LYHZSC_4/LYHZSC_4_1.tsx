import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import { Obj } from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import { dateFormat, dateFormat4 } from '../../config'
import moment, { isMoment } from 'moment'

const DEF_TEXTS = [
  {
    v1: '在岗人员理论考核合格率',
    v2: '95%',
    v3: '月在岗人员考试合格人数÷月在岗人员数'
  },
  {
    v1: '在岗人员技术操作考核合格率',
    v2: '95%',
    v3: '月在岗人员考试合格人数÷月在岗人员数'
  },
  {
    v1: '住院患者压疮风险评估符合率',
    v2: '100%',
    v3: '月查检住院患者压疮评估符合例数÷月查检住院患者压疮评估总例数'
  },
  {
    v1: '住院患者跌倒/ 坠床风险评估符合率',
    v2: '100%',
    v3: '月查检住院患者跌倒/坠床评估符合例数÷月查检住院患者跌倒/坠床评估总例数'
  },

  {
    v1: '重点环节交接正确率',
    v2: '100%',
    v3: '月重点环节交接正确例次÷月重点环节交接总例次'
  },
  {
    v1: '各类导管管路滑脱发生率',
    v2: '≤10‰',
    v3: '月导管管路滑脱例数÷月患者使用导管总日数'
  },
  {
    v1: '高危药品存放合格率',
    v2: '100%',
    v3: '月查检高危药品合格数÷月查检高危药品总支（袋）数'
  },
  {
    v1: '急救药品完好率',
    v2: '100%',
    v3: '月查检急救药品完好数÷月查检急救药品总数'
  },
  {
    v1: '急救物品完好率',
    v2: '100%',
    v3: '月查检急救物品完好数÷月查检急救物品总数'
  },
  {
    v1: '护理文书书写合格率',
    v2: '97%',
    v3: '月查检护理文书合格分数÷月查检护理文书总份数'
  },
]
export interface Props {
}
export default observer(function (props: Props) {

  const onChange = (e: any, config: Obj | string) => {
    const newData = cloneDeep(model.editorData)
    if (typeof config === 'string') {
      newData[config] = e.format(dateFormat)
      return model.handleEditorChange(newData)
    }
    const { index, key } = config
    newData.v2[index][key] = e.target.value
    model.handleEditorChange(newData)
  }

  return (
    <Wrapper className='con--a4' ref={model.ctxRef}>
      <div className='title'>{model.detail?.record?.title}</div>
      <div className='date-con'>
        <DatePicker className='cell-ipt'
          format={dateFormat4} value={model.editorData?.v1 ? moment(model.editorData?.v1) : undefined} onChange={(e) => onChange(e, 'v1')} />
      </div>
      <table>
        <colgroup>
          <col width='5%' />
          <col width='35%' />
          <col width='10%' />
          <col width='40%' />
          <col width='10%' />
        </colgroup>
        <thead>
          <tr>
            <th>序号</th>
            <th>监测指标</th>
            <th>合格指标</th>
            <th>计算方法</th>
            <th>实测数值</th>
          </tr>
        </thead>
        <tbody>
          {
            (model.editorData.v2 || []).map((v: Obj, i: number) => {
              const isDef = i < 10
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{isDef ? DEF_TEXTS[i].v1 : <Input className='cell-ipt ta-c' value={v.v1} onChange={(e) => onChange(e, { index: i, key: 'v1' })} />}</td>
                  <td>{isDef ? DEF_TEXTS[i].v2 : <Input className='cell-ipt ta-c' value={v.v2} onChange={(e) => onChange(e, { index: i, key: 'v2' })} />}</td>
                  <td>{isDef ? DEF_TEXTS[i].v3 : <Input className='cell-ipt ta-c' value={v.v3} onChange={(e) => onChange(e, { index: i, key: 'v3' })} />}</td>
                  <td><Input className='cell-ipt ta-c' value={v.v4} onChange={(e) => onChange(e, { index: i, key: 'v4' })} /></td>
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
.date-con {
  width: 100px;
 .cell-ipt {
    min-width: 100px !important;
  }
}
`