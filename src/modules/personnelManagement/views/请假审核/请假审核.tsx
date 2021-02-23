import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Input, message, Modal, Radio, Row, Select } from 'antd'
import { currentMonth, currentQuater, currentYear } from 'src/utils/date/rangeMethod'
import { ColumnProps } from 'antd/lib/table'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import moment from 'src/vendors/moment'
import { authStore } from 'src/stores'
import { observer } from 'mobx-react'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import BaseTabs from "src/components/BaseTabs"
import { leaveAuditService } from './service/LeaveAuditService'
import DetailOrAuditModal from './components/DetailOrAuditModal'

const RangePicker = DatePicker.RangePicker
const Option = Select.Option

export interface Props { }

export default observer(function 请假审核() {
  const { deptList } = authStore
  let _currentMonth = currentMonth()
  let _currentQuater = currentQuater()
  let _currentYear = currentYear()

  const [query, setQuery] = useState({
    type: '',
    deptCode: '',
    queryBeginTime: _currentMonth[0].format('YYYY-MM-DD'),
    queryEndTime: _currentMonth[1].format('YYYY-MM-DD'),
    pageIndex: 1,
    pageSize: 20,
    auditResult: '' as string | number,
    keyWord: '',
  })

  const [activeTab, setActiveTab] = useState('0')

  const [tableData, setTableData] = useState([] as any[])
  const [typeList, setTypeList] = useState([] as any[])

  const [selectedRowKeys, setSelectedRowKeys] = useState([] as any[])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const statusList = [
    { name: '通过', code: 1 },
    { name: '驳回', code: -1 },
  ]

  /**详情审核弹窗相关 */
  const [detailModalVisible, setDetailModalVisible] = useState(false)
  const [detailModalId, setDetailModalId] = useState(0)
  const [detailModalAudit, setDetailModalAudit] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'id',
      width: 50,
      align: 'center',
      render: (text: string, record: any, idx: number) =>
        query.pageSize * (query.pageIndex - 1) + 1
    },
    {
      title: '申请人',
      dataIndex: 'empName',
      align: 'center',
      width: 80,
    },
    {
      title: '科室',
      dataIndex: 'deptName',
      align: 'center',
      width: 80,
    },
    {
      title: '请假类型',
      dataIndex: 'typeName',
      align: 'center',
      width: 80,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      align: 'center',
      width: 120,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      align: 'center',
      width: 120,
    },
    {
      title: '请假时长',
      dataIndex: 'duration',
      align: 'center',
      width: 80,
      render: (duration: number) =>
        duration > 24 ? `${Math.ceil(duration / 24)}天${duration % 24}小时` : `${duration}小时`
    },
    {
      title: '请假事由',
      dataIndex: 'leaveReason',
      align: 'center',
      width: 180,
    },
    {
      title: '审核状态',
      dataIndex: 'statusDetailDesc',
      align: 'center',
      width: 80,
    },
    {
      title: '审核操作',
      dataIndex: '审核操作',
      align: 'center',
      width: 80,
      render: (text: any, record: any) => {
        return <DoCon>
          {activeTab == '0' ?
            <span onClick={() => handleDetailOrAudit(record, true)}>审核</span> :
            <span onClick={() => handleDetailOrAudit(record, false)}>查看</span>}
        </DoCon>
      }
    },
  ]

  const getTableData = () => {
    setLoading(true)
    setSelectedRowKeys([])

    let reqQuery = { ...query } as any

    let reqMethod = leaveAuditService.queryToAuditPageList.bind(leaveAuditService)

    if (activeTab == '1') {
      reqMethod = leaveAuditService.queryAuditedPageList.bind(leaveAuditService)
    } else {
      delete reqQuery.auditResult
    }

    reqMethod(reqQuery)
      .then(res => {
        setLoading(false)
        if (res.data) {
          setTotal(res.data.totalCount)
          setTableData(res.data.list || [])
        }
      }, () => setLoading(false))
  }

  const getTypeList = () => {
    leaveAuditService.getAllLeaveTypes()
      .then(res => {
        setTypeList(
          (res.data || []).
            map(({ typeCode, typeName }: any) => ({ type: typeCode, name: typeName }))
        )
      })
  }

  const handleDetailOrAudit = (record: any, isAudit: boolean) => {
    setDetailModalAudit(isAudit)
    setDetailModalId(record.id)
    setDetailModalVisible(true)
  }

  const handleAudit = () => {
    if (selectedRowKeys.length <= 0)
      return message.warn('未勾选审核条目')

    let auditResult = 1
    let auditRemark = ''

    const AuditCon = styled.div`
      .ant-row{
        line-height:30px;
        margin-bottom: 10px;
        &:last-of-type{
          margin-bottom:0;
        }
      }
    `

    Modal.confirm({
      title: '批量审核',
      centered: true,
      content: <AuditCon>
        <Row>
          <Col span={6}>审核结果：</Col>
          <Col span={18}>
            <Radio.Group
              buttonStyle='solid'
              defaultValue={auditResult}
              onChange={(e: any) =>
                auditResult = e.target.value}>
              <Radio.Button value={1}>通过</Radio.Button>
              <Radio.Button value={-1}>驳回</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={6}>审核意见:</Col>
          <Col span={18}>
            <Input.TextArea
              defaultValue={auditRemark}
              onChange={(e: any) =>
                auditRemark = e.target.value}
              autosize={{ minRows: 2 }} />
          </Col>
        </Row>
      </AuditCon>,
      onOk: () => {
        setLoading(true)
        leaveAuditService
          .batchAuditLeaveApplicationInfo({
            auditResult,
            auditRemark,
            taskIdList: selectedRowKeys
          })
          .then(res => {
            message.success('操作成功', 2, () => {
              setLoading(false)
              getTableData()
            })
          }, err => setLoading(false))
      }
    })
  }

  useEffect(() => {
    getTypeList()
  }, [])

  useEffect(() => {
    getTableData()
  }, [query])

  const btntop = '141px'
  const AuditPannel = <div>
    <GroupPostBtn
      btntop={btntop}
      disabled={loading}
      onClick={() => getTableData()}>
      刷新
        </GroupPostBtn>
    {activeTab == '0' && (
      <GroupPostBtn
        btntop={btntop}
        onClick={handleAudit}
        disabled={loading}
        style={{ right: 110 }}>
        批量审核
      </GroupPostBtn>
    )}
    <BaseTable
      surplusHeight={305}
      columns={columns}
      rowKey={'id'}
      loading={loading}
      dataSource={tableData}
      rowSelection={activeTab == '0' ? {
        selectedRowKeys,
        onChange: (selectedRowKeys: any) => {
          setSelectedRowKeys(selectedRowKeys)
        }
      } : undefined}
      pagination={{
        pageSize: query.pageSize,
        current: query.pageIndex,
        total,
        onChange: () => (pageIndex: number, pageSize: number) =>
          setQuery({ ...query, pageIndex: pageIndex }),
        onShowSizeChange: (pageIndex: number, pageSize: number) =>
          setQuery({ ...query, pageIndex: 1, pageSize, })
      }} />
  </div>

  return <Wrapper>
    <div className="top">
      <div className="topbar">
        <BreadcrumbBox
          data={[
            {
              name: '请假管理',
              link: '/personnelManagement/请假管理/请假审核'
            },
            {
              name: '请假审核'
            }
          ]}
        />
        <div className="float-left">请假审核</div>
        <div className="float-right">
          <span className="item">
            <span className="label">请假时间：</span>
            <span className="content">
              <RangePicker
                className="content-item"
                style={{ width: 220 }}
                value={[moment(query.queryBeginTime), moment(query.queryEndTime)]}
                ranges={{
                  '本月': _currentMonth,
                  '本季度': _currentQuater,
                  '本年度': _currentYear,
                }}
                onChange={(payload: any) => {
                  setQuery({
                    ...query,
                    queryBeginTime: payload[0].format('YYYY-MM-DD'),
                    queryEndTime: payload[1].format('YYYY-MM-DD'),
                    pageIndex: 1,
                  })
                }}
                allowClear={false} />
            </span>
          </span>
          <span className="item">
            <span className="label">科室：</span>
            <span className="content">
              <Select
                style={{ minWidth: 180 }}
                className="content-item"
                value={query.deptCode}
                filterOption={(input: any, option: any) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={(deptCode: string) => setQuery({ ...query, deptCode, pageIndex: 1 })}>
                <Option value={''}>全部</Option>
                {deptList.map((dept: any, idx: number) =>
                  <Option key={idx} value={dept.code}>{dept.name}</Option>
                )}
              </Select>
            </span>
          </span>
          <span className="item">
            <span className="label">请假类型：</span>
            <span className="content">
              <Select
                style={{ minWidth: 80 }}
                value={query.type}
                onChange={(type: string) => setQuery({ ...query, type, pageIndex: 1 })}>
                <Option value={''}>全部</Option>
                {typeList.map((item: any, idx: number) => (
                  <Option key={idx} value={item.code}>{item.name}</Option>
                ))}
              </Select>
            </span>
          </span>
          {activeTab == '1' && (
            <span className="item">
              <span className="label">状态：</span>
              <span className="content">
                <Select
                  style={{ minWidth: 80 }}
                  value={query.auditResult}
                  onChange={(auditResult: string | number) => setQuery({ ...query, auditResult, pageIndex: 1 })}>
                  <Option value={''}>全部</Option>
                  {statusList.map((item: any, idx: number) => (
                    <Option key={idx} value={item.code}>{item.name}</Option>
                  ))}
                </Select>
              </span>
            </span>
          )}
          <span className="item">
            <Input
              placeholder="请输入关键词"
              style={{ width: 150 }}
              onBlur={(e: any) => setQuery({ ...query, keyWord: e.target.value, pageIndex: 1 })} />
          </span>
          <span className="item">
            <Button
              disabled={loading}
              onClick={() => setQuery({ ...query, pageIndex: 1 })}>
              查询
            </Button>
          </span>
        </div>
      </div>
    </div>
    <div className="main">
      <div className="table-content">
        <BaseTabs
          defaultActiveKey={activeTab}
          config={[
            {
              title: "待我审核",
              component: AuditPannel
            },
            {
              title: "我已审核",
              component: AuditPannel
            }
          ]}
          onChange={(key: any) => {
            setActiveTab(key);
            setQuery({ ...query, pageIndex: 1, auditResult: '' });
          }}
        />
      </div>
    </div>
    <DetailOrAuditModal
      visible={detailModalVisible}
      id={detailModalId}
      isAudit={detailModalAudit}
      onOk={() => {
        setDetailModalVisible(false)
        getTableData()
      }}
      onCancel={() => setDetailModalVisible(false)} />
  </Wrapper>
})

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 80px;
  background: #fff;

  .top {
    margin-top: -80px;
    /* // padding: 10px 15px; */
    height: 68px;
    .nav {
      margin-bottom: 5px;
    }
    .topbar {
      overflow: hidden;
      .float-left {
        float: left;
        font-size: 20px;
        line-height: 32px;
        font-weight: bold;
        margin-left: 15px;
      }
      .float-right {
        float: right;
        margin-right: 15px;
        .item {
          margin-left: 10px;
        }
      }
    }
  }

  .main {
    height: 100%;
    padding: 10px 15px;
    padding-top: 20px;
    .table-content {
      height: 100%;
      background: #fff;
    }
  }
`

const GroupPostBtn = styled(Button) <{ btntop?: string | number }>`
  position: fixed !important;
  top: ${p => p.btntop || '121px'};
  right: 33px;
`;