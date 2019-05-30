import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import JobTitleMap from './components/JobTitleMap'
import { Button, Radio, Icon } from 'antd'
import HomeApi from 'src/modules/home/api/HomeApi.ts'
import { authStore } from 'src/stores/index'
import moment from 'moment'
import emitter from 'src/libs/ev'
import HomeViewModel from 'src/modules/home/HomeViewModel.ts'
moment.locale('zh-cn')
const dateFormat = 'YYYY-MM-DD 00:00:00'

export default function NurseSituation () {
  const [titleBy, setTitleBy] = useState('按职称')
  const [userTotal, setUserTotal] = useState(0)
  useEffect(() => {
    // console.log(count, setCount)
  })
  const selectChange = (e: any) => {
    setTitleBy(e.target.value)
  }
  useEffect(() => {
    let postData = {
      deptCode: authStore.selectedDeptCode,
      item: titleBy
    }
    if (authStore.selectedDeptCode) {
      HomeApi.indexInfo(postData).then((res) => {
        if (res.data) {
          let data = res.data
          setUserTotal(data.userTotal)
          HomeViewModel.NurseSituationData = data

          emitter.emit('护理人员情况全数据', { ...data })
          // console.log('resssssssssssssssssssssssssss', data)
          // console.log('resssssssssssssssssssssssssss', HomeViewModel.NurseSituationData)
          if (data.userTotal) {
            emitter.emit('护理人员情况数组', () => {
              let cacheArr = Object.keys(data) || []
              return cacheArr
            })
            // HomeViewModel.jobArr = Object.keys(data) || []
          }
        }
      })
    }
  }, [authStore.selectedDeptCode, titleBy])

  return (
    <div>
      <Head>
        <div className='headLeft'>护理人员情况</div>
        <div className='headRight'>更多 ></div>
      </Head>
      <Mid>
        <MidHeader>
          <div className='headerLeft'>护理人员合计：{userTotal}</div>
          <div className='headerRight'>
            {/* <div className='headerRightItem' onClick={choose1}>
              按职称
            </div>
            <div className='headerRightItem' onClick={choose2}>
              按层级
            </div>
            <div className='headerRightItem' onClick={choose3}>
              按工龄
            </div> */}
            <Radio.Group defaultValue='按职称' onChange={selectChange}>
              <Radio.Button value='按职称'>按职称</Radio.Button>
              <Radio.Button value='按层级'>按层级</Radio.Button>
              <Radio.Button value='按工龄'>按工龄</Radio.Button>
            </Radio.Group>
          </div>
        </MidHeader>
        <JobTitleMap userTotal={userTotal} />
      </Mid>
    </div>
  )
}

const Head = styled.div`
  height: 37px;
  line-height: 37px;
  width: 100%;
  background-color: rgba(245, 246, 247, 1);
  .headLeft {
    padding-left: 17px;
    float: left;
    font-size: 13px;
    letter-spacing: 1px;
    color: #333333;
  }
  .headRight {
    padding-right: 14px;
    float: right;
    font-size: 13px;
    letter-spacing: 1px;
    color: #999999;
    .ant-radio-button-wrapper {
      background-color: red !important;
    }
  }
`
const Mid = styled.div`
  padding: 0 18px;
`
const MidHeader = styled.div`
  height: 42px;
  line-height: 42px;
  display: flex;
  .headerLeft {
    width: 50%;
  }
  .headerRight {
    margin-top: 7px;
    width: 60%;
    height: 26px;
    line-height: 26px;
    text-align: center;
    display: flex;
    color: #333333;
    /* background-color: rgba(241, 244, 246, 1); */
    /* border: 1px solid #c0cbce; */
    cursor: pointer;
    .ant-radio-group-outline {
      height: 100%;
      width: 100%;
      z-index: 3;
      .ant-radio-button-wrapper {
        /* box-sizing: border-box; */
        padding: 0;
        height: 100%;
        line-height: height;
        width: 33.33333%;
        background-color: #f1f4f6;
        span {
          margin-top: -3px;
        }
      }
    }
    .headerRightItem {
      margin: -1px 0 0 -1px;
      box-sizing: border-box;
      height: 100%;
      width: 33.33%;
      border: 1px solid #c0cbce;
    }
    .headerRightItem:hover {
      border-color: #0092fe;
      color: #0092fe;
      /* background-color: #5bbe98; */
    }
  }
`
