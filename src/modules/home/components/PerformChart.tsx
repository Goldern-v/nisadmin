import styled from 'styled-components'
import React, { useState, useEffect } from 'react'

import service from 'src/services/api'
import { authStore } from 'src/stores/index'
import moment from 'moment'
moment.locale('zh-cn')
const dateFormat = 'YYYY-MM-DD 00:00:00'
import { observer } from 'mobx-react-lite'
import HomeApi from 'src/modules/home/api/HomeApi.ts'
import BaseTable from 'src/components/BaseTable.tsx'
export default observer(function PerformChart () {
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    const postData = {
      wardCode: authStore.selectedDeptCode, // string 必须参数 科室编码
      startTime: moment().format(dateFormat), // string 必须参数 开始时间 2019-01-01 00:00:00
      endTime: moment()
        .add(1, 'd')
        .format(dateFormat) // string 必须参数 结束时间 2019-01-02 00:00:00
    }
    // console.log('===BedSituation', postData)
    // service
    HomeApi.executeStatus(postData)
      .then((res) => {
        console.log('===BedSituation', res)
        if (res.data) {
          let cacheData = res.data
          for (let i = 0; i < cacheData.length; i++) {
            cacheData[i].finishCountN = parseInt(cacheData[i].totalCount) / parseInt(cacheData[i].finishCount)
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
  }, [authStore.selectedDeptCode])
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
      title: '类型',
      dataIndex: 'patientType',
      key: '',
      align: 'center',
      width: 100
    },
    {
      title: '总计',
      dataIndex: 'totalCount',
      key: '',
      align: 'center',
      width: 100
    },
    {
      title: '已完成',
      dataIndex: 'finishCount',
      key: '',
      align: 'center',
      width: 100
    },
    {
      title: '完成率',
      dataIndex: 'finishCountN',
      key: '',
      align: 'center'
      // width: 100
    }
  ]
  return (
    <div>
      <Head>
        <div className='headLeft'>执行单情况</div>
        <div className='headRight'>更多></div>
      </Head>
      <Mid>
        <BaseTable dataSource={dataSource} columns={columns} scroll={{ y: 240 }} />
        {/* <table>
          <thead>
            <tr>
              <th>类型</th>
              <th>总计</th>
              <th>已完成</th>
              <th>完成率</th>
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
  /* padding: 18px 18px 0 18px; */
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
