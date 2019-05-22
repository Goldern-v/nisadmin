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
export default observer(function PatientSituation () {
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    const postData = {
      wardCode: authStore.selectedDeptCode, // string 必须参数 科室编码
      startTime: moment().format(dateFormat), // string 必须参数 开始时间 2019-01-01 00:00:00
      endTime: moment()
        .add(1, 'd')
        .format(dateFormat) // string 必须参数 结束时间 2019-01-02 00:00:00
    }
    if (authStore.selectedDeptCode) {
      HomeApi.patientCondition(postData).then((res) => {
        console.log('===patientCondition', res)
        if (res.data) {
          setDataSource(res.data)
        }
      })
    }
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
      width: 200
    },
    {
      title: '人数',
      dataIndex: 'patientNum',
      key: '',
      align: 'center'
    }
  ]
  return (
    <div>
      <Head>
        <div className='headLeft'>患者情况</div>
        <div className='headRight'>更多></div>
      </Head>
      <Mid>
        <BaseTable dataSource={dataSource} columns={columns} scroll={{ y: 240 }} />
        {/* <table>
          <thead>
            <tr>
              <th>类型</th>
              <th>人数</th>
              <th>与现有人数比率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
            </tr>
            <tr>
              <td />
              <td />
              <td />
            </tr>
            <tr>
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
  .BaseTable__Wrapper-sc-18xwuv-0 {
    padding: 0 ！ !important;
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
