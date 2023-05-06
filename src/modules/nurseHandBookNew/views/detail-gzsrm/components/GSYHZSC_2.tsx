import React from 'react'
import styled from 'styled-components'
import { nurseHandbookRecordModel as model } from '../model'
import { Button, Input,message} from 'antd'
import { observer } from 'mobx-react'
import { DetailCtxCon } from '../../../style'
import { Obj } from 'src/libs/types'
import cloneDeep from 'lodash/cloneDeep'
import { globalModal } from "src/global/globalModal"
const { TextArea } = Input
export interface Props {
}

/**护士长月工作计划 */
export default observer(function (props: Props) {

  const onChange = (e: any, config: Obj) => {
    const { index , key } = config
    const newData = cloneDeep(model.editorData)
    newData[index][key] = e.target.value
    model.handleEditorChange(newData)
  }


  const removeObj = (idx:number)=>{
    globalModal
		.confirm( `提示`,`是否确认删除？`)
		.then((res) => {
      model.editorData.splice(idx,4)
      message.success('删除成功！')
     
		}).catch(err=>{

		})
  }

  return (
    <Wrapper ref={model.ctxRef}  style={{ pointerEvents: model.allowEdit ? 'auto' : 'none' }}>
      <div className='title'>护士长月工作计划</div>
      <table>
        <colgroup>
          <col width='10%' />
          <col width='5%' />
          <col />
          <col width='10%' />
          <col width='15%' />
          <col width='10%' />
          <col width='10%' />
        </colgroup>
        <thead>
          <tr>
            <th className='ta-l' colSpan={7}>背景：医院、科室发展规划、年度计划。</th>
          </tr>
          <tr>
            <th>工作目标</th>
            <th>序号</th>
            <th>目标分解工作任务</th>
            <th>完成时间/频次</th>
            <th>责任人</th>
            <th>落实情况</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          {
            (model.editorData || []).map((v: Obj, i: number) => {
              return (
                <>
                  <tr key={i}>
                    {v.title !== undefined && <td rowSpan={4} className='ta-l' style={{position:'relative'}}>
                    {(!model.isPrint && model.editorData.length/4>3) && <Button className='delete-btn' type='danger' shape="circle" size='small' icon="delete" onClick={()=>{removeObj(i)}}></Button>}
                      <TextArea className='cell-ipt' autosize={{minRows: 4}} value={v.title} onChange={(e) => onChange(e, { index: i, key: 'title' })}></TextArea>
                    </td>}
                    <td>{i % 4 + 1}</td>
                    <td className='ta-l'>
                      <TextArea className='cell-ipt' autosize={{minRows: 1}} value={v.v1} onChange={(e) => onChange(e, { index: i, key: 'v1' })}></TextArea>
                    </td>
                    <td className='ta-l'>
                      <Input className='cell-ipt' value={v.v2} onChange={(e) => onChange(e, { index: i, key: 'v2' })}></Input>
                    </td>
                    <td className='ta-l'>
                      <Input className='cell-ipt' value={v.v3} onChange={(e) => onChange(e, { index: i, key: 'v3' })}></Input>
                    </td>
                    <td className='ta-l'>
                      <Input className='cell-ipt' value={v.v4} onChange={(e) => onChange(e, { index: i, key: 'v4' })}></Input>
                    </td>
                    <td className='ta-l'>
                      <TextArea className='cell-ipt' autosize={{minRows: 1}} value={v.v5} onChange={(e) => onChange(e, { index: i, key: 'v5' })}></TextArea>
                    </td>
                  </tr>
                </>
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
  .delete-btn{
    position: absolute;
    right: -5px;
    top: -10px;
    z-index: 2;
  }
  /* textarea {
    min-height: 80px;
    height: auto;
  } */
`