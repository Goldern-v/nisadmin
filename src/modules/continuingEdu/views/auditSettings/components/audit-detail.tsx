import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'
import AuditDetailItem from './audit-detail-item'
import { auditSettingsModel as model } from '../model'
import RejectedNodeModal from './rejected-node-modal'
import AddRolesModal from './add-roles-modal'

export interface Props {
}
export default observer(function AuditDetail(props: Props) {

  return (
    <Wrapper>
      {
        (model.formatContentData).map((v: any, i: number) => (
          <AuditDetailItem data={v} key={i} index={i} />
        ))
      }
      <RejectedNodeModal />
      <AddRolesModal />
    </Wrapper>
  )
})

const Wrapper = styled.div`
  flex: 1;
`