import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Place } from 'src/components/common'
import { Select, Input, Button } from 'antd'
import { nurseFilesListViewModel } from '../NurseFilesListViewModel'
import AddNursingModal from '../modal/AddNursingModal'
import DeptSelect from 'src/components/DeptSelect'
import { observer } from 'mobx-react-lite'
import { authStore } from 'src/stores'
import emitter from 'src/libs/ev'

const Option = Select.Option

export default observer(function SelectCon(props: any, context: any) {
  const [visible, setVisible] = useState(false)
  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const onChange = (value: string) => {
    nurseFilesListViewModel.loadNursingList()
  }
  const onSearch = () => {
    nurseFilesListViewModel.loadNursingList()
  }

  useEffect(() => {
    return () => {}
  }, [])

  return (
    <React.Fragment>
      <Wrapper>
        <Title>护士档案</Title>
        <Place />
        {/* <span>科室：</span>
        <DeptSelect onChange={onChange} /> */}

        {/* <Button type='primary' onClick={onSearch}>
          搜索
        </Button> */}
        <Button
          onClick={() => {
            emitter.emit('nurseFileResize')
          }}
        >
          重置
        </Button>
        <Button
          type='primary'
          // style={{ marginLeft: 40, marginBottom: 20 }}
          onClick={() => nurseFilesListViewModel.loadNursingList()}
        >
          查询
        </Button>
        <Button onClick={() => nurseFilesListViewModel.exportExcel()}>导出</Button>
        {authStore.isAdmin && <Button onClick={() => setVisible(true)}>+添加护士</Button>}
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
