import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { DoCon } from 'src/components/BaseTable'
import { isSelf } from '../views/BaseInfo'
import { openAuditModal } from '../config/auditModalConfig'

import { globalModal } from 'src/global/globalModal'
import { nurseFilesService } from '../../../services/NurseFilesService'
import limitUtils from '../utils/limit'
import { getTitle } from '../config/title'

export interface Props { }

export default function (type: string, modal: any, getTableData: () => void): any {
  return {
    title: '操作',
    dataIndex: '操作',
    key: '操作',
    width: 120,
    align: 'center',
    render: (text: any, row: any, index: number) => {
      return (
        <DoCon>
          {isSelf() ? (
            <React.Fragment>
              <span
                onClick={() => {
                  modal.show({ data: row, signShow: '修改' })
                }}
              >
                修改
              </span>
              <span
                onClick={() => {
                  console.log(row, 888)
                  openAuditModal(getTitle(type), row, getTableData)
                }}
              >
                查看
              </span>
              <span
                onClick={() => {
                  globalModal.confirm('删除确定', '你确定要删除该记录吗?').then((res) => {
                    nurseFilesService.commonDelById(type, row.id).then((res) => {
                      getTableData()
                    })
                  })
                }}
              >
                删除
              </span>
            </React.Fragment>
          ) : (
            <span
              onClick={() => {
                openAuditModal(getTitle(type), row, getTableData)
              }}
            >
              {limitUtils(row) ? '审核' : '查看'}
            </span>
          )}
        </DoCon>
      )
    }
  }
}

const Wrapper = styled.div``
