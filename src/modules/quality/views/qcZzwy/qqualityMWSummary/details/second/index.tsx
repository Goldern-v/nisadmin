import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PageHeader, PageTitle } from 'src/components/common'
import {
	Button,
  Input
} from "src/vendors/antd";
import BaseTable from "src/components/BaseTable";
import { secondData } from './secondData'
import AddTable from './model/addTable';
import { Obj } from 'src/libs/types'

// src\modules\quality\views\analysisDetail\components\improvement-project\section.tsx
import Fishbone from '../../components/fish-bone';

const { TextArea } = Input;

export interface Props {
  detailList: any,
  setDetailLists: (idx: number, data: Obj) => void,
  addDetailList: () => void
}

export default observer(function TableList(props: Props) {
  let { detailList, setDetailLists, addDetailList} = props;

  // 护理部表
  const columns: any = [
		{
			title: "内容",
			dataIndex: "qcName",
			align: "center",
      width: 200,
		},
		{
			title: "合格率(%)",
			dataIndex: "evalRate",
			align: "center",
      width: 100,
		},
	]

  const fishBoneFish = Object.freeze({
    v0: 'b0062084',
    v1: 'b0062085',
    v2: 'b0062086',
    v3: 'b0062087',
    v4: 'b0062088',
    v5: 'b0062089',
    v6: 'b0062090',
    v7: 'b0062091',
    v8: 'b0062092',
    v9: 'b0062093',
    v10: 'b0062094',
    v11: 'b0062095',
    v12: 'b0062096',
    v13: 'b0062097',
    v14: 'b0062098',
    v15: 'b0062099',
    v16: 'b0062100',
    v17: 'b0062101',
    v18: 'b0062102',
    v19: 'b0062103',
    v20: 'b0062104',
    v21: 'b0062105',
    v22: 'b0062106',
    v23: 'b0062107',
    v24: 'b0062108',
    v25: 'b0062109',
    v26: 'b0062110',
    v27: 'b0062111',
  })

  const handleDetailList = (idx: number, data: Obj) => {
    setDetailLists(idx, data)
  }

  useEffect(() => {
    addDetailList()

  }, [secondData.tableList]);
	
  return (
    <Wrapper>
      <PageHeader style={{ justifyContent: 'space-between'}}>
				<div>二、护理质量检查情况</div>
			</PageHeader>
      <div>
        <TextArea value={secondData.case} onChange={(e) => secondData.case = e.target.value } rows={5} />
      </div>

			<ScrollCon>
        <div className='button'>
          <Button size="small" type="primary" onClick={ () => {
            secondData.secondtModalAdd = true
          } }>添加</Button>
        </div>
				<BaseTable
					className="details-first_table"
					loading={secondData.tableLoading}
					dataSource={secondData.tableList}
					columns={columns.filter((item: any) => item)}
					surplusWidth={780}
				/>
			</ScrollCon>
      <AddTable />
      {
        (detailList).map((v: any, i: number) =>
        <>
          <div key={`${v.qcCode}-0`}>{i + 1}、{v.qcName}</div>
          <div key={`${v.qcCode}-1`}>主要存在问题</div>
          <TextArea key={`${v.qcCode}-2`} value={v?.problem} autosize={{ minRows: 3 }} onInput={(e: any) => handleDetailList(i, { 'problem': e.target.value })} />
          <div className="causes" key={`${v.qcCode}-3`}>原因分析</div>
          <Fishbone key={`${v.qcCode}-4`} value={v} reflect={fishBoneFish} onChange={(e: any) => handleDetailList(i, e)} />
          <div key={`${v.qcCode}-5`}>整改措施</div>
          <TextArea className='measures' key={`${v.qcCode}-6`} value={v?.measures} autosize={{ minRows: 3 }} onInput={(e: any) => handleDetailList(i, { 'measures': e.target.value })} />
        </>)
      }
    </Wrapper>
  )
})
const Wrapper = styled.div`
  .details-first_table{
    width: 100%;
  }
  #baseTable{
    padding: 10px 0 !important;
  }
  .bHdIpD#baseTable .ant-table-body{
    overflow-y: auto !important
  }
  .measures{
    margin-bottom: 10px;
  }
`
const ScrollCon = styled.div`
  width: 100%;
  flex: 1;
  .button{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
`;