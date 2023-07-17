import styled from "styled-components";
import React, { useEffect, useLayoutEffect } from "react";
import NavBar from "./components/NavBar";
import RouterView, { RouteComponentProps } from "src/components/RouterView";
import store, { appStore } from "src/stores";
import service from "src/services/api";
import { observer } from "mobx-react-lite";
import AduitModal from "../global/modal/AduitModal";
import AduitModalWh from "../global/modal/AduitModal-wh";
import createModal from "src/libs/createModal";
import { globalModal } from "src/global/globalModal";
import GroupsAduitModal from "src/global/modal/GroupsAduitModal";
import GroupsAduitModalWh from "src/global/modal/GroupsAduitModal-wh";
import GroupsAduitModalNew from "src/global/modal/GroupsAduitModalNew";
import FullPageLoading from "src/components/loading/FullPageLoading";
import SignModal from "src/global/modal/SignModal";
export interface Props extends RouteComponentProps {}
/**是否武汉版本 */
const isWhText = 'wh,gzsrm,gxjb,fsxt,fssdy,whyx,sdlj,lyrm,gdtj,qhwy,lyyz,wjgdszd,zzwy,zhzxy,whhk,925,ytll,dglb,whsl,stmz,qzde,dghm,zjhj'
export default observer(function MainLayout(props: Props) {
  const { payload } = props;
  /** 数据初始化 */
  store.appStore.history = props.history;
  store.appStore.match = props.match;
  store.appStore.location = props.location;
  const aduitModalRef: any = React.createRef();
  const groupsAduitModalRef: any = React.createRef();

  /** 审核模块区分 */
  let aduitModal = appStore.hisMatch({
    map: {
      [isWhText]: createModal(AduitModalWh),
      other: createModal(AduitModal),
    },
    vague: true,
  });

  let groupsAduitModal = appStore.hisMatch({
    map: {
      "hj,ys,dzlc,gyd": createModal(GroupsAduitModal),
      [isWhText]: createModal(GroupsAduitModalWh),
      other: createModal(GroupsAduitModalNew),
    },
    vague: true,
  });

  let signModal = createModal(SignModal);

  useEffect(() => {
    service.homeDataApiServices.getListDepartment().then((res: any) => {
      if (res && res.data && res.data.deptList) {
        store.authStore.deptList = res.data.deptList || [];
        if (!store.authStore.defaultDeptCode) {
          store.authStore.defaultDeptCode = store.authStore.deptList[0]?.code || '';
          store.authStore.selectedDeptCode = store.authStore.deptList[0]?.code || '';
        }
      }
    });
  }, []);

  useLayoutEffect(() => {
    // 全局弹窗实例化
    globalModal.auditModal = aduitModalRef.current;
    globalModal.groupsAduitModal = groupsAduitModalRef.current;
    globalModal.signModal = signModal;
  });

  return (
    <Wrapper
      className="MainLayoutWrapper"
      style={(payload && payload.style) || {}}
    >
      <NavBar {...props} />
      <RouterViewCon className="MainLayoutRouterViewCon">
        <RouterView routes={props.routes} />
      </RouterViewCon>
      <aduitModal.Component ref={aduitModalRef} />
      <groupsAduitModal.Component ref={groupsAduitModalRef} />
      <signModal.Component />
      {appStore.fullLoadingBarObj && <FullPageLoading />}
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: -1px;
  bottom: 0;
  background: #eee;
`;
const RouterViewCon = styled.div`
  flex: 1;
  overflow: auto;
`;
