import styled from 'styled-components'
import React, { useState, useEffect, useCallback } from 'react'
import { Button } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { Place } from 'src/components/common'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps, PaginationConfig } from 'src/vendors/antd'
import createModal from 'src/libs/createModal'
import PersonelSecondModal from './modal/PersonelSecondModal'
import { personelSecondServices } from './service/PersonelSecondServices'
import { appStore, authStore } from 'src/stores'
export interface Props {}

export default function PersonnelSecondment() {
  const [dataSource, setDataSource] = useState([])
  const personelSecondModal = createModal(PersonelSecondModal)
  const [pageOptions, setPageOptions]: any = useState({
    pageIndex: 1,
    pageSize: 20,
    total: 0
  })
  const columns: ColumnProps<any>[] = [
    {
      title: '借出科室',
      dataIndex: 'deptNameTransferTo',
      width: 300
    },
    {
      title: '借出护士',
      dataIndex: 'empNameTransferTo',
      width: 100,
      align: 'center'
    },
    {
      title: '借出日期',
      dataIndex: 'startDate',
      width: 250,
      align: 'center'
    },
    {
      title: '借出说明',
      dataIndex: 'detailTransferTo',
      width: 400
    },
    {
      title: '操作人',
      dataIndex: 'empName',
      width: 100,
      align: 'center'
    }
  ]

  const getData = () => {
    personelSecondServices.getByDeptCode({ ...pageOptions, deptCode: authStore.selectedDeptCode }).then((res) => {
      setDataSource(res.data.list)
    })
  }

  useCallback(() => {
    getData()
  }, [pageOptions.pageIndex, pageOptions.pageSize])

  useEffect(() => {
    getData()
  }, [])

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
      <BaseTable
        columns={columns}
        dataSource={dataSource}
        surplusHeight={210}
        type={['index']}
        pagination={{
          current: pageOptions.pageIndex,
          pageSize: pageOptions.pageSize,
          total: pageOptions.total
        }}
        onChange={(pagination: PaginationConfig) => {
          setPageOptions({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total
          })
        }}
      />
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
