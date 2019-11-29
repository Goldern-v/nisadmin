import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { Button, Input, message as Message, Modal, message } from 'antd'
import { appStore, authStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import { ColumnProps } from 'antd/lib/table'
import BaseTable, { DoCon } from 'src/components/BaseTable'
// import DeptSelect from 'src/components/DeptSelect'
import { qcCheckContentSettingService } from './api/QcCheckContentSettingService'

import QcCheckContentSettingEditModal from './components/QcCheckContentSettingEditModal'

// const api = new DeptFielShareService()

export interface Props extends RouteComponentProps { }

export default observer(function QcCheckContentSetting() {
  const { history } = appStore
  const [qcContent, setQcContent] = useState([] as any)
  const [editIdx, setEditIdx] = useState(-1)
  const [editParams, setEditParams] = useState({} as any)

  const [tableLoading, setTableLoading] = useState(false)

  const [editModalVisible, setEditModalVisible] = useState(false)

  const wardCode = authStore.selectedDeptCode

  useEffect(() => {
    getQcContent()
  }, [])

  const seIndexNo = (index: number, record: any) => {
    setEditIdx(-1)
    let newArr = qcContent.concat()
    if (newArr[index].indexNo == newArr[index].defaultIndexNo) return

    let params = {
      ...newArr[index]
    }

    params.oldItemCode = params.itemCode

    setTableLoading(true)

    qcCheckContentSettingService.saveOrUpdate(params).then(
      (res) => {
        setTableLoading(false)
        if (res.code == '200') Message.success('修改成功')
      },
      (err) => {
        setTableLoading(false)
      }
    )
  }

  const handleOpenEdit = (record: any) => {
    setEditParams({ ...record })
    setEditModalVisible(true)
  }

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        qcCheckContentSettingService
          .delete(record)
          .then((res) => {
            if (res.code == 200) {
              Message.success('删除成功')
              getQcContent()
            } else {
              Message.error('删除失败')
            }
          })
      }
    })
  }

  const columns: ColumnProps<any>[] = [
    {
      title: '序号',
      key: 'indexNo',
      dataIndex: 'indexNo',
      width: 50,
      align: 'center',
    },
    {
      title: '质控内容',
      key: 'itemName',
      dataIndex: 'itemName',
      align: 'left'
    },
    {
      title: '操作',
      key: 'operation',
      width: 100,
      align: 'center',
      render: (text: string, record: any) => {
        return (
          <DoCon className='operation'>
            <span onClick={() => handleOpenEdit(record)}>编辑</span>
            <span
              onClick={() => {
                handleDelete(record)
              }}
            >
              删除
            </span>
          </DoCon>
        )
      }
    }
  ]

  const getQcContent = (_deptCode?: any) => {
    setTableLoading(true)
    qcCheckContentSettingService.getList(wardCode)
      .then(res => {
        setTableLoading(false)
        if (res.data) setQcContent(res.data.map((item: any) => {
          return {
            ...item,
            defaultIndexNo: item.indexNo
          }
        }))
      }, err => setTableLoading(false))
  }

  const handleAdd = () => {
    setEditParams({
      "dictCode": "qc_ward_check_content",
      "wardCode": "",
      "itemCode": "",
      "groupCode": "qc",
      "itemName": "",
      "expand1": "",
      "expand2": "",
      "indexNo": ''
    })

    setEditModalVisible(true)
  }

  const handleCancel = () => {
    setEditModalVisible(false)
  }

  const handleOk = () => {
    getQcContent()
    handleCancel()
  }

  const handleExChange = (dragIndex: number, hoverIndex: number) => {
    let item1 = { ...qcContent[dragIndex] }
    item1.oldItemCode = item1.itemCode
    let item2 = { ...qcContent[hoverIndex] }

    let indexNo1 = item1.indexNo
    let indexNo2 = item2.indexNo

    item1.indexNo = indexNo2
    item2.indexNo = indexNo1

    setTableLoading(true)

    Promise.all([
      qcCheckContentSettingService.saveOrUpdate(item1),
      qcCheckContentSettingService.saveOrUpdate(item2),
    ])
      .then(res => {
        getQcContent()
        message.success('修改成功')
      }, () => setTableLoading(false))
  }

  // const handleDeptChange = (deptCode: any) => {
  //   setDeptCode(deptCode)
  //   getQcContent(deptCode)
  // }

  return (
    <Wrapper>
      <div className='topbar'>
        <div className='float-left'>
          <div className='item title'>质控内容设置</div>
        </div>
        <div className='float-right'>
          <div className='item'>
            <Button onClick={handleAdd}>添加</Button>
          </div>
          <div className='item'>
            <Button onClick={() => history.goBack()}>返回</Button>
          </div>
        </div>
        <div className='item dept-select'>
          {/* <DeptSelect onChange={handleDeptChange} /> */}
        </div>
      </div>
      <div className='main-contain'>
        <BaseTable
          type={['diagRow']}
          moveRow={(dragIndex: number, hoverIndex: number) => {
            try {
              handleExChange(dragIndex, hoverIndex)
            } catch (e) {
              // console.log('拖拽错误')
            }
          }}
          columns={columns}
          loading={tableLoading}
          surplusHeight={215}
          dataSource={qcContent} />
      </div>
      <QcCheckContentSettingEditModal
        qcContentLength={qcContent.length}
        visible={editModalVisible}
        params={editParams}
        onCancel={handleCancel}
        onOk={handleOk}
        deptCode={wardCode}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  position: relative;
  padding-top: 55px;
  height: 100%;
  width: 100%;
  background: #fff;

  div.topbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;
    height: 55px;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    .float-left {
      float: left;
    }

    .float-right {
      float: right;
    }

    .item {
      display: inline-block;
      margin-right: 10px;
      &.title {
        vertical-align: middle;
        line-height: 35px;
        font-size: 16px;
        font-weight: bold;
      }
      &.type-select {
        margin-left: 50px;
        .ant-select {
          min-width: 120px;
        }
      }
      &.dept-select {
        display: none;
      }
      & > div {
        display: inline-block;
        vertical-align: middle;
      }
      .label {
      }
      .content {
      }
    }
  }

  .main-contain {
    height: 100%;
    width: 500px;
    .operation {
      .disabled {
        color: #aaa;
        cursor: not-allowed;
        :hover {
          font-weight: normal;
        }
      }
    }
  }
`
