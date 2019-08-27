import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { Place } from 'src/components/common'
export interface Props {}

export default function TopPart() {
  return (
    <Wrapper>
      <BreadcrumbBox
        data={[
          {
            name: '排班管理',
            link: '/personnelManagement/arrangeHome'
          },
          {
            name: '编辑排班'
          }
        ]}
      />
      <div className='contain'>
        <div className='title'>编辑排班</div>
        <Place />
        <Button>重置排班</Button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .contain {
    display: flex;
    align-items: flex-end;
    height: 70px;
    padding: 10px 20px;
  }
`
