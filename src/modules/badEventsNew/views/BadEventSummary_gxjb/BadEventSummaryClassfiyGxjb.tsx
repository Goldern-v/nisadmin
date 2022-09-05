import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import BadEventHeader from './components/BadEventHeader'
import BaseTable, { DoCon } from "src/components/BaseTable";
import { badEventData_gxjb } from './BadEvent_gxjb';
import { badEventApi_gxjb } from './api';


export default observer(function BadEventSummaryClassfiyGxjb(props) {
	// 解决方法2：const [students, setStudents] = useState<any>()
	// 解决方法3：const [students, setStudents] = useState([] as any[])
	// const [columnClass, setColumnClass] = useState<Array<{title?:any;dataIndex?:string;render?:any;align?:string;width?:number}>>([]);
	// const [columnClass, setColumnClass] = useState<Array<{}>>([]);

	const columnList = [...badEventData_gxjb.columnFixedList,...badEventData_gxjb.columnLast] as any

	useEffect(() => {
		badEventData_gxjb.init()
	}, [])
	
	return (
		<Wrapper>
			<BadEventHeader />
			<ScrollCon>
				{/* <BadEventTable /> */}
				<BaseTable
					loading={badEventData_gxjb.tableLoading}
					dataSource={badEventData_gxjb.tableList}
					columns={columnList }
					surplusHeight={230}
					surplusWidth={100}
					pagination={{
						current: badEventData_gxjb.pageIndex,
						total: badEventData_gxjb.total,
						pageSize: badEventData_gxjb.pageSize,
					}}
					onChange={(pagination) => {
						badEventData_gxjb.pageIndex = pagination.current;
						badEventData_gxjb.total = pagination.total;
						badEventData_gxjb.pageSize = pagination.pageSize;
						badEventData_gxjb.onload();
					}}
				/>
			</ScrollCon>
		</Wrapper>
	)
})
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ScrollCon = styled.div`
  flex: 1;
`;