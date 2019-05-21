import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import PatientAreaMap from './components/PatientAreaMap'
import { Button, Radio, Icon } from 'antd'
import HomeApi from 'src/modules/home/api/HomeApi.ts'
import { authStore } from 'src/stores/index'
import moment from 'moment'
import HomeViewModel from 'src/modules/home/HomeViewModel.ts'
import { observer } from 'mobx-react-lite'
const dateFormat = 'YYYY-MM-DD 00:00:00'
export default observer(function PatientDistribute () {
  const [titleBy, setTitleBy] = useState('按地区')
  const [patientNumSum, setPatientNumSum] = useState(0)
  // const [byBistrict, setByBistrict] = useState([
  //   { patientType: '', patientNum: '1' },
  //   { patientType: '', patientNum: '1' },
  //   { patientType: '', patientNum: '1' }
  // ])
  useEffect(() => {
    let postData = {
      wardCode: authStore.selectedDeptCode, // string 必须参数 科室编码
      startTime: moment().format(dateFormat), // string 必须参数 开始时间 2019-01-01 00:00:00
      endTime: moment()
        .add(1, 'd')
        .format(dateFormat), // string 必须参数 结束时间 2019-01-02 00:00:00
      type: titleBy
    }
    HomeApi.patientdistribute(postData).then((res) => {
      console.log('====patientdistribute:', res)
      if (res.data) {
        if (titleBy === '按地区') {
          let list = res.data
          let chacheSum = 0
          list.map((item: any) => {
            chacheSum = chacheSum + parseInt(item.patientNum, 10)
            return chacheSum
          })
          setPatientNumSum(chacheSum)

          HomeViewModel.PatientDistributeData = res.data
        }
      }
    })
  }, [authStore.selectedDeptCode, titleBy])

  const selectChange = (e: any) => {
    setTitleBy(e.target.value)
  }
  return (
    <div>
      <Head>
        <div className='headLeft'>患者分布</div>
        <div className='headRight'>更多></div>
      </Head>
      <Mid>
        <MidHeader>
          <div className='headerLeft'>患者合计：{patientNumSum}</div>
          <div className='headerRight'>
            <Radio.Group defaultValue='按地区' onChange={selectChange}>
              <Radio.Button value='按地区'>按地区</Radio.Button>
              <Radio.Button value='按费别'>按费别</Radio.Button>
              <Radio.Button value='按性别'>按性别</Radio.Button>
            </Radio.Group>
            {/* <div className='headerRight'>
            <div className='headerRightItem'>按地区</div>
            <div className='headerRightItem'>按费别</div>
            <div className='headerRightItem'>按性别</div>
          </div> */}
          </div>
        </MidHeader>
        <PatientAreaMap patientNumSumProp={patientNumSum} />
      </Mid>
    </div>
  )
})

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
