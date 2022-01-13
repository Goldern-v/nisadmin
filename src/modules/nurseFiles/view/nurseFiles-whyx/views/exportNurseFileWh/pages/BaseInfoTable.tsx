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
        <td>{baseInfo.birthday}</td>
        <td>民族</td>
        <td>{baseInfo.nation}</td>
      </tr>
      <tr>
        <td>工号</td> 
        <td>{baseInfo.empNo}</td>
        <td>籍贯</td>
        <td>{baseInfo.nativePlace}</td>
      </tr>
      <tr>
        <td>政治面貌</td>
        <td>{baseInfo.politicsLook}</td>
        <td>年龄</td>
        <td>{baseInfo.age}</td>
      </tr>
      <tr>
        <td>婚姻情况</td>
        <td>{baseInfo.maps?.maritalstatus}</td>
        <td>生育情况</td>
        <td>{baseInfo.maps?.fertility}</td>
      </tr>
      <tr>
        <td>身份证号</td>
        <td colSpan={2}>{baseInfo.cardNumber}</td>
        <td>手机号</td>
        <td>{baseInfo.phone}</td>
      </tr>
      <tr>
        <td>现住址</td>
        <td colSpan={2}>{baseInfo.address}</td>
        <td>参加工作时间</td>
        <td>{baseInfo.takeWorkTime}</td>
      </tr>
      <tr>
        <td>护士执业证书编号</td>
        <td colSpan={2}>{baseInfo.zyzsNumber}</td>
        <td>来院工作时间</td>
        <td>{baseInfo.goHospitalWorkDate}</td>
      </tr>
      <tr>
        <td>取得护士执业证书时间</td>
        <td colSpan={2}>{baseInfo.zyzsDate}</td>
        <td>护士执业证书有效期</td>
        <td>{baseInfo.zyzsEffectiveUpDate}</td>
      </tr>
      <tr>
        <td>初始学历</td>
        <td colSpan={2}>{baseInfo.initialEducation}</td>
        <td>最高学历</td>
        <td>{baseInfo.highestEducation}</td>
      </tr>
      <tr>
        <td>取得最高学历时间</td>
        <td colSpan={2}>{baseInfo.highestEducationDate}</td>
        <td>最高学位</td>
        <td>{baseInfo.highestEducationDegree}</td>
      </tr>
      <tr>
        <td>最高职称</td>
        <td colSpan={2}>{baseInfo.newTitle}</td>
        <td>评职日期</td>
        <td>{baseInfo.employNewTiTleDate}</td>
      </tr>
      <tr>
        <td>职务</td>
        <td colSpan={2}>{baseInfo.job}</td>
        <td>护理层级</td>
        <td>{baseInfo.nursingLevel}</td>
      </tr>
      <tr>
        <td >护士执业证书</td>
        <td colSpan={4} >
          <div style={{ display: 'flex' }}>
            {baseInfo.zyzsUrl ? (
              baseInfo.zyzsUrl
                .split(",")
                .map((item: any, index: number) => (
                  // <Zimage src={item} alt="" key={index} />
                  <img
                    key={index}
                    src={item}
                    alt='' className='nearImage' />
                    ))
              ) : (
              <img src={require("../../../images/证件空态度.png")} alt="" />
            )}
          </div>
        </td>
      </tr>
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