import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import LeftCon from './components/LeftCon'
import MainCon from './components/MainCon'
import { observer } from 'src/vendors/mobx-react-lite'
import { appStore } from 'src/stores'
import qs from 'qs'

export interface Props { }

export default observer(function followUpDetailView() {
  const { queryObj, history, location, match } = appStore

  const [selectedMenuKey, setSelectedMenuKey] = useState(queryObj.selectedMenuKey || '')
  const [baseInfo, setBaseInfo] = useState({} as any)

  const [followUpList, setFollowUpList] = useState([
    {
      formName: '表单类型1',
      formCode: 'form_code_1',
      formList: [
        { name: '表单类型1', creatorName: '张敏敏', createTime: '2021-06-01', id: '1' },
        { name: '表单类型1', creatorName: '张敏敏', createTime: '2021-06-02', id: '2' },
        { name: '表单类型1', creatorName: '张敏敏', createTime: '2021-06-03', id: '3' },
      ]
    },
    {
      formName: '表单类型2',
      formCode: 'form_code_2',
      formList: [
        { name: '表单类型2', creatorName: '张敏敏', createTime: '2021-06-01', id: '1' },
        { name: '表单类型2', creatorName: '张敏敏', createTime: '2021-06-02', id: '2' },
        { name: '表单类型2', creatorName: '张敏敏', createTime: '2021-06-03', id: '3' },
      ]
    },
    {
      formName: '表单类型3',
      formCode: 'form_code_3',
      formList: [
        { name: '表单类型3', creatorName: '张敏敏', createTime: '2021-06-01', id: '1' },
        { name: '表单类型3', creatorName: '张敏敏', createTime: '2021-06-02', id: '2' },
        { name: '表单类型3', creatorName: '张敏敏', createTime: '2021-06-03', id: '3' },
        { name: '表单类型3', creatorName: '张敏敏', createTime: '2021-06-04', id: '4' },
        { name: '表单类型3', creatorName: '张敏敏', createTime: '2021-06-05', id: '5' },
        { name: '表单类型3', creatorName: '张敏敏', createTime: '2021-06-06', id: '6' },
      ]
    },
  ] as any[])

  useEffect(() => {
    history.replace(`${location.pathname}?${qs.stringify({ ...queryObj, selectedMenuKey })}`)
  }, [selectedMenuKey])

  return <Wrapper>
    <LeftCon
      selectedKey={selectedMenuKey}
      onSelectedKeyChange={(key: string) =>
        setSelectedMenuKey(key)}
      followUpList={followUpList} />
    <MainCon />
  </Wrapper>
})

const Wrapper = styled.div`
  height: calc(100vh - 50px);
  display: flex;
`