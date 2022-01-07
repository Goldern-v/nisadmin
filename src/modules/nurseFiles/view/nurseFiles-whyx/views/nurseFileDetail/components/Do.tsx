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
import { authStore } from 'src/stores'

export interface Props { }

export default function (type: string, modal: any, getTableData: () => void): any {
  const types = ['nurseOutQualification', 'nurseInnaiQualification', 'nurseWHInnaiWorkExperience', 'nurseWHWorkExperience']
  // 特殊模块-专科护士： 从档案管理模块进来区分是否是护理部在操作
  const specialModule = type === 'nurseWHYXSpecializNurse'
  // 工作经历模块
  const workHistory = type === 'nurseWHWorkExperience'
  
  return {
    title: '操作',
    dataIndex: '操作',
    key: '操作',
    width: 120,
    align: 'center',
    render: (text: any, row: any, index: number) => {
      // 判断是否是护理部 
      if (authStore.isDepartment) {}
      return (
        <DoCon>
          {(isSelf() || types.includes(type)) ? (
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
                  console.log(getTitle(type), row, 888)
                  openAuditModal(getTitle(type), row, getTableData)
                }}
              >
                查看
              </span>
              {!workHistory && <span
                onClick={() => {
                  globalModal.confirm('删除确定', '你确定要删除该记录吗?').then((res) => {
                    nurseFilesService.commonDelById(type, row.id).then((res) => {
                      getTableData()
                    })
                  })
                }}
              >
                删除
              </span>}
            </React.Fragment>
          ) : (
            // <span
            //   onClick={() => {
            //     openAuditModal(getTitle(type), row, getTableData)
            //   }}
            // >
            //   {limitUtils(row) ? '审核' : '查看'}
            // </span>
            <React.Fragment>
              {specialModule ? 
              <React.Fragment>
                {authStore.isDepartment ? 
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                  <span
                    onClick={() => {
                      modal.show({ data: row, signShow: '修改' })
                    }}
                  >
                    修改
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
                </div> : 
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
                </span>}
              </React.Fragment> : 
              <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                <span
                  onClick={() => {
                    modal.show({ data: row, signShow: '修改' })
                  }}
                >
                  修改
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
              </div>}
            </React.Fragment>
          )}
        </DoCon>
      )
    }
  }
}

const Wrapper = styled.div``
