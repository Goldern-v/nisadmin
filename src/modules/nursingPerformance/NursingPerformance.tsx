import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import PerformanceHeader from './components/PerformanceHeader'
import TableModel from './common/TableModel'
import PerformanceLeftList from './components/PerformanceLeftList'
import { RouteComponentProps } from 'src/components/RouterView'
import { 绩效表 } from './view/绩效表'
import PerformanceMidInput from './components/PerformanceMidInput'
export interface Props extends RouteComponentProps<{ name?: string }> {}
import { authStore } from 'src/stores/index'
import { observer } from 'mobx-react-lite'
export default observer(function NursingPerformance (props: Props) {
  // const [count, setCount] = useState(0)
  // useEffect(() => {
  //   console.log(count, setCount)
  // })
  useEffect(() => {
    console.log(props)
  }, [props.match.params.name])
  let currentRouteName = props.match.params.name
  return (
    <Con>
      {/* <StatisticLeftList {...props} aa='11' /> */}
      <ConLeft>
        <PerformanceLeftList />
      </ConLeft>
      <ConRight>
        <PerformanceHeader />
        <PerformanceMid>
          <PerformanceMidTitleCon>
            <div className='titleFirst'> {authStore.selectedDeptName}</div>
            <div className='titleSecond'>2019年3月绩效表</div>
            <PerformanceMidInputCon>
              <PerformanceMidInput />
            </PerformanceMidInputCon>
          </PerformanceMidTitleCon>
          <TableModel dataSource={绩效表.dataSource} columns={绩效表.columns} />
        </PerformanceMid>
      </ConRight>
    </Con>
  )
})

const Con = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  background: rgba(248, 248, 248, 1);
  overflow: hidden;
`
const ConLeft = styled.div`
  width: 220px;
  z-index: 1;
  background: rgba(248, 248, 248, 1);
  box-shadow: 3px 7px 7px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(228, 228, 228, 1);
  /* border: 1px solid red; */
  border-top: 0;
  overflow: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
`
const ConRight = styled.div`
  flex: 1;
  width: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`
const PerformanceMid = styled.div`
  flex: 1;
  height: 0;
  /* width: 0; */
  margin: 14px;
  padding: 18px 10px;
  background-color: #fff;
  /* height: 330px; */
  /* background: rgba(255, 255, 255, 1); */
  border-radius: 5px;
  border: 1px solid rgba(161, 175, 179, 1);
  overflow: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
`
const PerformanceMidTitleCon = styled.div`
  .titleFirst {
    margin: 0 auto;
    width: 510px;
    /* height: 29px; */
    font-size: 21px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 29px;
    letter-spacing: 1px;
    text-align: center;
  }
  .titleSecond {
    margin: 0 auto;
    width: 134px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    text-align: center;
  }
`
const PerformanceMidInputCon = styled.div`
  /* height: 50px; */
`
