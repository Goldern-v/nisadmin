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
// state 为了院内工作经历模块
export default function (type: string, modal: any, getTableData: () => void, state:boolean = true): any {
  const types = ['']
  // 特殊模块-专科护士\外出进修\学术活动： 从我的档案模块进来区分是否是护理部人员
  const specialModule = ['nurseWHSpecializNurse', 'nurseWHOutStudy', 'nurseWHAcademic'] 
  // 工作经历、工作资质和文章模块 从档案管理进去只能有操作-查看功能（涉及到有提交审核）
  const workHistory = ['nurseWHWorkExperienceIn','nurseWHWorkExperienceOut', 'nurseWHArticle', 'nurseWHQualificationOut', 'nurseWHQualificationIn']
  
  return {
    title: '操作',
    dataIndex: '操作',
    key: '操作',
    width: 120,
    align: 'center',
    render: (text: any, row: any, index: number) => {
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
              {!specialModule.includes(type) && <span
                onClick={() => {
                  
                  openAuditModal(getTitle(type), row, getTableData)
                }}
              >
                查看
              </span>}
              {state && <span
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
              {authStore.isDepartment && specialModule.includes(type) ? 
              // <React.Fragment>
              //   {authStore.isDepartment ? 
              //   <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
              //     <span
              //       onClick={() => {
              //         modal.show({ data: row, signShow: '修改' })
              //       }}
              //     >
              //       修改
              //     </span>
              //     <span
              //       onClick={() => {
              //         globalModal.confirm('删除确定', '你确定要删除该记录吗?').then((res) => {
              //           nurseFilesService.commonDelById(type, row.id).then((res) => {
              //             getTableData()
              //           })
              //         })
              //       }}
              //     >
              //       删除
              //     </span>
              //   </div> 
              //   : <span
              //     onClick={() => {
              //       globalModal.confirm('删除确定', '你确定要删除该记录吗?').then((res) => {
              //         nurseFilesService.commonDelById(type, row.id).then((res) => {
              //           getTableData()
              //         })
              //       })
              //     }}
              //   >
              //     删除
              //   </span>}
              // </React.Fragment> : 
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
              <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                {!workHistory.includes(type) ? 
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
                  <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                    <span
                      onClick={() => {
                        openAuditModal(getTitle(type), row, getTableData)
                      }}
                    >
                      查看
                    </span>
                  </div>
                }
              </div>}
            </React.Fragment>
          )}
        </DoCon>
      )
    }
  }
}

const Wrapper = styled.div``
