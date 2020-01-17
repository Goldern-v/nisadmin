import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Modal,
  Tabs,
  Spin,
  // Button,
  // Radio,
  // DatePicker,
  // Select,
  // message,
  Transfer
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import { observer } from 'mobx-react-lite'
import { promotionSettingModel } from '../model/PromotionSettingModel'

export interface Props extends ModalComponentProps { }

export default observer(function RequestEditModal(props: Props) {
  let { config } = promotionSettingModel
  let { visible, onCancel } = props
  let [loading, setLoading] = useState(false)
  let [activeIdx, setActiveIdx] = useState('0')
  let [targetKeys, setTargetKeys] = useState([] as string[])
  let [selectedKeys, setSelectedKeys] = useState([] as string[])

  useLayoutEffect(() => { }, [visible])

  const handleOk = () => { }

  const handleTabChange = (idx: string) => {
    setActiveIdx(idx)
    setSelectedKeys([])
    setTargetKeys([])
  }

  const levelList = [
    {
      title: 'N0升N1',
      index: 0
    },
    {
      title: 'N1升N2',
      index: 1
    }
  ]

  return <Modal
    confirmLoading={loading}
    bodyStyle={{ padding: 0, paddingBottom: '10px' }}
    title="晋升要求编辑"
    visible={visible}
    onCancel={onCancel}
    onOk={handleOk}
    okText="确定"
    centered>
    <Wrapper>
      <Tabs
        activeKey={activeIdx}
        type="card"
        style={{ marginTop: '5px' }}
        onChange={(idx: string) => handleTabChange(idx)}>
        {levelList.map((item: any) =>
          <Tabs.TabPane key={item.index} tab={item.title} disabled={loading}></Tabs.TabPane>)}
      </Tabs>
      <Spin spinning={loading}>
        <div className="tabs-content">
          <Transfer
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            render={item => item.title}
            listStyle={{ width: '225px' }}
            onSelectChange={(keys: string[], keys1: string[]) => setSelectedKeys(keys.concat(keys1))}
            onChange={(keys: any) => setTargetKeys(keys)}
            dataSource={Object.keys(config).map((key: string) => {
              let item = config[key]
              return {
                key,
                title: item.title,
                description: item.title
              }
            })}
            titles={['全部要求', '已选要求']} />
        </div>
      </Spin>
    </Wrapper>
  </Modal>
})

const Wrapper = styled.div`
  .tabs-content{
    padding-left: 10px;
  }
  .ant-tabs-nav{
    padding-left: 3px;
  }
`