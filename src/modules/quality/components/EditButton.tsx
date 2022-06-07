import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { NativeButtonProps } from 'antd/es/button/button'
export interface Props extends NativeButtonProps {
  border?: boolean
}
// 是否需要disabled
export default function EditButton(props: Props) {

  return <ButtonStyl {...props} icon={'edit'} border={props.border ? 1 : 0} />
}
const ButtonStyl = styled(Button)<{ border: number }>`
  &.ant-btn {
    ${(p) => !p.border && 'border: 0'};
    &.ant-btn {
      background: rgba(0, 0, 0, 0);
      box-shadow: none;
      height: 24px;
    }
    &.ant-btn[disabled],
    &.ant-btn[disabled]:hover {
      background: rgba(0, 0, 0, 0);
    }
  }
`
