import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { appStore } from 'src/stores'
import FilterCon from './components/FilterCon'
import { getPageObj } from './config/getPageObj'
import { statisticsViewModal } from './StatisticsViewModal'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
export interface Props {}

export default function Statistics() {
  const [pageObj, setPageObj]: any = useState(null)
  let path = appStore.match.params.path
  useEffect(() => {
    statisticsViewModal.init().then((res) => {
      setPageObj(getPageObj(path))
    })
  }, [])

  return (
    <Wrapper>
      {pageObj && (
        <React.Fragment>
          <HeadCon>
            <div className='title'>标题{path}</div>
            <Button>导出EXCEL</Button>
          </HeadCon>
          <FilterCon pageObj={pageObj} />
        </React.Fragment>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  padding: 15px 15px 0;
`

const HeadCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: 20px;
    color: #333;
    font-weight: bold;
  }
`
