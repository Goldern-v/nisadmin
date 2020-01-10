import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BaseSetting from './../BaseSetting'
export interface Props { }

export default function StudyContent() {

  return <Wrapper>
    <div className="main-title">《中医自学》</div>
    <BaseSetting />
  </Wrapper>
}
const Wrapper = styled.div``