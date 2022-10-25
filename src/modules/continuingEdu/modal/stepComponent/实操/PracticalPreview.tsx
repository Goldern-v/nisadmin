import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Button, Modal, Input } from "antd";
// import { scStepViewModal as stepViewModal } from "./SCStepViewModal";
import PracticalTablewhyx from './components/PracticalTableWHYX'
import PracticalTablefsxt from './components/PracticalTableFSXT'
import { appStore } from "src/stores";


const { TextArea } = Input;

interface props {
  modalVisible: boolean | undefined;
  params: any;
  modalTitle: string;
  onCancel: Function;
  onOk: Function;
}
export default observer(function PracticalImportModal(props: props) {
  const { modalVisible, modalTitle, params, onCancel, onOk } = props;
 
  const handleOk = () => {
    onOk && onOk(params);
    params.value=null;
  };

  const handleCancel = () => {
    onCancel && onCancel();
    params.value=null;
  };
  return (
    <Modal
      title={modalTitle}
      visible={modalVisible}
      onCancel={handleCancel}
      destroyOnClose={true}
      width={800}
      footer={[
        <Footer key={15}>
          {modalTitle != "预览" ?(
            <div>
              <Button type="primary" onClick={handleOk}>
                确认
              </Button>
              <Button onClick={handleCancel}>取消</Button>
            </div>
          ):( <Button type="primary" onClick={handleCancel}>
              关闭
            </Button>)}
         
        </Footer>,
      ]}
    >
      {params && (
        ['whyx','whhk'].includes(appStore.HOSPITAL_ID)?(
          <PracticalTablewhyx params={params} modalTitle={modalTitle}></PracticalTablewhyx>
        ):(
          <PracticalTablefsxt params={params} modalTitle={modalTitle}></PracticalTablefsxt>
        )
      )}
    </Modal>
  );
});
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  .modal-table {
    width: 100%;
    border: 1px solid #000;
    thead {
      tr {
        td {
          border: 1px solid #000;
          line-height: 30px;
          background-color: #a8a8a8;
          font-weight: bold;
        }
      }
    }
    tbody {
      tr {
        td {
          border: 1px solid #000;
          line-height: 30px;
          font-size: 14px;
          padding: 0 5px;
        }
      }
    }
    .td-bold {
      font-weight: bold;
    }
    .td-center {
      text-align: center;
    }
    .inp_textArea {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      border-radius: 0;
      resize: none;
      &:focus {
        background: ${(p) => p.theme.$mlc};
      }
      ::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
const Footer = styled.div`
  text-align: center;
`;
