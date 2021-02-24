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
  Transfer,
  message
} from "antd"
import { ModalComponentProps } from "src/libs/createModal"
import { observer } from "mobx-react-lite"
import { promotionSettingModel } from "../model/PromotionSettingModel"
import { promotionSettingService } from './../api/PromotionSettingService'

export interface Props extends ModalComponentProps {
  defaultLevelSort?: string,
  onOkCallBack?: Function
}

export default observer(function 临床能力训练重点编辑(props: Props) {
  const { defaultLevelSort, onOkCallBack, visible, onCancel } = props

  const [levelSort, setLevelSort] = useState('')

  const { levelList } = promotionSettingModel

  let [loading, setLoading] = useState(false)

  // let [targetKeys, setTargetKeys] = useState([] as string[])
  let [selectedKeys, setSelectedKeys] = useState([] as string[])
  let [promotionListAll, setPromotionListAll] = useState([] as any[])
  let [targetKeysAll, setTargetKeysAll] = useState([] as any[])

  useLayoutEffect(() => {
    if (visible) {
      setLevelSort(defaultLevelSort || '')
      getPromotionListAll(() => getCurentSettingAll(defaultLevelSort || ''))
    }
  }, [visible])

  const handleOk = () => {

    console.log(targetKeysAll)

    let paramsArr = targetKeysAll.map((targetKey: any, idx: any) => {
      let promoteType = ''

      let sort = idx.toString()

      let target = levelList.find((item: any) => item.sort == sort)
      let targetPromotionList = promotionListAll[idx] || []
      let trainingKeyPointList = targetKey
        .map((key: any) => {
          let formatItem = {}
          let targetPromotionItem = targetPromotionList.find((promotionItem: any) => promotionItem.trainingKeyPointId === key)

          if (targetPromotionItem) {
            const { trainingKeyPointId, trainingKeyPointName } = targetPromotionItem
            formatItem = {
              trainingKeyPointId,
              trainingKeyPointName,
            }
          }

          return formatItem
        }).filter((filterItem: any) => Object.keys(filterItem).length > 0)

      if (target.title) promoteType = target.title

      return {
        promoteType,
        trainingKeyPointList: trainingKeyPointList.map((item: any, idx: number) => {
          return {
            ...item,
            sort: idx + 1
          }
        })
      }
    })

    setLoading(true)

    let saveReqArr = paramsArr.map((params: any) => {
      return promotionSettingService.eidtTrainingKeyPoint(params)
    })

    Promise.all(saveReqArr).then(res => {
      setLoading(false)
      message.success('保存成功', 1, () => {
        setLoading(false)
        onOkCallBack && onOkCallBack()
        onCancel && onCancel()
      })
    }, err => setLoading(false))
  }

  const getPromotionListAll = (callback?: Function) => {
    setLoading(true)
    setSelectedKeys([])

    let reqArr = levelList.map((item: any) => {
      return promotionSettingService
        .getLevelTrainingKeyPoint(item.title)
    })

    Promise
      .all(reqArr)
      .then(resAll => {
        setLoading(false)
        let newList = resAll.map((res) => res.data || [])
        setPromotionListAll(newList)
        callback && callback(newList)
      }, () => setLoading(false))
  }

  const getCurentSettingAll = (levelSort: string) => {
    // let target = levelList.find((item: any) => item.sort == levelSort)
    let reqArr = levelList.map((item: any) => {
      return promotionSettingService.getTrainingKeyPointConfig(item.title)
    })
    // if (!target) return

    setSelectedKeys([])
    // setTargetKeys([])
    setLoading(true)

    Promise
      .all(reqArr)
      .then(res => {
        setLoading(false)

        setTargetKeysAll(
          res.map(
            (res: any) => res.data.map((item: any) => item.trainingKeyPointId)
          )
        )
      }, err => setLoading(false))
  }

  const handleTabChange = (idx: string) => {
    setLevelSort(idx)
    setSelectedKeys([])
    // getCurentSetting(idx)
  }

  //当前层级所有的晋升条件
  let promotionList = [] as any[]
  if (promotionListAll[Number(levelSort)])
    promotionList = promotionListAll[Number(levelSort)]

  //当前层级勾选的晋升条件
  let visibleTargetKey = [] as any[]
  if (targetKeysAll[Number(levelSort)])
    visibleTargetKey = targetKeysAll[Number(levelSort)]

  const renderItem = (item: any) => {
    let draggable = false
    let itemIdx = visibleTargetKey.indexOf(item.title)
    if (itemIdx >= 0) draggable = true

    return <DragCon
      draggable={draggable}
      style={{ width: 200 }}
      onDragStart={(e) => {
        e.dataTransfer.setData('dragIdx', itemIdx.toString())
      }}
      onDragOver={(e: any) => {
        if (itemIdx < 0) return
        e.preventDefault()
        e.target.parentNode.parentNode.style.background = '#eee'
      }}
      onDragLeave={(e: any) => {
        if (itemIdx < 0) return
        e.preventDefault()
        e.target.parentNode.parentNode.style.background = '#fff'
      }}
      onDrop={(e: any) => {
        if (itemIdx < 0) return
        e.preventDefault()
        e.target.parentNode.parentNode.style.background = '#fff'

        if (itemIdx < 0) return
        let newTargetKeys = visibleTargetKey.concat()
        let dragIdx = Number(e.dataTransfer.getData('dragIdx'))
        let cacheKey = newTargetKeys[dragIdx]
        newTargetKeys[dragIdx] = newTargetKeys[itemIdx]
        newTargetKeys[itemIdx] = cacheKey

        // setTargetKeys(newTargetKeys)
        if (levelSort || levelSort === '0') {
          if (targetKeysAll[Number(levelSort)]) {
            targetKeysAll[Number(levelSort)] = newTargetKeys
            setTargetKeysAll([...targetKeysAll])
          }
        }
      }}>
      {item.title}
    </DragCon>
  }



  return (
    <Modal
      width={600}
      confirmLoading={loading}
      bodyStyle={{ padding: 0, paddingBottom: "10px" }}
      title="临床能力训练重点编辑"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="确定"
      centered
      forceRender
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
              targetKeys={visibleTargetKey}
              selectedKeys={selectedKeys}
              render={item => renderItem(item)}
              listStyle={{ width: "267px", height: "300px" }}
              onSelectChange={(keys: string[], keys1: string[]) =>
                setSelectedKeys(keys.concat(keys1))
              }
              onChange={(keys: any) => {
                if (levelSort || levelSort === '0') {
                  if (targetKeysAll[Number(levelSort)]) {
                    targetKeysAll[Number(levelSort)] = keys
                    setTargetKeysAll([...targetKeysAll])
                  }
                }
                // setTargetKeys(keys)
              }}
              dataSource={promotionList.map((item: any) => {
                return {
                  key: item.trainingKeyPointId,
                  title: item.trainingKeyPointName,
                  description: item.name
                }
              })}
              titles={["未选要求", "已选要求"]}
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

const DragCon = styled.div`
    width:216px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
`
