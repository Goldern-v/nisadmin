import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { Checkbox, DatePicker, Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import moment, { isMoment } from 'moment'
import { dateFormat, timeFormat } from '../../config'
import { isOfType } from 'src/utils/ts.utils'
import { ChangeOrFocus } from 'src/libs/types'
import CheckboxGroup from 'antd/es/checkbox/Group'
import SelectFilter from 'src/components/SelectFilter'
import { genders } from '../../enums'
const { TextArea } = Input

export interface Props {
}

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
      <table>
        <colgroup>
          <col width='25%' />
          <col width='25%' />
          <col width='25%' />
          <col width='25%' />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <div className='ctx-line'>
                时间：
                <DatePicker className='cell-ipt' showTime={{ format: timeFormat }}
                  format={dateFormat} value={model.editorData?.v1 ? moment(model.editorData?.v1) : undefined} onChange={(e) => onChange(e, 'v1')} />
              </div>
            </td>
            <td>
              <div className='ctx-line'>
                地点：
                <Input className='cell-ipt' value={model.editorData?.v2} onChange={(e) => onChange(e, 'v2')} />
              </div>
            </td>
            <td>
              <div className='ctx-line'>
                主持人：
                <Input className='cell-ipt' value={model.editorData?.v3} onChange={(e) => onChange(e, 'v3')} />
              </div>
            </td>
            <td>
              <div className='ctx-line'>
                职务/层级：
                <Input className='cell-ipt' value={model.editorData?.v4} onChange={(e) => onChange(e, 'v4')} />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <div className='ctx-line label'>
                病例类型：
                <CheckboxGroup value={(model.editorData?.v5 || '').split(',')} onChange={(e) => onChange(e, 'v5')}>
                  {(['疑难', '危重', '死亡']).map((v: string, i: number) => {
                    return (
                      <Checkbox
                        key={i}
                        value={v}
                        className="choiceCss"
                      >
                        {v}
                      </Checkbox>
                    );
                  })}
                </CheckboxGroup>
              </div>
            </td>
          </tr>

          <tr>
            <td colSpan={4}>
              <div className="label">
                参加人员
              </div>
              <TextArea className='cell-ipt te-60' autosize={{ minRows: 2 }} value={model.editorData?.v6} onChange={(e) => onChange(e, 'v6')} />
            </td>
          </tr>
          <tr>
            <td>
              <div className='ctx-line'>
                患者姓名：
                <Input className='cell-ipt' value={model.editorData?.v7} onChange={(e) => onChange(e, 'v7')} />
              </div>
            </td>
            <td>
              <div className='ctx-line'>
                性别：
                <SelectFilter className='cell-ipt' list={genders} value={model.editorData?.v8} onChange={(e) => onChange(e, 'v8')} />
                {/* <Input className='cell-ipt' value={model.editorData?.v8} onChange={(e) => onChange(e, 'v8')} /> */}
              </div>
            </td>
            <td>
              <div className='ctx-line'>
                年龄：
                <Input className='cell-ipt' value={model.editorData?.v9} onChange={(e) => onChange(e, 'v9')} />
              </div>
            </td>
            <td>
              <div className='ctx-line'>
                住院号：
                <Input className='cell-ipt' value={model.editorData?.v10} onChange={(e) => onChange(e, 'v10')} />
              </div>
            </td>
          </tr>
          <tr>
            <td className='ta-l' colSpan={4}>
              <div className='label ctx-line'>诊断：
              <Input className='cell-ipt' value={model.editorData?.v11} onChange={(e) => onChange(e, 'v11')}></Input>
              </div>
            </td>
          </tr>
          <tr>
            <td className='ta-l' colSpan={4}>
              <div className='label'>病例摘要：</div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-200' value={model.editorData?.v12} onChange={(e) => onChange(e, 'v12')}></TextArea>
            </td>
          </tr>
          <tr>
            <td className='ta-l' colSpan={4}>
              <div className='label'>讨论意见：</div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-200' value={model.editorData?.v13} onChange={(e) => onChange(e, 'v13')}></TextArea>
            </td>
          </tr>
          <tr>
            <td className='ta-l' colSpan={4}>
              <div className='label'>主持人总结：</div>
              <TextArea autosize={{ minRows: 6 }} className='cell-ipt te-150' value={model.editorData?.v14} onChange={(e) => onChange(e, 'v14')}></TextArea>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
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
`