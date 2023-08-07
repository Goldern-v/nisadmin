import { Input } from 'antd'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { handbookModel as model } from '../../../handbook/model'
const { TextArea } = Input
export interface IProps {
  isPreview?: boolean
}
/**固定表-个人总结 */
export default observer(function FixedSummary(props: IProps) {
  const { isPreview = false } = props
  const [value, setValue] = useState('')
  useEffect(() => {
    if (isPreview) {
      setValue('')
    } else if (model.detail) {

    }
  }, [model.detail, isPreview])
  return (
    <Wrapper>
      <div className='title'>个人总结</div>
      <TextArea readOnly={isPreview} value={value} />
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
