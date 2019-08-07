import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { authStore } from 'src/stores/index'
import { Radio, DatePicker, Button} from 'antd'
import BaseTable from 'src/components/BaseTable'
import { observer } from 'mobx-react-lite'
import { qualityControlRecordVM } from '../qualityControlRecord/QualityControlRecordVM'
import DeptSelect from 'src/components/DeptSelect'
import FormSelect from 'src/modules/quality/views/qualityControlRecord/components/common/FormSelect.tsx'
import queryStatisticsServices from './services/queryStatisticsServices'

export interface Props extends RouteComponentProps {}

export default observer(function QueryStatistics(props: any) {
  const [tableData, setTableData] = useState([])
  const [loadingTable, setLoadingTable] = useState(false)
  const [showType, setShowType] = useState(false)

  const columns: any[] = [
    {
      title: '序号',
      dataIndex: '1',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 50
    },
    {
      title: '护理单元',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      align: 'left'
    },
    {
      title: '质控例数',
      dataIndex: 'total',
      key: 'total',
      width: 100,
      align: 'center'
    },
    {
      title: '最低通过率',
      dataIndex: 'evalRateMin',
      key: 'evalRateMin',
      width: 100,
      align: 'center'
    },

    {
      title: '最高通过率',
      dataIndex: 'evalRateMax',
      key: 'evalRateMax',
      width: 100,
      align: 'center'
    },
    {
      title: '平均通过率',
      dataIndex: 'evalRateAvg',
      key: 'evalRateAvg',
      width: 100,
      align: 'center'
    }
  ]

  useEffect(() => {
    getTableData()
  }, [])

  const getTableData = (obj?: any) => {
    let data = {
      beginDate: qualityControlRecordVM.filterDate[0].format('YYYY-MM-DD'),
      endDate: qualityControlRecordVM.filterDate[1].format('YYYY-MM-DD'),
      wardCode: qualityControlRecordVM.filterDeptCode,
      qcGroupCode: qualityControlRecordVM.filterForm, //科室 string非必须
      groupByDept: showType,//boolean  科室分组(true) 质控组分组(false) 
    }
    setLoadingTable(true)
    queryStatisticsServices.getEvalRateMenu(data).then((res) => {
      setLoadingTable(false)
      setTableData(res.data)
    })
  }

  //质控科室
  const deptOnChange = (value: string) => {
    qualityControlRecordVM.filterDeptCode = value
    getTableData()
  }

  //查询刷新
  const handleSearch = () => {
    getTableData()
  }

  //radio选择
  const radioChange = (e: any) => {
    setShowType(e.target.value)
    console.log(showType)
    getTableData()
  }

  return (
    <Wrapper>
      <HeaderCon>
        <div className='item'>
          <div className='label'>日期：</div>
          <div className='content'>
            <DatePicker.RangePicker
              value={qualityControlRecordVM.filterDate}
              onChange={(value) => {
                qualityControlRecordVM.filterDate = value
                getTableData()
              }}
              style={{ width: 220 }}
            />
          </div>
        </div>
        <div className='item'>
          <div className='label'>质控科室：</div>
          <div className='content'>
            <DeptSelect onChange={deptOnChange}/>
          </div>
        </div>
        <div className='item'>
          <div className='label'>质控表单：</div>
          <div className='content'> 
            <FormSelect refreshData={getTableData} />
          </div>
        </div>
        <div className='item'>
          <Button type='primary' onClick={handleSearch}>查询</Button>
        </div>
        <div className='item'>
          <Button onClick={() => {}}>导出Excel</Button>
        </div>
      </HeaderCon>
      <MidCon>
        <RadioCon>
          <Radio.Group value={showType} buttonStyle='solid' onChange={radioChange}>
            <Radio.Button value={false}>按科室</Radio.Button>
            <Radio.Button value={true}>按表单</Radio.Button>
          </Radio.Group>
        </RadioCon>
        <Title>医院质量检查表单统计表</Title>
        <Date>
          日期：{qualityControlRecordVM.filterDate[0].format('YYYY-MM-DD')} 至 {qualityControlRecordVM.filterDate[1].format('YYYY-MM-DD')}
        </Date>
        <TableCon>
          <BaseTable
              surplusHeight={240}
              loading={loadingTable}
              dataSource={tableData}
              columns={columns}
            />
        </TableCon>
      </MidCon>
    </Wrapper>
  )
})

//样式
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
  .item {
    display: inline-block;
    margin-right: 20px;
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
  }
`
const HeaderCon = styled.div`
  height: 50px;
  font-size: 13px;
  position: relative;
  font-size: 13px;
  color: #333333;
  padding: 0 0 0 15px;
  display: flex;
  align-items: center;
`
const MidCon = styled.div`
  box-sizing: border-box;
  flex: 1;
  height: 0;
  margin: 0 15px 5px 15px;
  box-shadow: ${(p) => p.theme.$shadow};
  background-color: #fff;
  border-radius: 5px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`
const RadioCon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`
const Title = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  text-align: center;
`
const Date = styled.div`
  font-size: 13px;
  color: #333;
  text-align: center;
`
const TableCon = styled.div`
  flex: 1;
  height: 0;
`
