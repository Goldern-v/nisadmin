import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import PromotionAppHeader from './components/PromotionAppHeader'
import {PromotionAppUtils} from './PromotionAppUtils'
import { appStore, authStore } from "src/stores/index";
import moment from 'moment'

export default observer(function PromotionApplication() {
  useEffect(()=>{
    PromotionAppUtils.getTimingUser(authStore.user?.empNo).then((res=>{
      if(res.data){
        PromotionAppUtils.master = {
          id: '', // 晋升表code
          formCode: 'HSJS_0001', // 晋升表code
          formName: "N0->N1", // 晋升表名称
          status: "-1", // 晋升表状态
          nextNodeCode: "" , // 提交&&创建&&保存
          creatorNo: res.data.empNo,
          creatorName: res.data.empName,
          updaterNo: res.data.empNo,
          updaterName: res.data.empName,
          updateTime: moment().format("YYYY-MM-DD HH:mm"),
          currentLevel: res.data.nurseHierarchy,
          deptName: res.data.deptName,
          empNo: res.data.empNo,
          empName: res.data.empNo,
          chainCode: "HSJS_COMMON",
          chainName: "护士晋升申请通用",
          attachmentCount: 0,
          lastCommitTime: "2022-07-20 14:51",
          hasRead: false,
          noPass: false,
          year:moment().format('YYYY')
        };
      }else{
        PromotionAppUtils.master = {
          id: '', // 晋升表code
          formCode: 'HSJS_0001', // 晋升表code
          formName: "N0->N1", // 晋升表名称
          status: "-1", // 晋升表状态
          nextNodeCode: "" , // 提交&&创建&&保存
          creatorNo: authStore.user?.empNo,
          creatorName: authStore.user?.empName,
          updaterNo: authStore.user?.empNo,
          updaterName: authStore.user?.empName,
          updateTime: moment().format("YYYY-MM-DD HH:mm"),
          currentLevel: authStore.user?.nurseHierarchy,
          deptName: authStore.user?.deptName,
          empNo: authStore.user?.empNo,
          empName: authStore.user?.empNo,
          chainCode: "HSJS_COMMON",
          chainName: "护士晋升申请通用",
          attachmentCount: 0,
          lastCommitTime: "2022-07-20 14:51",
          hasRead: false,
          noPass: false,
          year:moment().format('YYYY')
        };
      }
    }))
   console.log( PromotionAppUtils.master);
   
    PromotionAppUtils.createOnload()
   
  },[])
  return (
    <Wrapper>
      {/* 头部 */}
      <PromotionAppHeader></PromotionAppHeader>
      {/* 主体 */}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  height: 100%;
  padding: 8px 10px;
`