import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { createContextMenu } from './ContextMenu'
import Cell from './Cell'
import { sheetViewModal } from '../../viewModal/SheetViewModal'
import moment from 'moment'
import { getWeekString, getWeekString2 } from 'src/utils/date/week'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import createModal from 'src/libs/createModal'
import EditEffectiveTimeModal from '../../modal/EditEffectiveTimeModal'
export interface Props {
  /** 编辑模式 */
  isEdit: boolean
  surplusHeight: number
}

export default observer(function ArrangeSheet(props: Props) {
  let { isEdit, surplusHeight } = props
  let contextMenu = createContextMenu()
  let editEffectiveTimeModal = createModal(EditEffectiveTimeModal)
  let columns: ColumnProps<any>[] = [
    {
      title: '序号',
      render: (text: string, row: any, index: number) => index + 1,
      fixed: 'left',
      width: 80,
      align: 'center'
    },
    {
      title: '工号',
      dataIndex: 'empNo',
      width: 80,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      width: 80,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '层级',
      dataIndex: 'nurseHierarchy',
      width: 80,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '职称',
      dataIndex: 'newTitle',
      width: 80,
      fixed: 'left',
      align: 'center'
    },
    ...sheetViewModal.dateList.map((date, index) => {
      return {
        title: <Th date={date} />,
        width: 80,
        render(text: any, record: any) {
          return (
            <Cell
              contextMenu={contextMenu}
              editEffectiveTimeModal={editEffectiveTimeModal}
              dataSource={record}
              index={index}
            />
          )
        }
      }
    }),
    {
      title: (
        <div>
          <div>工时小计</div>
          <div>（小时）</div>
        </div>
      ),
      width: 80
      // fixed: 'right'
    },
    {
      title: (
        <div>
          <div>夜小时数</div>
          <div>（小时）</div>
        </div>
      ),
      width: 80
      // fixed: 'right'
    },
    {
      title: (
        <div>
          <div>累计结余</div>
          <div>（小时）</div>
        </div>
      ),
      width: 80
      // fixed: 'right'
    }
  ]

  useLayoutEffect(() => {
    try {
      ;(document as any)
        .getElementById('baseTable')!
        .querySelector('.ant-table-fixed-left .ant-table-body-inner table.ant-table-fixed')!.style.marginBottom =
        (document as any).getElementById('baseTable')!.querySelector('.ant-table-footer')!.offsetHeight + 'px'
    } catch (error) {
      console.log('同步备注滚动报错')
    }
  })

  return (
    <Wrapper className={classNames({ isEdit })}>
      <div onClick={() => editEffectiveTimeModal.show()}>测试</div>
      <BaseTable
        surplusHeight={surplusHeight}
        surplusWidth={200}
        columns={columns}
        // fixedFooter={true}
        dataSource={sheetViewModal.sheetTableData}
        footer={() => {
          return <div>排班备注：</div>
        }}
      />
      <contextMenu.Component />
      <editEffectiveTimeModal.Component />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  /** fix table scroll bug */
  div.ant-table-body {
    background: #fafafa !important;
  }
  tbody.ant-table-tbody {
    background: #fff;
  }
  .ant-table-footer {
    border: 0 !important;
  }
  &.isEdit {
    .ant-table-fixed-left {
      td {
        background: #f8f8f8 !important;
      }
    }
  }
`

function Th(props: { date: string }) {
  let date = props.date
  const Con = styled.div`
    text-align: center;
    padding: 5px 0;
    &.red-text {
      color: red;
    }
  `
  return (
    <Con
      className={
        getWeekString2(date).indexOf('六') > -1 || getWeekString(date).indexOf('日') > -1 ? 'red-text' : undefined
      }
    >
      <div>{moment(date).format('MM-DD')}</div>
      <div>{getWeekString2(date)}</div>
    </Con>
  )
}
