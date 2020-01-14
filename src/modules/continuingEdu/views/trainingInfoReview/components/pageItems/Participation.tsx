import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

export interface Props {
  data?: any
}

//参与人员
export default function Participation(props: Props) {
  const { data } = props
  const [empList, setEmpList] = useState([] as any[])
  const [showAll, setShowAll] = useState(false)
  useEffect(() => {
    let count = 60
    let newEmoList = [] as any[]
    while (count--) newEmoList.push({
      empName: '王丽',
      wardName: '骨科'
    })

    setEmpList(newEmoList)
  }, [])


  let viewList = empList.concat()
  if (!showAll) viewList = viewList.slice(0, 40)

  return <Wrapper>
    <div className="content-item-title">参与人员：（{empList.length}人）</div>
    <div className="content-item-pannel">
      {viewList.map((item: any, idx: any) => <span key={idx}>
        {item.wardName}/{item.empName}{idx < viewList.length - 1 ? ', ' : ''}
      </span>)}
      {!showAll && <span>等{empList.length}人  </span>}
      {!showAll && <span className="show-all-span" onClick={() => setShowAll(!showAll)}> 查看全部</span>}
    </div>
  </Wrapper>
}
const Wrapper = styled.div`
  .show-all-span{
    color: #00f;
    cursor: pointer;
    :hover{
      font-weight: bold;
    }
  }
  .content-item-pannel{
    font-size:13px;
  padding: 0 12px;
  }
`