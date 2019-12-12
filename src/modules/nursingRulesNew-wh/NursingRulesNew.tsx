import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, Modal, message as Message, Icon, Tag } from 'antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { appStore, authStore } from 'src/stores'
import { nursingRulesApiService } from './api/nursingRulesNewService'
import { ColumnProps } from 'antd/lib/table'
import { observer } from 'mobx-react-lite'
import qs from 'qs'
import RevisonRecordModal from './components/listPage/RevisonRecordModal'
export interface Props { }

export default observer(function nursingRulesNew() {
  const { history } = appStore
  let [query, setQuery] = useState({
    bookName: '',
    pageSize: 20,
    pageIndex: 1
  })

  const absoluteAuth = (authStore.isDepartment || authStore.isSupervisorNurse) as boolean

  const [dataTotal, setDataTotal] = useState(0)
  const [tableData, setTableData] = useState([] as any[])
  const [loading, setLoading] = useState(false)
  const [revisionVisible, setRevisionVisible] = useState(false)

  const handlePageSizeChange = (current: number, size: number) => {
    setQuery({ ...query, pageSize: size, pageIndex: 1 })
  }

  const handlePageChange = (current: number) => {
    setQuery({ ...query, pageIndex: current })
  }

  useEffect(() => {
    getTableData()
  }, [query])

  const getTableData = () => {
    setLoading(true)
    nursingRulesApiService.getBookListByParam(query).then(res => {

      setLoading(false)
      setTableData(res.data.list)
      setDataTotal(res.data.totalCount || 0)
    }, () => setLoading(false))
  }

  const settingChange = (record: any) => {
    let content = "确定把该书籍设为无效吗？设为无效后将不能再查看该书籍内容"
    if (record.enabled == -1) content = "确定启用该书籍吗"
    let enabled = record.enabled == 1 ? -1 : 1

    Modal.confirm({
      centered: true,
      title: '提示',
      content: content,
      onOk: () => {
        setLoading(true)
        nursingRulesApiService.changeBookAvailability({
          bookId: record.id,
          enabled
        })
          .then(res => {
            setLoading(false)
            Message.success('设置成功')
            getTableData()
          }, err => setLoading(false))
      }
    })
  }

  const deleteBook = (record: any) => {
    Modal.confirm({
      centered: true,
      title: '提示',
      content: '确定删除该书籍吗？删除后数据无法恢复',
      onOk: () => {
        setLoading(true)
        nursingRulesApiService.deleteBook(record.id).then(res => {
          Message.success('删除成功')
          getTableData()
        }, err => setLoading(false))
      }
    })
  }

  const handleDetailView = (bookId: string) => {
    history.push(`nursingRulesNewDetail?${qs.stringify({ bookId })}`)
  }

  const handleAudit = (bookId: string) => {
    history.push(`nursingRulesNewDetail?${qs.stringify({ bookId, tab: 3 })}`)
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'idx',
      render: (text: any, record: any, idx) =>
        (query.pageIndex - 1) * query.pageSize + (idx + 1),
      width: 80,
      align: 'center'
    },
    {
      title: '书籍名称',
      key: 'bookName',
      dataIndex: 'bookName',
      align: 'left',
      render: (text: string, record: any) =>
        <div className='rule-name' title={text}>
          {text}
          <span> </span>
          {record.toAuditChapters && authStore.isDepartment &&
            <Tag
              color="#f00"
              style={{
                lineHeight: '14px',
                padding: '0 4px'
              }}
              onClick={() => handleAudit(record.id)}
              title={`有${record.toAuditChapters}个章节待审核`}>
              {record.toAuditChapters}
            </Tag>}
        </div>
    },
    {
      title: '上传人',
      width: 80,
      key: 'upLoaderEmpName',
      dataIndex: 'upLoaderEmpName',
    },
    {
      title: '上传时间',
      width: 150,
      key: 'upLoadTime',
      dataIndex: 'upLoadTime',
      align: 'center',
    },
    {
      title: '状态',
      width: 80,
      key: 'status',
      align: 'center',
      render: (text: string, record: any) => {
        let desc = record.statusDesc
        if (desc == '提交') return <span >{desc}</span>
        if (desc == '无效') return <span style={{ color: 'red' }}>{desc}</span>
        if (desc == '发布') return <span style={{ color: 'blue' }}>{desc}</span>

        return <span >-</span>
      }
    },
    {
      title: '操作',
      width: 150,
      key: 'operation',
      render: (text: any, record: any) => {
        let uploaderAuth = !!(record.upLoaderEmpNo == (authStore.user && authStore.user.empNo)) as boolean

        let auth = !!(uploaderAuth || absoluteAuth) as boolean

        let className = 'disable'
        let settingText = '设为无效'

        if (auth) className = ''
        if (record.enabled == -1) settingText = '启用'

        let settingSpan = <span className={className} onClick={() => {
          if (!auth) return
          settingChange(record)
        }}>{settingText}</span>

        let deleteSpan = <span className={className} onClick={() => {
          if (!auth) return
          deleteBook(record)
        }}>删除</span>

        let needAudit = authStore.isDepartment && record.toAuditChapters

        let auditSpan = <span
          className={needAudit ? '' : 'disable'}
          title='审核'
          onClick={() => needAudit && handleAudit(record.id)}>
          <Icon type="audit" />
        </span>

        return <DoCon>
          <span onClick={() => handleDetailView(record.id)}>查看</span>
          {auditSpan}
          {settingSpan}
          {deleteSpan}
        </DoCon>
      }
    },

  ]

  const handleCreate = () => {
    nursingRulesApiService
      .getTaskCode({ taskType: 1 })
      .then(res => {
        if (res.data) {
          let newSearch = {
            taskType: res.data.taskType,
            taskCode: res.data.taskCode
          }
          if (res.data) history.push(`/nursingRulesNewEdit?${qs.stringify(newSearch)}`)
        }
      })
  }

  return <Wrapper>
    <div className='topbar'>
      <div className='title'>护理制度</div>
      <div className='float-right'>
        <span className='type-label'></span>
        <span className='type-content'>
        </span>
        <span className='search-input' style={{ width: '200px' }}>
          <Input
            defaultValue={query.bookName}
            allowClear
            onBlur={(e: any) => setQuery({ ...query, bookName: e.target.value })}
            placeholder='输入名称进行检索' />
        </span>
        <Button onClick={() => getTableData()}>查询</Button>
        <Button type='primary' disabled={!absoluteAuth} onClick={handleCreate}>新建</Button>
        <Button onClick={() => setRevisionVisible(true)}>修订痕迹</Button>
      </div>
      <div className="main-contain">
        <BaseTable columns={columns}
          dataSource={tableData}
          onRow={record => {
            return {
              onDoubleClick: () => handleDetailView(record.id)
            }
          }}
          pagination={{
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            onShowSizeChange: handlePageSizeChange,
            onChange: handlePageChange,
            total: dataTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: query.pageSize,
            current: query.pageIndex
          }}
          loading={loading}
          surplusHeight={235} />
      </div>
      <RevisonRecordModal visible={revisionVisible} onCancel={() => setRevisionVisible(false)} />
    </div>
  </Wrapper>
})

