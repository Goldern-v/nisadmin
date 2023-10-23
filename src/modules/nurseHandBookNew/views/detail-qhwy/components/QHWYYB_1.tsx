import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../model'
import { Input, DatePicker, Select } from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from 'src/modules/nurseHandBookNew/style'
import moment from 'moment'
import { authStore } from 'src/stores'
const { TextArea } = Input
const { Option } = Select

export interface Props {
}
/**护士长季度工作计划 */
export default observer(function (props: Props) {

  const { deptList } = authStore

  const onChange = (e: any, key: string) => {

    const data = {
      ...model.editorData,
      [key]: e.target.value || e.currentTarget.innerText
    }
    
    model.handleEditorChange(data)
  }

  const onChange1 = (e: any, key: string) => {
    const data = {
      ...model.editorData,
      [key]: e
    }
    model.handleEditorChange(data)
  }

  return (
    <Wrapper className='con--a4' ref={model.ctxRef}>
      <Input className='title' value={model.editorTitle} onChange={(e) => model.onChangeTitle(e)} />
      <table>
        <colgroup>
          <col width='100%' />
        </colgroup>
        <tbody>
          <tr>
            <td className='flex cell-ipt'>
              <div>日期：</div>
              <DatePicker
                style={{ width: 180 }}
                value={model.editorData?.v1 ? moment(model.editorData.v1) : undefined} onChange={(e:any) => onChange1(e, 'v1')} />
            </td>
          </tr>
          <tr>
            <td className='flex cell-ipt'>
              <div>科室：</div>
              <Select style={{width: '80%'}} value={model.editorData?.v2} onChange={(e:any) => onChange1(e, 'v2')}>
                {
                  deptList.map(v => (
                    <Option key={v.code} value={v.code}>{v.name}</Option>
                  ))
                }
              </Select>
            </td>
          </tr>
          <tr>
            <td>
              <div className='label'>
              上月工作完成情况：
              </div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-8' value={model.editorData?.v3} onChange={(e:any) => onChange(e, 'v3')}></TextArea>
            </td>
          </tr>
          <tr>
            <td>
              <div className='label'>
              未完成工作及说明：
              </div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-8' value={model.editorData?.v4} onChange={(e:any) => onChange(e, 'v4')}></TextArea>
            </td>
          </tr>
          <tr>
            <td>
              <div className='label'>
              本月工作计划：
              </div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-8' value={model.editorData?.v5} onChange={(e:any) => onChange(e, 'v5')}></TextArea>
            </td>
          </tr>
          <tr>
            <td>
              <div className='label'>
                需协调和帮助：
              </div>
              <TextArea autosize={{ minRows: 8 }} className='cell-ipt te-8' value={model.editorData?.v6} onChange={(e:any) => onChange(e, 'v6')}></TextArea>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
})

const Wrapper = styled(DetailCtxCon)`
.label{
  text-align: left;
}
.flex{
  display: flex;
}
.ant-select-arrow{
  display: none;
}
.ant-input{
  border: 'none'
}

`