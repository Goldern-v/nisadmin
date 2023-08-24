import { observer } from 'mobx-react'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { trainingSettingApi } from '../../api/TrainingSettingApi'
import { handbookModel as model } from '../model'
import {PageContainer, PageContainerDetail} from 'src/components/common'
export interface IProps {
}

export default observer(function Detail(props: IProps) {
  const [temList, setTemList] = useState([])
  // useEffect(() => {
  //   trainingSettingApi.getTemplateMaintenance().then((res) => {
  //     setTemList(res.data.map((item: any) => {
  //       return {
  //         tableName: item.tableName,
  //         id: item.id
  //       }
  //     }))
  //   })
  // }, [])
  return (
    <Wrapper>
      {model.detailConfig?.component ?
        <model.detailConfig.component /> : ''}
    </Wrapper>
  )
})

const Wrapper = styled(PageContainerDetail)`
  display: flex;
  justify-content: center;
  flex: 1;
  height: calc(100% - 15px);
  overflow: auto;
`
