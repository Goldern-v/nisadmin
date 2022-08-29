import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BadEventTable from './components/BadEventTable';
import { badEventQuarterData_gxjb } from './BadEventQuarter_gxjb';
import BadEventHeaderQuarter from './components/BadEventHeaderQuarter';

export default observer(function BadEventSummaryQuarterGxjb(props) {
	useEffect(() => {
		badEventQuarterData_gxjb.init()
	
	}, [])
	
	return (
		<Wrapper>
			<BadEventHeaderQuarter />
			<ScrollCon>
				<BadEventTable />
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