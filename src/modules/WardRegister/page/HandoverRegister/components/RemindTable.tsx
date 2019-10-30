import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

import { ColumnProps, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { wardRegisterService } from 'src/modules/WardRegister/services/WardRegisterService'
import { authStore } from 'src/stores'
import emitter from 'src/libs/ev'
import { globalModal } from 'src/global/globalModal'
import update from 'immutability-helper'
export interface Props {
  editHandoverModal: any
}

export default function RemindTable(props: Props) {
  const { editHandoverModal } = props
  const [oldData, setOldData]: any = useState({})
  const [dataSource, setDataSource]: any[] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const columns: ColumnProps<any>[] = [
    {
      title: '交接班次',
      dataIndex: 'itemCode',
      align: 'center',
      width: 150
    },
    {
      title: '关联任务提醒',
      dataIndex: 'vsRange',
      width: 100
    },
    {
      title: ' 操作 ',
      width: 80,
      render(text: string, record: any, index: number) {
        return (
          <DoCon>
            <span
              onClick={() => {
                editHandoverModal.show({
                  oldData: record
                })
              }}
            >
              编辑
            </span>
            <span
              onClick={() => {
                globalModal.confirm('删除确认', '你确定删除该配置项吗？').then((res) => {
                  delRow(index)
                  message.success('删除成功')
                  onSave()
                })
              }}
            >
              删除
            </span>
          </DoCon>
        )
      }
    }
  ]

  const updateDataSource = () => {
    setDataSource([...dataSource])
  }

  const delRow = (index: number) => {
    dataSource.splice(index, 1)
    updateDataSource()
  }
  const addRow = () => {
    dataSource.push({})
    updateDataSource()
  }

  useEffect(() => {
    emitter.removeAllListeners('saveRemind')
    emitter.addListener('saveRemind', (newObj: any) => {
      onSave(newObj)
    })

    return () => {
      emitter.removeAllListeners('saveRemind')
    }
  })

  const onLoad = () => {
    setPageLoading(true)
    wardRegisterService
      .qcRegisterRangeGetList({ wardCode: authStore.selectedDeptCode, recordCode: 'qc_register_handover' })
      .then((res) => {
        setPageLoading(false)
        setDataSource(res.data.itemList)
        setOldData(res.data)
      })
  }
  const onSave = (newObj?: any) => {
    setPageLoading(true)
    wardRegisterService
      .qcRegisterRangeSaveOrUpdate(
        Object.assign({}, oldData, { itemList: newObj ? [...dataSource, newObj] : dataSource })
      )
      .then((res) => {
        message.success('保存成功')
        onLoad()
      })
  }

  useEffect(() => {
    onLoad()
  }, [])

  return (
    <Wrapper>
      <EditTableCon>
        <BaseTable
          loading={pageLoading}
          dataSource={dataSource}
          columns={columns}
          // type={['index', 'diagRow']}
          type={['index']}
          surplusHeight={260}
          // moveRow={(dragIndex: number, hoverIndex: number) => {
          //   const dragRow = dataSource[dragIndex]
          //   setDataSource(
          //     update(dataSource, {
          //       $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
          //     })
          //   )
          // }}
        />
      </EditTableCon>
    </Wrapper>
  )
}
const Wrapper = styled.div``
const EditTableCon = styled.div`
  width: 800px;
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover {
    background: #fff !important;
    > td {
      background: #fff !important;
    }
  }
  .input-cell {
    padding: 0 !important;
    input {
      position: relative;
      z-index: 1000;
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: 0;
      box-shadow: none;
      outline: none;
      text-align: center;
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
    }
  }
`
