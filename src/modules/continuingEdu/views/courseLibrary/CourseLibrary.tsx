import { Radio } from "antd";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import createModal from "src/libs/createModal";
import styled from "styled-components";
import CourseModal from "./components/CourseModal";
import Header from "./components/Header";
import Table from "./components/Table";
import { courseLibraryModal } from "./modal";

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
    console.log("test-item, key", item, key);
    courseModal.show({
      modalType: key,
      data: item,
    });
  };
  const onDeleteItem = (item: any) => {
    console.log("test-item", item);
  };
  const onOkCallback = () => {
    courseModal.hide();
    courseLibraryModal.page = 1;
    courseLibraryModal.getData();
  };
  return (
    <Wrapper>
      <Header openAdd={openAdd} />
      <Content>
        <Radio.Group
          onChange={(val: any) => courseLibraryModal.selectTab(val)}
          value={courseLibraryModal.curTab}
          style={{ marginBottom: 8 }}
        >
          {courseLibraryModal.tabList.map((val: any) => {
            return (
              <Radio.Button value={val.code} key={val.code}>
                {val.name}
              </Radio.Button>
            );
          })}
        </Radio.Group>
        <Table onDeleteItem={onDeleteItem} onOpenDetail={onOpenDetail} />
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
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #fff;
  padding: 0 10px;
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
