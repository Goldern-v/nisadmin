import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Modal, Table } from 'antd'
import { arrangeService as api } from '../services/ArrangeService'

interface Props {
  visible: boolean
  modalData: any[]
  onOk: Function
  onCancel: Function
}

export default observer((props: Props) => {
  const { visible, modalData, onOk, onCancel } = props
  const [columns, setColumns]: any[] = useState([])
  const [tableData, setTableData]: any[] = useState([])

  const defaultColumns = [
    {
      title: '工号',
      dataIndex: 'empNo',
      key: 'empNo',
      align: 'center',
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      key: 'empName',
      align: 'center',
    },
    {
      title: '职称',
      dataIndex: 'newTitle',
      key: 'newTitle',
      align: 'center',
    }
  ]

  const statusData = () => {
    let _columnsList: any[] = []
    const _tableDataList: any[] = []
    modalData.forEach((item: any, index: number) => {
      const dtos = item.settingDtos.map((setItem: any, setIndex: number) => {
        return {
          workDate: setItem.workDate,
          rangeName: setItem.rangeName
        }
      })
      _columnsList = [
        ...defaultColumns,
        ...dtos.map((i: any) => {
          return {
            align: 'center',
            title: i.workDate,
            dataIndex: i.workDate,
            key: i.workDate,
          }
        }),
        {
          title: '备注',
          dataIndex: 'description',
          key: 'description',
          align: 'center',
        },
      ]
      const _tableData = {
        empNo: item.empNo,
        empName: item.empName,
        newTitle: item.newTitle,
        description: item.description,
        ...dtos.reduce((acc: object, cur: any) => {
          return {
            ...acc,
            [cur.workDate]: cur.rangeName
          }
        }, {})
      }
      _tableDataList.push(_tableData)
    })
    setColumns(_columnsList)
    setTableData(_tableDataList)
  }

  const handleOk = async () => {
    await api.handleSave({ setting: modalData })
    onOk()
  }

  useEffect(() => {
    if (visible) {
      statusData()
    }
  }, [visible])

  return (
    <Modal
      title="模板导入"
      visible={visible}
      onOk={() => handleOk()}
      onCancel={() => onCancel()}
      width={1200}
    >
      <Wrapper>
        <Table bordered={true} dataSource={tableData} columns={columns}/>;
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
`