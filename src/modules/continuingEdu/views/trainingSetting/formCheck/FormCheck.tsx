import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Header from "./components/Header";
import FormCommon from "../formApply/modal/formCommon/FormCommon";
import Right from "./components/Right";
import { ScrollBox } from "src/components/common";
import { trainingSettingApi } from "../api/TrainingSettingApi";
import { appStore } from "src/stores";
import { Spin } from "antd";
import { formApplyModal } from "../formApply/FormApplyModal"; // 仓库数据
import { observer } from "mobx-react-lite";

export default observer(function FormCheck() {
  const [detailData, setDetailData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  let formId = appStore.queryObj.formId;
  const onload = () => {
    setLoading(true);
    trainingSettingApi.getFlowTaskHisByCetpId(formId).then(res => {
      setDetailData(res.data);
      setLoading(false);
    });
  };

  useLayoutEffect(() => {
    onload();
  }, []);

  return (
    <Wrapper>
      {!appStore.queryObj.haveHeader && (
        <HeaderCon>
          <Header detailData={detailData} onload={onload} />
        </HeaderCon>
      )}
      <MidCon
        className={
          appStore.queryObj.haveHeader &&
          appStore.queryObj.haveHeader == "false"
            ? "isok"
            : ""
        }
      >
        <MidConScrollCon>
          <SpinCon>
            {loading ? (
              <div className="LoadingCon">
                <Spin spinning={loading} className="SpinLoadingClass" />
              </div>
            ) : (
              ""
            )}
          </SpinCon>
          <MidLeftCon>
            <FormCommon />
          </MidLeftCon>
          <MidRightCon>
            <Right detailData={detailData} />
          </MidRightCon>
        </MidConScrollCon>
      </MidCon>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  flex-direction: column;
`;
const HeaderCon = styled.div`
  height: 95px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;
const MidCon = styled.div`
  flex: 1;
  height: calc(100vh - 145px);
  &.isok {
    height: calc(100vh) !important;
  }
`;
const MidConScrollCon = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  position: relative;
`;
const MidLeftCon = styled(ScrollBox)`
  box-sizing: border-box;
  padding: 20px 0;
  flex: 1;
  width: 0;
  height: 100%;
  background-color: #eeeeee;
  align-items: stretch;
`;
const MidRightCon = styled.div`
  width: 317px;
  height: 100%;
  align-items: stretch;
  background: rgba(247, 250, 250, 1);
  overflow-y: auto;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px #ffffff;
    border-radius: 5px;
    background-color: #ffffff;
  }
`;
const SpinCon = styled.div`
  .LoadingCon {
    z-index: 99;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .SpinLoadingClass {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
