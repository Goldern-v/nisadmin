import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Place } from "src/components/common";
import { Select, Input, Button } from "antd";
import { nurseFilesListViewModel } from "../NurseFilesListViewModel";
import AddNursingModal from "../modal/AddNursingModal";
import DeptSelect from "src/components/DeptSelect";
import { observer } from "mobx-react-lite";
import { authStore } from "src/stores";

const Option = Select.Option;

export default observer(function SelectCon(props: any, context: any) {
  const [visible, setVisible] = useState(false);
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChange = (value: string) => {
    nurseFilesListViewModel.loadNursingList();
  };
  const onSearch = () => {
    nurseFilesListViewModel.loadNursingList();
  };
  const SearchByText = (e: React.ChangeEvent<HTMLInputElement>) => {
    nurseFilesListViewModel.filterText = e.target.value;
  };
  const exportFile = () => {
    nurseFilesListViewModel.exportNursingList();
  };

  useEffect(() => {
    return () => {
      nurseFilesListViewModel.filterText = "";
    };
  }, []);

  return (
    <React.Fragment>
      <Wrapper>
        <Title>护士档案</Title>
        <Place />
        <span>科室：</span>
        <DeptSelect deptCode={authStore.selectedDeptCode} onChange={onChange} />
        <Input
          placeholder="请输入搜索关键字"
          value={nurseFilesListViewModel.filterText}
          style={{ width: 160 }}
          onChange={SearchByText}
        />
        <Button type="primary" onClick={onSearch}>
          搜索
        </Button>
        <Button onClick={() => setVisible(true)}>+添加护士</Button>
        <Button onClick={exportFile}>导出</Button>
      </Wrapper>
      <AddNursingModal
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </React.Fragment>
  );
});
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: #333;
  margin-bottom: 15px;
  input,
  button {
    margin-left: 10px;
  }
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
