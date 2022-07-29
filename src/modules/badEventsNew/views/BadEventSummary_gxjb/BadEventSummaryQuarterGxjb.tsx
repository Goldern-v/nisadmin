import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import BadEventHeader from './components/BadEventHeader'
import BadEventTable from './components/BadEventTable';
import { badEventData_gxjb } from './BadEvent_gxjb';


export default observer(function BadEventSummaryQuarterGxjb(props) {
	useEffect(() => {
		badEventData_gxjb.init()
	
	}, [])
	
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