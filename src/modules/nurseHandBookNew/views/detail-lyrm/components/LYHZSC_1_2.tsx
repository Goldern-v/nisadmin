import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../model'
import { Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
const { TextArea } = Input

export interface Props {
}
/**护士长季度工作计划 */
export default observer(function (props: Props) {

  const onChange = (e: any, key: string) => {
    const data = {
      ...model.editorData,
      [key]: e.target.value || e.currentTarget.innerText
    }
    model.handleEditorChange(data)
  }

  return (
    <Wrapper className='con--a4' ref={model.ctxRef}>
      <Input className='title' value={model.editorTitle} onChange={(e) => model.onChangeTitle(e)} />
      <table>
        <colgroup>
          <col width='50%' />
          <col width='50%' />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <div className='label'>
                第一季度护理工作安排
              </div>
            </td>
            <td>
              <div className='label'>
                第二季度护理工作安排
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <TextArea autosize={{ minRows: 12 }} className='cell-ipt te-8' value={model.editorData?.v1} onChange={(e) => onChange(e, 'v1')}></TextArea>
              {/* <div contentEditable={true} className='cell-ipt ant-input ta-l' onBlur={(e) => onChange(e, 'v1')} suppressContentEditableWarning>
                {model.editorData?.v1}
              </div> */}
            </td>
            <td>
              <TextArea autosize={{ minRows: 12 }} className='cell-ipt te-8' value={model.editorData?.v2} onChange={(e) => onChange(e, 'v2')}></TextArea>
              {/* <div contentEditable={true} className='cell-ipt ant-input ta-l' onBlur={(e) => onChange(e, 'v2')} suppressContentEditableWarning>
                {model.editorData?.v2}
              </div> */}
            </td>
          </tr>
          <tr>
            <td>
              <div className='label'>
                第三季度护理工作安排
              </div>
            </td>
            <td>
              <div className='label'>
                第四季度护理工作安排
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <TextArea autosize={{ minRows: 12 }} className='cell-ipt te-8' value={model.editorData?.v3} onChange={(e) => onChange(e, 'v3')}></TextArea>
              {/* <div contentEditable={true} className='cell-ipt ant-input ta-l' onBlur={(e) => onChange(e, 'v3')} suppressContentEditableWarning>
                {model.editorData?.v3}
              </div> */}
            </td>
            <td>
              <TextArea autosize={{ minRows: 12 }} className='cell-ipt te-8' value={model.editorData?.v4} onChange={(e) => onChange(e, 'v4')}></TextArea>
              {/* <div contentEditable={true} className='cell-ipt ant-input ta-l' onBlur={(e) => onChange(e, 'v4')} suppressContentEditableWarning>
                {model.editorData?.v4}
              </div> */}
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`

`