import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Radio, Select, Spin } from 'antd'
import CommonLayout, { ChartCon } from './../../common/CommonLayout'
import { observer } from 'mobx-react'
import { appStore, authStore } from 'src/stores'
import CircleChart from './../../components/CircleChart'
import BaseTable from 'src/components/BaseTable'
import { statisticsApi } from './../../api/StatisticsApi'
import { ColumnProps } from 'antd/lib/table'
import { chartHeightCol } from '../../utils/chartHeightCol'
import { delWithResData } from '../../utils/dealWithData'

const Option = Select.Option

export interface Props { }

export default observer(function 护士学历分布() {
  const { deptList } = authStore
  const [query, setQuery] = useState({
    deptCode: ''
  })
  const [data, setData] = useState([] as any[])
  const [chartData, setChartData] = useState([] as { type: string, value: number }[])
  const [chartHeight, setChartHeight] = useState(chartHeightCol())
  const [chartVisible, setChartVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const [extraColumns, setExtraColumns] = useState([] as ColumnProps<any>[])

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (val: any, record: any, idx: number) => idx + 1
    },
    {
      title: '科室',
      width: 180,
      dataIndex: 'DEPTNAME',
      align: 'center',
    },
    {
      title: '护士人数',
      width: 60,
      dataIndex: 'NUM',
      align: 'center',
    },
    ...extraColumns,
  ]

  const handleSearch = () => getData()

  const getData = () => {
    setLoading(true)

    statisticsApi.countEducation(query)
      .then((res: any) => {
        setLoading(false)

        let dataList = res.data
        if (dataList) {
          const {
            newExtraColumns,
            newChartData,
            newData,
          } = delWithResData({
            dataList
          })

          setExtraColumns(newExtraColumns)
          setChartData(newChartData)
          setData(newData)
        }
      }, () => setLoading(false))
  }

  useEffect(() => {
    getData()
  }, [query])


  useEffect(() => {
    let resizeCallBack = () => setChartHeight(chartHeightCol())

    window.addEventListener('resize', resizeCallBack)
    return () => {
      window.removeEventListener('resize', resizeCallBack)
    }
  }, [])

  return <CommonLayout
    header={<div>
      <Select
        style={{ minWidth: 180 }}
        className="content-item"
        value={query.deptCode}
        showSearch
        optionFilterProp="children"
        filterOption={(input: any, option: any) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(deptCode: string) => setQuery({ ...query, deptCode })}>
        <Option value={''}>全院</Option>
        {deptList.map((dept: any, idx: number) =>
          <Option key={idx} value={dept.code}>{dept.name}</Option>
        )}
      </Select>
      <Button type="primary" onClick={handleSearch}>查询</Button>
    </div>}
    body={<Spin spinning={loading}>
      <div className="main-title">护士学历分布</div>
      <div className="right-group">
        <Radio.Group
          size="small"
          buttonStyle="solid"
          value={chartVisible}
          onChange={(e) => setChartVisible(e.target.value)}>
          <Radio.Button value={false} >表格</Radio.Button>
          <Radio.Button value={true}>图表</Radio.Button>
        </Radio.Group>
      </div>
      {!chartVisible && <BaseTable
        surplusWidth={500}
        surplusHeight={300}
        columns={columns}
        dataSource={data} />}
      {chartVisible && <ChartCon style={{ height: `${chartHeight || 0}px` }}>
        {chartData.length > 0 && <CircleChart
          chartHeight={chartHeight}
          sourceData={chartData} />}
        {chartData.length <= 0 && <div className="no-data">
          <img
            style={{ width: '100px' }}
            src={require('src/modules/statistic/img/noData.png')} />
          <br />
          <span>暂无数据</span>
        </div>}
      </ChartCon>}
    </Spin>} />
})