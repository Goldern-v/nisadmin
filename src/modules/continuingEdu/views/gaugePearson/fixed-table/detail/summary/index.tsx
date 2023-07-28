import { observer } from 'mobx-react'
import React from 'react'
import styled from 'styled-components'

export interface IProps {
}
/**固定表-个人总结 */
export default observer(function FixedSummary(props: IProps) {
  return (
    <Wrapper>
      <div className='title'>个人总结</div>
    </Wrapper>
  )
})

const Wrapper: any = styled.div`
width: 210mm;
/* height: 960mm; */
.title {
  line-height: 32px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
`
