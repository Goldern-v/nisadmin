import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import SelectCon from './components/SelectCon'
import FilterCon from './components/FilterCon'
import NurseCard from './components/NurseCard'
import { numberToArray } from 'src/utils/array/array'
import PaginationCon from './components/PaginationCon'
import { nurseFilesService } from '../../services/NurseFilesService'
import { observer } from 'mobx-react-lite'
import { nurseFilesListViewModel } from './NurseFilesListViewModel'
import { Spin } from 'antd'
export interface Props extends RouteComponentProps {}
/** 一行的列数 */
let rowNum: number = 7

export default observer(function NurseFilesListView () {
  return (
    <Wrapper>
      <SelectCon />
      <FilterCon />
      <Spin spinning={nurseFilesListViewModel.listSpinning}>
        <NurseCardCon>
          {nurseFilesListViewModel.nurseList.map((item: any, index: number) => (
            <NurseCard rowNum={rowNum} key={index} data={item} />
          ))}
        </NurseCardCon>
      </Spin>
      <PaginationCon rowNum={rowNum} />
    </Wrapper>
  )
})
const Wrapper = styled.div`
  padding: ${(p) => p.theme.$mcp};
`

const NurseCardCon = styled.div`
  margin: 0 -10px;
  min-height: 440px;
`