const Wrapper = styled.div`
position: relative;
height: 100%;
.topbar {
  height: 60px;
  overflow: hidden;
  .title {
    font-size: 20px;
    display: inline-block;
    font-weight: bold;
    margin-left: 15px;
    margin-top: 15px;
  }
  .float-right {
    float: right;
    margin-top: 15px;
    margin-right: 15px;
    .search-input {
      width: 180px;
      display: inline-block;
      vertical-align: middle;
    }
    button {
      margin-left: 15px;
      vertical-align: middle;
    }
    .route-group {
      margin-left: 50px;
      vertical-align: middle;
    }
  }
  .type-label {
    margin-right: 5px;
    vertical-align: middle;
  }
  .type-content {
    .ant-select {
      vertical-align: middle;
    }
    margin-right: 15px;
    .ant-select-selection {
      min-width: 150px;
    }
  }
}
.main-contain {
  position: absolute;
  top: 60px;
  left: 15px;
  right: 15px;
  bottom: 10px;
  background: #fff;
  height: calc(100vh - 120px);
  td {
    position: relative;
    &.align-left {
      padding-left: 15px !important;
    }
    div.rule-name {
      position: absolute;
      left: 15px;
      right: 15px;
      line-height: 30px;
      top: 0;
      bottom: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span.disable {
      color: #999;
      cursor: default;
      :hover{
        font-weight: normal;
      }
    }
    span.enabled{
      display: inline-block;
      width: 52px;
      text-align: center;
    }
  }
  .operate-text {
    margin-right: 5px;
    cursor: pointer;
    color: #1db38b;
    &:hover {
      font-weight: bold;
    }
  }
}
`