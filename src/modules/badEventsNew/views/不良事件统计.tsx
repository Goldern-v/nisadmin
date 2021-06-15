import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Radio, Spin, Select } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { appStore, authStore } from 'src/stores'
import { PageTitle, Place } from 'src/components/common'

import { badEventsNewService } from './../api/badEventsNewService'

import { Chart, Tooltip, Axis, Bar, Legend, Point, SmoothLine, Coord } from 'viser-react'
import { fileDownload } from "src/utils/file/file"
const DataSet = require('@antv/data-set')
import moment from 'moment'

export default observer(function 不良事件统计() {
  console.log('version.2021.6.4.17.02')
  const { queryObj } = appStore
  const [filterDate, setFilterDate] = useState([moment(moment().format('YYYY-MM') + '-01'), moment()])
  //不良事件类型下拉选项
  const [eventTypeList, setEventTypeList] = useState([] as any)
  const [eventTypeSelected, setEventTypeSelected] = useState([] as any)

  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([] as any[])
  const [viewType, setViewType] = useState('table')

  //图表高度自适应相关
  const chartHeightCol = (restHeight = 220): number => {
    let windowHeight = document.documentElement.clientHeight

    return windowHeight - restHeight
  }
  const [chartHeight, setChartHeight] = useState(chartHeightCol())

  //图表相关数据
  const [chartData, setChartData] = useState([] as any[])
  const label = {
    textStyle: {
      textBaseline: 'middle',
      textAlign: 'left',
      fill: '#333',
      fontSize: 12
    },
    offset: 10,
    autoRotate: false,
    rotate: 90,
    formatter: (text: string) => {
      let viewText = text
      if (viewText.length > 9) viewText = `${viewText.substr(0, 9)}...`
      return viewText
    }
  } as any

  const labelFormat = {
    textStyle: {
      fill: '#333',
      fontSize: 12
    },
    formatter: (text: string) => {
      return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
  } as any

  const tickLine = {
    alignWithLabel: true,
    length: 1
  }

  // const title = {
  //   offset: 70
  // }

  // const style = {
  //   text: {
  //     fontSize: 14
  //   }
  // }

  //根据列表返回的事件类型显示对应的列
  const customCols = [] as any

  if (tableData[0] && tableData[0].eventTypeCount) {
    let eventTypeCount = tableData[0].eventTypeCount
    let keys = Object.keys(eventTypeCount) || []
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]

      let title = ''

      let target = eventTypeList.find((item: any) => item.code == key)
      if (target) title = target.name

      if (target) customCols.push({
        title,
        dataIndex: key,
        width: 60,
        align: 'center',
        render: (text: any, record: any) => {
          let val = record.eventTypeCount[key]
          return val || 0
        }
      })
    }
  }

  const columns: any[] = [
    {
      title: '序号',
      width: 60,
      align: 'center',
      render: (text: any, record: any, idx: number) => {
        if (record.wardCode == '000000') return '合计'

        return idx + 1
      }
    },
    {
      title: '科室',
      dataIndex: 'wardName',
      width: 160,
      align: 'left'
    },
    ...customCols,
    {
      title: '合计',
      dataIndex: 'eventTotal',
      key: '合计',
      width: 80,
      align: 'center'
    },
    {
      title: '占比',
      dataIndex: 'proportion',
      key: '占比',
      width: 80,
      align: 'center',
    }
  ]

  const getTableData = () => {
    // console.log(queryObj.qcLevel)
    setLoading(true)
    badEventsNewService.badEventTotal({
      beginDate: filterDate[0].format('YYYY-MM-DD'),
      endDate: filterDate[1].format('YYYY-MM-DD'),
      eventTypeList: eventTypeSelected || []
    })
      .then(res => {
        setLoading(false)
        if (res.data) {
          // console.log(res.data)

          setTableData(res.data || [])

          setChartData(res.data || [])
        }
      }, err => setLoading(false))
  }

  const handleExport = () => {
    setLoading(true)
    badEventsNewService
      .badEventTotalExport({
        beginDate: filterDate[0].format('YYYY-MM-DD'),
        endDate: filterDate[1].format('YYYY-MM-DD'),
        eventTypeList: eventTypeSelected || []
      })
      .then(res => {
        setLoading(false)
        fileDownload(res)
      }, err => setLoading(false))
  }

  useEffect(() => {
    let deptCode = "";
    if (authStore.user) deptCode = authStore.user.deptCode;
    badEventsNewService
      .getEvetTypetList(deptCode)
      .then(res => {
        let data = res.data;

        setEventTypeList(data || [])
      })

    let resizeCallBack = () => setChartHeight(chartHeightCol())

    window.addEventListener('resize', resizeCallBack)
    return () => {
      window.removeEventListener('resize', resizeCallBack)
    }
  }, [])

  useEffect(() => {
    getTableData()
  }, [filterDate, eventTypeSelected])

  return <Wrapper>
    <HeaderCon>
      <LeftIcon>
        <PageTitle>不良事件统计</PageTitle>
      </LeftIcon>
      <Place />
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
        <div className="item">
          <div className="label">事件分类：</div>
          <div className="content">
            <Select
              style={{ width: 450 }}
              maxTagCount={3}
              allowClear
              defaultValue={[]}
              placeholder="全部"
              showSearch
              mode="multiple"
              onBlur={(payload: any) => setEventTypeSelected(payload)}>
              {eventTypeList.map((item: any, idx: number) => {
                return (
                  <Select.Option value={item.code} key={idx}>
                    {item.name}
                  </Select.Option>
                )
              })}
            </Select>
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
          <Radio.Button value="table" >详情</Radio.Button>
          <Radio.Button value="chart">图表</Radio.Button>
        </Radio.Group>
      </span>
      {viewType == 'table' && <TableCon>
        <BaseTable
          loading={loading}
          surplusHeight={260}
          dataSource={tableData}
          columns={columns}
          rowClassName={(record: any, index: any): string => {
            if (index == tableData.length - 1) return 'sum-row'

            return ''
          }}
        />
      </TableCon>}
      {viewType == 'chart' &&
        <Spin spinning={loading}>
          <ChartCon height={chartHeight}>
            <Chart
              forceFit
              height={chartHeight}
              data={chartData.slice(0, chartData.length - 1)
                .map((item: any) => {
                  return {
                    wardName: item.wardName,
                    eventTotal: item.eventTotal,
                    proportion: parseInt(item.proportion)
                  }
                })}
              padding={[40, 40, 160, 40]}
              scale={[{
                dataKey: 'eventTotal',
                tickCount: 5,
                alias: '不良事件数'
              }, {
                dataKey: 'proportion',
                tickCount: 5,
                alias: '占比 (%)',
                max: 100,
                min: 0,
                formatter: (text: number) => `${text}%`
              }]}
            >
              <Coord type='rect' />
              <Tooltip shared={true} />
              <Legend position="top-right" />
              <Axis dataKey="wardName" label={label} tickLine={tickLine} />
              <Axis dataKey="eventTotal" label={labelFormat} tickLine={tickLine} />
              <Bar position="wardName*eventTotal" opacity={1} />
              {/* <Point shape='circle' position="wardName*proportion" color='#fdae6b' size={3} /> */}
              <SmoothLine position="wardName*proportion" color='#fdae6b' size={3} />
            </Chart>
            {chartData.length <= 0 &&
              <div className="no-data">
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
      .ant-select-selection__choice__content{
        max-width: 80px;
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
  .sum-row{
    font-weight: bold;
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
  width: 100%;
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