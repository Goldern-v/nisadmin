import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable from 'src/components/BaseTable'
export interface Props {
  dataSource: any[]
  loadingTable: boolean
}

export default function 门诊汇总表(props: Props) {
  const { dataSource, loadingTable } = props
  let opdDeptList = dataSource.filter((item: any) => {
    return item.opdDept
  })
  return (
    <Wrapper>
      <table>
        <colgroup>
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className='title'>科室名称</td>
            <td colSpan={5} className='title'>
              基础质量（80分）
            </td>
            <td rowSpan={2} className='title'>
              标准化
              <br />
              （20分）
            </td>
            <td rowSpan={2} className='title'>
              合计
              <br />
              （100分）
            </td>
            <td rowSpan={2} className='title'>
              排序
            </td>
          </tr>
          <tr>
            <td className='title'>临床科室</td>
            <td>门诊病历及核心制度（10分）</td>
            <td>危急值及医疗安全（20分）</td>
            <td>处方管理（12分）</td>
            <td>院感公卫（8分）</td>
            <td>护理质量（30分）</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
            <td>4</td>
          </tr>
          <tr>
            <td className='title'>医技科室</td>
            <td>危急值及岗位职责（20分）</td>
            <td>医疗质量（20分）</td>
            <td>急救流程及物品（20分）</td>
            <td colSpan={2} />
            <td>标准化（20分）</td>
            <td>合 计（100分）</td>
            <td />
          </tr>

          {['放射科', '检验科', '超声影像', '心功能', '输血科', '病理科'].map((item) => (
            <tr>
              <td>{item}</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          ))}

          <tr>
            <td className='title'>药剂科</td>
            <td>药品安全质量（20分）</td>
            <td>处方调配差错（20分）</td>
            <td>特殊药品管理（20分）</td>
            <td colSpan={2}>窗口病人等候时间（20分）</td>
            <td>标准化（20分）</td>
            <td>合 计（100分）</td>
            <td />
          </tr>
          <tr>
            <td className='title'>其他科室</td>
            <td>院感公卫 扣分</td>
            <td>医疗护理 扣分</td>
            <td colSpan={3}>实际分</td>

            <td>标准化（20分）</td>
            <td>合 计（100分）</td>
            <td />
          </tr>
        </tbody>
      </table>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  table {
    border-collapse: collapse;
    margin: 10px auto;
  }
  td {
    border: 1px solid #333;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
  }
  .title {
    font-weight: bold;
  }
`
