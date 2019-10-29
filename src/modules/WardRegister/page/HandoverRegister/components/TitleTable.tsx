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
export interface Props {}

export default function TitleTable() {
  const [oldData, setOldData]: any = useState({})
  const [dataSource, setDataSource]: any[] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const columns: ColumnProps<any>[] = [
    {
      title: '项目名称',
      dataIndex: 'itemCode',
      align: 'center',
      className: 'input-cell',
      width: 150,
      render(text: any, record: any, index: any) {
        return (
          <input
            onChange={(e) => {
              record.itemCode = e.target.value
            }}
            defaultValue={text}
            onBlur={() => updateDataSource()}
          />
        )
      }
    },
    {
      title: '列宽度',
      dataIndex: 'width',
      className: 'input-cell',
      width: 100,
      render(text: any, record: any, index: any) {
        return (
          <input
            defaultValue={text}
            onChange={(e) => {
              if (
                !Number(e.target.value) &&
                Number(e.target.value) !== 0 &&
                e.target.value[e.target.value.length - 1] !== '.'
              ) {
                return message.warning('只能输入数字')
              }
              record.width = e.target.value
            }}
            onBlur={() => updateDataSource()}
          />
        )
      }
    },
    {
      title: '基数',
      width: 100,
      dataIndex: 'checkSize',
      className: 'input-cell',
      render(text: any, record: any, index: any) {
        return (
          <input
            defaultValue={text}
            onChange={(e) => {
              if (
                !Number(e.target.value) &&
                Number(e.target.value) !== 0 &&
                e.target.value[e.target.value.length - 1] !== '.'
              ) {
                return message.warning('只能输入数字')
              }
              record.checkSize = e.target.value
            }}
            onBlur={() => updateDataSource()}
          />
        )
      }
    },
    {
      title: '下拉选项预设值(值之前用;隔开)',
      dataIndex: 'options',
      width: 300,
      className: 'input-cell',
      render(text: any, record: any, index: any) {
        return (
          <input
            defaultValue={text}
            onChange={(e) => {
              record.options = e.target.value
            }}
            onBlur={() => updateDataSource()}
          />
        )
      }
    },
    {
      title: ' 操作 ',
      width: 80,
      render(text: string, record: any, index: number) {
        return (
          <DoCon>
            <span
              onClick={() => {
                globalModal.confirm('删除确认', '你确定删除该配置项吗？').then((res) => {
                  delRow(index)
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
    emitter.removeAllListeners('addRegisterItemRow')
    emitter.removeAllListeners('saveRegisterItem')
    emitter.addListener('addRegisterItemRow', () => {
      addRow()
    })
    emitter.addListener('saveRegisterItem', () => {
      onSave()
    })
    return () => {
      emitter.removeAllListeners('addRegisterItemRow')
      emitter.removeAllListeners('saveRegisterItem')
    }
  })

  const onLoad = () => {
    setPageLoading(true)
    wardRegisterService
      .getCurrentList({ wardCode: authStore.selectedDeptCode, recordCode: 'qc_register_handover' })
      .then((res) => {
        setPageLoading(false)
        setDataSource(res.data.itemList)
        setOldData(res.data)
      })
  }
  const onSave = () => {
    setPageLoading(true)
    wardRegisterService.qcRegisterItemSaveOrUpdate(Object.assign({}, oldData, { itemList: dataSource })).then((res) => {
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
