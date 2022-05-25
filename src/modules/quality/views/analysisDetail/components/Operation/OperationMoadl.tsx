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
export default function OperationMoadl(props: Props) {
  let { sectionId, setData, data } = props
  let cloneData: any = cloneJson(data || { list: [] })
  let editData: any = cloneData && cloneData.list
  useEffect(() => { }, [])

  return (
    <Wrapper>
      <div className='edit_text'>
        <div className='context'>(1) 人员情况:</div>
        <div className='context'>
          护士定编:<div><input value={editData && editData.hsdb} onChange={(e) => {
          cloneData.list.hsdb = e.target.value;
          setData(cloneData)
        }} /></div>人;
        实际护士编制:<div><input value={editData && editData.sjbz} onChange={(e) => {
            cloneData.list.sjbz = e.target.value;
            setData(cloneData)
          }} /></div>人;
        </div>
        <div className='context'>
          助理护士定编:<div><input value={editData && editData.zlhs} onChange={(e) => {
            cloneData.list.zlhs = e.target.value;
            setData(cloneData)
          }} /></div>人;
          实际助理护士:<div><input value={editData && editData.sjzl} onChange={(e) => {
            cloneData.list.sjzl = e.target.value;
            setData(cloneData)
          }} /></div>人;
        </div>
        <div className='context'>
          截止本月底实际在岗护士:<div><input value={editData && editData.zghs} onChange={(e) => {
            cloneData.list.zghs = e.target.value;
            setData(cloneData)
          }} /></div>人;
          在岗助理护士:<div><input value={editData && editData.zgzl} onChange={(e) => {
            cloneData.list.zgzl = e.target.value;
            setData(cloneData)
          }} /></div>人;
        </div>
        <div className='context'>(2) (<div style={{width:'30px',color:'blue'}}>{5}</div>月)上月科室住院病人动态:</div>
        <div className='context'>
          平均床位使用率%:<div><input value={editData && editData.pjcw} onChange={(e) => {
            cloneData.list.pjcw = e.target.value;
            setData(cloneData)
          }} /></div>人;病床周转次数:<div><input value={editData && editData.bczz} onChange={(e) => {
            cloneData.list.bczz = e.target.value;
            setData(cloneData)
          }} /></div>;科室平均住院日:<div><input value={editData && editData.pjzy} onChange={(e) => {
            cloneData.list.pjzy = e.target.value;
            setData(cloneData)
          }} /></div>;
        </div>
        <div className='context'>
          原有病人数:<div><input value={editData && editData.yybr} onChange={(e) => {
            cloneData.list.yybr = e.target.value;
            setData(cloneData)
          }} /></div>入院人数:<div><input value={editData && editData.ryrs} onChange={(e) => {
            cloneData.list.ryrs = e.target.value;
            setData(cloneData)
          }} /></div> 转入病人数:<div><input value={editData && editData.zrbr} onChange={(e) => {
            cloneData.list.zrbr = e.target.value;
            setData(cloneData)
          }} /></div> 出院人数:<div><input value={editData && editData.cybr} onChange={(e) => {
            cloneData.list.cybr = e.target.value;
            setData(cloneData)
          }} /></div>
        </div>
        <div className='context'>
          转出病人数:<div><input value={editData && editData.zcbr} onChange={(e) => {
            cloneData.list.zcbr = e.target.value;
            setData(cloneData)
          }} /></div> 
          死亡人数:<div><input value={editData && editData.swbr} onChange={(e) => {
            cloneData.list.swbr = e.target.value;
            setData(cloneData)
          }} /></div>
          介入手术数:<div><input value={editData && editData.jrss} onChange={(e) => {
            cloneData.list.jrss = e.target.value;
            setData(cloneData)
          }} /></div> 
          外科手术数:<div><input value={editData && editData.wkss} onChange={(e) => {
            cloneData.list.wkss = e.target.value;
            setData(cloneData)
          }} /></div>
        </div>
        <div className='context'>
          科室护理工作量得分：:<input value={editData && editData.gzdf} onChange={(e) => {
          cloneData.list.gzdf = e.target.value;
          setData(cloneData)
        }} /></div>
        <div className='context'>
          (2)(<div style={{width:'30px',color:'blue'}}>{5}</div>月)科室DRGS情况:RW ＞2:<div><input value={editData && editData.RWbigger} onChange={(e) => {
          cloneData.list.RWbigger = e.target.value;
          setData(cloneData)
        }} /></div>;
        RW ＜0.5:<div><input value={editData && editData.RWsmall} onChange={(e) => {
          cloneData.list.RWsmall = e.target.value;
          setData(cloneData)
        }} /></div>;
        CMI值:<div><input value={editData && editData.CMI} onChange={(e) => {
          cloneData.list.CMI = e.target.value;
          setData(cloneData)
        }} /></div>;
        低风险死亡率:<div><input value={editData && editData.swl} onChange={(e) => {
          cloneData.list.swl = e.target.value;
          setData(cloneData)
        }} /></div>。 </div>
        <div className='context'>
          (4)武汉市出院病人居家服务率：完成居家人数/同期武汉市出院病人数*100%=<div><input value={editData && editData.whcybr} onChange={(e) => {
          cloneData.list.whcybr = e.target.value;
          setData(cloneData)
        }} /></div></div>
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
