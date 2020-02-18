import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

export interface Props {
  info?: any
}

//参与人员
export default function Participation(props: Props) {
  const { info } = props
  const empList = info.participantList || []
  const [showAll, setShowAll] = useState(false)

  let viewList = empList.concat()

  if (!showAll) viewList = viewList.slice(0, 40)

  return <Wrapper>
    <div className="content-item-title">参与人员：（{empList.length}人）</div>
    <div className="content-item-pannel">
      {viewList.map((item: any, idx: any) => <span key={idx}>
        {item.deptName}/{item.empName}{idx < viewList.length - 1 ? ', ' : ''}
      </span>)}
      {(() => {
        if (empList.length > 40)
          return <React.Fragment>
            {!showAll && <span>等{empList.length}人  </span>}
            <span
              className="show-all-span"
              onClick={() => setShowAll(!showAll)}>
              {showAll ? ' 隐藏全部' : ' 查看全部'}
            </span>
          </React.Fragment>
        else
          return <span> </span>
      })()}
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