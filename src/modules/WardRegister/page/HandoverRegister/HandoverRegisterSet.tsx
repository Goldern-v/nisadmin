import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import BreadcrumbBox from 'src/layouts/components/BreadcrumbBox'
import { PageHeader, PageTitle, Place } from 'src/components/common'
import { DatePicker } from 'src/vendors/antd'
import DeptSelect from 'src/components/DeptSelect'
import { appStore } from 'src/stores'
import BaseTabs from 'src/components/BaseTabs'
import TitleTable from './components/TitleTable'
import RemindTable from './components/RemindTable'
import createModal from 'src/libs/createModal'
import EditGoodsModal from './modal/EditGoodsModal'
import EditHandoverModal from './modal/EditHandoverModal'
import emitter from 'src/libs/ev'
export interface Props {}

export default function HandoverRegisterSet() {
  const [activeKey, setActiveKey] = useState('1')

  const editGoodsModal = createModal(EditGoodsModal)
  const editHandoverModal = createModal(EditHandoverModal)
  return (
    <Wrapper>
      <BreadcrumbBox
        data={[
          {
            name: '物品交接登记本',
            link: '/wardRegister'
          },
          {
            name: '物品交接登记本设置'
          }
        ]}
      />
      <PageHeader>
        <PageTitle>物品交接登记本设置</PageTitle>
        <Place />
        {activeKey == '1' && (
          <React.Fragment>
            {/* <Button onClick={() => editGoodsModal.show({})}>添加</Button> */}
            <Button
              onClick={() => {
                emitter.emit('addRegisterItemRow')
              }}
            >
              添加
            </Button>
            <Button
              type='primary'
              onClick={() => {
                emitter.emit('saveRegisterItem')
              }}
            >
              保存
            </Button>
          </React.Fragment>
        )}
        {activeKey == '2' && (
          <React.Fragment>
            <Button onClick={() => editHandoverModal.show({})}>添加交接班次</Button>
          </React.Fragment>
        )}

        <Button onClick={() => appStore.history.push('/wardRegister')}>返回</Button>
      </PageHeader>
      <TabsCon>
        <BaseTabs
          config={[
            {
              title: '标题设置',
              component: <TitleTable />,
              index: '1'
            },
            {
              title: '交班班次与提醒设置',
              component: <RemindTable />,
              index: '2'
            }
          ]}
          onChange={(activeKey: string) => {
            setActiveKey(activeKey)
          }}
        />
      </TabsCon>
      <editGoodsModal.Component />
      <editHandoverModal.Component />
    </Wrapper>
  )
}
const Wrapper = styled.div``

const TabsCon = styled.div`
  margin: 0 20px;
`
