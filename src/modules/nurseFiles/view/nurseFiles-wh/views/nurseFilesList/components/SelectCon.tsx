import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Place } from 'src/components/common'
import { Button } from 'antd'
import { nurseFilesListViewModel } from '../NurseFilesListViewModel'
import AddNursingModal from '../modal/AddNursingModal'
import { observer } from 'mobx-react-lite'
import { appStore, authStore } from 'src/stores'
import emitter from 'src/libs/ev'

export default observer(function SelectCon(props: any, context: any) {
  const [visible, setVisible] = useState(false)
  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <React.Fragment>
      <Wrapper>
        <Title>护士档案</Title>
        <Place />
        <Button
          onClick={() => {
            emitter.emit('nurseFileResize')
          }}
        >
          重置
        </Button>
        <Button
          type='primary'
          onClick={() => nurseFilesListViewModel.loadNursingList()}
        >
          查询
        </Button>
        <Button onClick={() => nurseFilesListViewModel.exportExcel()}>导出</Button>
        {
          appStore.hisMatch({
            map: {
              'wjgdszd': (authStore.isRoleManage || authStore.isDepartment) && <Button onClick={() => setVisible(true)}>+添加护士</Button>,
              default: authStore.isAdmin && <Button onClick={() => setVisible(true)}>+添加护士</Button>
            },
            vague:true
          })
        }
      </Wrapper>
      <AddNursingModal visible={visible} handleOk={handleOk} handleCancel={handleCancel} />
    </React.Fragment>
  )
})
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: #333;
  margin-bottom: 15px;
  input,
  button {
    margin-left: 10px;
  }
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`
