import styled from "styled-components"
import React, { useState, useEffect, useLayoutEffect } from "react"
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
} from "antd"
import { ModalComponentProps } from "src/libs/createModal"
import { observer } from "mobx-react-lite"
import { promotionSettingModel } from "../model/PromotionSettingModel"
import { promotionSettingService } from './../api/PromotionSettingService'

export interface Props extends ModalComponentProps {
  defaultLevelSort?: string
}

export default observer(function RequestEditModal(props: Props) {
  const { defaultLevelSort } = props
  const [levelSort, setLevelSort] = useState('')
  const { levelList } = promotionSettingModel
  let { visible, onCancel } = props
  let [loading, setLoading] = useState(false)
  let [targetKeys, setTargetKeys] = useState([] as string[])
  let [selectedKeys, setSelectedKeys] = useState([] as string[])
  let [promotionList, setPromotionList] = useState([] as string[])

  useLayoutEffect(() => {
    if (visible) {
      setLevelSort(defaultLevelSort || '')
      getPromotionList()
    }
  }, [visible])

  const handleOk = () => { }

  const getPromotionList = (callback?: Function) => {
    setLoading(true)
    setSelectedKeys([])
    setTargetKeys([])

    let reqArr = [
      promotionSettingService.getAllPromoteRequest(),
    ]

    Promise.all(reqArr).then(res => {
      setLoading(false)
      let newList = res[0].data || []
      setPromotionList(newList)
      callback && callback(newList)
    }, () => setLoading(false))
  }

  const handleTabChange = (idx: string) => {
    setLevelSort(idx)
    setSelectedKeys([])
    setTargetKeys([])
  }

  return (
    <Modal
      width={600}
      confirmLoading={loading}
      bodyStyle={{ padding: 0, paddingBottom: "10px" }}
      title="晋升要求编辑"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="确定"
      centered
    >
      <Wrapper>
        <Tabs
          activeKey={levelSort}
          type="card"
          style={{ marginTop: "5px" }}
          onChange={(idx: string) => handleTabChange(idx)}
        >
          {levelList.map((item: any) => (
            <Tabs.TabPane
              key={item.sort}
              tab={item.title}
              disabled={loading}
            />
          ))}
        </Tabs>
        <Spin spinning={loading}>
          <div className="tabs-content">
            <Transfer
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              render={item => item.title}
              listStyle={{ width: "267px", height: "300px" }}
              onSelectChange={(keys: string[], keys1: string[]) =>
                setSelectedKeys(keys.concat(keys1))
              }
              onChange={(keys: any) => setTargetKeys(keys)}
              dataSource={promotionList.map((item: any) => {
                return {
                  key: item.code,
                  title: item.name,
                  description: item.name
                }
              })}
              titles={["全部要求", "已选要求"]}
            />
          </div>
        </Spin>
      </Wrapper>
    </Modal>
  )
})

const Wrapper = styled.div`
  .tabs-content {
    padding-left: 10px;
  }
  .ant-tabs-nav {
    padding-left: 3px;
  }
`
