import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// import BadEventHeader from './components/BadEventHeader'
import CaseTable from './components/CaseTable'
import { badEventCaseData_gxjb } from './BadEventCase_gxjb'
import BadEventHeaderCase from './components/BadEventHeaderCase'
// import BadEventTable from './components/BadEventTable'
export default observer(function BadEventSummaryCaseGxjb(props) {
	useEffect(() => {
		badEventCaseData_gxjb.init()
	}, [])
	
	return (
		<Wrapper>
			<BadEventHeaderCase />
			<ScrollCon>
				<CaseTable />
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