import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import TableTree from './components/table-tree'
import { areaControlModel } from './model'
import { Button, Input } from 'antd'
import EditModal from './components/edit-modal'

export interface Props {
}
export default observer(function (props: Props) {
  
  useEffect(() => {
    areaControlModel.init()
  }, [])
  useEffect(()=> {
    if (areaControlModel.kw.length === 0) {
      return areaControlModel.getTableData()
    }
    areaControlModel.getListByKw()

  }, [areaControlModel.kw])

  return (
    <Wrapper>
      <PageHeader>
        <PageTitle>片区对照</PageTitle>
        <Place />
        科室名称：
        <Input className='header-ipt' value={areaControlModel.kw} onChange={(e) => {
          areaControlModel.kw = e.target.value
        }} />
        <Button>查询</Button>
        <Button onClick={() => areaControlModel.addNewArea()}>添加片区</Button>
      </PageHeader>
        <TableTree />
        <EditModal />
    </Wrapper>
  )
})

const Wrapper = styled.div`
.header-ipt {
  width: 200px;
}
`