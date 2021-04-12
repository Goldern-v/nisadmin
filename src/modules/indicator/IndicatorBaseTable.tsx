import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, DatePicker, Radio, Spin } from 'antd'
import moment from 'moment'
import BaseTable from 'src/components/BaseTable'
import { Axis, Bar, Chart, Legend, Tooltip } from 'viser-react'
import { indicatorService } from './services/IndicatorService'

export interface Props { }

export default function IndicatorBaseTable(props: any) {
  const { name, dateRange, onDateRangeChange } = props

  //柱状图相关数据
  const [chartData, setChartData] = useState([] as any[])

  const [loading, setLoading] = useState(false)
  const [tableName, setTableName] = useState('')
  const [tableData, setTableData] = useState([] as any[])
  const [viewType, setViewType] = useState('table')

  const [columns, setColumns] = useState([] as any[])

  //图表高度自适应相关
  const chartHeightCol = (restHeight = 200): number => {
    let windowHeight = document.documentElement.clientHeight

    return windowHeight - restHeight
  }

  const [chartHeight, setChartHeight] = useState(chartHeightCol())

  const label = {
    textStyle: {
      textBaseline: 'top',
      fill: '#333',
      fontSize: 14
    },
    // offset: 0,
    // autoRotate: false,
    rotate: 76.5,
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

  const widthCalc = (originWidth: number) => {
    return originWidth * 10
  }

  const formatColumns = (originData: any[]) => {
    let filterData = originData.filter((item: any) => !item.hidden)
    let newColumns = []

    for (let i = 0; i < filterData.length; i++) {
      let item = filterData[i]
      if (item.title.split('：').length <= 1) {
        newColumns.push({
          title: item.title,
          width: widthCalc(item.width),
          align: 'center',
          // fixed: ['序号', '护理单元'].indexOf(item.title) >= 0 ? 'left' : false,
          dataIndex: item.title,
        })
      } else {
        let title0 = item.title.split('：')[0]
        let title1 = item.title.split('：')[1]

        let child = {
          title: title1,
          width: widthCalc(item.width),
          align: 'center',
          dataIndex: item.title,
        }

        let parent: any = newColumns.find((column: any) => column.title === title0)
        if (parent) {
          let sameChild = parent.children.find((columnChild: any) => columnChild.title === title1)
          if (!sameChild)
            parent.children.push(child)
        } else {
          newColumns.push({
            title: title0,
            children: [child]
          })
        }
      }
    }

    return newColumns
  }

  const formatChartData = (originData: any[], orginColumns: any[]) => {
    let nameList = orginColumns.filter((column) => column.yaxis).map((column: any) => column.title)
    // console.log(nameList)
    let newData = [] as any[]

    for (let i = 0; i < nameList.length; i++) {
      let name = nameList[i]
      for (let j = 0; j < originData.length; j++) {
        let dataItem = originData[j]
        newData.push({
          name,
          护理单元: dataItem.护理单元,
          value: !isNaN(Number(dataItem[name])) ? Number(dataItem[name]) : 0
        })
      }
    }

    return newData
  }

  const getData = () => {
    setLoading(true)

    indicatorService.getIndicatorTable({
      beginDate: dateRange[0],
      endDate: dateRange[1],
      indicatorTableCode: name
    })
      .then(res => {
        setLoading(false)

        let data = res.data

        setTableName(data.tableName)
        setColumns(formatColumns(data.itemConfigList))
        setTableData(data.itemDataList)

        let newChartData = formatChartData(
          data.itemDataList
            .filter((item: any) => item.护理单元 !== '合计'),
          data.itemConfigList
        )

        setChartData(newChartData)

      }, () => setLoading(false))
  }

  const exportData = () => {
    indicatorService.getIndicatoeData(
      name,
      dateRange[0],
      dateRange[1]
    )
  }

  useEffect(() => {
    getData()
  }, [dateRange, name])

  useEffect(() => {
    let resizeCallBack = () => setChartHeight(chartHeightCol())

    window.addEventListener('resize', resizeCallBack)
    return () => {
      window.removeEventListener('resize', resizeCallBack)
    }
  }, [])

  return <Wrapper>
    <HeaderCon>
      <span>日期：</span>
      <DatePicker.RangePicker
        style={{ width: 220 }}
        className="mr-15"
        value={[
          moment(dateRange[0]),
          moment(dateRange[1])
        ]}
        allowClear={false}
        onChange={(moments: any[]) =>
          onDateRangeChange([
            moments[0].format('YYYY-MM-DD'),
            moments[1].format('YYYY-MM-DD'),
          ])} />
      <Button type="primary" className="mr-15" onClick={() => getData()}>查询</Button>
      {/* <Button onClick={() => exportData()}>导出</Button> */}
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
      <div className="main-title">{tableName || '无标题'}</div>
      <div className="sub-title">日期：{dateRange[0]} 至 {dateRange[1]}</div>
      {viewType == 'table' && <TableCon>
        <BaseTable
          loading={loading}
          surplusWidth={300}
          surplusHeight={290}
          dataSource={tableData}
          columns={columns}
        />
      </TableCon>}
      {viewType == 'chart' &&
        <Spin spinning={loading}>
          <ChartCon style={{ minHeight: `${chartHeight}px` }}>
            {/* <Chart
              forceFit
              height={chartHeight}
              data={chartData.map((item: any) => {
                return {
                  type: item.itemName,
                  value: item.size
                }
              })}
              padding={[40, 20, 160, 40]}
            // scale={[{
            //   dataKey: 'value',
            //   tickCount: 5,
            //   alias: '护理单元'
            // }]}
            >
              <Tooltip shared={true} />
              <Axis
                dataKey="name"
                label={label}
                tickLine={tickLine} />
              <Axis dataKey="value" label={labelFormat} tickLine={tickLine} />
              <Legend
                custom
                position="top-right" />
              <Bar
                position="name*value"
                color="name"
                opacity={1}
              />
            </Chart> */}
            <Chart forceFit height={chartHeight} data={chartData}>
              <Tooltip />
              <Axis />
              <Legend />
              <Bar position="护理单元*value" color="name" adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
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
}

const Wrapper = styled.div`
  .mr-15{
    margin-right: 15px;
  }
`

const HeaderCon = styled.div`
  padding: 10px 20px;
  align-items: center;
`

const TableCon = styled.div`
  width: 100%;
`

const MidCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  /* height: 0; */
  margin: 0 15px 15px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  .main-title{
    font-size: 20px;
    color: rgb(51, 51, 51);
    font-weight: bold;
    text-align: center;
  }
  .sub-title{
    font-size: 13px;
    color: rgb(51, 51, 51);
    text-align: center;
  }
  .align-right{
    text-align: right;
    padding-right: 20px;
    position: absolute;
    right: 0;
    z-index:10;
    top: 24px;
  }
`

const ChartCon = styled.div.attrs({
  height: 0
})`
  padding: 0 40px;
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