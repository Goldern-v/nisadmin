import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { ModalComponentProps } from "src/libs/createModal";
import { Modal, Radio, Input, Spin, Button } from "antd";
import React, { useState, useEffect, useLayoutEffect } from "react";
import AnsweiSheetTemplate from './AnsweiSheetTemplate'
import { trainingResultService } from './../../api/TrainingResultService'
import { fileDownload } from "src/utils/file/file";
import printing from "printing";

let defalutUrl = (()=>{
  let protocol = window.location.protocol + "//"
  let host = window.location.host
  let prodUrl = '/crNursing/manage'
  let originUrl = protocol + host + (process.env.NODE_ENV === 'production'?prodUrl:"") + '/#' 
  return originUrl
})()
export interface Props extends ModalComponentProps {
  onOkCallBack?: Function;
  title?: string;
  cetpId?: string | number;
  empNo?: string | number;
  visible: boolean;
}

export default observer(function AnswerSheetModal(props: Props) {
  const bodyStyle = {
    padding: 0
  };
  const {
    visible,
    onOkCallBack,
    onCancel,
    title,
    cetpId,
    empNo,
  } = props;
  const [loading, setLoading] = useState(false);
  const load = (flag:boolean) =>{
    setLoading(flag)
  }
  const toPdf = ()=>{
    // load(true);
    // let req: Promise<any>;
    // let pageUrl = defalutUrl + `/answeiSheetPdf?cetpId=${cetpId}&empNo=${empNo}&token=${sessionStorage.getItem("authToken")}`
    try{
      printing(document.getElementById("InfoDetailContainer")!, {
        injectGlobalCss: true,
        scanStyles: false,
        css: `
          @page {
            margin: 10px;
          }
        `,
      })

      // req = trainingResultService.reviewExamPaperExportPdf(pageUrl).then(async res=>{
      //   await fileDownload(res)
      //   load(false);
      // });
    }catch(err){
      // load(false);
    }
  }
  return (
    <Modal
      width={900}
      confirmLoading={loading}
      footer={
        <div>
          <Button loading={loading} onClick={toPdf} type="primary">
            导出PDF
          </Button>
        </div>
      }
      onCancel={onCancel}
      bodyStyle={bodyStyle}
      visible={visible}
      centered
      title="个人试题情况"
    >
      <AnsweiSheetTemplate
        cetpId={cetpId}
        empNo={empNo}
        visible={visible}
      >
      </AnsweiSheetTemplate>
    </Modal>
  )
})
const Wrapper = styled.div`

`