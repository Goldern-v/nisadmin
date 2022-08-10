import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button } from 'antd'
import PrintPage from '../components/PrintPage'
import { numberToArray } from 'src/utils/array/array'
import User from 'src/models/User'
import { sexEnum } from 'src/libs/enum/common'
export interface Props {
  baseInfo: User | any
  experienceList: any[]
}

export default function BaseInfo(props: Props) {
  const { baseInfo, experienceList } = props
  const [rowNum, setRowNum] = useState(0)
  useLayoutEffect(() => {
    let pageHeight = document.querySelector('.nurseFilePrintPage')!.clientHeight
    let tableHeight = document.querySelector('#baseInfoTable')!.clientHeight
    let surplusHeight = pageHeight - tableHeight
    let rowNum = Math.floor(surplusHeight / 29)
    setRowNum(rowNum)
  }, [baseInfo, experienceList])
  return (
    <Wrapper id='baseInfoTable'>
      <table>
        <colgroup>
          <col width='20%' />
          <col width='15%' />
          <col width='20%' />
          <col width='11%' />
          <col width='11%' />
          <col width='20%' />
        </colgroup>
        <tbody><tr>
          <td colSpan={6}>
            <span className='title'>基本情况</span>
          </td>
        </tr>
        <tr>
          <td>姓名</td>
          <td>{baseInfo.empName}</td>
          <td>性别</td>
          <td colSpan={2}>{sexEnum[baseInfo.sex]}</td>
          <td rowSpan={5}>
            {baseInfo.nearImageUrl ? <img src={baseInfo.nearImageUrl} alt='' className='nearImage' /> : '近期免冠照片'}
          </td>
        </tr>
        <tr>
          <td>出生年月</td>
          <td>{baseInfo.birthday}</td>
          <td>民族</td>
          <td colSpan={2}>{baseInfo.nation}</td>
        </tr>
        <tr>
          <td>籍贯</td>
          <td>{baseInfo.nativePlace}</td>
          <td>职务</td>
          <td colSpan={2}>{baseInfo.job}</td>
        </tr>
        <tr>
          <td>参加工作时间</td>
          <td>{baseInfo.goWorkTime}</td>
          <td>最高学历</td>
          <td colSpan={2}>{baseInfo.highestEducation}</td>
        </tr>
        <tr>
          <td>技术职称</td>
          <td>{baseInfo.newTitle}</td>
          <td>护士职业证书编号</td>
          <td colSpan={2}>{baseInfo.zyzsNumber}</td>
        </tr>
        <tr>
          <td>特殊岗位资格证</td>
          <td colSpan={2} />
          <td colSpan={2}>特殊岗位资格证编号</td>
          <td />
        </tr>
        <tr>
          <td>身份证号码</td>
          <td colSpan={2}>{baseInfo.cardNumber}</td>
          <td>
            社会团
            <br />
            体职务
          </td>
          <td colSpan={2}>{baseInfo.socialGroup}</td>
        </tr>
        <tr>
          <td>家庭住址</td>
          <td colSpan={3}>{baseInfo.address}</td>
          <td>联系电话</td>
          <td>{baseInfo.phone}</td>
        </tr></tbody>
        
      </table>
      <table className='table-1'>
        <colgroup>
          <col width='17%' />
          <col width='33%' />
          <col width='18%' />
          <col width='15%' />
        </colgroup>
        <tbody>
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

        {experienceList.map((item: any, index: number) => (
          <tr key={index}>
            <td>
              {/* {item.startTime} - {item.endTime || '至今'} */}
              {item.startTime} - {index==0 ? '当天' : item.endTime}
            </td>
            <td>{item.unit}</td>
            <td>{item.professionalWork}</td>
            <td>
              {item.professional} {item.post}
            </td>
          </tr>
        ))}

        {numberToArray(1, rowNum).map((item: any) => (
          <tr key={item}>
            <td />
            <td />
            <td />
            <td />
          </tr>
        ))}
        </tbody>
        
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
  .nearImage {
    width: 130px;
    margin: auto;
    display: block;
    object-fit: contain;
  }
`
