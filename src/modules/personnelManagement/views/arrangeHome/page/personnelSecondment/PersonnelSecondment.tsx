import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { Place } from 'src/components/common'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'src/vendors/antd'
import createModal from 'src/libs/createModal'
import PersonelSecondModal from './modal/PersonelSecondModal'
import { personelSecondServices } from './service/PersonelSecondServices'
import { appStore, authStore } from 'src/stores'
export interface Props {}

export default function PersonnelSecondment() {
  const personelSecondModal = createModal(PersonelSecondModal)
  const columns: ColumnProps<any>[] = [
    {
      title: '借出科室',
      width: 300
    },
    {
      title: '借出护士'
    },
    {
      title: '借出日期',
      width: 250
    },
    {
      title: '借出说明',
      width: 300
    }
  ]

  useEffect(() => {}, [])

  const getData = () => {
    personelSecondServices.getByDeptCode(authStore.selectedDeptCode)
  }
  return (
    <Wrapper>
      <div>
        <BreadcrumbBox
          data={[
            {
              name: '排班管理',
              link: '/personnelManagement/arrangeHome'
            },
            {
              name: '临时人员借调'
            }
          ]}
        />
      </div>
      <Head>
        <div className='title'>临时人员借调</div>
        <Place />
        <Button onClick={() => personelSecondModal.show()}>人员借出</Button>
      </Head>
      <BaseTable columns={columns} dataSource={[]} surplusHeight={190} type={['index']} />
      <personelSecondModal.Component />
    </Wrapper>
  )
}
const Wrapper = styled.div``
const Head = styled.div`
  display: flex;
  padding: 0 20px;
  .title {
    font-size: 20px;
    font-weight: bold;
  }
`
