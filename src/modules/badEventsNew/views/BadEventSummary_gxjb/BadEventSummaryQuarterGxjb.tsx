import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { badEventsNewService } from '../../api/badEventsNewService'
import moment from 'moment'
// import { PageTitle, Place, PageHeader } from 'src/components/common';
import { Button, DatePicker, Select } from 'antd';
// import { fileDownload } from 'src/utils/file/file'
import BaseTable from 'src/components/BaseTable'
import { ColumnProps } from 'antd/lib/table'
import { getColumnsNames, SUMMARY_TYPES } from './enums'
import { quarterList } from 'src/enums/date'

import BadEventHeader from './components/BadEventHeader'
import BadEventTable from './components/BadEventTable';

const Option = Select.Option

export default observer(function BadEventSummaryQuarterGxjb(props) {

	
	const [data, setData] = useState<any[]>([])
	const [loading, setLoading] = useState(false)



	const columns: ColumnProps<any>[] = [

		...getColumnsNames('1').map((v: string) => {
			return {
				title: v,
				dataIndex: v,
				width: 80,
				align: "center"
			} as ColumnProps<any>
		})
	]

	
	return (
		<Wrapper>
			<BadEventHeader />
			<ScrollCon>
				<BadEventTable />
				{/* <BaseTable
					surplusWidth={1000}
					surplusHeight={205}
					loading={loading}
					dataSource={data}
					columns={columns}
				/> */}
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