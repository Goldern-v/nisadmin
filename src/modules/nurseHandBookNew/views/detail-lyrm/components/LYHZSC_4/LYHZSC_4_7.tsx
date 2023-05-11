import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon, MULTI_UNDERLINE } from 'src/modules/nurseHandBookNew/style'
import moment, { isMoment } from 'moment'
import { dateFormat, dateFormat1, timeFormat } from '../../config'
import { isOfType } from 'src/utils/ts.utils'
import { ChangeOrFocus } from 'src/libs/types'
const { TextArea } = Input

const PH_1 = `1、如果本次只讨论护理质控，只记录护理质控讨论分析记录，不写例会记录•
2、如果本次只讨论不良事件，只记录不良事件讨论分析记录，不写例会记录。
3、如果同时进行多项内容，可以简记为：①× 月护理质控讨论分析；②x月×日，良事件讨论分析`

export interface Props {
}

/**护理人员例会记录 */
export default observer(function (props: Props) {

  const onChange = (e: any, key: string) => {
    let value: any = e
    if (isMoment(e)) {
      value = e.format(dateFormat)
    } else if (e instanceof Array) {
      value = e.join(',')
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
        {model.detail?.record?.menuName}
      </div>
      <div>
        <div className='ctx-line'>
          时间：
          <DatePicker className='cell-ipt' showTime={{ format: timeFormat }}
            format={dateFormat1} value={model.editorData?.v1 ? moment(model.editorData?.v1) : undefined} onChange={(e) => onChange(e, 'v1')} />
        </div>

        <div className='ctx-line'>
          地点：
          <Input className='cell-ipt' value={model.editorData?.v2} onChange={(e) => onChange(e, 'v2')} />
          记录人：
          <Input className='cell-ipt' value={model.editorData?.v3} onChange={(e) => onChange(e, 'v3')} />
        </div>
        <div className=''>
          参加人员：（需本人亲自签名）：
          <TextArea className='cell-ipt' autosize={{ minRows: 2 }} value={model.editorData?.v4} onChange={(e) => onChange(e, 'v4')} />
        </div>
        <div className="label">
          会议纪要：
        </div>
        <TextArea className='cell-ipt te-8' autosize={{ minRows: 10 }} value={model.editorData?.v6} onChange={(e) => onChange(e, 'v6')} placeholder={PH_1} />
        <div className="f-s">备注：科室每月至少召开例会井记录1次。</div>
      </div>
    </Wrapper >
  )
})

const Wrapper = styled(DetailCtxCon)`
.date-con {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  .cell-ipt {
    width: 140px;
  }
}
table td {
  text-align: left;
}
.ant-input, .multi_underline {
  ${MULTI_UNDERLINE()}
}
.multi_underline {
  padding: 6px;
}
`