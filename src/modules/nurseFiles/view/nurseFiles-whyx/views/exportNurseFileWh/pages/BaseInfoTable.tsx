import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
// import { Button } from 'antd'
import { TableCon } from '../components/TableCon'
import { appStore } from 'src/stores'

export interface Props {
  baseInfo?: any
}

export default function BaseInfoTable(props: Props) {
  const { baseInfo } = props

  return <Wrapper>
    <colgroup>
      <col />
    </colgroup>
    <tbody>
      <tr className="main-title-row">
        <td colSpan={5}>基本情况</td>
      </tr>
      <tr>
        <td>姓名</td>
        <td>{baseInfo.empName}</td>
        <td>性别</td>
        <td>{baseInfo.sex}</td>
        <td rowSpan={5}>
          {baseInfo.nearImageUrl ? (
            <img
              src={baseInfo.nearImageUrl}
              alt='' className='nearImage' />
          ) : '近期免冠照片'}
        </td>
      </tr>
      <tr>
        <td>出生年月</td>
        <td>{baseInfo.nurseHierarchyDate}</td>
        <td>民族</td>
        <td>{baseInfo.nation}</td>
      </tr>
      <tr>
        <td>籍贯</td>
        <td>{baseInfo.nativePlace}</td>
        <td>职务</td>
        <td>{baseInfo.job}</td>
      </tr>
      <tr>
        <td>参加工作时间</td>
        <td>{appStore.HOSPITAL_ID === 'fsxt' ? baseInfo.goWorkTime : baseInfo.takeWorkTime}</td>
        <td>来院参加工作时间</td>
        <td>{baseInfo.goHospitalWorkDate}</td>
      </tr>
      <tr>
        <td>技术职称</td>
        <td>{baseInfo.newTitle}</td>
        <td>最高学历</td>
        <td>{baseInfo.highestEducation}</td>
      </tr>
      <tr>
        <td>身份证号码</td>
        <td colSpan={2}>{baseInfo.cardNumber}</td>
        <td>政治面貌</td>
        <td>{baseInfo.politicsLook}</td>
      </tr>
      <tr>
        <td>护士执业证书编号</td>
        <td colSpan={2}>{baseInfo.zyzsNumber}</td>
        <td>联系电话</td>
        <td>{baseInfo.phone}</td>
      </tr>
      {appStore.HOSPITAL_ID === 'gxjb' && <tr>
        <td>家庭住址</td>
        <td colSpan={4}>{baseInfo.address}</td>
      </tr>}
    </tbody>
  </Wrapper>
}
const Wrapper = styled(TableCon)`
  img{
    width: 130px;
    margin: auto;
    display: block;
    object-fit: contain;
  }
`