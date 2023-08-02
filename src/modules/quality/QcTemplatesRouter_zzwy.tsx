import LeftMenu from 'src/components/LeftMenu'
import styled from 'styled-components'
import React, { useEffect } from 'react'
import { RouteComponentProps } from 'src/components/RouterView'
import { KeepAlive } from 'react-keep-alive'
import { appStore, authStore } from 'src/stores'

import { ReactComponent as HZBG } from './images/icon/HZBG.svg'

import QcTempManage from './views/qcTemplates/qcTemplatesManage/QcTempManage'
export interface Props extends RouteComponentProps<{ name?: string }> { }

export default function QcOneRouterHj(props: Props) {


  const LEFT_MENU_CONFIG: any = [
    {
      title: "质控模板管理",
      icon: <HZBG />,
      path: "/qcTemplates/qcTemplatesManage",
      component: QcTempManage,
      // hide: !authStore.level3publishedWatch,
      keepAlive: true,
      disabledKeepAlive: (appStore.history && appStore.history.action) !== "POP",
    },
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
