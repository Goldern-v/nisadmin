import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Place } from "src/components/common";
import { Select, Input, Button } from "antd";
import { nurseFilesListViewModel } from "../NurseFilesListViewModel";
import AddNursingModal from "../modal/AddNursingModal";
import DeptSelect from "src/components/DeptSelect";
import { observer } from "mobx-react-lite";
import { nurseFilesService } from './../../../services/NurseFilesService'
import { fileDownload } from "src/utils/file/file"

import ImportModal from './ImportModal'
import createModal from 'src/libs/createModal'
import store from "src/stores";

const Option = Select.Option;

export default observer(function SelectCon(props: any, context: any) {
  const [visible, setVisible] = useState(false);

  const importModal = createModal(ImportModal)
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

  const downloadExportTemplate = () => {
    nurseFilesService.downloadUploadExcel().then(res => fileDownload(res))
  }

  //导入护士相关
  const [importIptVisible, setImportIptVisible] = useState(false)
  const handleImportClick = () => {
    setImportIptVisible(false)
    setTimeout(() => {
      setImportIptVisible(true)
      setTimeout(() => {
        let el = document.getElementById('import-xls-file-ipt')
        if (el) el.click()
      })
    })
  }

  const handleImportChange = (e: any) => {
    if (e.target.files.length > 0)
      nurseFilesService.importExcel(e.target.files[0]).then(res => {

        if (res.data)
          importModal.show({
            data: res.data,
            onOkCallback: () => onSearch()
          })
      })
  }

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
        <Button onClick={() => setVisible(true)} disabled={!store.authStore.isRoleManage}>+添加护士</Button>
        <Button onClick={downloadExportTemplate}>下载导入模板</Button>
        <Button onClick={handleImportClick}>导入</Button>
        {importIptVisible && <input id="import-xls-file-ipt" type="file" onChange={handleImportChange} />}
        <Button onClick={exportFile}>导出</Button>
      </Wrapper>
      <AddNursingModal
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <importModal.Component />
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
  #import-xls-file-ipt{
    display:none;
  }
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
