import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import SelectCon from './components/SelectCon'
import FilterCon from './components/FilterCon'
import NurseCard from './components/NurseCard'
import { numberToArray } from 'src/utils/array/array'
import PaginationCon from './components/PaginationCon'
import { nurseFilesService } from '../../services/NurseFilesService'
export interface Props extends RouteComponentProps {}

/** 一行的列数 */
let rowNum: number = 7

export default function NurseFilesListView () {
  const [count, setCount] = useState(0)
  const onLoad = () => {
    let query = {
      // deptCode: ,
      // empNo:
      // education:
      // title:
      // currentLevel:
      // post:
      // pageIndex:
      // pageSize:
    }
    // nurseFilesService.getByFormCodePC(query)
  }
  useEffect(() => {
    onLoad()
  })
  return (
    <Wrapper>
      <SelectCon />
      <FilterCon />
      <NurseCardCon>
        {numberToArray(14).map((item, index) => (
          <NurseCard rowNum={rowNum} key={index} />
        ))}
      </NurseCardCon>
      <PaginationCon />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: ${(p) => p.theme.$mcp};
`

const NurseCardCon = styled.div`
  margin: 0 -10px;
`
