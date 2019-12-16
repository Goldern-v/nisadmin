import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Input, Select, ColumnProps, DatePicker, message } from 'src/vendors/antd'
import BaseTable, { DoCon } from 'src/components/BaseTable'
import { cloneJson } from 'src/utils/json/clone'
import { LastImproveItem, Report, TypeCompare } from '../../types'
import { patientVisitMonthModel } from '../../model/PatientVisitMonthModel'
import { appStore } from 'src/stores'
import { observer } from 'mobx-react-lite'
import service from 'src/services/api'
import moment from 'moment'
import qs from 'qs'
import MultiFileUploader, { FileItem } from 'src/components/MultiFileUploader'

import { patientVisitMonthService } from '../../api/PatientVisitMonthService'
// const commonApi = service.commonApiService

const Option = Select.Option

export interface Props {
  sectionId: string
  data: any
  setData: any
}

export default observer(function 附件弹窗(props: Props) {
  let { location, history } = appStore

  let { sectionId, setData, data } = props

  let cloneData: any = cloneJson(data || { list: [] })
  let report: Report = patientVisitMonthModel.getDataInAllData('report')
  useEffect(() => { }, [])

  // console.log('cloneData', cloneData)

  const handleChange = (payload: any) => {
    cloneData.list = payload.map((item: any) => {
      return {
        attachId: item.id,
        name: item.name,
        path: item.path,
        type: item.type
      }
    })

    setData(cloneData)
  }

  return (
    <Wrapper>
      <MultiFileUploader
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        type="pvm"
        onChange={handleChange}
        data={cloneData.list.map((item: any) => {
          return {
            id: item.attachId,
            name: item.name,
            path: item.path,
            type: item.type
          }
        })} />
    </Wrapper>
  )
})

const defaultInputStyle = `
  border: none;
  outline: none;
  background: none;
  box-shadow: none;
`

const activeInputStyle = `
  outline: none;
  border: none;
  box-shadow: none;
`

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 20px;
  text {
    min-height: 200px !important;
    resize: none;
  }
  .button-con {
    position: absolute;
    top: -13px;
    right: 0;
  }

  td {
    padding: 0 !important;
  }
  textarea{
    resize: none;
    border: none;
    outline: none;
    background: none;
    box-shadow: none;
    :hover{
      outline: none;
      border: none;
      background: none;
      box-shadow: none;
    }
    :focus{
      outline: none;
      border: none;
      background: ${(p) => p.theme.$mlc};
      box-shadow: none;
    }
  }
  .ant-input{
      resize: none;
      word-break: break-all;
      ${defaultInputStyle}
      :hover{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
      :focus{
        ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
      }
    }
    .ant-select-selection{
      ${defaultInputStyle}
    }
  .ant-select-selection{
      ${defaultInputStyle}
    }

    .ant-select-open,.ant-select-focused{
      .ant-select-selection{
        ${activeInputStyle}
        &:focus{
          ${activeInputStyle}
          background: ${(p) => p.theme.$mlc};
        }
      }
    }
`

const HeadCon = styled.div``
