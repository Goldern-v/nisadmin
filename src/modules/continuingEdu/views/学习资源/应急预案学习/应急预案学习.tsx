import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Icon, Input, message, Modal, Select } from 'antd'
import { Place } from 'src/components/common'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import BaseTabs from "src/components/BaseTabs"
import { ColumnProps } from 'antd/lib/table'
import { localityService } from './api/LocalityService'
import { appStore, authStore } from 'src/stores'
import Axios from 'axios'
import { fileDownload, getFilePrevImg, getFileType } from 'src/utils/file/file'
import ReactZmage from 'react-zmage'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import createModal from 'src/libs/createModal'

const Option = Select.Option

export interface Props { }

export default function 应急预案学习() {
  const { history, queryObj, match } = appStore
  const [query, setQuery] = useState({
    keyWord: '',
    status: '',
    type: queryObj.activeTabIdx || '1',
    deptCode: '',
    pageSize: 20,
    pageIndex: 1,
  })

  const [tableData, setTableData] = useState([] as any[])

  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const previewModal = createModal(PreviewModal)

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
      title: '预案名称',
      dataIndex: 'planName',
      width: 220,
      align: "left",
      render: (text: any, record: any, index: number) => {
        return <div className="">{text}</div>
      }
    },
    {
      title: '预案信息',
      dataIndex: 'briefIntroduction',
      align: "left",
      render: (text: any, record: any, index: number) => {
        return <div className="">{text}</div>
      }
    },
    ...(() => {
      if (query.type == '2')
        return [
          {
            title: '科室',
            dataIndex: 'deptName',
            align: "center",
            width: 200
          } as ColumnProps<any>
        ]

      return []
    })(),
    {
      title: '学习附件',
      dataIndex: 'attachment',
      align: "left",
      width: 200,
      render: (obj: any, record: any, index: number) => {
        if (obj && obj.id)
          return <div
            className="file-item" >
            <span
              className="preview"
              title={`预览 ${obj.name}`}
              onClick={() => handlePreview(obj)}>
              <img
                className="file-icon"
                src={getFilePrevImg(obj.path)} />
              <span>{obj.name}</span>
            </span>
            <span
              className="download"
              title={`下载 ${obj.name}`}
              onClick={() => handleDownload(obj)}>
              <Icon type="download" />
            </span>
          </div>
        else
          return <span></span>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: "left",
      width: 80,
      render: (status: number) => {
        switch (status) {
          case 0:
            return '编辑中'
          case 2:
            return '已发布'
          default:
            return ''
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: "center",
      width: 120,
      render: (text: any, record: any, index: number) => {
        return <DoCon>
          <span onClick={() => handleDetail(record)}>查看</span>
          {authStore.isNotANormalNurse && (
            <React.Fragment>
              <span onClick={() => handleEdit(record)}>编辑</span>
              <span onClick={() => handleDelete(record)}>删除</span>
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
    history.replace(`${match.url}?activeTabIdx=${newQuery.type}`)

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
    history.push(`/continuingEdu/应急预案学习详情?id=${record.id}&title=${record.planName}`)
  }

  const handleEdit = (record: any) => {
    if (record.id)
      history.push(`/continuingEdu/应急预案学习修改?id=${record.id}`)
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

  const handlePreview = (file: any) => {
    if (getFileType(file.path) == 'img')
      ReactZmage.browsing({
        backdrop: 'rgba(0,0,0, .8)',
        set: [{ src: file.path }]
      })
    else
      previewModal.show({
        title: file.name,
        path: file.path
      })
  }

  const handleDownload = (obj: any) => {
    Axios.get(obj.path, { responseType: 'blob' })
      .then(res => fileDownload(res, obj.name),
        err => message.error(`${err.name}：${err.message}`)
      )
  }

  useEffect(() => {
    getTableData(query)
  }, [query])

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const handleAdd = () => {
    history.push('/continuingEdu/应急预案学习修改')
  }

  const handleTypeChange = (key: any) => {
    let newQuery = { ...query, pageIndex: 1, type: key }
    if (key == '1') {
      if (authStore.isDepartment)
        newQuery.deptCode = ''
      else
        newQuery.deptCode = authStore.defaultDeptCode
    } else {
      newQuery.deptCode = ''
    }

    setQuery(newQuery)
  }

  const TableCon = <BaseTable
    surplusHeight={280}
    columns={columns}
    dataSource={tableData}
    loading={loading}
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

  return <Wrapper>
    <HeaderCon>
      <Title>应急预案学习</Title>
      <Place />
      {query.type == '2' && (
        <React.Fragment>
          <span className="sub">科室：</span>
          <Select
            value={query.deptCode}
            style={{ width: '180px' }}
            onChange={(deptCode: any) => setQuery({ ...query, deptCode, pageIndex: 1 })}>
            {authStore.isDepartment && <Option value="">全部</Option>}
            {authStore.deptList.map((item: any) => (
              <Option key={item.code} value={item.code}>{item.name}</Option>
            ))}
          </Select>
        </React.Fragment>
      )}
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
      {authStore.isNotANormalNurse && <Button className="sub" onClick={handleAdd}>添加</Button>}
    </HeaderCon>
    <MainCon>
      <BaseTabs
        defaultActiveKey={query.type}
        config={[
          {
            title: "医院应急预案",
            component: TableCon,
            index: '1',
          },
          {
            title: "专科应急预案",
            component: TableCon,
            index: '2',
          }
        ]}
        onChange={(key: any) => handleTypeChange(key)}
      />
    </MainCon>
    <previewModal.Component />
  </Wrapper>
}

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