import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import { appStore } from 'src/stores'
import qs from 'qs'
// import { nurseFilesService } from 'src/modules/nurseFiles/services/NurseFilesService'
// import { nurseFileDetailViewModal } from '../NurseFileDetailViewModal'
import { message } from 'antd'
interface RouteType {
  type: string
  component: any
  name: string
}

export interface Props {
  routeList: RouteType[]
  type: string
}

// const BG = require('../../../images/侧边背景.png')
let type = ''

export default function LeftMenu (props: Props) {
  let history = appStore.history
  // let {
  //   path,
  //   params: { type }
  // } = appStore.match

  try {
    type = history.location.pathname.replace('/badEvents/', '')
  } catch (error) {
    type = ''
  }

  // console.log('history', history, history.location.pathname, type)

  let [listInfo, setListInfo] = useState([])

  useEffect(() => {
    // nurseFilesService.findByEmpNo(appStore.queryObj.empNo).then((res) => {
    //   setListInfo(res.data)
    //   let badgeTotal: number = res.data.reduce((total: number, item: any) => {
    //     return total + item.detailNumber
    //   }, 0)
    //   nurseFileDetailViewModal.badgeTotal = badgeTotal
    // })
  }, [])
  return (
    <Wrapper>
      {props.routeList.map((item: RouteType) => {
        let isActive: string = type === item.type ? 'active' : ''
        let itemInfo: any = listInfo.find((info: any) => info.name === item.name)
        let isBadge: any = itemInfo && itemInfo.statusColor === '1'
        return (
          <Li
            className={isActive}
            key={'LI' + item.name + item.type}
            onClick={() => {
              console.log(item.type)
              history.push({ pathname: '/badEvents/' + item.type, state: { type: item.type } })
              // history.push('/badEvents/' + item.type + `?${appStore.query}`)
            }}
          >
            <span>{item.name}</span>
            {isBadge && <Badge />}
          </Li>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  height: 100%;
  width: 220px;
  span {
    vertical-align: text-top;
  }
`
const Li = styled.div`
  height: 47px;
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
