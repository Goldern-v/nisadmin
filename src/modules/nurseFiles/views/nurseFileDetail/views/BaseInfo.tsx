import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import BaseLayout from '../components/BaseLayout'
export interface Props extends RouteComponentProps {}

export default function BaseInfo () {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(count, setCount)
  })
  const TABLE_DATA = [
    {
      性别: '男',
      民族: '汉族'
    },
    {
      出生年月: '男',
      年龄: '汉族'
    },
    {
      籍贯: '男',
      职务: '汉族'
    },
    {
      参加工作时间: '参加工作时间',
      最高学历: '最高学历'
    },
    {
      技术职称: '参加工作时间',
      护士执业证书编号: '最高学历'
    },

    {
      身份证号: '参加工作时间',
      社会团体职务: '最高学历'
    },
    {
      联系电话: '参加工作时间',
      家庭住址: '最高学历'
    }
  ]
  const btnList = [
    {
      label: '修改'
    },
    {
      label: '审核'
    }
  ]
  return (
    <BaseLayout title='基本信息' btnList={btnList}>
      <InfoTable>
        <colgroup>
          <col width='120' />
          <col />
          <col width='139' />
          <col />
          <col width='200' />
        </colgroup>
        <tbody>
          <tr>
            <td>姓名</td>
            <td>
              <Value>刘盼盼</Value>
            </td>
            <td>工号</td>
            <td>
              <Value>92312</Value>
            </td>
            <td rowSpan={5}>
              <img className='head-img' src={require('../../../images/护士默认头像.png')} alt='' />
            </td>
          </tr>
          {TABLE_DATA.map((obj: any, index) => (
            <tr key={index}>
              <td>{Object.keys(obj)[0]}</td>
              <td>
                <Value>{obj[Object.keys(obj)[0]]}</Value>
              </td>
              <td>{Object.keys(obj)[1]}</td>
              <td colSpan={index >= 4 ? 2 : 1}>
                <Value>{obj[Object.keys(obj)[1]]}</Value>
              </td>
            </tr>
          ))}
        </tbody>
      </InfoTable>
      <ZyzsCon>
        <span>职业证书：</span>
        <img src={require('../../../images/顶部背景.png')} alt='' />
      </ZyzsCon>
    </BaseLayout>
  )
}
const InfoTable = styled.table`
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #dbe0e4;
  width: 100%;
  .head-img {
    width: 132px;
    height: 180px;
    margin: auto;
    display: block;
  }
  td {
    height: 38px;
    padding: 5px 10px;
    font-size: 13px;
    border: 1px solid #dbe0e4;
    vertical-align: middle;
  }
  & tr td:nth-of-type(1),
  & tr td:nth-of-type(3) {
  }
`
const Value = styled.div`
  background: rgba(238, 239, 240, 1);
  border-radius: 2px;
  border: 1px solid rgba(227, 228, 230, 1);
  padding: 3px 13px;
`

const ZyzsCon = styled.div`
  height: 220px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(219, 224, 228, 1);
  position: relative;
  font-size: 13px;
  color: #666666;
  margin-top: 10px;
  span {
    position: absolute;
    left: 12px;
    top: 19px;
  }
  img {
    position: absolute;
    width: 240px;
    height: 174px;
    border: 1px solid rgba(219, 224, 228, 1);
    top: 20px;
    left: 137px;
  }
`
