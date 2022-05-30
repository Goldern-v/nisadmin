import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { ColumnProps } from 'antd/lib/table'
import { cloneJson } from 'src/utils/json/clone'
import { Input } from 'src/vendors/antd'
const { TextArea } = Input
export interface Props {
  sectionId: string
  data: any
  setData: any
}
export default function OperationEmModal(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  let editData: any = cloneData && cloneData.list
  useEffect(() => { }, [])

  const handleChange = (e: any, key: string) => {
    if (setData){
      setData()
    }
  }
  return (
    <Wrapper>
      <div className='edit_text'>
      <div className="context">（1）人力资源情况：</div>
      <div className="context">急诊：</div>
      <div className="context">
        区域定编：<Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />人;实际编制:<Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />人;
        截止本月底实际在岗:
        <Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />人
      </div>
      <div className="context">
        本月离职护士 <Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />人（未转正护士 <Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />人，转正执业护士{" "}
        <Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />人）
      </div>
      <div className="context">
        本月护士离职率 <Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />
        %（公式：当月离职执业护士/期初+期末执业护士人数*2）
      </div>
      <div className="context">
        日间病房：定编： <Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />人；实际编制： <Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />
        人；截止本月底实际在岗<Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />人。
      </div>
      <div className="context">
        （2）<Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />月）上月急诊护理工作量得分： <Input value={data.a} onChange={(e: any) => handleChange(e.target.value, 'a')} />
      </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
.edit_text input{
width:60px;
border: none;
text-align: center;
border-bottom: #000 solid 1px;
&:focus {
      background: ${(p) => p.theme.$mlc};
    }
}
  text {
    min-height: 200px !important;
    resize: none;
  }
  .inp_textArea textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    border-radius: 0;
    resize: none;
    &:focus {
      background: ${(p) => p.theme.$mlc};
    }
  }
  .context div{
    display: inline-block;
    width: 60px;
    text-align: center;
    border-bottom: 1px solid #000;

  }
`
