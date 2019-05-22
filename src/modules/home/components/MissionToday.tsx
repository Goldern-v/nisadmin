import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

import service from 'src/services/api'
import HomeApi from 'src/modules/home/api/HomeApi.ts'
import { authStore } from 'src/stores/index'
import moment from 'moment'
import BaseTable from 'src/components/BaseTable.tsx'
import { observer } from 'mobx-react-lite'
import Item from 'antd/lib/list/Item'
moment.locale('zh-cn')
const dateFormat = 'YYYY-MM-DD 00:00:00'

export default observer(function MissionToday () {
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    // console.log(count, setCount)
    const postData = {
      wardCode: authStore.selectedDeptCode, // string 必须参数 科室编码
      startTime: moment().format(dateFormat), // string 必须参数 开始时间 2019-01-01 00:00:00
      endTime: moment()
        .add(1, 'd')
        .format(dateFormat) // string 必须参数 结束时间 2019-01-02 00:00:00
    }
    // console.log('===MissionToday', postData)
    // service
    // service.homeApiServices.todayTask(postData).then((res) => {
    let cacheData: any = [
      {
        wardCode: '030502',
        wardName: '神经内科护理单元',
        taskType: '三测单',
        finishCount: '14806',
        totalCount: '16290'
      },
      {
        wardCode: '030502',
        wardName: '神经内科护理单元',
        taskType: '执行单',
        finishCount: '36',
        totalCount: '23640'
      },
      {
        wardCode: '030502',
        wardName: '神经内科护理单元',
        taskType: '三测单',
        finishCount: '14806',
        totalCount: '16290'
      },
      {
        wardCode: '030502',
        wardName: null,
        taskType: '护理评估',
        finishCount: '446',
        totalCount: '608'
      }
    ]
    if (authStore.selectedDeptCode) {
      HomeApi.todayTask(postData)
        .then((res) => {
          console.log('===MissionToday', res)
          if (res.data) {
            let cacheData = res.data
            for (let i = 0; i < cacheData.length; i++) {
              cacheData[i].unFinishCount = parseInt(cacheData[i].totalCount) - parseInt(cacheData[i].finishCount)
            }
            // cacheData
            setDataSource(cacheData)
            // setDataSource(res.data)
            // cacheData
          }
        })
        .catch(() => {
          // for (let i = 0; i < cacheData.length; i++) {
          //   cacheData[i].unFinishCount = parseInt(cacheData[i].totalCount) - parseInt(cacheData[i].finishCount)
          // }
          // // cacheData
          // setDataSource(cacheData)
        })
    }
  }, [authStore.selectedDeptCode])
  // let dataLen = 4
  // const tbodyData = []
  // for (let i = 0; i < dataLen; i++) {
  //   tbodyData.push({})
  // }
  // const tbodyDom = tbodyData.map((item, index) => (
  //   <tr>
  //     <td key={index}>{item}</td>
  //   </tr>
  // ))
  // const dataSource: any = []
  const columns: any = [
    // {
    //   title: '序号',
    //   dataIndex: '序号',
    //   key: '序号',
    //   render: (text: any, record: any, index: number) => index + 1,
    //   align: 'center',
    //   width: 50
    // },
    {
      title: '任务类型',
      dataIndex: 'taskType',
      key: '',
      align: 'center',
      width: 100
    },
    {
      title: '任务数',
      dataIndex: 'totalCount',
      key: '',
      align: 'center',
      width: 80
    },
    {
      title: '已完成',
      dataIndex: 'finishCount',
      key: '',
      align: 'center',
      width: 80
    },
    {
      title: '未完成',
      dataIndex: 'unFinishCount',
      key: '',
      align: 'center'
      // width: 100
    }
  ]
  return (
    <div>
      <Head>
        <div className='headLeft'>今日任务</div>
        <div className='headRight'>更多></div>
      </Head>
      <Mid>
        <BaseTable dataSource={dataSource} columns={columns} scroll={{ y: 240 }} />
        {/* <table>
          <thead>
            <tr>
              <th>任务类型</th>
              <th>任务数</th>
              <th>已完成</th>
              <th>未完成</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table> */}
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
  }
`
const Mid = styled.div`
  .BaseTable__Wrapper-sc-18xwuv-0 {
    padding: 0 !important;
  }
  .ant-table-header {
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      /* width: 6px; 高宽分别对应横竖滚动条的尺寸 */
      /* height: 4px; */
    }
    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      background: rgba(0, 0, 0, 0.2);
    }
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      /* box-shadow: inset 0 0 5px #f2f4f5; */
      background-color: #f2f4f5;
    }
  }

  .ant-table-body {
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
  }
  .ceBJTl {
    padding: 0;
  }
  height: 282px;
  /* overflow-y: auto; */

  table {
    width: 100%;
    border: 1px solid #e5e5e5;
    text-align: center;
  }
  th {
    height: 36px;
    border: 1px solid #e5e5e5;
    color: #666666;
    background: rgba(247, 250, 250, 1);
  }
  td {
    height: 36px;
    border: 1px solid #e5e5e5;
  }
`
