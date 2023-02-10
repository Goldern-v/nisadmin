import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Place } from "src/components/common";
import { Input, Button, Dropdown, Menu } from "antd";
import { nurseFilesListViewModel } from "../NurseFilesListViewModel";
import AddNursingModal from "../modal/AddNursingModal";
import DeptSelect from "src/components/DeptSelect";
import { observer } from "mobx-react-lite";

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
  /**导出证书 */
  const exportCertificate = (type: any = '') => {
    nurseFilesListViewModel.exportCertificate(type);
  };
  const exportMenus = (
    <Menu onClick={(e) => exportCertificate(e.key)}>
      <Menu.Item key="7">全部</Menu.Item>
      <Menu.Item key="1">护士执业证书</Menu.Item>
      {/* <Menu.Item key="2">职称证书</Menu.Item> */}
      <Menu.Item key="3">身份证</Menu.Item>
      <Menu.Item key="4">毕业证</Menu.Item>
      <Menu.Item key="5">资格证</Menu.Item>
      <Menu.Item key="6">与护理相关证书</Menu.Item>
    </Menu>
  )

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
        <DeptSelect onChange={onChange} />
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
        <Dropdown overlay={exportMenus}>
          <Button>导出证书</Button>
        </Dropdown>
        {/* <Button onClick={() => exportCertificate(2)}>导出职称证书</Button> */}
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
