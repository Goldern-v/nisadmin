import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import AddPop from '../components/AddPop'
import createModal from 'src/libs/createModal'
const addPop = createModal(AddPop)
export default function AddButton () {
  return (
    <Con>
      <Button onClick={() => addPop.show()}>添加</Button>
      <addPop.Component />
    </Con>
  )
}

const Con = styled.div`
  padding: 0 30px;
`
