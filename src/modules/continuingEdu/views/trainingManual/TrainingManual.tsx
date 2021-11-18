import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, message as Message } from "antd";
import { trainingManualModal } from "./TrainingManualModal";
import Tabs from "./components/Tabs";
import { trainingManualApi } from "./api/TrainingManualApi";
import { appStore, authStore } from "src/stores";
interface Props {}

export default observer(function TrainingManual(props: Props) {
  let fileRef = React.createRef<any>();
  let user: any = authStore.user || {};
  // 初始化表格数据
  useEffect(() => {
    trainingManualModal.myOnload();
  }, [trainingManualModal.tabKey]);
  useEffect(() => {
    trainingManualModal.init();
  }, []);

  //导出培训清单
  const exportList = () => {
    trainingManualModal.export();
  };
  const print = () => {
    trainingManualModal.print();
  };
  const importData = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const importTemplate = () => {
    trainingManualModal.importTemplate();
  };

  const handleFileChange = (e: any) => {
    let files = e.target.files;
    if (files.length > 0) {
      let formData = new FormData();
      formData.append("file", files[0]);
      formData.append("nurseHierarchy", trainingManualModal.tabKeyName);
      formData.append("empName", user.empName);
      formData.append("empNo", user.empNo);
      formData.append("deptCode", user.deptCode);
      formData.append("deptName", user.deptName);
      trainingManualApi.importTrainingData(formData).then((res: any) => {
        if (res.code == 200) {
          Message.success("导入成功");
          trainingManualModal.myOnload();
        }
      });
    }
  };

  //上传文件组件
  const FileInput = () => {
    return (
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileRef}
        onChange={handleFileChange}
        accept=".xls"
      />
    );
  };
  return (
    <Wrapper>
      <Header>
        <Title>培训手册</Title>
        <HandleBtn>
          {appStore.HOSPITAL_ID == "hj" ? (
            <div>
              <Button className="btn" onClick={importTemplate}>
                下载导入模版
              </Button>
              <Button
                className="btn"
                onClick={importData}
                disabled={!authStore.isHeadNurse}
              >
                导入
              </Button>
              <Button className="btn" onClick={exportList}>
                导出
              </Button>
              <Button className="btn" onClick={print}>
                打印
              </Button>
              <Button
                disabled={!authStore.isHeadNurse}
                type="primary"
                onClick={() => (trainingManualModal.modalBtn = true)}
              >
                添加培训计划
              </Button>
            </div>
          ) : (
            <Button
              type="primary"
              onClick={() =>
                appStore.history.push(
                  `/trainingManualSetting?nameType=trainingManualSetting`
                )
              }
            >
              培训清单管理
            </Button>
          )}
        </HandleBtn>
      </Header>
      <Content>
        <Tabs />
      </Content>
      {FileInput()}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;
const Header = styled.div`
  height: 55px;
  color: #333;
  line-height: 55px;
  width: 100%;
`;
const Title = styled.div`
  float: left;
  font-weight: bold;
  font-size: 22px;
`;
const HandleBtn = styled.div`
  float: right;
  .btn {
    margin-right: 10px;
  }
`;
const Content = styled.div`
  height: calc(100vh - 220px);
  padding-bottom: 10px;
  box-sizing: border-box;
  .ant-tabs-nav {
    width: 100% !important;
  }
  .ant-tabs-tab {
    text-align: center !important;
    width: 16.66% !important;
  }
`;
