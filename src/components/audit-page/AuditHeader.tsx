import styled from 'styled-components'
import React, { useEffect } from 'react'

import BreadcrumbBox from '../../layouts/components/BreadcrumbBox'

interface Item {
  link?: string
  name: string,
}
export interface Props {
  breadData: Item[]
  breadStyle?: any
  statusCon?: any
  btnCon?: any
  title?: string
  statusDes?: string
}

/**审核页面的头部 包含面包屑，状态，按钮 */
export default function AuditHeader(props: Props) {
  useEffect(() => { })
  const { breadData, breadStyle = { padding: '5px 10px 0', height: '26px' }, statusCon, btnCon, title, statusDes } = props

  return (
    <Wrapper>
      <BreadcrumbBox data={breadData} style={breadStyle} />
      <StatusBtnCon>
        <div>{statusCon ?
          statusCon
          :
          <>
            <div className='fw-b'>{title}</div>
            <div>状态：{statusDes}</div>
          </>}</div>
        <div className='btn-con'>{btnCon}</div>
      </StatusBtnCon>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const StatusBtnCon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #fff;
  padding: 0 10px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  
  .fw-b {
    font-weight: bold;
  }
  .btn-con {
    .ant-btn + .ant-btn {
      margin-left: 10px;
    }
  }
`
