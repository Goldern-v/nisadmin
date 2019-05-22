import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import store from 'src/stores'
import qs from 'qs'
interface NurseCardType {
  /** 姓名 */
  empName: string
  /** 工号 */
  empNo: string
  /** 职务 */
  title: '护士' | '护师' | '主管护师' | '副主任护师' | '主任护师'
  newTitle: '护士' | '护师' | '主管护师' | '副主任护师' | '主任护师'
  /** 层级 */
  currentLevel: string
  nurseHierarchy: string
  /** 护理单元 */
  deptName: string
  /** 状态 */
  status: '在岗' | '离职'
  /** 是否显示未读红点 0 = 无 1 = 有 */
  statusColor: '0' | '1'
}

export interface Props {
  rowNum: number
  data: NurseCardType
}

const DEFALT_HEADIMG = require('../../../images/护士默认头像.png')

export enum TITLE_COLOR {
  '培训护士' = '#D3D2D7',
  '护士' = '#43B965',
  '护师' = '#6B9AE2',
  '主管护师' = '#9C6BC1',
  '副主任护师' = '#F6201A',
  '主任护师' = '#EF8B46'
}

export default function NurseCard (props: Props) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  let { rowNum, data } = props
  let history = store.appStore.history
  // data.currentLevel = 'N' + (parseInt(Math.random() * 100 + '', 10) % 6)
  return (
    <Padding rowNum={rowNum}>
      <Wrapper onClick={() => history.push(`/nurseFileDetail/baseInfo?${qs.stringify(data)}`)}>
        <TriangleLabel color={TITLE_COLOR[data.title]} />
        {data.status !== '在岗' && <SquareLabel>{data.status}</SquareLabel>}
        <HeadImg src={DEFALT_HEADIMG} />
        <Name>
          {data.empName}
          {data.statusColor === '1' && <Badge />}
        </Name>
        <span>
          {data.newTitle} | {data.nurseHierarchy}
        </span>
        <span>{data.deptName}</span>
      </Wrapper>
    </Padding>
  )
}

const Padding = styled.div<{ rowNum: number }>`
  box-sizing: border-box;
  padding: 10px;
  float: left;
  width: ${(p) => 100 / p.rowNum}%;
`

const Wrapper = styled.div`
  height: 200px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(198, 198, 198, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #666666;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`

const HeadImg = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
`

const Name = styled.div`
  font-size: 15px;
  color: #333;
  margin-top: 12px;
  margin-bottom: 4px;
  position: relative;
`
const Badge = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #ff3b30;
  right: -20px;
  top: -4px;
`

const TriangleLabel = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-width: 31px 31px 0 0;
  border-style: solid;
  border-color: ${(p) => p.color} transparent;
`
const SquareLabel = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  width: 23px;
  height: 47px;
  background: #d8d8d8;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 13px;
  color: #333;
`
