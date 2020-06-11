import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { globalModal } from "src/global/globalModal"
import { message } from 'antd'
import { DoCon } from "src/components/BaseTable"
import { ColumnProps } from 'antd/es/table/interface'
import { wardRegisterService } from "../../../services/WardRegisterService"

export interface SignColumnProps {
  title: string, //列标题
  width?: number, //列宽度
  dataIndex: string, //要显示的字段名称
  aside: string, //弹窗角色名称
  registerCode: string, //登记本Code
  successCallback: Function, //操作成功返回
  isRoleManage: boolean //是否护士长
  blockId: string | number //登记本版本id
}
/** 签名列 */
export default function SignColumn(props: SignColumnProps) {
  const { title, width, dataIndex, aside, registerCode, successCallback, isRoleManage, blockId } = props

  let signApi = wardRegisterService.saveAndSignAll.bind(wardRegisterService) as any

  let cancelSignApi = wardRegisterService.cancelSign.bind(wardRegisterService)

  if (dataIndex == "auditorName") {
    signApi = wardRegisterService.auditAll.bind(wardRegisterService)
    cancelSignApi = wardRegisterService.cancelAudit.bind(wardRegisterService)
  }

  return {
    title,
    width: width || 70,
    dataIndex,
    render: (text: string, record: any, index: number) => {
      let children = <span></span>

      //未保存条目禁止签名
      if (!record.id) {
        children = <span
          title="新建条目保存后可签名"
          style={{ cursor: 'not-allowed' }}>
          签名
        </span>
      } else if (text) {
        children = <span
          style={{ color: '#666' }}
          onClick={() => {
            if (title.match('护士长') && !isRoleManage) {
              message.error('非护士长无法取消签名')
              return
            }

            globalModal
              .confirm(`${aside}签名取消`, `你确定取消${aside}签名吗？`)
              .then(res => {
                cancelSignApi(registerCode, [{ id: record.id }]).then(res => {
                  message.success(`取消${aside}签名成功`);
                  let newRecord = { ...record, ...res.data.list[0] }
                  successCallback && successCallback(newRecord, index)
                });
              })

          }}>
          {text}
        </span>
      } else {
        children = <span
          onClick={() => {
            if (title.match('护士长') && !isRoleManage) {
              message.error('非护士长无法签名')
              return
            }

            globalModal
              .confirm(`${aside}签名确认`, `你确定${aside}签名吗？`)
              .then(res => {
                //如果是sign类型
                if (dataIndex !== "auditorName") {
                  signApi(registerCode, blockId, [record], true).then(
                    (res: any) => {
                      message.success(`${aside}签名成功`)
                      let newRecord = { ...record, ...res.data.itemDataList[0], modified: false }
                      successCallback && successCallback(newRecord, index)
                    })
                } else {
                  signApi(registerCode, [{ id: record.id }]).then(
                    (res: any) => {
                      message.success(`${aside}签名成功`);
                      let newRecord = { ...record, ...res.data.list[0] }
                      successCallback && successCallback(newRecord, index)
                    })
                }
                //如果是audit类型
              })
          }}>
          签名
        </span>
      }

      return <DoCon>{children}</DoCon>
    }
  } as ColumnProps<any>
}