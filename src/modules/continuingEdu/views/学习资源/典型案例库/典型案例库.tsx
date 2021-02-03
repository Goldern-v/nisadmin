import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, message, Modal, DatePicker, Select } from 'antd'
import { Place } from 'src/components/common'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { localityService } from './api/LocalityService'
import { appStore, authStore } from 'src/stores'
import moment from 'moment'
import deptNameList from './utils/deptNameList'
import { getCurrentMonthNow } from 'src/utils/date/currentMonth'
import PreviewOrEditModal from './components/PreviewOrEditModal'
import { continuningEduAuth } from 'src/modules/continuingEdu/data/continuningEduAuth'
import { observer } from 'mobx-react'

const Option = Select.Option

export interface Props { }

export default observer(function 典型案例库() {
  /**操作权限 */
  const editAuth = continuningEduAuth.studyResourcesEditAuth

  // const { history } = appStore
  const [query, setQuery] = useState({
    medicalSubject: '',
    collectTimeBegin: getCurrentMonthNow()[0].format('YYYY-MM-DD'),
    collectTimeEnd: getCurrentMonthNow()[1].format('YYYY-MM-DD'),
    keyWord: '',
    status: '',
    pageSize: 20,
    pageIndex: 1,
  })

  const [tableData, setTableData] = useState([] as any[])
  const [modalVisible, setModalVisible] = useState(false as any)
  const [modalEditable, setModalEditable] = useState(true as any)
  const [modalParams, setModalParams] = useState({} as any)

  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const columns: ColumnProps<any>[] = [
    {
      title: "序号",
      dataIndex: "",
      width: 40,
      render: (text: any, record: any, index: number) =>
        (query.pageIndex - 1) * query.pageSize + index + 1,
      align: "center",
    },
    {
      title: '科室',
      dataIndex: 'medicalSubject',
      align: "left",
      width: 180,
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      align: "center",
      width: 80,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: "center",
      width: 60,
      render: (text: any) => {
        switch (text) {
          case '0':
            return '男'
          case '1':
            return '女'
          default:
            return ''
        }
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      align: "center",
      width: 60,
    },
    {
      title: '收集时间',
      dataIndex: 'collectDate',
      align: "center",
      width: 120,
    },
    {
      title: '收集人',
      dataIndex: 'collectorName',
      align: "center",
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      align: "center",
      width: 200,
      render: (text: string, record: any) => {
        if (text == '退回')
          return <div>
            <span style={{ color: 'red' }}>{text}</span>
            <span>{record.auditRemark && `(${record.auditRemark})`}</span>
          </div>

        return text
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: "center",
      width: 120,
      render: (text: any, record: any, index: number) => {
        const isCreater = record.creatorEmpNo.toLocaleUpperCase() === (authStore.user?.empNo || '').toLocaleUpperCase()
        // 当前条目是否可编辑
        const editable = () => {
          const isEditStatus = [2, 4].indexOf(record.status) < 0

          if (isEditStatus && (editAuth || isCreater)) return true

          return false
        }

        return <DoCon>
          <span onClick={() => handleDetail(record)}>查看</span>
          {editable() && (
            <React.Fragment>
              <span onClick={() => handleEdit(record)}>编辑</span>
              <span onClick={() => handleDelete(record)}>删除</span>
            </React.Fragment>
          )}
          {!editable() && (
            <React.Fragment>
              <span style={{ color: "#aaa", cursor: "dafualt" }}>编辑</span>
              {(editAuth || isCreater) && <span onClick={() => handleDelete(record)}>删除</span>}
              {!(editAuth || isCreater) && <span style={{ color: "#aaa", cursor: "dafualt" }}>删除</span>}
            </React.Fragment>
          )}
        </DoCon>
      }
    }
  ]

  const handlePageChange = (pageIndex: number) => {
    setQuery({ ...query, pageIndex });
  }

  const handlePageSizeChange = (pageIndex: number, pageSize: number) => {
    setQuery({ ...query, pageSize, pageIndex: 1 });
  }

  const getTableData = (newQuery: any) => {
    setLoading(true)
    localityService.queryPageList(newQuery)
      .then(res => {
        setLoading(false)
        if (res.data) {
          setTotalCount(res.data.totalCount)
          setTableData(res.data.list)
        }
      }, () => setLoading(false))

  }

  const handleDetail = (record: any) => {
    setModalParams(record)
    setModalEditable(false)
    setModalVisible(true)
  }

  const handleEdit = (record: any) => {
    setModalParams(record)
    setModalEditable(true)
    setModalVisible(true)
  }

  const handleDelete = (record: any) => {
    if (record.id)
      Modal.confirm({
        title: '删除',
        content: '是否删除选中项目？',
        onOk: () => {
          setLoading(true)
          localityService
            .deleteById(record.id)
            .then(res => {
              setLoading(false)
              message.success('操作成功')
              getTableData(query)
            }, () => setLoading(false))

        }
      })
  }

  useEffect(() => {
    getTableData(query)
  }, [query])

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const handleAdd = () => {
    setModalEditable(true)
    setModalParams({})
    setModalVisible(true)
  }

  return <Wrapper>
    <HeaderCon>
      <Title>典型案例库</Title>
      <Place />
      <span>科室：</span>
      <Select
        value={query.medicalSubject}
        style={{ width: 120 }}
        showSearch
        filterOption={(input: any, option: any) => (
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        )}
        onChange={(medicalSubject: string) =>
          setQuery({ ...query, medicalSubject, pageIndex: 1 })}>
        <Option value=""> 全部</Option>
        {deptNameList.map((name: string) =>
          <Option
            key={name}
            value={name}>
            {name}
          </Option>)}
      </Select>
      <span className="sub">收集时间：</span>
      <DatePicker.RangePicker
        style={{ width: 200 }}
        allowClear={false}
        value={[moment(query.collectTimeBegin), moment(query.collectTimeEnd)]}
        onChange={(moments: any[]) => {
          setQuery({
            ...query,
            collectTimeBegin: moments[0].format('YYYY-MM-DD'),
            collectTimeEnd: moments[1].format('YYYY-MM-DD'),
          })
        }} />
      <Input
        placeholder="请输入要搜索的关键字"
        style={{ width: 240, marginLeft: 15 }}
        allowClear
        defaultValue={query.keyWord}
        onBlur={(e: any) =>
          setQuery({ ...query, pageIndex: 1, keyWord: e.target.value })
        }
      />
      <Button
        type="primary"
        className="sub"
        onClick={handleSearch}
        style={{ marginLeft: 15 }}
      >
        搜索
      </Button>
      <Button className="sub" onClick={handleAdd}>添加</Button>
    </HeaderCon>
    <MainCon>
      <BaseTable
        surplusHeight={235}
        columns={columns}
        dataSource={tableData}
        loading={loading}
        onRow={(record: any) => {
          return {
            onDoubleClick: () => handleDetail(record)
          }
        }}
        pagination={{
          pageSizeOptions: ["10", "20", "30", "40", "50"],
          total: totalCount,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
          current: query.pageIndex,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: query.pageSize
        }} />
    </MainCon>
    <PreviewOrEditModal
      visible={modalVisible}
      onOk={() => {
        setModalVisible(false)
        getTableData(query)
      }}
      onCancel={() => {
        setModalVisible(false)
      }}
      params={modalParams}
      editable={modalEditable} />
  </Wrapper>
})

const Wrapper = styled.div`
  padding: 15px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .file-item{
    cursor: pointer;
    color: #00A680;
    word-break: break-all;
    & *{
      vertical-align: middle;
    }
    .download{
      margin-left: 5px;
    }
    .file-icon{
      width: 12px; 
      margin-right: 5px;
    }
  }
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