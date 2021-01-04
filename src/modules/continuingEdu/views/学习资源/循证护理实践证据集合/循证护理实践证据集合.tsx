import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button, Input, message, Modal } from 'antd'
import { Place } from 'src/components/common'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { localityService } from './api/LocalityService'
import { fileDownload, getFilePrevImg } from 'src/utils/file/file'

export interface Props { }

export default function 循证护理实践证据集合() {
  const [query, setQuery] = useState({
    keyWord: '',
    status: '',
    pageSize: 20,
    pageIndex: 1,
  })

  const [tableData, setTableData] = useState([] as any[])

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
      title: '名称',
      dataIndex: 'title',
      align: "left",
      render: (text: any, record: any, index: number) => {
        if (record.articleUrl)
          return <a
            target="_blank"
            href={record.articleUrl}
            title={record.articleUrl}>
            {text}
          </a>
        else
          return <div>{text}</div>
      }
    },
    {
      title: '学习附件',
      dataIndex: 'attachment',
      align: "left",
      width: 200,
      render: (obj: any, record: any, index: number) => {
        if (obj.id)
          return <div
            className="download-item"
            title={`下载 ${obj.name}`}
            onClick={() => handleDownload(obj)}>
            <img
              className="file-icon"
              src={getFilePrevImg(obj.path)} />
            {obj.name}
          </div>
        else
          return <span></span>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: "center",
      width: 80,
      render: (status: number) => {
        switch (status) {
          case 0:
            return '保存'
          case 1:
            return '发布'
          default:
            return ''
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: "center",
      width: 100,
      render: (text: any, record: any, index: number) => {
        return <DoCon>
          <span onClick={() => handleEdit(record)}>编辑</span>
          <span onClick={() => handleDelete(record)}>删除</span>
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

  const handleEdit = (record: any) => {

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

  const handleDownload = (obj: any) => {
    console.log(obj)
    let a = document.createElement("a");
    let href = obj.path // 创建链接对象
    a.href = href
    a.target = '_blank'
    a.download = obj.name // 自定义文件名
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(href)
    document.body.removeChild(a)// 移除a元素
  }

  useEffect(() => {
    getTableData(query)
  }, [query])

  const handleSearch = () => {
    setQuery({ ...query, pageIndex: 1 })
  }

  const handleAdd = () => {

  }

  return <Wrapper>
    <HeaderCon>
      <Title>循证护理实践证据集合</Title>
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
      <Button className="sub" onClick={handleAdd}>添加</Button>
    </HeaderCon>
    <MainCon>
      <BaseTable
        surplusHeight={235}
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
    </MainCon>
  </Wrapper>
}

const Wrapper = styled.div`
  padding: 15px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .download-item{
    cursor: pointer;
    color: #00A680;
    word-break: break-all;
  }
  .file-icon{
    width: 12px; 
    vertical-align: middle;
    margin-right: 5px;
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