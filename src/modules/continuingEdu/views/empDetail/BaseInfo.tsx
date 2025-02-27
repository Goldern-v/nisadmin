import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { Spin } from 'antd'
import qs from 'qs'
import { empManageService } from './api/EmpManageService'

export interface Props extends RouteComponentProps { }

export default observer(function BaseInfo(props: any) {
  const [loading, setLoading] = useState(false)
  const [sourceChange, setSourceChange] = useState(null as null | string)
  const [baseInfo, setBaseInfo] = useState({} as any)
  // const [query, setQuery] = useState({} as any)

  useEffect(() => {
    let search: any = appStore.location.search
    if (search) {
      search = qs.parse(search.replace('?', ''))
      if (
        (search.sourceChange && sourceChange !== search.sourceChange) ||
        !search.sourceChange
      ) {
        getData({ empNo: search.empNo || '' })
      }

      setSourceChange(search.sourceChange)
    }
  }, [appStore.match])

  const getData = (query: any) => {
    setLoading(true)
    empManageService
      .getEmpDetail(query)
      .then(res => {
        let user = res.data;
        setBaseInfo({
          ...user,
          sexual: user.sexual == 0 ? '男' : '女',
        })
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
            <col width='100' />
            <col />
            <col width='100' />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td className='td-title'>姓名</td>
              <td className='td-content'>{baseInfo.empName}</td>
              <td className='td-title'>工号</td>
              <td className='td-content'>{baseInfo.empNo}</td>
            </tr>
            <tr>
              <td className='td-title'>性别</td>
              <td className='td-content'>{baseInfo.sex}</td>
              <td className='td-title'>民族</td>
              <td className='td-content'>{baseInfo.nation}</td>
            </tr>
            <tr>
              <td className='td-title'>出生日期</td>
              <td className='td-content'>{baseInfo.birthday}</td>
              <td className='td-title'>年龄</td>
              <td className='td-content'>{baseInfo.age}</td>
            </tr>
            <tr>
              <td className='td-title'>籍贯</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.nativePlace}
              </td>
            </tr>
            <tr>
              <td className='td-title'>入职时间</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.entryDate}
              </td>
            </tr>
            <tr>
              <td className='td-title'>职称</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.title}
              </td>
            </tr>
            <tr>
              <td className='td-title'>身份证号</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.cardNo}
              </td>
            </tr>
            <tr>
              <td className='td-title'>联系方式</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.phone}
              </td>
            </tr>
            <tr>
              <td className='td-title'>职务</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.job}
              </td>
            </tr>
            <tr>
              <td className='td-title'>最高学历</td>
              <td
                className='td-content'
                colSpan={3}>
                {baseInfo.highestEducation}
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
