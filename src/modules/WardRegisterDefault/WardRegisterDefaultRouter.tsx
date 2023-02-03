import styled from "styled-components";
import React, { useEffect, useState } from "react";
import LeftMenuPage from "src/components/LeftMenuPage";
import { appStore } from "src/stores";
import { ReactComponent as ZDHZ } from "./images/icon/ZDHZ.svg";
import 默认病区登记表记本 from "./page/默认病区登记表记本/默认病区登记表记本";
import IndexPage from './page/IndexPage'
import { wardRegisterDefaultService } from './services/WardRegisterDefaultService'
import { observer } from "mobx-react-lite";

function WardRegisterDefaultRouter() {

  const [registerList, setRegisterList] = useState([] as any)
  const [loading, setLoading] = useState(false)
  const HOSPITAL_FLAG = ['whyx', 'fsxt', '925', 'lyyz', 'qhwy', 'wjgdszd', 'whhk', 'dglb', 'dgxg'].includes(appStore.HOSPITAL_ID)

  const leftMenuConfig = [
    {
      title: "首页",
      path: "/wardRegister",
      hide: true,
      component: IndexPage
    },
    ...registerList.map((item: any) => ({
      title: item.registerName,
      path: `/wardRegister/${item.registerCode}`,
      component: { ...默认病区登记表记本 },
      hide: HOSPITAL_FLAG ? false : !item.menu,
      icon: <ZDHZ />,
      payload: {
        registerCode: item.registerCode,
        registerName: item.registerName
      },
      custom: {
        textColor: HOSPITAL_FLAG ? item.color : ''
      }
    }))
  ]
  // 1：日 2：周 3：月 4：班次
  const colorList = [
    '',
    '#00c8ff',
    '#804000',
    '#f5df81',
    '#f00'
  ]
  const initNavList = () => {
    setLoading(true)
    if (HOSPITAL_FLAG) {
      wardRegisterDefaultService.getMenuByDeptCode()
        .then(res => {
          if (res.data) setRegisterList(res.data.map((item: any) => ({
            ...item,
            color: item.color || (item.inventoryTimeType ? colorList[item.inventoryTimeType] : '')
          })))
          setLoading(false)
        }, () => setLoading(false))
    } else {
      wardRegisterDefaultService.getMenu()
        .then(res => {
          setLoading(false)
          if (res.data) setRegisterList(res.data.map((menuItem: any) => {
            let pathArr = menuItem.url.split('/')
            let registerCode = pathArr[pathArr.length - 1]

            return {
              ...menuItem,
              registerName: menuItem.name,
              registerCode,
            }
          }))
        }, () => setLoading(false))
    }
  }
  useEffect(() => {
    initNavList()
  }, [])

  return (
    <Wrapper>
      <LeftMenuPage
        leftMenuConfig={leftMenuConfig}
        stopActiveNext={true}
        loading={loading} />
    </Wrapper>
  );
}

export default observer(WardRegisterDefaultRouter)

const Wrapper = styled.div`
  #left-menu-con {
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;
