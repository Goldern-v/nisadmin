import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Input } from 'antd'
import BaseTable from 'src/components/BaseTable'
import emitter from 'src/libs/ev'
import { arrangeService } from '../services/ArrangeService'
import { selectViewModal } from '../viewModal/SelectViewModal'
import { ModalComponentProps } from 'src/libs/createModal'

export interface Props extends ModalComponentProps {
  id: string
}

export interface Props {}

export default function ExpectSettingModal(props: Props) {
  // const [editingKey, setEditingKey] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)
  const [tableData, setTableData] = useState([])
  const [effect, setEffect] = useState(true)
  let { visible, onCancel } = props

  const onFieldChange = () => {}
  const onOk = () => {
    onCancel()
  }

  const columns: any = [
    {
      title: '排班日期',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 100,
      align: 'center',
      marginLeft: '20px'
    },
    {
      title: '内容',
      dataIndex: 'rangeName',
      key: 'rangeName',
      width: 150,
      align: 'center'
    },
    {
      title: '期望班次',
      dataIndex: 'shiftType',
      key: 'shiftType',
      width: 150,
      align: 'center'
    },
    {
      title: '原因',
      dataIndex: 'detail',
      key: 'detail',
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '操作',
      key: '8',
      width: 100,
      align: 'center',
      render: (a: any, b: any, c: any) => {
        const DoCon = styled.div`
          display: flex;
          justify-content: space-around;
          font-size: 12px;
          color: ${(p) => p.theme.$mtc};
        `
        return (
          <DoCon>
            <span>填入</span>
          </DoCon>
        )
      }
    }
  ]

  const getMealList = () => {
    if (effect) {
      let obj = {
        startTime: selectViewModal.params.startTime,
        endTime: selectViewModal.params.endTime,
        deptCode: selectViewModal.params.deptCode
      }
      setLoadingTable(true)
      arrangeService.getByDeptCodeAndDate(obj).then((res) => {
        setLoadingTable(false)
        let array: any = []
        res.data &&
          res.data.length &&
          res.data.map((item: any, i: any) => {
            let data = {
              key: i + 'abc',
              startDate: item.schExpects[0] ? item.schExpects[0].startDate : '',
              rangeName: item.schExpects[0] ? item.schExpects[0].rangeName : '',
              shiftType: item.schExpects[0] ? item.schExpects[0].shiftType : '',
              detail: item.schExpects[0] ? item.schExpects[0].detail : ''
            }
            array.push(data)
          })
        setTableData(array)
      })
    }
  }

  useEffect(() => {
    setEffect(true)
    getMealList()
  }, [])

  useLayoutEffect(() => {
    setEffect(false)
  }, [])

  const handleOk = () => {}
  return (
    <Wrapper>
      <Modal
        className='modal'
        title='期望排班'
        width='800px'
        okText='全部填入'
        cancelText='返回'
        onOk={handleOk}
        visible={visible}
        onCancel={onCancel}
        forceRender
      >
        <BaseTable dataSource={tableData} columns={columns} loading={loadingTable} wrapperStyle={{ padding: 0 }} />
      </Modal>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  #baseTable {
    padding: 0px 0px !important;
  }
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
