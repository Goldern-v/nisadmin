import styled from "styled-components";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { RouteComponentProps } from "react-router";
import { DatePicker, Button, message } from "./vendors/antd";
import { Provider, KeepAlive } from "react-keep-alive";
import Demo1 from "./demo1";
import { authStore, appStore } from "./stores";
import ExportNurseFile from "./modules/nurseFiles/view/nurseFiles-hj/views/exportNurseFile/ExportNurseFile";
import DateTimePicker from "./components/DateTimePicker";
import moment from "moment";

import QuesBankModal from "src/modules/continuingEdu/modal/stepComponent/考试/modal/QuesBankModal";

export interface Props extends RouteComponentProps {
  style: any;
}

export default function demo(props: Props) {
  const [visible, setVisible] = useState(true);

  const [value, setValue] = useState(null);
  const onCancel = () => {
    setVisible(false);
  };

  const handleEditOk = () => {
    onCancel();
  };

  return (
    <Wrapper>
      {/* <DateTimePicker
        value={value}
        onChange={(_value: any) => setValue(_value)}
      /> */}

      <QuesBankModal
        visible={visible}
        onCancel={onCancel}
        onOk={handleEditOk}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div``;
