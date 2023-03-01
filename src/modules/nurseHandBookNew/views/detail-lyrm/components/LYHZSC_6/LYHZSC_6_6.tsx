import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../../model'
import { Input } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import moment, { isMoment } from 'moment'
import { dateFormat } from '../../config'
import { isOfType } from 'src/utils/ts.utils'
import { ChangeOrFocus } from 'src/libs/types'
const { TextArea } = Input

export interface Props {
}
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
        {model.detail?.record?.menuName}
      </div>
      <table>
        <colgroup>
          <col width='10%' />
          <col width='20%' />
          <col width='10%' />
          <col width='20%' />
          <col width='10%' />
          <col width='20%' />
        </colgroup>
        <tbody>
          {
            [1, 2, 3].map((v, i) => {
              const val = i * 9
              return (<>
                <tr key={`${i}-0`}>
                  <td>姓名</td>
                  <td>
                    <Input className='cell-ipt' value={model.editorData[`v${val + 1}`]} onChange={(e) => onChange(e, `v${val + 1}`)} />
                  </td>
                  <td>性别</td>
                  <td>
                    <Input className='cell-ipt' value={model.editorData[`v${val + 2}`]} onChange={(e) => onChange(e, `v${val + 2}`)} />
                  </td>
                  <td>学历</td>
                  <td>
                    <Input className='cell-ipt' value={model.editorData[`v${val + 3}`]} onChange={(e) => onChange(e, `v${val + 3}`)} />
                  </td>
                </tr>
                <tr key={`${i}-1`}>
                  <td>年龄</td>
                  <td>
                    <Input className='cell-ipt' value={model.editorData[`v${val + 4}`]} onChange={(e) => onChange(e, `v${val + 4}`)} />
                  </td>
                  <td>带教年限</td>
                  <td>
                    <Input className='cell-ipt' value={model.editorData[`v${val + 5}`]} onChange={(e) => onChange(e, `v${val + 5}`)} />
                  </td>
                  <td>职称</td>
                  <td>
                    <Input className='cell-ipt' value={model.editorData[`v${val + 6}`]} onChange={(e) => onChange(e, `v${val + 6}`)} />
                  </td>
                </tr>
                <tr key={`${i}-2`}>
                  <td className='ta-l' colSpan={6}>
                    <div className='label'>科研、论文：</div>
                    <TextArea autosize={{ minRows: 2 }} className='cell-ipt te-60' value={model.editorData[`v${val + 7}`]} onChange={(e) => onChange(e, `v${val + 7}`)} />
                  </td>
                </tr>
                <tr key={`${i}-3`}>
                  <td className='ta-l' colSpan={6}>
                    <div className='label'>以往所获教学奖励情况：</div>
                    <TextArea autosize={{ minRows: 2 }} className='cell-ipt te-60' value={model.editorData[`v${val + 8}`]} onChange={(e) => onChange(e, `v${val + 8}`)} />
                  </td>
                </tr>
                <tr key={`${i}-4`}>
                  <td className='ta-l' colSpan={6}>
                    <div className='label'>院内外授课情况</div>
                    <TextArea autosize={{ minRows: 2 }} className='cell-ipt te-60' value={model.editorData[`v${val + 9}`]} onChange={(e) => onChange(e, `v${val + 9}`)} />
                  </td>
                </tr>
              </>)
            })
          }
        </tbody>
      </table >
    </Wrapper >
  )
})

const Wrapper = styled(DetailCtxCon)`
.title {
  margin-bottom: 0;
}
`