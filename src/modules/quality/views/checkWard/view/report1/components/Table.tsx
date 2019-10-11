import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseTable, { TabledCon, DoCon } from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import { observer } from 'src/vendors/mobx-react-lite'
import { qualityAnalysisReportViewModal } from 'src/modules/quality/views/qualityAnalysisReport/QualityAnalysisReportViewModal'
import { reportViewModal } from '../ReportViewModal'
import { sexToChina } from 'src/utils/transform/sexToChina'
import service from 'src/services/api'
import { appStore } from 'src/stores'
import qs from 'qs'
export interface Props {}

export default observer(function Table() {

  return (
    <Wrapper>
      
    </Wrapper>
  )
})
const Wrapper = styled(TabledCon)``
