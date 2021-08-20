import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import LeftCon from './components/LeftCon'
import MainCon from './components/MainCon'
import AddFormModal from './components/AddFormModal'
import { observer } from 'src/vendors/mobx-react-lite'
import { appStore, authStore } from 'src/stores'
import qs from 'qs'
import { followUpDetailService } from './services/FollowUpDetailService'

export interface Props { }

export default observer(function followUpDetailView() {
  const { queryObj, history, location } = appStore

  const [selectedMenuKey, setSelectedMenuKey] = useState(queryObj.selectedMenuKey || '')

  const selectedId = selectedMenuKey ? selectedMenuKey.split('-')[1] : ''
  const [baseInfo, setBaseInfo] = useState({} as any)
  const [loading, setLoading] = useState(false)

  const [addModalVisible, setAddModalVisible] = useState(false)

  const [followUpList, setFollowUpList] = useState([] as any[])

  /** 获取病人详情包括 */
  const getDetail = () => {
    setLoading(true)
    followUpDetailService
      .getDetailById(queryObj.patientId)
      .then(res => {
        setLoading(false)
        const { data } = res
        if (data) {
          let newBaseInfo = { ...data }
          delete newBaseInfo.visitDiseaseTypeList

          let newFollowUpList = (data.templateList || [])
            .filter((item: any) => item.visitMasterDataList && item.visitMasterDataList.length > 0)
            .map((item: any) => {
              return {
                formName: item.formName,
                formCode: item.formCode,
                formList:
                  item.visitMasterDataList
                    .map((formItem: any) => ({
                      title: formItem.formName,
                      ...formItem
                    }))
              }
            })
          setFollowUpList(newFollowUpList)
          setBaseInfo(newBaseInfo)
        }
      }, () => setLoading(false))
  }

  const handleCloseFollowUp = () => {
    if (baseInfo.patientId) {
      setLoading(true)
      followUpDetailService
        .setVisitEndStatus(baseInfo.patientId)
        .then(res => {
          getDetail()
        }, () => setLoading(false))
    }
  }

  const handleCreateNewForm = (payload: any) => {
    setAddModalVisible(false)
    setLoading(true)

    followUpDetailService
      .saveOrUpdateForm({
        ...payload,
        patientId: queryObj.patientId,
        empNo: authStore.user?.empNo
      })
      .then(res => {
        setLoading(false)
        const { data } = res
        if (data) {
          setSelectedMenuKey(`${data.formCode}-${data.id}`)
          getDetail()
        }
      }, () => setLoading(true))
  }

  useEffect(() => {
    getDetail()
  }, [])

  useEffect(() => {
    history.replace(`${location.pathname}?${qs.stringify({ ...queryObj, selectedMenuKey })}`)
  }, [selectedMenuKey])

  return <Wrapper>
    <LeftCon
      selectedKey={selectedMenuKey}
      onSelectedKeyChange={(key: string) =>
        setSelectedMenuKey(key)}
      baseInfo={baseInfo}
      loading={loading}
      onAddOpen={() => setAddModalVisible(true)}
      onCloseFollowUp={() => handleCloseFollowUp()}
      followUpList={followUpList} />
    <MainCon
      masterId={selectedId}
      loading={loading}
      onAddOpen={() => setAddModalVisible(true)}
      onRefresh={(payload?: any) => {
        const { deleteSelected } = (payload || {})
        if (deleteSelected) setSelectedMenuKey('')

        getDetail()
      }}
    />
    <AddFormModal
      patientId={queryObj.patientId}
      visible={addModalVisible}
      onCancel={() => setAddModalVisible(false)}
      onOk={(payload: any) => handleCreateNewForm(payload)}
    />
  </Wrapper>
})

const Wrapper = styled.div`
  height: calc(100vh - 50px);
  display: flex;
`