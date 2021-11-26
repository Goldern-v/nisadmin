import { Modal, Radio } from "antd";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import createModal from "src/libs/createModal";
import { message } from "src/vendors/antd";
import styled from "styled-components";
import { courseLibraryApi, getResponseData } from "./api/courseLibraryApi";
import CourseModal from "./components/CourseModal";
import Header from "./components/Header";
import Table from "./components/Table";
import { courseLibraryModal } from "./modal";
import BaseTabs from "src/components/BaseTabs";

export default observer(function(props) {
  const { init } = courseLibraryModal;
  useEffect(() => {
    init();
  }, []);

  // modal
  const courseModal = createModal(CourseModal);
  const openAdd = () => {
    return courseModal.show({
      modalType: 0,
    });
  };
  const onOpenDetail = (item: any, key: number) => {
    const keyTipList = ["", "修改", "查看"];
    const keyFlagList = ["", "isModify", "isReview"];
    if (keyFlagList[key] && item[keyFlagList[key]] === 0) {
      message.warning("没有权限" + keyTipList[key] + "该课件");
      return;
    }
    courseModal.show({
      modalType: key,
      data: item,
    });
  };
  const onDeleteItem = (item: any) => {
    if (item.isDelete === 0) {
      return message.warning("没有权限删除该课件");
    }

    Modal.confirm({
      title: "删除",
      content: "是否删除该课件",
      onOk: () => {
        getResponseData(() => courseLibraryApi.deleteCourse(item.id))
          .then((res) => {
            courseLibraryModal.page = 1;
            courseLibraryModal.getData();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      okText: "确认",
      cancelText: "取消",
    });
  };
  const onOkCallback = () => {
    courseModal.hide();
    courseLibraryModal.page = 1;
    courseLibraryModal.getData();
  };
  const table = (
    <Table onDeleteItem={onDeleteItem} onOpenDetail={onOpenDetail} />
  );

  const tabList = [
    {
      title: "公共课件",
      code: 1,
      component: table,
    },
    {
      title: "个人课件",
      code: 2,
      component: table,
    },
  ];
  return (
    <Wrapper>
      <Header openAdd={openAdd} />
      <Content>
        <BaseTabs
          defaultActiveKey={courseLibraryModal.curTab}
          config={tabList}
          onChange={(key: any) => {
            courseLibraryModal.selectTab(key);
          }}
        />
      </Content>
      <courseModal.Component
        courseType={courseLibraryModal.curTab}
        onOkCallback={onOkCallback}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 12px;
  box-sizing: border-box;
  /* display: flex;
  flex-direction: column; */
`;
const Content = styled.div`
  /* flex: 1; */
  padding: 0 20px 20px;
  box-sizing: border-box;
  /* overflow-y: auto; */
  .ant-radio-button-wrapper {
    border: none;
    height: 50px;
    line-height: 50px;
    border-radius: 0;
  }
  .ant-radio-button-wrapper-checked {
    background: #eee;
  }
  .ant-radio-button-wrapper-checked.ant-radio-button-wrapper::before {
    background-color: #eee !important;
    opacity: 1;
  }
  .ant-radio-button-wrapper-checked {
    outline: none;
  }
`;
