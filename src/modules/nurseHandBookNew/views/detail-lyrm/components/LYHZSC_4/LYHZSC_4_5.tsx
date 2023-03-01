import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import moment, { isMoment } from 'moment'
import { dateFormat, timeFormat } from '../../config'
import { isOfType } from 'src/utils/ts.utils'
import { ChangeOrFocus } from 'src/libs/types'
import SelectFilter from 'src/components/SelectFilter'
import { authStore } from 'src/stores'
const { TextArea } = Input

export interface Props {
}
/**应急预案演练记录 */
export default observer(function (props: Props) {

  const onChange = (e: any, key: string) => {
    let value: any = e
    if (isMoment(e)) {
      value = e.format(dateFormat)
    } else if (isOfType<ChangeOrFocus>(e, 'target')) {
      value = e.target.value || e.currentTarget.innerText
    }
    const data = {
      ...model.editorData,
      [key]: value
    }
    model.handleEditorChange(data)
  }

  return (
    <Wrapper className='con--a4' ref={model.ctxRef}>
      <div className='title'>
        临邑县人民医院护理人员应急预案演练记录
      </div>
      <table>
        <colgroup>
          <col width='40%' />
          <col width='30%' />
          <col width='30%' />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <div className='ctx-line'>
                演练标题：
                <Input className='cell-ipt' value={model.editorData?.v1} onChange={(e) => onChange(e, 'v1')} />
              </div>
            </td>
            <td>
              <div className='ctx-line'>
                演练时间：
                <DatePicker className='cell-ipt' showTime={{ format: timeFormat }}
                  format={dateFormat} value={model.editorData?.v2 ? moment(model.editorData?.v2) : undefined} onChange={(e) => onChange(e, 'v2')} />
              </div>
            </td>
            <td>
              <div className='ctx-line'>
                科室：
                <SelectFilter className='cell-ipt' list={authStore.deptList} value={model.editorData?.v3} onChange={(e) => onChange(e, 'v3')} />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className='ctx-line'>
                指挥人员：
                <Input className='cell-ipt' value={model.editorData?.v4} onChange={(e) => onChange(e, 'v4')} />
              </div>
            </td>
            <td colSpan={2}>
              <div className='ctx-line'>
                消耗器材：
                <Input className='cell-ipt' value={model.editorData?.v5} onChange={(e) => onChange(e, 'v5')} />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              参加人员
              <TextArea className='cell-ipt te-60' autosize={{ minRows: 2 }} value={model.editorData?.v6} onChange={(e) => onChange(e, 'v6')} />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className='label'>模拟的演练场景：</div>
              <TextArea autosize={{ minRows: 2 }} className='cell-ipt te-60' value={model.editorData?.v7} onChange={(e) => onChange(e, 'v7')} />
              <div className='label'>演练前培训内容：</div>
              <TextArea autosize={{ minRows: 2 }} className='cell-ipt te-60' value={model.editorData?.v8} onChange={(e) => onChange(e, 'v8')} />
              <div className='label'>演练过程：</div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-200' value={model.editorData?.v9} onChange={(e) => onChange(e, 'v9')} />
              <div className='label'>演练结果：</div>
              <TextArea autosize={{ minRows: 2 }} className='cell-ipt te-60' value={model.editorData?.v10} onChange={(e) => onChange(e, 'v10')} />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className='label'>演练中存在的问题：</div>
              <TextArea autosize={{ minRows: 2 }} className='cell-ipt te-60' value={model.editorData?.v11} onChange={(e) => onChange(e, 'v11')} />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className='label'>整改措施：</div>
              <TextArea autosize={{ minRows: 2 }} className='cell-ipt te-60' value={model.editorData?.v12} onChange={(e) => onChange(e, 'v12')} />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <div className='con-sign'>组织者签字：（本人手签）</div>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`
table td {
  text-align: left;
}
.con-sign {
  height: 70px;
}
`