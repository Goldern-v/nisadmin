import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Select, DatePicker, Input } from 'antd'
import { Place } from 'src/components/common'
import { authStore } from 'src/stores'
import moment from 'src/vendors/moment'
import { observer } from 'mobx-react-lite'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import 科室创新DetailMoal from './components/科室创新DetailMoal'
import { ColumnProps } from 'src/vendors/antd'
import settingViewModel from 'src/modules/setting/SettingViewModel'

const Option = Select.Option
const RangePicker = DatePicker.RangePicker

export interface Props { }

export default observer(function 科室创新() {
  let _currentMonth = currentMonth()
  let _currentQuater = currentQuater()
  let _currentYear = currentYear()

  const [loading, setLoading] = useState(false)
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [recordSelected, setRecordSelected] = useState({})

  const [query, setQuery] = useState({
    wardCode: '',
    pageSize: 20,
    pageIndex: 1,
    beginDate: _currentMonth[0].format('YYYY-MM-DD'),
    endDate: _currentMonth[1].format('YYYY-MM-DD'),
    signUnit: '',
    members: '',
  })

  const [tableData, setTableData] = useState([] as any[])
  const [total, setTotal] = useState(0)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'id',
      width: 50,
      align: 'center',
      render: (text: string, record: any, idx: number) =>
        query.pageSize * (query.pageIndex - 1) + idx + 1
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      width: 150,
      align: 'center',
    },
    {
      title: '创新科室',
      dataIndex: 'wardName',
      width: 150,
      align: 'center',
    },
    {
      title: '创新时间',
      dataIndex: 'createTime',
      width: 150,
      align: 'center',
    },
    {
      title: '登记单位',
      dataIndex: 'signUnit',
      width: 150,
      align: 'center',
    },
    {
      title: '登记号',
      dataIndex: 'signNum',
      width: 150,
      align: 'center',
    },
    {
      title: '参与成员',
      dataIndex: 'members',
      width: 150,
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: '操作',
      align: 'center',
      width: 80,
      render: (text: any, record: any) => {
        return <DoCon>
          <span onClick={() => handleDetail(record)}>查看详情</span>
        </DoCon>
      }
    },
  ]

  const handleDetail = (record: any) => {
    setDetailModalVisible(true)
    setRecordSelected(record)
  }

  const getTableData = () => {
    setLoading(true)
    setTableData([])

    setLoading(false)
  }

  useEffect(() => {
    getTableData()
  }, [query])

  return <Wrapper>
    <HeaderCon>
      <Title>科室创新</Title>
      <Place />
      <Button>导出</Button>
    </HeaderCon>
    <FilterCon>
      <Row>
        <Col span={6}>
          <div className="title">科室</div>
          <div className="label">
            <Select
              showSearch
              allowClear
              filterOption={(input: any, option: any) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 220 }}
              placeholder="选择新科室"
              value={query.wardCode}
              onChange={(wardCode: string) => setQuery({ ...query, wardCode, pageIndex: 1 })}
            >
              <Select.Option value={""}>全部</Select.Option>
              {authStore.deptList.map((item: any) => {
                return (
                  <Select.Option value={item.code} key={item}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        </Col>
        <Col span={6}>
          <div className="title">创新时间</div>
          <div className="content">
            <RangePicker
              className="content-item"
              style={{ width: 220, marginRight: 10 }}
              value={[moment(query.beginDate), moment(query.endDate)]}
              ranges={{
                '本月': _currentMonth,
                '本季度': _currentQuater,
                '本年度': _currentYear,
              }}
              onChange={(payload: any) => {
                setQuery({
                  ...query,
                  beginDate: payload[0].format('YYYY-MM-DD'),
                  endDate: payload[1].format('YYYY-MM-DD'),
                  pageIndex: 1,
                })
              }}
              allowClear={false} />
          </div>
        </Col>
        <Col span={5}>
          <div className="title">登记单位</div>
          <div className="content">
            <Input
              value={query.signUnit}
              onChange={(e: any) =>
                setQuery({ ...query, signUnit: e.target.value, pageIndex: 1 })} />
          </div>
        </Col>
        <Col span={5}>
          <div className="title">参与成员</div>
          <div className="content">
            <Input
              value={query.members}
              onChange={(e: any) =>
                setQuery({ ...query, members: e.target.value, pageIndex: 1 })} />
          </div>
        </Col>
        <Col span={2}>
          <Button
            style={{ margin: '0 auto' }}
            type="primary"
            onClick={() => setQuery({ ...query, pageIndex: 1 })}>
            查询
            </Button>
        </Col>
      </Row>
    </FilterCon>
    <BaseTable
      surplusHeight={260}
      surplusWidth={1000}
      loading={loading}
      dataSource={tableData}
      columns={columns}
      pagination={{
        current: query.pageIndex,
        pageSize: query.pageSize,
        total,
        onChange: () => (pageIndex: number, pageSize: number) =>
          setQuery({ ...query, pageIndex: pageIndex }),
        onShowSizeChange: (pageIndex: number, pageSize: number) =>
          setQuery({ ...query, pageIndex: 1, pageSize, })
      }} />
    <科室创新DetailMoal
      visible={detailModalVisible}
      onCancel={() => setDetailModalVisible(false)}
      detailData={recordSelected} />
  </Wrapper>
})

const Wrapper = styled.div`
  padding: 15px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  `

const HeaderCon = styled.div`
  display: flex;
  align-items: center;
  color: #333;
  height: 32px;
  .sub{
    margin-left: 10px;
    &:first-of-type{
      margin-left:0;
    }
  }
`

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`

const MainCon = styled.div`
  flex: 1;
  padding-top: 15px;
`

const FilterCon = styled.div`
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  min-height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  .ant-row{
    margin: 10px;
    .ant-col{
      display: flex;
      .title{
        line-height: 32px;
        font-size: 14px;
        width: 80px;
        text-align: right;
        padding-right: 10px;
      }
      .content{
        flex:1;
      }
    }
  }
`