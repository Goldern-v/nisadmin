import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import PrintPage from '../components/PrintPage'
import { numberToArray } from 'src/utils/array/array'
export interface Props {
  medicalEducatioList: any[]
  levelChangeList: any[]
}

export default function LevelChange(props: Props) {
  const { medicalEducatioList, levelChangeList } = props
  const rowNom1 = 4 - medicalEducatioList.length
  const rowNom2 = 17 - levelChangeList.length
  return (
    <Wrapper>
      <div className='title title-1'>表一</div>
      <table>
        <colgroup>
          <col width='17%' />
          <col width='33%' />
          <col width='18%' />
          <col width='15%' />
        </colgroup>
        <tbody>
          <tr>
            <td colSpan={4}>
              <span className='title'>教育经历</span>
            </td>
          </tr>
          <tr>
            <td>就读时间</td>
            <td>毕业学校</td>
            <td>专业</td>
            <td>毕业时间</td>
          </tr>
          {medicalEducatioList.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.readTime}</td>
              <td>{item.graduationSchool}</td>
              <td>{item.readProfessional}</td>
              <td>{item.graduationTime}</td>
            </tr>
          ))}
          {numberToArray(1, Math.max(rowNom1, 0)).map((item: any) => (
            <tr key={item}>
              <td />
              <td />
              <td />
              <td />
            </tr>
          ))}
        </tbody>
      </table>
      <table className='table-1'>
        <colgroup>
          <col width='50%' />
          <col width='50%' />
        </colgroup>
        <tbody>
          <tr>
            <td colSpan={4}>
              <span className='title'>职称变动</span>
            </td>
          </tr>
          <tr>
            <td>取得职称资格</td>
            <td>职称聘用时间</td>
          </tr>

          {levelChangeList.map((item: any, index: number) => (
            <tr key={index} className='h-tr'>
              <td>
                {/*   {item.hierarchy}  去掉对应职称 */}
                {item.titleQualification}
              </td>
              <td>{item.appointmentTime}</td>
            </tr>
          ))}
          {numberToArray(1, rowNom2).map((item: any) => (
            <tr className='h-tr' key={item}>
              <td />
              <td />
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    td {
      border: 1px solid #000;
      height: 30px;
      text-align: center;
    }
  }
  .title {
    font-family: '黑体' !important;
    font-size: 18px;
    font-weight: bold;
  }
  .table-1 {
    margin-top: -1px;
  }
  .aside {
    margin-top: 30px;
    font-size: 16px;
  }
  .h-tr {
    td {
      height: 38px;
    }
  }
  .title-1 {
    margin: 5px 0;
    margin-left: 20px;
  }
`
