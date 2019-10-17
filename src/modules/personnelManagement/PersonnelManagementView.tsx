import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import LeftMenuPage from 'src/components/LeftMenuPage'
import ArrangeHome from './views/arrangeHome/ArrangeHome'
import DeptBorrowNew from 'src/modules/personnelManagement/views/arrangeHome/page/deptBorrow/DeptBorrow'
import NurseSettingViewNew from 'src/modules/personnelManagement/views/arrangeHome/page/NurseSetting/NurseSettingView'
import ShiftSettingViewNew from 'src/modules/personnelManagement/views/arrangeHome/page/ShiftSetting/ShiftSettingView'
import MealSettingViewNew from 'src/modules/personnelManagement/views/arrangeHome/page/MealSetting/MealSettingView'
import PersonnelSettingViewNew from 'src/modules/personnelManagement/views/arrangeHome/page/PersonnelSetting/PersonnelSettingView'
import { appStore } from 'src/stores'
import PersonnelSecondment from './views/arrangeHome/page/personnelSecondment/PersonnelSecondment'

export interface Props {}

export default function PersonnelManagementView() {
  const leftMenuConfig = [
    {
      title: '排班管理',
      path: '/personnelManagement',

      children: [
        {
          title: '护士排班',
          path: '/personnelManagement/arrangeHome',
          component: ArrangeHome,
          style: { background: '#fff' }
        },
        appStore.HOSPITAL_ID == 'wh'
          ? {
              title: '临时人员借调',
              path: '/personnelManagement/DeptBorrowNew',
              component: PersonnelSecondment,
              style: { background: '#fff' }
            }
          : {
              title: '科室借用',
              path: '/personnelManagement/DeptBorrowNew',
              component: DeptBorrowNew
            },
        {
          title: '人员分组',
          path: '/personnelManagement/PersonnelSettingViewNew',
          component: PersonnelSettingViewNew
        },
        {
          title: '排班人员设置',
          path: '/personnelManagement/NurseSettingViewNew',
          component: NurseSettingViewNew
        },
        {
          title: '班次设置',
          path: '/personnelManagement/ShiftSettingViewNew',
          component: ShiftSettingViewNew
        },
        {
          title: '排班套餐设置',
          path: '/personnelManagement/MealSettingViewNew',
          component: MealSettingViewNew
        }
      ]
    }
  ]
  return (
    <Wrapper>
      <LeftMenuPage leftMenuConfig={leftMenuConfig} />
    </Wrapper>
  )
}
const Wrapper = styled.div``
