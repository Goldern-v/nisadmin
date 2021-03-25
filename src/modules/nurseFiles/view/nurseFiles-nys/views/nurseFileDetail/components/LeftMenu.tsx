import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'
import qs from 'qs'

import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import emitter from 'src/libs/ev'
import { nurseFilesService } from '../../../services/NurseFilesService'
import { ScrollBox } from 'src/components/common'
interface RouteType {
  type: string
  component: any
  name: string
  indexList?: string[]
}

export interface Props {
  routeList: RouteType[]
}

const BG = require('../../../images/侧边背景.png')

export default function LeftMenu(props: Props) {
  let history = appStore.history
  let {
    path,
    params: { type }
  } = appStore.match

  let [listInfo, setListInfo] = useState([])

  const onLoad = () => {
    nurseFilesService.findByEmpNo(appStore.queryObj.empNo).then((res) => {
      setListInfo(res.data)
      let badgeTotal: number = res.data.reduce((total: number, item: any) => {
        return total + item.statusColorNum
      }, 0)
      nurseFileDetailViewModal.badgeTotal = badgeTotal
    })
  }
  useEffect(() => {
    emitter.addListener('refreshNurseFileDeatilLeftMenu', onLoad)
    onLoad()
    return () => {
      emitter.removeAllListeners('refreshNurseFileDeatilLeftMenu')
    }
  }, [])
  return (
    <Wrapper>
      {props.routeList.map((item: RouteType) => {
        let isActive: string = type === item.type ? 'active' : ''

        let isBadge = false
        if (item.indexList) {
          //如果一个面板里面包含多个模块 只要有一个模块statusColor为1 isBadge为true
          let targetListInfo = listInfo.filter((info: any) => (item.indexList || []).indexOf(info.name) >= 0)

          if (targetListInfo) {
            let isBadgeItem = targetListInfo.find((info: any) => info && info.statusColor === '1')

            if (isBadgeItem) isBadge = true
          }
        } else {
          let itemInfo: any = listInfo.find((info: any) => info.name === item.name)

          isBadge = itemInfo && itemInfo.statusColor === '1'
        }
        return (
          <Li
            className={isActive}
            key={item.name}
            onClick={() => {
              history.push('/nurseFileDetail/' + item.type + `?${appStore.query}`)
              // emitter.emit('护士档案左侧信息', item.name)
              // console.log('点击了')
            }}
          >
            {item.name}
            {isBadge && <Badge />}
          </Li>
        )
      })}
    </Wrapper>
  )
}

// @ts-ignore
const Wrapper = styled(ScrollBox)`
  height: 100%;
  background: url(${BG});
  overflow-y: auto;
  background-size: 100% auto;
  background-repeat: no-repeat;
`
const Li = styled.div`
  height: 32px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 30px;
  padding: 0 16px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  position: relative;
  &:hover,
  &.active {
    color: #fff;
    background: ${(p) => p.theme.$mtc};
  }
`
const Badge = styled.div`
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ff3b30;
  left: 4px;
  top: 4px;
`
