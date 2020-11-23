import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { Spin } from 'antd'
import qs from 'qs'
import { empManageService } from './api/EmpManageService'
import { educationList } from '../其他人员/data/options'

export interface Props extends RouteComponentProps { }

export default observer(function 实习生详情(props: any) {
  const [loading, setLoading] = useState(false)
  const [sourceChange, setSourceChange] = useState(null as null | string)
  const [baseInfo, setBaseInfo] = useState({} as any)

  let educationName = ''
  let target = educationList.find((item: any) => item.code == baseInfo.education)
  if (target) educationName = target.name
  // const [query, setQuery] = useState({} as any)

  useEffect(() => {
    let search: any = appStore.location.search
    if (search) {
      search = qs.parse(search.replace('?', ''))
      if (
        (search.sourceChange && sourceChange !== search.sourceChange) ||
        !search.sourceChange
      ) {
        getData(search.empNo)
      }

      setSourceChange(search.sourceChange)
    }
  }, [appStore.match])

  const getData = (query: any) => {
    setLoading(true)
    empManageService
      .getPersonInfoByIdentifier(query)
      .then(res => {
        let user = res.data;
        setBaseInfo(res.data)
        setLoading(false)
      }, err => {
        setLoading(false)
      })
  }

  return (
    <Wrapper className={loading ? 'loading' : ''}>
      <div className='content'>
        <table>
          <colgroup>
            <col width='140' />
            <col />
            <col width='100' />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td className='td-title'>姓名</td>
              <td className='td-content'>{baseInfo.name}</td>
              <td className='td-title'>编号</td>
              <td className='td-content'>{baseInfo.identifier}</td>
            </tr>
            <tr>
              <td className='td-title'>毕业院校</td>
              <td className='td-content'>{baseInfo.schoolName}</td>
              <td className='td-title'>性别</td>
              <td className='td-content'>{baseInfo.sex == '1' ? '女' : '男'}</td>
            </tr>
            <tr>
              <td className='td-title'>最高学历</td>
              <td className='td-content'>{educationName}</td>
              <td className='td-title'>专业</td>
              <td className='td-content'>{baseInfo.major}</td>
            </tr>
            <tr>
              <td className='td-title'>是否住宿</td>
              <td
                className='td-content'>
                {baseInfo.isResident == '1' ? '是' : '否'}
              </td>
              <td className='td-title'>联系方式</td>
              <td
                className='td-content'>
                {baseInfo.phone}
              </td>
            </tr>
            <tr>
              <td className='td-title'>入职时间</td>
              <td className='td-content'>{baseInfo.entryDate}</td>
              <td className='td-title'>所在科室</td>
              <td className='td-content'>{baseInfo.deptName}</td>
            </tr>
            <tr>
              <td className='td-title'>是否组长</td>
              <td
                className='td-content'>
                {baseInfo.isGroupLeader == '1' ? '是' : '否'}
              </td>
              <td className='td-title'>宿舍编号</td>
              <td
                className='td-content'>
                {baseInfo.dormitoryNumber}
              </td>
            </tr>
            <tr>
              <td className='td-title'>紧急联系人</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.emergencyContactPerson}
              </td>
            </tr>
            <tr>
              <td className='td-title'>身份证号</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.idCardNo}
              </td>
            </tr>
            <tr>
              <td className='td-title'>家庭住址</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.address}
              </td>
            </tr>
            <tr>
              <td className='td-title'>紧急联系人电话</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.emergencyContactPhone}
              </td>
            </tr>
            <tr>
              <td className='td-title'>备注</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.remark}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='loading-mask'>
        <Spin />
      </div>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  position: relative;

  .loading-mask {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.5);
    .ant-spin {
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }

  &.loading {
    overflow-y: hidden;
    .loading-mask {
      display: block;
    }
  }

  .content {
    width: 100%;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ddd;
    table {
      width: 100%;
      tr {
        td {
          line-height: 40px;
          text-indent: 15px;
          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          :last-of-type {
            border-right: none;
          }
          &.td-title {
            font-weight: bold;
            background: rgba(0, 0, 0, 0.015);
          }
        }
        :last-of-type {
          td {
            border-bottom: none;
          }
        }
      }
    }
  }
`
