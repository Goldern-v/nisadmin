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
import typeList from './utils/typeList'
import { fileDownload, getFilePrevImg, getFileType } from 'src/utils/file/file'
import ReactZmage from 'react-zmage'
import PreviewModal from 'src/utils/file/modal/PreviewModal'
import createModal from 'src/libs/createModal'

const Option = Select.Option

export interface Props { }

export default function 护理专栏() {
  const { history } = appStore
  const [query, setQuery] = useState({
    keyWord: '',
    status: '',
    type: 1,
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
      title: '名称',
      dataIndex: 'name',
      width: 220,
      align: "left",
      render: (text: any, record: any, index: number) => {
        return <div className="">{text}</div>
      }
    },
    {
      title: '介绍',
      dataIndex: 'briefIntroduction',
      align: "left",
      render: (text: any, record: any, index: number) => {
        return <div className="">{text}</div>
      }
    },
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
    setLoading(true)
    localityService.queryPageList(newQuery)
      .then(res => {
        if (res.data) {
          setTotalCount(res.data.totalCount)
          setTableData(res.data.list)
        }
      }, () => { })
      .finally(() => setLoading(false))
  }

  const handleDetail = (record: any) => {
    history.push(`/continuingEdu/护理专栏详情?id=${record.id}&title=${record.name}`)
  }

  const handleEdit = (record: any) => {
    if (record.id)
      history.push(`/continuingEdu/护理专栏修改?id=${record.id}`)
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
    history.push('/continuingEdu/护理专栏修改')
  }

  const handleTypeChange = (key: any) => {
    let newQuery = { ...query, pageIndex: 1, type: key }

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
      <Title>护理专栏</Title>
      <Place />
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
        config={typeList.map((item: any) => {
          return {
            title: item.name,
            component: TableCon,
            index: item.type
          }
        })}
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