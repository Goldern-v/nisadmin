import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import emitter from 'src/libs/ev'
import BaseTable from 'src/components/BaseTable'
import { Transfer, Modal, Input, message } from 'antd'
import service from 'src/services/api'
import { scheduleStore } from 'src/stores'
import { Record } from '_immutable@4.0.0-rc.12@immutable'
export interface Props extends RouteComponentProps {}

export default function MainBox() {
  const [loadingTable, setLoadingTable] = useState(false)
  const [tableData, setTableData] = useState([] as any[])
  const [editingKey, setEditingKey] = useState(false)
  const [mockData, setMockData] = useState([] as any[])
  const [targetKeys, setTargetKeys] = useState([] as any[])
  const [selectedKeys, setSelectedKeys] = useState([] as any[])
  const [groupName, setGroupName] = useState('')
  const [id, setId] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [lazyLoading, setLazyLoading] = useState(false)

  // 表格
  const columns: any = [
    {
      title: '序号',
      dataIndex: '1',
      key: '1',
      render: (text: any, record: any, index: number) => index + 1,
      align: 'center',
      width: 5
    },
    {
      title: '分组名称',
      dataIndex: 'groupName',
      key: 'groupName',
      width: 30,
      align: 'left'
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '操作',
      width: 8,
      align: 'center',
      render: (text: any, record: any) => {
        return (
          <Wrapper>
            <a onClick={() => handleDelete(record)} style={{ marginLeft: '15px', fontSize: '13px', margin: 'auto' }}>
              删除
            </a>
          </Wrapper>
        )
      }
    }
  ]

  //获取人员分组列表
  const getMealList = () => {
    setLoadingTable(true)
    let deptCode = scheduleStore.getDeptCode()
    service.personnelSettingApiService.getByDeptCode(deptCode).then((res) => {
      setLoadingTable(false)
      setTableData(res.data)
    })
  }

  //保存
  const handleOk = () => {
    const data = {
      deptCode: scheduleStore.getDeptCode(), //string 科室
      groupName: groupName //string 分组名称
    }
    if (!groupName) {
      message.warning('保存前请先填写分组名称')
      return
    }
    setConfirmLoading(true)
    service.personnelSettingApiService.updatePersonnelSetting(data).then((res) => {
      if (res) {
        setConfirmLoading(false)
        getMealList()
        setEditingKey(false)
        setGroupName('')
        message.success('添加成功')
      }
    })
  }

  //删除
  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除该分组?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        service.personnelSettingApiService.deletePersonnelSetting(record).then((res) => {
          getMealList()
          message.success('删除成功')
        })
      }
    })
  }

  //获取分组已选人员
  const selectedScheduler = (record?: any) => {
    let id = record.id
    setLazyLoading(true)
    service.personnelSettingApiService.getById(id).then((res) => {
      setLazyLoading(false)
      setTargetKeys(res.data)
      console.log('targetKeys:', res.data)
    })
  }

  //获取分组可选人员(修改代码)
  const selectSchedulers = (record?: any) => {
    let deptCode = scheduleStore.getDeptCode()
    let id = record.id
    let targetKeysArr: any = []
    let mockDataArr: any = []
    setLazyLoading(true)
    service.personnelSettingApiService.getScheduler(deptCode).then((res) => {
      setLazyLoading(false)
      let array: any = {}
      res.data.length > 0 &&
        res.data.map((item: any, i: any) => {
          array = {
            key: i.toString(),
            chosen: Math.random() * 2 > 1,
            schSettingNurseGroupId: id,
            empName: item.empName,
            empNo: item.empNo
          }
          if (array.chosen) {
            targetKeysArr.push(array.key)
          }
          mockDataArr.push(array)
        })
      console.log('array:', array)
      setMockData(mockDataArr)
      setTargetKeys(targetKeysArr)
    })
  }

  //获取分组可选人员
  const selectScheduler = (record?: any) => {
    let deptCode = scheduleStore.getDeptCode()
    let id = record.id
    setLazyLoading(true)
    service.personnelSettingApiService.getScheduler(deptCode).then((res) => {
      setLazyLoading(false)
      let array: any = []
      res.data.length > 0 &&
        res.data.map((item: any, i: any) => {
          array.push({
            key: i.toString(),
            schSettingNurseGroupId: id,
            empName: item.empName,
            empNo: item.empNo
          })
        })
      setMockData(array)
    })
  }

  //表格行操作
  const selectRow = (record: any) => {
    selectedScheduler(record)
    selectScheduler(record)
    setId(record.id)
  }

  useEffect(() => {
    getMealList()
  }, [])

  // 新增或修改分组中的人员
  const handleChange = (targetKeys: any, direction: any, moveKeys: any) => {
    setTargetKeys(targetKeys)
    let array = moveKeys.map((item: any) => mockData.filter((v: any) => item === v.key)[0])
    let params = {
      schSettingNurseGroupId: id,
      schSettingNurseGroupDetail: array
    }
    console.log(moveKeys, 'moveKeys', array)
    service.personnelSettingApiService
      .updateSavePersonnelSetting(params)
      .then((res) => {
        message.success('操作成功！')
      })
      .catch(() => {
        message.error('操作失败！')
      })
  }

  const handleSelectChange = (sourceSelectedKeys: any, targetSelectedKeys: any) => {
    let array: any = [...sourceSelectedKeys, ...targetSelectedKeys]
    setSelectedKeys(array)
    console.log('setSelectedKeys:', selectedKeys)
  }

  const renderItem = (item: any) => {
    const customLabel = <span className='custom-item'>{item.empName}</span>
    return {
      label: customLabel,
      value: item.empName
    }
  }

  /** 监听事件 --- 控制添加弹窗的状态*/
  emitter.removeAllListeners('添加人员分组')
  emitter.addListener('添加人员分组', () => {
    setEditingKey(true)
  })

  /** 监听事件 --- 控制刷新状态*/
  emitter.removeAllListeners('刷新人员分组')
  emitter.addListener('刷新人员分组', () => {
    getMealList()
    setTargetKeys([])
    setMockData([])
  })

  return (
    <Wrapper>
      <BaseTableBox>
        <BaseTable
          columns={columns}
          surplusHeight={155}
          dataSource={tableData}
          loading={loadingTable}
          rowClassName={(record) => {
            return record.id === id ? 'background' : 'cursorPointer'
          }}
          onRow={(record) => {
            return {
              onClick: (event: any) => {
                selectRow(record)
              }
            }
          }}
        />
      </BaseTableBox>
      <TransferBox>
        <TitleCon>本科室成员名单：</TitleCon>
        <Transfer
          className='transfer'
          dataSource={mockData}
          listStyle={{
            width: '46%',
            height: 'calc(100vh - 187px)'
          }}
          locale={{
            itemUnit: '人',
            itemsUnit: '人'
          }}
          titles={['可选成员', '已选成员']}
          selectedKeys={selectedKeys}
          targetKeys={targetKeys}
          onChange={handleChange}
          onSelectChange={handleSelectChange}
          render={renderItem}
          lazy={lazyLoading}
        />
        <Modal
          className='modal'
          centered={true}
          title='添加分组'
          width='600px'
          okText='保存'
          cancelText='返回'
          visible={editingKey}
          onCancel={() => {
            setEditingKey(false)
          }}
          onOk={handleOk}
          confirmLoading={confirmLoading}
        >
          <div className='category' style={{ marginTop: '50px', marginBottom: '60px' }}>
            <SpanOne>分组名称：</SpanOne>
            <Input
              style={{ width: '72%' }}
              value={groupName}
              defaultValue=''
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
        </Modal>
      </TransferBox>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  .cursorPointer {
    cursor: pointer;
  }
  .background {
    cursor: pointer;
    background: #d4e5dd !important;
  }
`
const BaseTableBox = styled.div`
  flex: 1;
`
const TransferBox = styled.div`
  flex: 1;
  padding: 15px;
  box-sizing: border-box;
`
const TitleCon = styled.div`
  height: 35px;
  font-weight: 900;
  font-size: 16px;
`
const SpanOne = styled.span`
  display: inline-block;
  width: 75px;
  text-align: justify;
  margin-left: 35px;
`
