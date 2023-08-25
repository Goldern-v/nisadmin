import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Spin, Button } from 'antd'
import { ScrollBox } from 'src/components/common'
import { appStore } from 'src/stores'
import BreadcrumbBox from "src/layouts/components/BreadcrumbBox";
import FirstTable from './first'
import SecondTable from './second'
import ThirdTable from './third'
// import qs from "qs";

interface Props {
  // detailData: any;
  // onload: any;
}

function QqualityMWSummaryDetail(props: Props) {
  let [detailData, setDetailData]: any = useState([])
  let [loading, setLoading] = useState(false)
  // let master = props.detailData.master || {};

  const onload = () => {
    let id = appStore.match.params.id
    setLoading(false)
    
  }

  useEffect(() => {
    onload()
  }, [])

  return (
    <Con>
      <HeaderCon>
        <BreadcrumbBox
          style={{
            paddingLeft: 0,
            paddingTop: 10,
            paddingBottom: 2,
          }}
          data={[
            {
              // name: navTitle('季度质量管理工作总结'),
              name: '季度质量管理工作总结',
              link: '/qcOneHj/季度质量管理工作总结' },
            {
              name: "记录详情",
            },
          ]}
        />
        <div className="button">
          <div>2023年消化内科第三季度管理工作总结</div>
          <div>
            <Button>返回</Button>
            <Button>导出</Button>
            <Button type="primary">保存</Button>
            <Button type="danger">删除</Button>
          </div>
        </div>
        <div className='item'>
          <span>状态: 未保存</span>
          <span>创建人：张三</span>
          <span>创建时间：2021-11-12 18:12:2</span>
        </div>
      </HeaderCon>
      <MidCon>
        <MidConScrollCon>
          <SpinCon>
            {loading ? (
              <div className='LoadingCon'>
                <Spin spinning={loading} className='SpinLoadingClass' />
              </div>
            ) : (
              ''
            )}
          </SpinCon>
          <TableCon>
            <div className='title'>2023年消化内科第三季度护理质量检查总结</div>
            <FirstTable />
            <SecondTable />
            <ThirdTable />
          </TableCon>
        </MidConScrollCon>
      </MidCon>
    </Con>
  )
}

export default function Layout() {
  return (
    <QqualityMWSummaryDetail />
    )
}


const Con = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`
const HeaderCon = styled.div`
  height: 95px;
  background-color: #fff;
  padding: 0 10px;
  border-bottom: 1px solid #ddd;
  .button{
    display: flex;
    justify-content: space-between;
  }
  .item{
    span{
      margin-right: 20px;
    }
  }
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15); */
  /* border-bottom: 1px solid gray; */
`
const MidCon = styled.div`
  flex: 1;
  height: calc(100vh - 145px);
  background: #efefef;
`
const MidConScrollCon = styled.div`
  height: 100%;
  /* width: 100%; */
  display: flex;
  align-items: stretch;
  overflow: hidden;
  position: relative;
  width: 740px;
  margin: 0 auto;
  background: #fff;

  /* background-color: #fff;
  /* height: 150%; */
  /* flex-basis: auto; */
`

// @ts-ignore
const TableCon = styled(ScrollBox)`
  box-sizing: border-box;
  /* padding: 20px 153px; */
  padding: 20px 20px;
  flex: 1;
  width: 0;
  height: 100%;

  /* height: auto; */
  /* border-right: 1px solid gray; */
  /* background-color: #eeeeee; */
  align-items: stretch;
  .title{
    text-align: center;
    font-size: 20px;
    font-weight: 800;
  }
  
`
const MidRightCon = styled.div`
  width: 317px;
  height: 100%;
  /* background-color: gray; */
  align-items: stretch;
  background: rgba(247, 250, 250, 1);
  overflow-y: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
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
const SpinCon = styled.div`
  .LoadingCon {
    z-index: 99;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .SpinLoadingClass {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
