import styled from 'styled-components'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button } from 'antd'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps, Input } from 'src/vendors/antd'
import { createContextMenu } from './ContextMenu'
import Cell from './Cell'
import { sheetViewModal } from '../../viewModal/SheetViewModal'
import moment from 'moment'
import { getWeekString, getWeekString2 } from 'src/utils/date/week'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import createModal from 'src/libs/createModal'
import EditEffectiveTimeModal from '../../modal/EditEffectiveTimeModal'
import EditVacationCountModal from '../../modal/EditVacationCountModal'
export interface Props {
  /** 编辑模式 */
  isEdit: boolean
  surplusHeight: number
}

export default observer(function ArrangeSheet(props: Props) {
  let { isEdit, surplusHeight } = props
  let contextMenu = createContextMenu()
  let editEffectiveTimeModal = createModal(EditEffectiveTimeModal)
  let editVacationCountModal = createModal(EditVacationCountModal)
  let columns: ColumnProps<any>[] = [
    {
      title: '序号',
      render: (text: string, row: any, index: number) => index + 1,
      fixed: 'left',
      width: 40,
      align: 'center'
    },
    {
      title: '工号',
      dataIndex: 'empNo',
      width: 50,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'empName',
      width: 50,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '层级',
      dataIndex: 'nurseHierarchy',
      width: 40,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '职称',
      dataIndex: 'newTitle',
      width: 70,
      fixed: 'left',
      align: 'center'
    },
    ...sheetViewModal.dateList.map((date, index) => {
      return {
        title: <Th date={date} />,
        width: 70,
        render(text: any, record: any) {
          return (
            <Cell
              contextMenu={contextMenu}
              editEffectiveTimeModal={editEffectiveTimeModal}
              editVacationCountModal={editVacationCountModal}
              dataSource={record}
              index={index}
              isEdit={isEdit}
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
      ;(document as any).querySelector('.ant-table-body')!.onscroll = (e: any) => {
        console.log(e, 'eee')
      }
    } catch (error) {
      console.log('同步备注滚动报错')
    }
  })

  let remark = sheetViewModal.remark
  return (
    <Wrapper className={classNames({ isEdit })}>
      <BaseTable
        surplusHeight={surplusHeight}
        surplusWidth={200}
        columns={columns}
        // fixedFooter={true}
        dataSource={sheetViewModal.sheetTableData}
        footer={() => {
          return (
            <React.Fragment>
              <div className={'remark-con real'}>
                <div className='remark-title'>排班备注：</div>
                <Input.TextArea
                  readOnly={!isEdit}
                  defaultValue={remark}
                  autosize={!isEdit}
                  onBlur={(e) => {
                    sheetViewModal.remark = e.target.value
                  }}
                  style={{ minHeight: 100 }}
                />
              </div>
              <div className={'remark-con space'}>
                <div className='remark-title'>排班备注：</div>
                <Input.TextArea value={remark} autosize={!isEdit} style={{ minHeight: 100 }} />
              </div>
            </React.Fragment>
          )
        }}
      />
      <contextMenu.Component />
      <editEffectiveTimeModal.Component />
      <editVacationCountModal.Component />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  #baseTable {
    .ant-table-body td,
    .ant-table-tbody td {
      padding: 0 2px !important;
      font-size: 12px !important;
    }
  }
  /** fix table scroll bug */
  div.ant-table-body {
    background: #fafafa !important;
  }
  tbody.ant-table-tbody {
    background: #fff;
  }
  .ant-table-footer {
    border: 0 !important;
    background: #fafafa !important;
    z-index: 10;
    position: absolute;
    left: 0;
    right: 0;
  }
  &.isEdit {
    .ant-table-fixed-left {
      td {
        background: #f8f8f8 !important;
      }
    }
  }
  .remark-con {
    margin-top: -10px;
    .remark-title {
      margin-bottom: 5px;
    }
    &.space {
      position: relative;
      z-index: 2;
      opacity: 0;
      pointer-events: none;
      padding: 0 0 10px;
    }
    &.real {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 10;
      padding: 10px;
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
