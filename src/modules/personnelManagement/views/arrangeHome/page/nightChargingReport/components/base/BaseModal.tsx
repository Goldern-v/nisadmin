import styled from "styled-components";
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Modal,
  Input,
  Button,
  Radio,
  DatePicker,
  Select,
  Row,
  Col,
  message
} from "antd";
import { ModalComponentProps } from "src/libs/createModal";
import Form from "src/components/Form";
import { to } from "src/libs/fns";
import { Rules } from "src/components/Form/interfaces";
import { observer } from "src/vendors/mobx-react-lite";
import { starRatingReportEditModel } from "./../../model/StarRatingReportEditModel";
import { starRatingReportService } from "./../../api/StarRatingReportService";
import { appStore } from "src/stores";

const Option = Select.Option;

export interface Props extends ModalComponentProps {
  /** 表单提交成功后的回调 */
  onOkCallBack?: () => {};
  Component: any;
  sectionData: {
    sectionId: string;
    sectionTitle?: string;
    modalTitle?: string;
    modalWidth?: any;
    handleSave?: Function;
    [p: string]: any;
  };
}

export default observer(function BaseModal(props: Props) {
  let { visible, onCancel, Component, sectionData } = props;
  const [data, setData]: any = useState(null);

  const formatNum = (num: number | string) => {
    num = Number(num);

    if (isNaN(num)) return "0.0";

    let numArr = num.toString().split(".");
    if (!numArr[0]) numArr[0] = "0";

    if (numArr[1]) {
      numArr[1] = numArr[1][0];
    } else {
      numArr[1] = "0";
    }

    return numArr.join(".");
  };


  const onSave = async () => {
    console.log(sectionData.sectionId, data);

    if (sectionData.sectionId == "夜班费上报表") {
      const params = appStore.hisMatch({
        map: {
          'dghl,fqfybjy': {
            list1: data.list,
            list2: data.list2,
            schNightTotalModel: data.schNightTotalModel
          },
          other: {
            lists: data.list,
            schNightTotalId: appStore.queryObj.id
          }
        },
        vague: true,
      })

      starRatingReportService.editReport(params).then(res => {
        message.success("修改成功");
        starRatingReportEditModel.setSectionData(sectionData.sectionId, {
          list: data.list
        });
        onCancel();
      });
    }

    // starRatingReportEditModel.setSectionData(sectionData.sectionId, data) ? onCancel() : message.error('未知异常')
  };

  useLayoutEffect(() => {
    if (visible) {
      let data = starRatingReportEditModel.getSectionData(
        sectionData.sectionId
      );
      setData(data);
    }
  }, [visible]);

  let title: any = "";
  if (
    sectionData &&
    sectionData.data &&
    sectionData.data.baseInfo &&
    sectionData.data.baseInfo.qcGroupName
  ) {
    title = "编辑" + sectionData.data.baseInfo.qcGroupName;
  } else if (sectionData) {
    title = sectionData.modalTitle;
  }
  return (
    <Modal
      title={title || ""}
      visible={visible}
      onCancel={onCancel}
      onOk={onSave}
      okText="保存"
      forceRender
      width={(sectionData && sectionData.modalWidth) || 700}
      centered
    >
      {Component && (
        <Component {...props.sectionData} data={data} setData={setData} />
      )}
    </Modal>
  );
});
const Wrapper = styled.div``;
