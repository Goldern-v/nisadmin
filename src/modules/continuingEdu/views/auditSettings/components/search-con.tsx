import { Icon } from 'antd'
import { Input } from 'antd/es'
import { observer } from 'mobx-react'
import React, { ChangeEvent, useMemo, useState } from 'react'
import styled from 'styled-components'

export interface Props {
  list: any[]
  curItem: string
  handleClick: (e: any) => void
}
export default observer(function SearchCon(props: Props) {
  const [kw, setKw] = useState('')
  const { list, curItem = '', handleClick } = props
  const formatList = useMemo(() => list.filter((v: any) => v.moduleName.includes(kw)), [kw, list])
  return (
    <Wrapper>
      <Input suffix={<Icon type='search' />} value={kw} onChange={(e: ChangeEvent<HTMLInputElement>) => setKw(e.target.value)} />
      {
        formatList.map((v: any) => (
          <div className={`item ${curItem === v.moduleCode ? 'active' : ''}`} key={v.moduleCode} onClick={() => handleClick(v)}>{v.moduleName}</div>
        ))
      }
    </Wrapper>
  )
})

const Wrapper = styled.div`
  .item {
    margin-top: 10px;
    background-color: #d3d2d3;
    color: #fff;
    font-size: 14px;
    /* line-height: 26px; */
    padding: 5px;
  }
  .active {
    background-color: ${(p) => p.theme.$mtc};
  }
`