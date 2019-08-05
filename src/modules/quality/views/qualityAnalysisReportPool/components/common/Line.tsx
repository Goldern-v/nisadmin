import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
export interface Props {}

export default function Line() {
  const Wrapper = styled.div`
    height: 1px;
    background: #ddd;
    margin: 5px 0;
  `
  return <Wrapper />
}
