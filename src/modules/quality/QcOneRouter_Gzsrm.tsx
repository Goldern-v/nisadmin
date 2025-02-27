import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import QualityControlRecord from './views/qualityControlRecord/QualityControlRecord'
import { Provider, KeepAlive } from 'react-keep-alive'

import { ReactComponent as EJZK } from './images/icon/EJZK.svg'
import { ReactComponent as YDBG } from './images/icon/YDBG2.svg'
import { ReactComponent as HZBG } from "./images/icon/HZBG.svg"
import 护理质量巡查情况汇总表 from './views/qcFormHj/护理质量巡查情况汇总表'
import { appStore } from 'src/stores'
import 护理质量检查小结 from './views/qcFormGzsrm/护理质量检查小结'
import 质控表单汇总 from './views/qcDghl/质控表单汇总'
import 一级质控问题原因措施汇总 from './views/qcFormGzsrm/一级质控问题原因措施汇总'
import 福清一级质控问题原因措施汇总 from './views/qcFormFqfybjy/一级质控问题原因措施汇总'
import { ReactComponent as JCTJ } from "./images/icon/JCTJ.svg";
export interface Props extends RouteComponentProps<{ name?: string }> { }

export default function QcOneRouterHj(props: Props) {

  const route_质控记录 = {
    title: '一级质控记录',
    path: '/qcOneGzsrm',
    icon: <EJZK />,
    component: { ...QualityControlRecord },
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
  }

  const route_护理质量巡查情况汇总表 = {
    title: '护理质量巡查情况汇总表',
    icon: <YDBG />,
    path: '/qcOneGzsrm/护理质量巡查情况汇总表?qcLevel=1',
    component: 护理质量巡查情况汇总表,
    keepAlive: true,
    // hide: !appStore.isDev,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== 'POP'
  }

  const route_护理质量检查小结 = {
    title: "护理质量检查小结",
    icon: <YDBG />,
    path: "/qcOneGzsrm/护理质量检查小结?qcLevel=1",
    component: 护理质量检查小结,
    keepAlive: true,
    // hide: !appStore.isDev,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  }

  const route_质控表单汇总 = {
    title: "单个质控表单汇总",
    icon: <HZBG />,
    path: "/qcOneGzsrm/质控表单汇总?qcLevel=1",
    component: 质控表单汇总,
    keepAlive: true,
    disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP"
  }
  const route_一级质控问题原因措施汇总 = {
    title: "一级质控问题原因措施汇总",
    path: "/qcOneGzsrm/一级质控问题原因措施汇总?qcLevel=1",
    icon: <JCTJ />,
    component: 一级质控问题原因措施汇总
  }
  const route_福清一级质控问题原因措施汇总 = {
    title: "一级质控问题原因措施汇总",
    path: "/qcOneGzsrm/一级质控问题原因措施汇总?qcLevel=1",
    icon: <JCTJ />,
    component: 福清一级质控问题原因措施汇总
  }

  const LEFT_MENU_CONFIG: any = [
    route_质控记录,
    route_护理质量检查小结,
    ...appStore.hisMatch({
      map: {
        dghl: [route_质控表单汇总],
        gzsrm: [route_一级质控问题原因措施汇总,],
        925: [route_一级质控问题原因措施汇总,],
        fqfybjy: [route_福清一级质控问题原因措施汇总],
        other: []
      }
    })
  ]

  useEffect(() => { }, [props.history.location.pathname])
  let currentRoutePath = props.history.location.pathname || ''
  let currentRoute = getTargetObj(LEFT_MENU_CONFIG, 'path', currentRoutePath)
  // 筛选目标对象
  function getTargetObj(listDate: any, targetKey: string, targetName: string) {
    let chooseRoute = listDate.find((item: any) => {
      if (item.children) {
        return item.children.find((item1: any) => item1[targetKey].split('?')[0] === targetName)
      } else {
        return item[targetKey].split('?')[0] === targetName
      }
    })
    if (chooseRoute && chooseRoute.children) {
      chooseRoute = chooseRoute.children.find((item1: any) => item1[targetKey] === targetName)
    }
    return chooseRoute
  }

  return (
    <Wrapper>
      <LeftMenuCon>
        <LeftMenu config={LEFT_MENU_CONFIG} />
      </LeftMenuCon>
      <MainCon>
        {currentRoute &&
          currentRoute.component &&
          (currentRoute.keepAlive ? (
            <KeepAlive name={currentRoute.path} disabled={currentRoute.disabledKeepAlive}>
              <currentRoute.component getTitle={currentRoute && currentRoute.title} />
            </KeepAlive>
          ) : (
            <currentRoute.component getTitle={currentRoute && currentRoute.title} />
          ))}
      </MainCon>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  overflow: hidden;
  height: calc(100vh - 50px);
  display: flex;
  align-items: stretch;
`

const LeftMenuCon = styled.div`
  width: 200px;
`
const MainCon = styled.div`
  flex: 1;
  width: 0;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`
