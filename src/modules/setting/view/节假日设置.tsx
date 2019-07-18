import styled from 'styled-components'
import React from 'react'
import HolidayTableHeader from 'src/modules/setting/view/components/HolidayTableHeader.tsx'
import TableModel from 'src/modules/setting/common/TableModel.tsx'
import A节假日设置表 from './TableView/A节假日设置表'
// import React, { useState, useEffect } from 'react'
export default function BedSituation () {
  // 
  // useEffect(() => {
  //   
  // })
  return (
    <Con>
      <HolidayTableHeader />
      <TableCon>
        <A节假日设置表 />
      </TableCon>
    </Con>
  )
}

const Con = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const TableCon = styled.div`
  overflow-y: auto;
  flex: 1;
  height: 0;
  margin: 15px;
  background: #fff;
  border: 1px solid rgba(228, 228, 228, 1);
`
