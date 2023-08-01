import { observer } from 'mobx-react'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { trainingSettingApi } from '../../api/TrainingSettingApi'
import { handbookModel as model } from '../model'
import config from "../detailConfig";
import { PageContainer } from 'src/components/common'
export interface IProps {
}
const Con = () => {
  if (!model.curCatalogue) return <></>
  const CurCon = config.getCon(model.curCatalogue)
  return <CurCon info={model.info} />
}
export default observer(function Detail(props: IProps) {
  const [temList, setTemList] = useState([])
  useEffect(() => {
    trainingSettingApi.getTemplateMaintenance().then((res) => {
      setTemList(res.data.map((item: any) => {
        return {
          tableName: item.tableName,
          id: item.id
        }
      }))
    })

  }, [])
  useEffect(() => {

  }, [model.curCatalogue])


  return (
    <Wrapper>
      <Con />
    </Wrapper>
  )
})

const Wrapper = styled(PageContainer)`
flex: 1;
height: calc(100% - 15px);
overflow: auto;
`
