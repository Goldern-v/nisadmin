import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { appStore, authStore } from "src/stores";
import { observer } from "mobx-react-lite";


export interface Props extends RouteComponentProps { }
/* 判断是否本人 */
export const isSelf = () => {
  // return appStore.queryObj.empNo == authStore!.user!.empNo
  return appStore.match.path == "/selfNurseFile/:type";
};
export default observer(function StatePersonnel() {


  useEffect(() => {
  }, [appStore.queryObj]);
  return (
    <div >
      学术活动
    </div>
  );
});
