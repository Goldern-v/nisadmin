import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import PrintPage from '../components/PrintPage'
import { numberToArray } from 'src/utils/array/array'
export interface Props {}

export default function BaseInfo() {
  return (
    <Wrapper>
      <table>
        <colgroup>
          <col width='20%' />
          <col width='15%' />
          <col width='20%' />
          <col width='11%' />
          <col width='11%' />
          <col width='20%' />
        </colgroup>
        <tr>
          <td colSpan={6}>
            <span className='title'>基本情况</span>
          </td>
        </tr>
        <tr>
          <td>姓名</td>
          <td />
          <td>性别</td>
          <td colSpan={2} />
          <td rowSpan={5}>近期免冠照片</td>
        </tr>
        <tr>
          <td>出生年月</td>
          <td />
          <td>民族</td>
          <td colSpan={2} />
        </tr>
        <tr>
          <td>籍贯</td>
          <td />
          <td>职务</td>
          <td colSpan={2} />
        </tr>
        <tr>
          <td>参加工作时间</td>
          <td />
          <td>最高学历</td>
          <td colSpan={2} />
        </tr>
        <tr>
          <td>技术职称</td>
          <td />
          <td>护士职业证书编号</td>
          <td colSpan={2} />
        </tr>
        <tr>
          <td>特殊岗位资格证</td>
          <td colSpan={2} />
          <td colSpan={2}>特殊岗位资格证编号</td>
          <td />
        </tr>
        <tr>
          <td>身份证号码</td>
          <td colSpan={2} />
          <td>
            社会团
            <br />
            体职务
          </td>
          <td colSpan={2} />
        </tr>
        <tr>
          <td>家庭住址</td>
          <td colSpan={3} />
          <td>联系电话</td>
          <td />
        </tr>
      </table>
      <table className='table-1'>
        <colgroup>
          <col width='17%' />
          <col width='33%' />
          <col width='18%' />
          <col width='15%' />
        </colgroup>
        <tr>
          <td colSpan={4}>
            <span className='title'>工作经历</span>
          </td>
        </tr>
        <tr>
          <td>起止年月</td>
          <td>单位</td>
          <td>专业技术工作</td>
          <td>技术职称及职务</td>
        </tr>
        {numberToArray(0, 17).map(() => (
          <tr>
            <td />
            <td />
            <td />
            <td />
          </tr>
        ))}
      </table>
      <div className='aside'>
        <div>注：1.工作经历从参加工作时填写，包括院内科室调动</div>
        <div>&nbsp;&nbsp;2.特殊岗位资格证：如母婴保健合格证、接种证、专科护士资格证等</div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    td {
      border: 1px solid #000;
      height: 29px;
      text-align: center;
    }
  }
  .title {
    font-family: '黑体' !important;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 8px;
  }
  .table-1 {
    margin-top: -1px;
  }
  .aside {
    margin-top: 30px;
    font-size: 16px;
  }
`
