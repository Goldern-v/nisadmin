import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Modal, Input } from 'antd'
import BaseTable from 'src/components/BaseTable'
import emitter from 'src/libs/ev'
import { arrangeService } from '../../../services/ArrangeService'
import { selectViewModal } from '../../../viewModal/SelectViewModal';


export interface Props {}

export default function ExpectSetting() {
  const [editingKey, setEditingKey] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)
  const [tableData, setTableData] = useState([])


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
      dataIndex: 'cz',
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

  const getMealList = () =>{
    let obj = {
      startTime: selectViewModal.params.startTime,
      endTime: selectViewModal.params.endTime,
      deptCode: selectViewModal.params.deptCode
    }
    setLoadingTable(true)
    arrangeService.getByDeptCodeAndDate(obj).then((res) => {
      setLoadingTable(false)
      let array: any = []
      res.data.schExpects &&
        res.data.schExpects.length &&
        res.data.schExpects.map((item: any, i: any) => {
          item.key = i
          array.push(item)
        })
      setTableData(array)
    })
  }

  useEffect(() => {
    getMealList()
  }, [])



  /** 监听事件 --- 控制添加弹窗的状态*/
  emitter.removeAllListeners('期望排班设置')
  emitter.addListener('期望排班设置', () => {
    setEditingKey(true)
  })

  const handleOk = () =>{
  }
  return (
    <Wrapper>
        <Modal
          className='modal'
          centered={true}
          title='期望排班'
          width='800px'
          okText='全部填入'
          cancelText='返回'
          visible={editingKey}
          onCancel={() => {
            setEditingKey(false)
          }}
          onOk={handleOk}
          // confirmLoading={confirmLoading}
        >
          <BaseTable
            dataSource={tableData}
            columns={columns}
            loading={loadingTable}
          />
        </Modal>
    </Wrapper>
  )
}

const Wrapper = styled.div`
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
