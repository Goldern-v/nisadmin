import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Radio, Spin } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { appStore } from 'src/stores'
import { PageTitle } from 'src/components/common'
import { qcFormHjService } from './api/QcFormHjService'
import { Chart, Tooltip, Axis, Bar, Legend } from 'viser-react'
import { fileDownload } from "src/utils/file/file";
const DataSet = require('@antv/data-set')
import moment from 'moment'

export default observer(function 护理质量检查小结() {
  const { queryObj } = appStore
  const [filterDate, setFilterDate] = useState([moment(moment().format('YYYY-MM') + '-01'), moment()])

  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([] as any[])
  const [viewType, setViewType] = useState('table')

  //图表高度自适应相关
  const chartHeightCol = (restHeight = 200): number => {
    let windowHeight = document.documentElement.clientHeight

    return windowHeight - restHeight
  }
  const [chartHeight, setChartHeight] = useState(chartHeightCol())

  //柱状图相关数据
  const [chartData, setChartData] = useState([] as any[])
  const label = {
    textStyle: {
      textBaseline: 'top',
      fill: '#333',
      fontSize: 14
    },
    offset: 60,
    // autoRotate: false,
    rotate: 85,
    formatter: (text: string) => {
      let viewText = text
      if (viewText.length > 8) viewText = `${viewText.substr(0, 7)}...`
      return viewText
    }
    // htmlTemplate: (text: string, item: any, index: number) => {
    //   return `<div style="width:40px;font-size:12px;position:fixed;top:458px;">${text}</div>`
    // }
  } as any

  const labelFormat = {
    textStyle: {
      fill: '#333',
      fontSize: 14
    },
    formatter: (text: string) => {
      return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
  } as any

  const tickLine = {
    alignWithLabel: true,
    length: 1
  }

  const title = {
    offset: 70
  }

  const style = {
    text: {
      fontSize: 14
    }
  }

  const columns: any[] = [
    {
      title: '科室',
      dataIndex: 'wardName',
      width: 180,
      align: 'left'
    },
    {
      title: '存在问题',
      dataIndex: 'itemNameList',
      width: 210,
      align: 'left',
      render: (arr: any[]) => {
        return <div>
          {arr.map((item: string, idx: number) =>
            <div key={idx}>
              {`${idx + 1}.${item}`}
            </div>)}
        </div>
      }
    },
      {
        title: '通过率(% )',
        dataIndex: 'evalRate',
        width: 80,
        align: 'center'
      },
    {
      title: '备注',
      dataIndex: 'remarkList',
      width: 210,
      align: 'left',
      render: (arr: any[]) => {
        return <div>
          {arr.map((item: string, idx: number) =>
            <div key={idx}>
              {`${idx + 1}.${item}`}
            </div>)}
        </div>
      }
    }
  ]

  // console.log(chartData.map((item: any) => {
  //   return {
  //     type: item.itemName,
  //     value: item.size
  //   }
  // }))

  const getTableData = () => {
    // console.log(queryObj.qcLevel)
    setLoading(true)
    qcFormHjService.countDetail({
      qcLevel: queryObj.qcLevel || '1',
      beginDate: filterDate[0].format('YYYY-MM-DD'),
      endDate: filterDate[1].format('YYYY-MM-DD'),
    })
      .then(res => {
        setLoading(false)
        if (res.data) {
          setTableData(res.data.wardDetailList || [])

          setChartData(res.data.itemCountList || [])
        }
      }, err => setLoading(false))
  }

  const handleExport = () => {
    setLoading(true)
    qcFormHjService
      .countDetailExport({
        qcLevel: queryObj.qcLevel || '1',
        beginDate: filterDate[0].format('YYYY-MM-DD'),
        endDate: filterDate[1].format('YYYY-MM-DD'),
      })
      .then(res => {
        setLoading(false)
        fileDownload(res)
      }, err => setLoading(false))
  }

  useEffect(() => {
    let resizeCallBack = () => setChartHeight(chartHeightCol())

    window.addEventListener('resize', resizeCallBack)
    return () => {
      window.removeEventListener('resize', resizeCallBack)
    }
  }, [])

  useEffect(() => {
    getTableData()
  }, [filterDate])

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>
          {filterDate[0].format('YYYY')}年{queryObj.title || '护理质量检查小结'}
        </PageTitle>
      </LeftIcon>
      <RightIcon>
        <div className="item">
          <div className="label">时间：</div>
          <div className="content">
            <DatePicker.RangePicker
              allowClear={false}
              value={[filterDate[0], filterDate[1]]}
              onChange={(value: any) => setFilterDate(value)}
              style={{ width: 220 }}
            />
          </div>
        </div>
        <div className='item'>
          <Button type='primary' onClick={getTableData}>
            查询
          </Button>
        </div>
        <div className="item">
          <Button onClick={handleExport}>
            导出
          </Button>
        </div>
      </RightIcon>
    </HeaderCon>
    <MidCon>
      <span className="align-right">
        <Radio.Group
          size="small"
          buttonStyle="solid"
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}>
          <Radio.Button value="table" >表格</Radio.Button>
          <Radio.Button value="chart">图表</Radio.Button>
        </Radio.Group>
      </span>
      {viewType == 'table' && <TableCon>
        <BaseTable
          loading={loading}
          surplusHeight={260}
          dataSource={tableData}
          columns={columns}
        />
      </TableCon>}
      {viewType == 'chart' &&
        <Spin spinning={loading}>
          <ChartCon height={chartHeight}>
            <Chart
              forceFit
              height={chartHeight}
              data={chartData.map((item: any) => {
                return {
                  type: item.itemName,
                  value: item.size
                }
              })}
              padding={[40, 20, 160, 40]}
              scale={[{
                dataKey: 'value',
                tickCount: 5,
                alias: '频次'
              }]}>
              <Tooltip shared={true} />
              <Axis
                dataKey="type"
                label={label}
                tickLine={tickLine} />
              <Axis dataKey="value" label={labelFormat} tickLine={tickLine} />
              <Legend
                custom
                position="top-right"
                items={[
                  {
                    value: '频次',
                    marker: { symbol: 'square', fill: 'rgb(24, 144, 255)', radius: 5, lineWidth: 3 }
                  }
                ]}
              />
              <Bar
                position="type*value"
                opacity={1}
              />
            </Chart>
            {chartData.length <= 0 && <div className="no-data">
              <img
                style={{ width: '100px' }}
                src={require('src/modules/statistic/img/noData.png')} />
              <br />
              <span>暂无数据</span>
            </div>}
          </ChartCon>
        </Spin>}
    </MidCon>
  </Wrapper>
})

