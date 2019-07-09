import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { Spin } from 'antd'
import qs from 'qs'

export interface Props extends RouteComponentProps { }

export default observer(function BaseInfo() {
  const [loading, setLoading] = useState(false);
  const [sourceChange, setSourceChange] = useState(null as null | string);
  const [baseInfo, setBaseInfo] = useState({
    empName: '王大锤',
    empCode: '114514',
    sexual: '男',
    age: '24',
    source: '10',
    points: '1000',
    job: '教学小组组长',
    title: '护士长',
    highestEducation: '硕士',
    nurseHierarchy: 'N3',
    area: '院内片区',
    deptName: '神经护理单元',
    specialAllow: '特殊准入'
  });

  useEffect(() => {
    let search: any = appStore.location.search;
    if (search) {
      search = qs.parse(search.replace('?', ''));
      if (search.sourceChange && sourceChange !== search.sourceChange) getData();

      setSourceChange(search.sourceChange);
    }
  }, [appStore.match]);

  const getData = () => {
    setLoading(true);
    console.log('getData');
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return <Wrapper className={loading ? 'loading' : ''}>
    <div className="content">
      <table>
        <colgroup>
          <col width="100" />
          <col />
          <col width="100" />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td className="td-title">姓名</td>
            <td className="td-content">{baseInfo.empName}</td>
            <td className="td-title">工号</td>
            <td className="td-content">{baseInfo.empCode}</td>
          </tr>
          <tr>
            <td className="td-title">性别</td>
            <td className="td-content">{baseInfo.sexual}</td>
            <td className="td-title">年龄</td>
            <td className="td-content">{baseInfo.age}</td>
          </tr>
          <tr>
            <td className="td-title">学分</td>
            <td className="td-content">{baseInfo.source}</td>
            <td className="td-title">积分</td>
            <td className="td-content">{baseInfo.points}</td>
          </tr>
          <tr>
            <td className="td-title">职务</td>
            <td className="td-content" colSpan={3}>{baseInfo.job}</td>
          </tr>
          <tr>
            <td className="td-title">职称</td>
            <td className="td-content" colSpan={3}>{baseInfo.title}</td>
          </tr>
          <tr>
            <td className="td-title">最高学历</td>
            <td className="td-content" colSpan={3}>{baseInfo.highestEducation}</td>
          </tr>
          <tr>
            <td className="td-title">层级</td>
            <td className="td-content" colSpan={3}>{baseInfo.nurseHierarchy}</td>
          </tr>
          <tr>
            <td className="td-title">片区</td>
            <td className="td-content" colSpan={3}>{baseInfo.area}</td>
          </tr>
          <tr>
            <td className="td-title">科室</td>
            <td className="td-content" colSpan={3}>{baseInfo.deptName}</td>
          </tr>
          <tr>
            <td className="td-title">特殊准入</td>
            <td className="td-content" colSpan={3}>{baseInfo.specialAllow}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="loading-mask">
      <Spin />
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
  width:100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  position:relative;

  .loading-mask{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.5);
    .ant-spin{
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }

  &.loading{
    overflow-y: hidden;
    .loading-mask{
      display: block;
    }
  }

  .content{
    width: 100%;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ddd;
    table{
      width: 100%;
      tr{
        td{
          line-height: 40px;
          text-indent: 15px;
          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          :last-of-type{
            border-right: none;
          }
          &.td-title{
            font-weight: bold;
            background: rgba(0,0,0,0.015);
          }
        }
        :last-of-type{
          td{
            border-bottom: none;
          }
        }
      }
    }
  }
`