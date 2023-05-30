import moment from 'moment'
import React from 'react'
import EditButton from 'src/modules/quality/components/EditButton'
import LevelTitle from 'src/modules/quality/components/LevelTitle'
import styled from 'styled-components'
import { observer } from 'src/vendors/mobx-react-lite'
import { Obj } from 'src/libs/types'
import { dateFormat6 } from 'src/modules/nurseHandBookNew/views/detail-lyrm/config'
import { numToChinese } from 'src/utils/number/numToChinese'

import { useInstance } from '../../hook/useModel'

export interface Props {
  sectionId: string
  sectionTitle?: string | undefined
  modalTitle?: string | undefined,
  keyName: string
}
/**福清质控季度汇总第四 */
export default observer(function QcQ4Section(props: Props) {
  let { sectionId, sectionTitle, keyName } = props
  const { instance } = useInstance()
  let data = instance.getSectionData(sectionId)
  let list = (data ? data.list : []) || []
  
  return (
    <Wrapper>
      <LevelTitle level={data.level} text={sectionTitle} />
      {/* <TextCon>{value[keyName]}</TextCon> */}
      <EditButton onClick={() => instance.openEditModal(sectionId)}>编辑</EditButton>
      {
        list.map((v: Obj, i: number) => <>
          <TextCon key={`${i}-1`}>
            {numToChinese(i + 1)}、{v.formName}<br />
            （{numToChinese(1)}）检查时间：{moment(Number(v.startTime)).format(dateFormat6)}、{moment(Number(v.endTime)).format(dateFormat6)}<br />
            （{numToChinese(2)}）检查科室：{v.checkDept}<br />
            （{numToChinese(3)}）检查人员：{v.checker}<br />
            （{numToChinese(4)}）检查反馈：各科均得{v.avgScore}分以上，合格率 {v.yield}%
          </TextCon>
          <TextCon key={`${i}-3`}>
            主要存在问题：<br />
            {v.majorProblem}
          </TextCon>
        </>)
      }
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
  button {
    position: absolute;
    top: 0px;
    right: 20px;
  }
  .aside {
    font-weight: bold;
    padding-left: 30px;
  }
  .text-box {
    padding-left: 65px;
    padding-right: 15px;
    padding-bottom: 2px;
    padding-top: 2px;
  }
`

const TextCon = styled.pre`
  margin: 10px 50px;
  min-height: 40px;
  white-space: pre-wrap;
`
