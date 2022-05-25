import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'src/vendors/mobx-react-lite'
import { LastImproveItem, Report } from '../../types'
import { getModal } from '../../AnalysisDetailModal'
import { ColumnProps } from 'antd/lib/table'
import EditButton from 'src/modules/quality/components/EditButton'
import TwoLevelTitle from 'src/modules/quality/components/TwoLevelTitle'
export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}
export default observer(function OperationSection(props: Props) {
  let { sectionId, sectionTitle } = props
  const analysisDetailModal = useRef(getModal())
  let data = analysisDetailModal.current.getSectionData(sectionId).list || {}
  let report: Report = (data ? data.report : {}) || {}
  return (
    <Wrapper>
      <TwoLevelTitle text={sectionTitle} />
      <EditButton onClick={() => analysisDetailModal.current!.openEditModal(sectionId)}>编辑</EditButton>
      <div className='context'>(1) 人员情况:</div>
      <div className='context'>
        护士定编:<div>{data.hsdb}</div>人;实际护士编制:<div>{data.sjbz}</div>人;
      </div>
      <div className='context'>
      助理护士定编:<div>{data.zlhs}</div>人;实际助理护士:<div>{data.sjzl}</div>人;
      </div>
      <div className='context'>
      截止本月底实际在岗护士:<div>{data.zghs}</div>人;在岗助理护士:<div>{data.zgzl}</div>人;
      </div>
      <div className='context'>(2) (<div>{5}</div>月)上月科室住院病人动态:</div>
      <div className='context'>
      平均床位使用率%:<div>{data.pjcw}</div>;病床周转次数:<div>{data.bczz}</div>;科室平均住院日:<div>{data.pjzy}</div>;
      </div>
      <div className='context'>
      原有病人数:<div>{data.yybr}</div>入院人数:<div>{data.ryrs}</div> 转入病人数:<div>{data.zrbr}</div> 出院人数:<div>{data.cybr}</div>
      </div>
      <div className='context'>
      转出病人数:<div>{data.zcbr}</div> 死亡人数:<div>{data.swbr}</div>介入手术数:<div>{data.jrss}</div> 外科手术数:<div>{data.wkss}</div>
      </div>
      <div className='context'>科室护理工作量得分：:<div>{data.gzdf}</div></div>
      <div className='context'>(2) (<div>{5}</div>月)科室DRGS情况：RW ＞2:<div>{data.RWbigger}</div>;RW ＜0.5:<div>{data.RWsmall}</div>;CMI值:<div>{data.CMI}</div>;低风险死亡率:<div>{data.swl}</div>。 </div>
      <div className='context'>(4)武汉市出院病人居家服务率：完成居家人数/同期武汉市出院病人数*100%=<div>{data.whcybr}</div></div>
    </Wrapper>
  )
})
const Wrapper = styled.div`
  min-height: 60px;
  position: relative;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-right: 60px;
  }
  .context {
    /* text-align: center; */
    margin-left: 50px;
  }
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .context div{
    display: inline-block;
    width: 60px;
    text-align: center;
    border-bottom: 1px solid #000;
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