const Wrapper = styled.div`
height: 100%;
  width: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
  .item {
    display: inline-block;
    margin-right: 15px;
    vertical-align: middle;
    & > div {
      display: inline-block;
      vertical-align: middle;
    }
    .label {
    }
    .content {
      .year-picker {
        width: 75px;
      }
      .recode-type-select {
        min-width: 200px;
      }
      .month-select {
        width: 72px;
      }
    }
    .statistics {
      border-color: #fff;
    }
  }
  .cell {
    margin: 0 -8px;
    padding: 5px;
    text-align: center;
    & + .cell {
      border-top: 1px solid rgb(232, 232, 232);
    }
  }
  td{
    word-break: break-all;
  }
`

const LeftIcon = styled.div`
  height: 55px;
  float: left;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`

const RightIcon = styled.div`
  height: 55px;
  float: right;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`

const HeaderCon = styled.div`
  height: 55px;
  align-items: center;
`

const TableCon = styled.div`
  /* width: 700px; */
  margin: 0 auto;
`

const MidCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  /* height: 0; */
  margin: 0 15px 15px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  .align-right{
    text-align:right;
    padding-right: 20px;
  }
`

const ChartCon = styled.div.attrs({
  height: 0
})`
  padding: 0 40px;
  min-height: ${(p) => p.height};
    position: relative;
  .no-data{
    text-align:center;
    cursor: default;
    color: #999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    i{
      font-size: 44px;
      transform: scaleX(1.2);
    }
    span{
      font-size:20px;
    color: #aaa;
    }
  }
`