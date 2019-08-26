import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {}

export default function Cell() {
  const onContextMenu = () => {}

  return <Wrapper onContextMenu={onContextMenu} />
}
const Wrapper = styled.div``
